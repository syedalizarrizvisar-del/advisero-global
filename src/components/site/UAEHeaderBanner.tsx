"use client";

import * as React from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import { useLanguage } from "@/components/language/LanguageProvider";

export function UAEHeaderBanner() {
  const { t } = useLanguage();
  const [isVisible, setIsVisible] = React.useState(true);
  const [mounted, setMounted] = React.useState(true);

  const handleExitComplete = React.useCallback(() => {
    setMounted(false);
    try {
      document.documentElement.style.setProperty("--banner-h", "0px");
    } catch {
      // ignore
    }
  }, []);

  if (!mounted) return null;

  return (
    <AnimatePresence onExitComplete={handleExitComplete}>
      {isVisible && (
        <motion.div
          key="uae-banner"
          initial={{ height: "auto", opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-r from-blue-900 via-navy-900 to-blue-800 text-white shadow-lg pointer-events-none"
          style={{ height: "var(--banner-h, 56px)" }}
        >
          <div className="h-full container mx-auto px-4 flex items-center justify-between gap-4 pointer-events-auto">
            <div className="flex items-center gap-3 flex-1 min-w-0">
              <div className="flex-shrink-0">
                <svg
                  width="24"
                  height="18"
                  viewBox="0 0 32 24"
                  className="rounded-sm shadow-sm"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <rect width="32" height="8" fill="#FF0000" />
                  <rect y="8" width="32" height="8" fill="#FFFFFF" />
                  <rect y="16" width="32" height="8" fill="#000000" />
                  <rect x="0" y="8" width="10.67" height="8" fill="#007A3D" />
                </svg>
              </div>

              <div className="flex-1 min-w-0 hidden sm:block">
                <div className="text-sm font-semibold tracking-wide uppercase text-slate-100">
                  {t("banner.title")}
                </div>
                <div className="text-xs opacity-90 mt-0.5 text-[rgba(255,255,255,0.9)]">
                  {t("banner.subtitle")}
                </div>
                <div className="text-xs opacity-80 mt-1 leading-tight text-[rgba(255,255,255,0.78)]">
                  {t("banner.copy")}
                </div>
              </div>

              <div className="flex-1 min-w-0 sm:hidden">
                <div className="text-xs font-bold tracking-wide">
                  🇦🇪 Long Live UAE
                </div>
                <div className="text-xs opacity-90 leading-tight">
                  We condemn attacks on UAE
                </div>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setIsVisible(false)}
              className="flex-shrink-0 p-1 rounded-full hover:bg-white/10 transition-colors duration-200"
              aria-label="Close banner"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
