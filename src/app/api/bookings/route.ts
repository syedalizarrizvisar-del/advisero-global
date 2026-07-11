import { promises as fs } from "fs";
import path from "path";
import { z } from "zod";
import { BookingRecord, SlotOverride, TIME_SLOTS } from "@/lib/booking";

const DATA_DIR = path.join(process.cwd(), "src", "data");
const BOOKINGS_FILE = path.join(DATA_DIR, "bookings.json");
const SLOTS_FILE = path.join(DATA_DIR, "slot-overrides.json");

async function ensureDataFiles() {
  await fs.mkdir(DATA_DIR, { recursive: true });
  try {
    await fs.access(BOOKINGS_FILE);
  } catch {
    await fs.writeFile(BOOKINGS_FILE, JSON.stringify([], null, 2), "utf8");
  }
  try {
    await fs.access(SLOTS_FILE);
  } catch {
    await fs.writeFile(SLOTS_FILE, JSON.stringify({ blockedSlots: [] }, null, 2), "utf8");
  }
}

async function readBookings(): Promise<BookingRecord[]> {
  await ensureDataFiles();
  const content = await fs.readFile(BOOKINGS_FILE, "utf8");
  return JSON.parse(content) as BookingRecord[];
}

async function readSlotOverrides(): Promise<{ blockedSlots: SlotOverride[] }> {
  await ensureDataFiles();
  const content = await fs.readFile(SLOTS_FILE, "utf8");
  return JSON.parse(content) as { blockedSlots: SlotOverride[] };
}

async function writeBookings(bookings: BookingRecord[]) {
  await fs.writeFile(BOOKINGS_FILE, JSON.stringify(bookings, null, 2), "utf8");
}

async function writeSlotOverrides(overrides: { blockedSlots: SlotOverride[] }) {
  await fs.writeFile(SLOTS_FILE, JSON.stringify(overrides, null, 2), "utf8");
}

const createBookingSchema = z.object({
  fullName: z.string().min(2).max(120),
  email: z.string().email().max(160),
  phone: z.string().min(7).max(32),
  country: z.string().min(2).max(120),
  message: z.string().min(10).max(4000),
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  time: z.string().refine((value) => TIME_SLOTS.includes(value), {
    message: "Invalid time slot",
  }),
  timezone: z.string().min(2).max(80),
});

const adminToggleSchema = z.object({
  action: z.literal("toggleAvailability"),
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  time: z.string().refine((value) => TIME_SLOTS.includes(value), {
    message: "Invalid time slot",
  }),
});

function generateId() {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
}

export async function GET() {
  const bookings = await readBookings();
  const slotOverrides = await readSlotOverrides();
  return new Response(JSON.stringify({ bookings, blockedSlots: slotOverrides.blockedSlots }), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}

export async function POST(request: Request) {
  const body = await request.json();
  const parsed = createBookingSchema.safeParse(body);
  if (!parsed.success) {
    return new Response(JSON.stringify({ ok: false, error: "Validation failed", issues: parsed.error.issues }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  const booking = parsed.data;
  const bookings = await readBookings();
  const slotOverrides = await readSlotOverrides();

  const alreadyBooked = bookings.some((item) => item.date === booking.date && item.time === booking.time);
  const isBlocked = slotOverrides.blockedSlots.some((slot) => slot.date === booking.date && slot.time === booking.time);

  if (alreadyBooked || isBlocked) {
    return new Response(
      JSON.stringify({ ok: false, error: "Selected slot is no longer available. Please choose another time." }),
      { status: 409, headers: { "Content-Type": "application/json" } }
    );
  }

  const newBooking: BookingRecord = {
    id: generateId(),
    createdAt: new Date().toISOString(),
    ...booking,
  };

  await writeBookings([...bookings, newBooking]);

  return new Response(JSON.stringify({ ok: true, booking: newBooking }), {
    status: 201,
    headers: { "Content-Type": "application/json" },
  });
}

export async function PATCH(request: Request) {
  const body = await request.json();
  const parsed = adminToggleSchema.safeParse(body);
  if (!parsed.success) {
    return new Response(JSON.stringify({ ok: false, error: "Validation failed", issues: parsed.error.issues }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  const overrides = await readSlotOverrides();
  const existingIndex = overrides.blockedSlots.findIndex(
    (slot) => slot.date === parsed.data.date && slot.time === parsed.data.time
  );

  if (existingIndex >= 0) {
    overrides.blockedSlots.splice(existingIndex, 1);
  } else {
    overrides.blockedSlots.push({ date: parsed.data.date, time: parsed.data.time, status: "unavailable" });
  }

  await writeSlotOverrides(overrides);

  return new Response(JSON.stringify({ ok: true, blockedSlots: overrides.blockedSlots }), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}
