"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, useMotionValueEvent, useScroll } from "framer-motion";
import { cn } from "@/lib/cn";
import { useTheme } from "next-themes";
import { useLanguage } from "@/components/language/LanguageProvider";
import { ChevronDown } from "lucide-react";

const NAV_LINKS: Array<{ labelKey: string; href: string; hasDropdown?: boolean }> = [
  { labelKey: "nav.home", href: "/" },
  { labelKey: "nav.about", href: "/about-us" },
  { labelKey: "nav.services", href: "/services" },
  { labelKey: "nav.workWithUs", href: "/careers" },
  { labelKey: "nav.contact", href: "/contact-us" },
];

export function StickyNavbar() {
  const { theme, setTheme } = useTheme();
  const { lang, setLang, t } = useLanguage();
  const pathname = usePathname();
  const [langMenuOpen, setLangMenuOpen] = React.useState(false);
  const [themeReady, setThemeReady] = React.useState(false);
  const langContainerRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setThemeReady(true);
  }, []);

  const { scrollY } = useScroll();
  const [scrolled, setScrolled] = React.useState(false);

  useMotionValueEvent(scrollY, "change", (v) => {
    setScrolled(v > 14);
  });

  React.useEffect(() => {
    if (!langMenuOpen) return;
    const handlePointer = (event: MouseEvent | TouchEvent) => {
      if (langContainerRef.current && !langContainerRef.current.contains(event.target as Node)) {
        setLangMenuOpen(false);
      }
    };
    const handleKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setLangMenuOpen(false);
    };
    document.addEventListener("mousedown", handlePointer);
    document.addEventListener("touchstart", handlePointer);
    document.addEventListener("keydown", handleKey);
    return () => {
      document.removeEventListener("mousedown", handlePointer);
      document.removeEventListener("touchstart", handlePointer);
      document.removeEventListener("keydown", handleKey);
    };
  }, [langMenuOpen]);

  const toggleTheme = () => {
    const next = theme === "dark" ? "light" : "dark";
    void setTheme(next);
  };

  const toggleLanguageMenu = () => setLangMenuOpen((prev) => !prev);

  const selectLanguage = (langCode: "en" | "ae") => {
    setLang(langCode);
    setLangMenuOpen(false);
  };

  const themeLabel = themeReady ? (theme === "dark" ? t("theme.light") : t("theme.dark")) : t("theme.dark");

  return (
    <motion.header
      className="fixed left-0 right-0 z-40 top-[var(--banner-h)]"
      initial={false}
      animate={{
        backgroundColor: scrolled ? "rgba(30,41,59,0.55)" : "rgba(0,0,0,0)",
        borderColor: scrolled ? "rgba(255,255,255,0.2)" : "rgba(255,255,255,0)",
        backdropFilter: scrolled ? "blur(18px)" : "blur(0px)",
      }}
      transition={{ duration: 0.25, ease: "easeOut" }}
    >
      <div
        className={cn(
          "mx-auto max-w-7xl px-4 sm:px-6 lg:px-8",
          "h-[var(--nav-h)] flex items-center justify-between gap-3"
        )}
      >
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-2xl border border-white/20 bg-white/10 glass-strong flex items-center justify-center">
            <span className="text-[15px] font-black tracking-tight text-primary">A</span>
          </div>

          <div className="leading-tight">
            <div className="text-[14px] font-semibold tracking-wide text-fg">
              {t("nav.brandTitle")}
            </div>
            <div className="text-[12px] text-muted">{t("nav.brandSubtitle")}</div>
          </div>
        </div>

        <nav className="hidden md:flex items-center gap-1">
          {NAV_LINKS.map((l) => {
            const isActive = pathname === l.href;
            return (
              <Link
                key={l.href}
                href={l.href}
                className={cn(
                  "relative px-4 py-2 rounded-full text-[13px] font-medium transition-all duration-300 ease-out",
                  "hover:scale-105 hover:-translate-y-0.5 cursor-pointer",
                  isActive
                    ? "text-primary bg-primary/10 shadow-[0_4px_12px_rgba(var(--primary),0.15)]"
                    : "text-fg/90 hover:text-fg hover:bg-white/10 hover:shadow-[0_8px_20px_rgba(0,0,0,0.08)]"
                )}
              >
                <span className="inline-flex items-center gap-2 relative z-10">
                  {t(l.labelKey)}
                  {l.href === "/appointment" ? (
                    <span className="rounded-full bg-primary/20 px-2 py-1 text-[11px] font-semibold uppercase tracking-[0.24em] text-primary">
                      {t("nav.book")}
                    </span>
                  ) : null}
                  {l.hasDropdown ? <ChevronDown className="h-4 w-4 text-muted" /> : null}
                </span>
                {isActive && (
                  <motion.div
                    layoutId="activeNavIndicator"
                    className="absolute inset-0 rounded-full bg-primary/10 border border-primary/20"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                )}
                <div className="absolute inset-0 rounded-full opacity-0 hover:opacity-100 transition-opacity duration-300 bg-gradient-to-r from-primary/5 to-accent/5 blur-sm" />
              </Link>
            );
          })}
        </nav>

        <div ref={langContainerRef} className="flex items-center gap-2 sm:gap-3 relative">
          <button
            type="button"
            onClick={toggleLanguageMenu}
            className={cn(
              "inline-flex items-center justify-center gap-2",
              "h-11 px-3 sm:px-4 rounded-full border border-white/20 glass",
              "text-[13px] font-semibold text-fg/90 hover:bg-white/10",
              "transition-colors duration-200"
            )}
            aria-label="Select language"
            aria-expanded={langMenuOpen}
          >
            <span className="hidden sm:inline">{lang === "ae" ? t("nav.arabic") : t("nav.english")}</span>
            <span className="sm:hidden">{lang === "ae" ? "العربية" : "EN"}</span>
            <ChevronDown className="h-4 w-4 text-muted" />
          </button>

          {langMenuOpen ? (
            <div className="absolute right-0 top-full mt-2 w-44 rounded-2xl border border-white/15 bg-[color:var(--color-bg)] glass py-2 shadow-xl z-[70] pointer-events-auto">
              <button
                type="button"
                onClick={() => selectLanguage("ae")}
                className="w-full px-4 py-2 text-left text-sm text-fg/90 hover:bg-white/10"
              >
                AE — {t("nav.arabic")}
              </button>
              <button
                type="button"
                onClick={() => selectLanguage("en")}
                className="w-full px-4 py-2 text-left text-sm text-fg/90 hover:bg-white/10"
              >
                EN — {t("nav.english")}
              </button>
            </div>
          ) : null}

          <button
            type="button"
            onClick={toggleTheme}
            className={cn(
              "inline-flex items-center justify-center",
              "h-11 px-3 sm:px-4 rounded-full border border-white/20 glass",
              "text-[13px] font-semibold text-fg/90 hover:bg-white/10",
              "transition-colors duration-200"
            )}
            aria-label="Toggle theme"
          >
            {themeLabel}
          </button>
        </div>
      </div>
    </motion.header>
  );
}
