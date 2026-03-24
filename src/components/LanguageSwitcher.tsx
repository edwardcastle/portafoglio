"use client";

import { useState, useRef, useEffect } from "react";
import { Globe } from "lucide-react";
import { locales, type Locale } from "@/i18n/config";

const localeLabels: Record<Locale, string> = {
  en: "English",
  it: "Italiano",
  es: "Español",
};

export function LanguageSwitcher({ locale }: { locale: Locale }) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  function switchLocale(newLocale: Locale) {
    const currentPath = window.location.pathname;
    const segments = currentPath.split("/");
    segments[1] = newLocale;
    window.location.href = segments.join("/") || `/${newLocale}`;
  }

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-1.5 text-sm text-muted hover:text-foreground transition-colors"
        aria-label="Change language"
      >
        <Globe size={16} />
        <span className="uppercase">{locale}</span>
      </button>

      {open && (
        <div className="absolute right-0 top-full mt-2 bg-surface border border-border rounded-lg py-1 min-w-[140px] shadow-lg z-50">
          {locales.map((l) => (
            <button
              key={l}
              onClick={() => {
                switchLocale(l);
                setOpen(false);
              }}
              className={`w-full text-left px-4 py-2 text-sm transition-colors ${
                l === locale
                  ? "text-accent"
                  : "text-muted hover:text-foreground hover:bg-surface-light"
              }`}
            >
              {localeLabels[l]}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
