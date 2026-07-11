export const TIME_SLOTS = ["09:00", "11:00", "13:00", "15:00", "17:00", "19:00"];
export const UAE_TIMEZONE = "Asia/Dubai";

export type BookingRecord = {
  id: string;
  date: string;
  time: string;
  fullName: string;
  email: string;
  phone: string;
  country: string;
  message: string;
  timezone: string;
  createdAt: string;
};

export type SlotOverride = {
  date: string;
  time: string;
  status: "unavailable";
};

export function getUpcomingDays(days = 14) {
  const today = new Date();
  return Array.from({ length: days }, (_, index) => {
    const date = new Date(today);
    date.setDate(today.getDate() + index);
    return date.toISOString().slice(0, 10);
  });
}

export function parseUaeDateTime(date: string, time: string) {
  const [year, month, day] = date.split("-").map(Number);
  const [hour, minute] = time.split(":").map(Number);
  const utcTimestamp = Date.UTC(year, month - 1, day, hour - 4, minute);
  return new Date(utcTimestamp);
}

export function formatUaeTime(date: Date) {
  return new Intl.DateTimeFormat("en-US", {
    timeZone: UAE_TIMEZONE,
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  }).format(date);
}

export function formatLocalTime(date: Date, timeZone: string) {
  return new Intl.DateTimeFormat("en-US", {
    timeZone,
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  }).format(date);
}

export function getDateLabel(date: string) {
  const formatted = new Date(date).toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
  });
  return formatted;
}

export function isValidPhoneNumber(phone: string) {
  const digits = phone.replace(/[^0-9]/g, "");
  return digits.length >= 7 && digits.length <= 15;
}
