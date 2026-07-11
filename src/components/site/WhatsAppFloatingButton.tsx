"use client";

import * as React from "react";
import { MessageCircle } from "lucide-react";
import Link from "next/link";

const DEFAULT_PHONE_E164 = "+971501234567"; // Placeholder WhatsApp number; easy to replace later
const DEFAULT_PREFILL =
  "Hello Advisero Global LLC — I’d like to book an appointment. Please share available slots.";

function toWhatsAppUrl(phoneE164: string, message: string) {
  const encoded = encodeURIComponent(message);
  const cleaned = phoneE164.replace(/\s+/g, "");
  return `https://wa.me/${cleaned.replace("+", "")}?text=${encoded}`;
}

export function WhatsAppFloatingButton() {
  const phone = DEFAULT_PHONE_E164;
  const message = DEFAULT_PREFILL;

  return (
    <Link
      href={toWhatsAppUrl(phone, message)}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat on WhatsApp"
      className="fixed z-[60] left-4 bottom-4"
    >
      <span className="relative inline-flex items-center justify-center rounded-full border border-white/15 glass-strong h-14 w-14 shadow-[0_18px_50px_rgba(0,0,0,0.35)] transition-transform duration-200 hover:-translate-y-0.5">
        <span className="absolute inset-0 rounded-full bg-[rgba(212,175,55,0.14)] opacity-0 transition-opacity duration-200" />
        <MessageCircle className="relative h-6 w-6 text-[rgb(var(--color-gold))]" />
      </span>
    </Link>
  );
}
