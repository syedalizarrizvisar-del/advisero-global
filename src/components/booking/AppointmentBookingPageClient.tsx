"use client";

import * as React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { Section } from "@/components/site/Section";
import { Container } from "@/components/site/Container";
import { cn } from "@/lib/cn";
import {
  TIME_SLOTS,
  getUpcomingDays,
  parseUaeDateTime,
  formatUaeTime,
  formatLocalTime,
  getDateLabel,
  isValidPhoneNumber,
  type BookingRecord,
} from "@/lib/booking";
import { InternationalPhoneInput } from "@/components/ui/InternationalPhoneInput";
import {
  ArrowRight,
  CalendarDays,
  Clock,
  Globe,
  ShieldCheck,
  UserCircle,
  MapPin,
  MessageCircle,
  X,
} from "lucide-react";

const DEFAULT_COUNTRY_CODE = "+971";

export default function AppointmentBookingPageClient() {
  const [selectedDate, setSelectedDate] = React.useState(getUpcomingDays(14)[0]);
  const [selectedTime, setSelectedTime] = React.useState(TIME_SLOTS[0]);
  const [bookings, setBookings] = React.useState<Array<BookingRecord>>([]);
  const [blockedSlots, setBlockedSlots] = React.useState<Array<{ date: string; time: string }>>([]);
  const [formData, setFormData] = React.useState({
    fullName: "",
    email: "",
    country: "United Arab Emirates",
    dialCode: DEFAULT_COUNTRY_CODE,
    phoneNumber: "",
    message: "",
  });
  const [phoneError, setPhoneError] = React.useState("");
  const [successMessage, setSuccessMessage] = React.useState("");
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [isAdminMode, setIsAdminMode] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState("");

  const clientTimeZone = React.useMemo(() => Intl.DateTimeFormat().resolvedOptions().timeZone, []);
  const upcomingDays = React.useMemo(() => getUpcomingDays(14), []);

  const availableSlots = React.useMemo(() => {
    return TIME_SLOTS.map((time) => {
      const isBooked = bookings.some((booking) => booking.date === selectedDate && booking.time === time);
      const isUnavailable = blockedSlots.some((slot) => slot.date === selectedDate && slot.time === time);
      return {
        time,
        isBooked,
        isUnavailable,
      };
    });
  }, [bookings, blockedSlots, selectedDate]);

  const selectedDateTime = React.useMemo(
    () => parseUaeDateTime(selectedDate, selectedTime),
    [selectedDate, selectedTime]
  );

  React.useEffect(() => {
    async function loadBookings() {
      const response = await fetch("/api/bookings");
      if (!response.ok) return;
      const data = await response.json();
      setBookings(data.bookings ?? []);
      setBlockedSlots(data.blockedSlots ?? []);
    }
    loadBookings();
  }, []);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setPhoneError("");
    setErrorMessage("");
    setSuccessMessage("");

    const normalizedPhone = `${formData.dialCode}${formData.phoneNumber.replace(/[^0-9]/g, "")}`;
    if (!isValidPhoneNumber(normalizedPhone)) {
      setPhoneError("Please enter a valid international phone number.");
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullName: formData.fullName,
          email: formData.email,
          phone: normalizedPhone,
          country: formData.country,
          message: formData.message,
          date: selectedDate,
          time: selectedTime,
          timezone: clientTimeZone,
        }),
      });

      const result = await response.json();
      if (!response.ok) {
        setErrorMessage(result.error || "Unable to book the slot at this time.");
        setIsSubmitting(false);
        return;
      }

      setSuccessMessage("Your appointment is confirmed. A team member will contact you shortly.");
      setBookings((prev) => [...prev, result.booking]);
      setFormData({ ...formData, fullName: "", email: "", phoneNumber: "", message: "" });
    } catch {
      setErrorMessage("Booking failed. Please try again later.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const toggleSlotAvailability = async (date: string, time: string) => {
    const response = await fetch("/api/bookings", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ action: "toggleAvailability", date, time }),
    });
    if (!response.ok) return;
    const data = await response.json();
    setBlockedSlots(data.blockedSlots ?? []);
  };

  return (
    <div className="min-h-screen bg-[color:var(--color-bg)] text-[color:var(--color-fg)]">
      <Section>
        <Container>
          <div className="flex flex-col gap-4 mb-12">
            <div className="inline-flex items-center gap-2">
              <span className="h-2.5 w-2.5 rounded-full bg-primary" />
              <span className="text-[13px] font-semibold tracking-wide text-muted">BOOK APPOINTMENT</span>
            </div>
            <h1 className="text-[32px] sm:text-[44px] font-black tracking-tight text-fg">
              Schedule Your International Consultation
            </h1>
            <p className="max-w-3xl text-muted text-[15px] leading-7">
              Choose a premium appointment time with transparent UAE and local timezone comparison, available dates, and professional booking confirmation.
            </p>
          </div>

          <div className="grid gap-8 xl:grid-cols-[1.4fr_1fr]">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="rounded-[28px] border border-white/20 bg-white/10 glass-strong p-6 sm:p-8"
            >
              <div className="flex flex-col gap-6">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="rounded-[24px] bg-[rgba(59,130,246,0.08)] p-5">
                    <div className="flex items-center gap-3 text-sm font-semibold text-primary uppercase tracking-[0.18em]">
                      <CalendarDays className="h-4 w-4" />
                      Available Dates
                    </div>
                    <div className="mt-4 grid gap-3">
                      {upcomingDays.slice(0, 8).map((date) => {
                        const label = getDateLabel(date);
                        const fullyBooked = TIME_SLOTS.every((time) => bookings.some((booking) => booking.date === date && booking.time === time));
                        return (
                          <button
                            key={date}
                            type="button"
                            onClick={() => setSelectedDate(date)}
                            className={cn(
                              "rounded-2xl border px-4 py-3 text-left transition-all duration-200",
                              selectedDate === date ? "border-primary bg-primary/10 text-white" : "border-white/10 bg-slate-950/60 text-white/80",
                              fullyBooked ? "opacity-60 cursor-not-allowed" : "hover:border-primary/70 hover:bg-white/5"
                            )}
                            disabled={fullyBooked}
                          >
                            <div className="text-sm font-semibold">{label}</div>
                            <div className="text-[13px] text-muted">{fullyBooked ? "Fully booked" : "Available"}</div>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  <div className="rounded-[24px] bg-[rgba(212,175,55,0.08)] p-5">
                    <div className="flex items-center gap-3 text-sm font-semibold text-[rgb(var(--color-gold))] uppercase tracking-[0.18em]">
                      <Clock className="h-4 w-4" />
                      Time Slots
                    </div>
                    <div className="mt-4 grid gap-3">
                      {availableSlots.map((slot) => (
                        <button
                          key={slot.time}
                          type="button"
                          onClick={() => setSelectedTime(slot.time)}
                          disabled={slot.isBooked || slot.isUnavailable}
                          className={cn(
                            "rounded-2xl border px-4 py-3 text-left transition-all duration-200",
                            selectedTime === slot.time ? "border-primary bg-primary/10 text-white" : "border-white/10 bg-slate-950/60 text-white/80",
                            slot.isBooked || slot.isUnavailable ? "opacity-50 cursor-not-allowed" : "hover:border-primary/70 hover:bg-white/5"
                          )}
                        >
                          <div className="flex items-center justify-between gap-4">
                            <span className="font-semibold">{slot.time} UAE</span>
                            <span className="text-[13px] text-muted">{slot.isBooked ? "Booked" : slot.isUnavailable ? "Unavailable" : "Open"}</span>
                          </div>
                          <div className="text-[13px] text-muted mt-1">
                            {formatLocalTime(selectedDateTime, clientTimeZone)} {clientTimeZone.split("/").pop()} Time
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="rounded-[24px] border border-white/10 bg-slate-950/70 p-5">
                  <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                      <div className="text-sm text-muted uppercase tracking-[0.18em]">Selected appointment</div>
                      <div className="mt-2 text-lg font-bold text-white">{getDateLabel(selectedDate)}</div>
                    </div>
                    <div className="rounded-2xl bg-white/5 px-4 py-3 text-sm text-white/80">
                      {formatUaeTime(selectedDateTime)} UAE • {formatLocalTime(selectedDateTime, clientTimeZone)} {clientTimeZone.split("/").pop()}
                    </div>
                  </div>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="rounded-[24px] border border-white/10 bg-white/10 p-5">
                    <div className="flex items-center gap-2 text-sm font-semibold text-fg">
                      <Globe className="h-4 w-4 text-primary" />
                      Client Time Zone
                    </div>
                    <div className="mt-3 text-white/85">{clientTimeZone}</div>
                  </div>
                  <div className="rounded-[24px] border border-white/10 bg-white/10 p-5">
                    <div className="flex items-center gap-2 text-sm font-semibold text-fg">
                      <MapPin className="h-4 w-4 text-primary" />
                      UAE Time Zone
                    </div>
                    <div className="mt-3 text-white/85">Asia/Dubai (GMT+4)</div>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="rounded-[28px] border border-white/20 bg-white/10 glass-strong p-6 sm:p-8"
            >
              <div className="flex flex-col gap-4 mb-6">
                <div className="inline-flex items-center gap-3 rounded-full bg-primary/10 px-4 py-2 text-sm font-semibold text-primary">
                  <UserCircle className="h-4 w-4" />
                  Appointment Request
                </div>
                <div>
                  <h2 className="text-[24px] font-black tracking-tight text-fg">Reserve Your Preferred Time</h2>
                  <p className="text-muted text-sm leading-6">
                    Fill out the short form and lock in your preferred consultation time. Appointments are confirmed instantly with UAE and local time displayed clearly.
                  </p>
                </div>
              </div>

              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label className="block text-[13px] font-semibold text-muted mb-2">Full Name</label>
                    <input
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleChange}
                      required
                      placeholder="Your full name"
                      className="w-full rounded-xl border border-white/20 bg-white/10 glass px-4 py-3 text-fg placeholder:text-muted outline-none focus:border-primary/40"
                    />
                  </div>
                  <div>
                    <label className="block text-[13px] font-semibold text-muted mb-2">Email Address</label>
                    <input
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      placeholder="contact@email.com"
                      className="w-full rounded-xl border border-white/20 bg-white/10 glass px-4 py-3 text-fg placeholder:text-muted outline-none focus:border-primary/40"
                    />
                  </div>
                </div>

                <div className="grid gap-4">
                  <label className="block text-[13px] font-semibold text-muted">Country</label>
                  <input
                    name="country"
                    value={formData.country}
                    onChange={handleChange}
                    placeholder="United Arab Emirates"
                    className="w-full rounded-xl border border-white/20 bg-white/10 glass px-4 py-3 text-fg placeholder:text-muted outline-none focus:border-primary/40"
                  />
                </div>

                <InternationalPhoneInput
                  dialCode={formData.dialCode}
                  number={formData.phoneNumber}
                  onDialChange={(value) => setFormData((prev) => ({ ...prev, dialCode: value }))}
                  onNumberChange={(value) => setFormData((prev) => ({ ...prev, phoneNumber: value }))}
                  error={phoneError}
                />

                <div>
                  <label className="block text-[13px] font-semibold text-muted mb-2">Message</label>
                  <textarea
                    name="message"
                    rows={4}
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Let us know what you would like to discuss."
                    className="w-full resize-none rounded-xl border border-white/20 bg-white/10 glass px-4 py-3 text-fg placeholder:text-muted outline-none focus:border-primary/40"
                  />
                </div>

                {errorMessage ? <p className="text-sm text-rose-400">{errorMessage}</p> : null}
                {successMessage ? <p className="text-sm text-emerald-300">{successMessage}</p> : null}

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-primary px-6 py-3 text-sm font-semibold text-white shadow-[0_18px_60px_rgba(59,130,246,0.22)] transition duration-300 hover:-translate-y-0.5 hover:shadow-[0_0_0_16px_rgba(59,130,246,0.18)] hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? "Confirming..." : "Book Appointment"}
                  <ArrowRight className="h-4 w-4" />
                </button>
              </form>

              <div className="mt-8 rounded-[24px] border border-white/10 bg-white/5 p-5">
                <div className="flex items-center gap-3 text-sm font-semibold text-fg mb-4">
                  <MessageCircle className="h-4 w-4 text-primary" />
                  WhatsApp support available
                </div>
                <p className="text-sm text-muted leading-6">
                  For urgent requests, reach out via WhatsApp at <span className="text-white">+971 50 123 4567</span>. Our booking and support team is ready to assist globally.
                </p>
              </div>

              <div className="mt-8 flex items-center justify-between gap-4 rounded-[24px] border border-white/10 bg-white/10 p-5">
                <div>
                  <div className="text-[13px] uppercase tracking-[0.18em] text-muted">Office location</div>
                  <div className="mt-3 text-sm text-white/80 leading-6">
                    Sharjah Media City (Shams)
                    <br />Al Messaned, Al Bataeh
                    <br />Sharjah, United Arab Emirates
                  </div>
                </div>
                <Link
                  href="/contact-us"
                  className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-4 py-2 text-sm text-white/80 transition hover:border-primary hover:text-white"
                >
                  Contact Office
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>

              <button
                type="button"
                onClick={() => setIsAdminMode((prev) => !prev)}
                className="mt-6 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-sm text-white/80 transition hover:border-primary hover:text-white"
              >
                {isAdminMode ? <X className="h-4 w-4" /> : <ShieldCheck className="h-4 w-4" />}
                {isAdminMode ? "Exit Admin Mode" : "Admin Slot Manager"}
              </button>

              {isAdminMode ? (
                <div className="mt-6 rounded-[24px] border border-white/10 bg-slate-950/70 p-5">
                  <div className="mb-4 text-sm font-semibold text-white">Admin: Toggle slot availability</div>
                  <div className="grid gap-3">
                    {upcomingDays.slice(0, 6).map((date) => (
                      <div key={date} className="rounded-2xl border border-white/10 bg-white/5 p-4">
                        <div className="text-sm font-semibold text-white mb-3">{getDateLabel(date)}</div>
                        <div className="grid gap-2 sm:grid-cols-2">
                          {TIME_SLOTS.map((time) => {
                            const isBlocked = blockedSlots.some((slot) => slot.date === date && slot.time === time);
                            return (
                              <button
                                key={`${date}-${time}`}
                                type="button"
                                onClick={() => toggleSlotAvailability(date, time)}
                                className={cn(
                                  "rounded-2xl border px-3 py-2 text-left text-sm transition duration-200",
                                  isBlocked
                                    ? "border-rose-300 bg-rose-500/10 text-rose-200"
                                    : "border-white/10 bg-white/5 text-white/80 hover:border-primary hover:bg-white/10"
                                )}
                              >
                                <div className="flex items-center justify-between gap-3">
                                  <span>{time}</span>
                                  <span className="text-[11px] uppercase tracking-[0.2em] text-muted">
                                    {isBlocked ? "Disabled" : "Enabled"}
                                  </span>
                                </div>
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ) : null}
            </motion.div>
          </div>
        </Container>
      </Section>
    </div>
  );
}
