"use client";

import Link from "next/link";
import { useLanguage } from "@/components/language/LanguageProvider";

export function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="border-t border-white/10 bg-[rgba(4,11,32,0.94)] text-white/80">
      <div className="container mx-auto px-4 py-12">
        <div className="grid gap-10 lg:grid-cols-3">
          <div className="space-y-4">
            <div className="text-[15px] font-semibold uppercase tracking-[0.22em] text-white/80">
              {t("footer.companyName")}
            </div>
            <p className="max-w-sm text-sm text-white/70 leading-7">
              {t("footer.companyCopy")}
            </p>
          </div>

          <div className="space-y-4">
            <div className="text-sm font-semibold uppercase tracking-[0.18em] text-white/80">
              {t("footer.office")}
            </div>
            <div className="text-sm leading-6 text-white/60">
              {t("footer.addressLine1")}
              <br />
              {t("footer.addressLine2")}
              <br />
              {t("footer.addressLine3")}
              <br />
              {t("footer.addressLine4")}
              <br />
              {t("footer.addressLine5")}
            </div>
            <div className="text-sm leading-6 text-white/60">
              <div>
                {t("footer.phoneLabel")} {t("footer.phoneNumber")}
              </div>
              <div>
                {t("footer.emailLabel")} {t("footer.emailAddress")}
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="text-sm font-semibold uppercase tracking-[0.18em] text-white/80">
              {t("footer.explore")}
            </div>
            <div className="grid gap-2 text-sm text-white/60">
              <Link href="/about-us" className="hover:text-white transition-colors duration-200">
                {t("footer.about")}
              </Link>
              <Link href="/services" className="hover:text-white transition-colors duration-200">
                {t("footer.services")}
              </Link>
              <Link href="/careers" className="hover:text-white transition-colors duration-200">
                {t("footer.workWithUs")}
              </Link>
              <Link href="/contact-us" className="hover:text-white transition-colors duration-200">
                {t("footer.contact")}
              </Link>
              <Link href="/appointment" className="hover:text-white transition-colors duration-200">
                {t("footer.book")}
              </Link>
            </div>
          </div>
        </div>

        <div className="mt-10 border-t border-white/10 pt-6 text-center text-[13px] text-white/50">
          © {new Date().getFullYear()} {t("footer.companyName")}. {t("footer.rights")}
        </div>
      </div>
    </footer>
  );
}
