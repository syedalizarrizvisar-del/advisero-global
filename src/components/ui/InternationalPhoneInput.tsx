"use client";

import * as React from "react";
import { ChevronDown } from "lucide-react";

const COUNTRIES = [
  { code: "AE", label: "United Arab Emirates", dialCode: "+971", flag: "🇦🇪" },
  { code: "US", label: "United States", dialCode: "+1", flag: "🇺🇸" },
  { code: "GB", label: "United Kingdom", dialCode: "+44", flag: "🇬🇧" },
  { code: "IN", label: "India", dialCode: "+91", flag: "🇮🇳" },
  { code: "SA", label: "Saudi Arabia", dialCode: "+966", flag: "🇸🇦" },
  { code: "CA", label: "Canada", dialCode: "+1", flag: "🇨🇦" },
  { code: "FR", label: "France", dialCode: "+33", flag: "🇫🇷" },
  { code: "DE", label: "Germany", dialCode: "+49", flag: "🇩🇪" },
  { code: "AU", label: "Australia", dialCode: "+61", flag: "🇦🇺" },
];

type InternationalPhoneInputProps = {
  dialCode: string;
  number: string;
  onDialChange: (value: string) => void;
  onNumberChange: (value: string) => void;
  error?: string;
};

export function InternationalPhoneInput({
  dialCode,
  number,
  onDialChange,
  onNumberChange,
  error,
}: InternationalPhoneInputProps) {
  return (
    <div className="space-y-2">
      <label className="block text-[13px] font-semibold text-muted tracking-wide">
        Phone Number
      </label>
      <div className="grid gap-3 sm:grid-cols-[auto_1fr]">
        <div className="relative">
          <select
            value={dialCode}
            onChange={(event) => onDialChange(event.target.value)}
            className="w-full rounded-xl border border-white/20 bg-white/10 glass px-4 py-3 pr-10 text-fg outline-none focus:border-primary/40"
          >
            {COUNTRIES.map((country) => (
              <option key={country.code} value={country.dialCode}>
                {country.code} {country.label} ({country.dialCode})
              </option>
            ))}
          </select>
          <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" />
        </div>

        <div>
          <input
            type="tel"
            inputMode="tel"
            value={number}
            onChange={(event) => onNumberChange(event.target.value.replace(/[^0-9\s\-]/g, ""))}
            placeholder="501 234 567"
            className="w-full rounded-xl border border-white/20 bg-white/10 glass px-4 py-3 text-fg placeholder:text-muted outline-none focus:border-primary/40"
          />
        </div>
      </div>
      {error ? <p className="text-xs text-rose-400">{error}</p> : null}
    </div>
  );
}
