"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

export function BookingStickyCTA() {
  return (
    <motion.div
      initial={{ opacity: 0, x: 40 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.45, ease: "easeOut" }}
      className="pointer-events-auto fixed right-4 bottom-4 z-50 hidden lg:flex"
    >
      <Link
        href="/appointment"
        className="group inline-flex max-w-[220px] items-center gap-2 rounded-full bg-gradient-to-r from-primary to-blue-600 px-3 py-2 text-white shadow-[0_18px_45px_rgba(59,130,246,0.24)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_0_0_14px_rgba(59,130,246,0.22)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50"
        aria-label="Book appointment"
      >
        <span className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-white shadow-[0_8px_24px_rgba(0,0,0,0.18)] transition duration-300 group-hover:scale-105">
          <ArrowRight className="h-4 w-4" />
        </span>
        <div className="flex flex-col text-left">
          <span className="text-xs font-semibold uppercase tracking-[0.24em] text-white/90">
            Book Appointment
          </span>
          <span className="text-[11px] text-white/80">UAE scheduling</span>
        </div>
      </Link>
    </motion.div>
  );
}
