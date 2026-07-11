import { promises as fs } from "fs";
import path from "path";
import { z } from "zod";

const DATA_DIR = path.join(process.cwd(), "src", "data");
const LEADS_FILE = path.join(DATA_DIR, "leads.json");

async function ensureFile() {
  await fs.mkdir(DATA_DIR, { recursive: true });
  try {
    await fs.access(LEADS_FILE);
  } catch {
    await fs.writeFile(LEADS_FILE, JSON.stringify([], null, 2), "utf8");
  }
}

async function readLeads(): Promise<unknown[]> {
  await ensureFile();
  const content = await fs.readFile(LEADS_FILE, "utf8");
  try {
    return JSON.parse(content) as unknown[];
  } catch {
    return [];
  }
}

async function writeLeads(leads: unknown[]) {
  await fs.writeFile(LEADS_FILE, JSON.stringify(leads, null, 2), "utf8");
}

const createLeadSchema = z.object({
  fullName: z.string().min(2).max(120),
  email: z.string().email().max(160),
  phone: z.string().min(7).max(32),
  service: z.string().min(1).max(60),
  message: z.string().min(10).max(4000),
});

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return new Response(JSON.stringify({ ok: false, error: "Invalid request body." }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  const parsed = createLeadSchema.safeParse(body);
  if (!parsed.success) {
    return new Response(
      JSON.stringify({ ok: false, error: "Validation failed", issues: parsed.error.issues }),
      { status: 400, headers: { "Content-Type": "application/json" } }
    );
  }

  const leads = await readLeads();
  const lead = { id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`, createdAt: new Date().toISOString(), ...parsed.data };
  await writeLeads([...leads, lead]);

  return new Response(JSON.stringify({ ok: true, lead }), {
    status: 201,
    headers: { "Content-Type": "application/json" },
  });
}
