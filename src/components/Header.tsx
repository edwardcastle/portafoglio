"use client";

import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { LanguageSwitcher } from "./LanguageSwitcher";
import type { Dictionary } from "@/i18n/types";
import type { Locale } from "@/i18n/config";

export function Header({
  dict,
  locale,
}: {
  dict: Dictionary["header"];
  locale: Locale;
}) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  const navLinks = [
    { href: `/${locale}`, label: dict.home, method: "home" },
    { href: `/${locale}/work`, label: dict.work, method: "work" },
    { href: `/${locale}/services`, label: dict.services, method: "services" },
    { href: `/${locale}/contact`, label: dict.contact, method: "contact" },
  ];

  function isActive(href: string) {
    if (href === `/${locale}`) return pathname === `/${locale}`;
    return pathname.startsWith(href);
  }

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-glass backdrop-blur-xl border-b border-border"
          : "bg-transparent"
      }`}
    >
      <nav className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        <Link
          href={`/${locale}`}
          className="font-mono text-lg font-bold tracking-tight text-accent hover:text-accent-light transition-colors"
        >
          EC<span className="text-muted">.</span>
        </Link>

        <div className="hidden md:flex items-center gap-8">
          <ul className="flex items-center gap-6">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={`font-mono text-sm transition-colors ${
                    isActive(link.href)
                      ? "text-accent"
                      : "text-muted hover:text-foreground"
                  }`}
                >
                  .{link.method}()
                </Link>
              </li>
            ))}
          </ul>
          <LanguageSwitcher locale={locale} />
        </div>

        <button
          className="md:hidden text-foreground"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-glass backdrop-blur-xl border-b border-border overflow-hidden"
          >
            <ul className="px-4 sm:px-6 py-4 space-y-4">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className={`block font-mono transition-colors ${
                      isActive(link.href)
                        ? "text-accent"
                        : "text-muted hover:text-foreground"
                    }`}
                    onClick={() => setMobileOpen(false)}
                  >
                    .{link.method}()
                  </Link>
                </li>
              ))}
              <li>
                <LanguageSwitcher locale={locale} />
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
