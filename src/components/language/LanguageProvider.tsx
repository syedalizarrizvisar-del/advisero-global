"use client";

import * as React from "react";
import { TRANSLATIONS, type LanguageCode } from "@/lib/translations";

type LanguageContextType = {
  lang: LanguageCode;
  setLang: (lang: LanguageCode) => void;
  t: (key: string) => string;
  translation: typeof TRANSLATIONS["en"];
};

const LanguageContext = React.createContext<LanguageContextType | undefined>(undefined);
const STORAGE_KEY = "advisero-language";

function getTranslationForKey(lang: LanguageCode, key: string) {
  const path = key.split(".");
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let value: any = TRANSLATIONS[lang];

  for (const segment of path) {
    if (value && typeof value === "object" && segment in value) {
      value = value[segment];
    } else {
      return key;
    }
  }

  return typeof value === "string" ? value : key;
}

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLang] = React.useState<LanguageCode>("ae");

  React.useEffect(() => {
    const stored = window.localStorage.getItem(STORAGE_KEY) as LanguageCode | null;
    if (stored === "en" || stored === "ae") {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setLang(stored);
    }
  }, []);

  React.useEffect(() => {
    const html = document.documentElement;
    html.lang = lang === "ae" ? "ar" : "en";
    html.dir = lang === "ae" ? "rtl" : "ltr";
    window.localStorage.setItem(STORAGE_KEY, lang);
  }, [lang]);

  const t = React.useCallback((key: string) => getTranslationForKey(lang, key), [lang]);

  const value = React.useMemo(
    () => ({ lang, setLang, t, translation: TRANSLATIONS[lang] as typeof TRANSLATIONS[LanguageCode] }),
    [lang, t]
  );

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage() {
  const context = React.useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}
