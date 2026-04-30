"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { Download } from "lucide-react";
import Link from "next/link";
import type { Dictionary } from "@/i18n/types";

function TypingText({ text, delay = 0 }: { text: string; delay?: number }) {
  const [displayed, setDisplayed] = useState("");
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => setStarted(true), delay);
    return () => clearTimeout(timeout);
  }, [delay]);

  useEffect(() => {
    if (!started) return;
    if (displayed.length >= text.length) return;
    const timeout = setTimeout(() => {
      setDisplayed(text.slice(0, displayed.length + 1));
    }, 50);
    return () => clearTimeout(timeout);
  }, [started, displayed, text]);

  return (
    <span>
      {displayed}
      {displayed.length < text.length && (
        <span className="animate-pulse text-accent">|</span>
      )}
    </span>
  );
}

export function Hero({
  dict,
  locale,
}: {
  dict: Dictionary["hero"];
  locale: string;
}) {
  return (
    <section className="relative min-h-screen flex items-center justify-center px-6">
      <div className="max-w-4xl mx-auto text-center relative z-10">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          <p className="font-mono text-sm text-accent tracking-widest mb-6">
            <TypingText text="// hello world" delay={300} />
          </p>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.2 }}
          className="mb-6"
        >
          <span className="block text-5xl md:text-7xl font-bold tracking-tight text-foreground">
            Eduardo{" "}
            <span className="text-accent">Castillo</span>
          </span>
          <span className="block text-xl md:text-2xl text-muted mt-4 font-mono">
            {dict.role}
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.5 }}
          className="text-muted max-w-2xl mx-auto mb-6 leading-relaxed"
        >
          {dict.description}
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.7 }}
          className="text-accent text-sm font-mono max-w-2xl mx-auto mb-10"
        >
          {dict.availability}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.9 }}
          className="flex items-center justify-center gap-4 flex-wrap"
        >
          <Link
            href={`/${locale}/contact`}
            className="px-6 py-3 bg-accent hover:bg-accent-light text-background font-mono font-medium rounded transition-colors"
          >
            {dict.cta}
          </Link>
          <Link
            href={`/${locale}/services`}
            className="px-6 py-3 border border-accent text-accent hover:bg-accent/10 font-mono rounded transition-colors"
          >
            {dict.ctaSecondary}
          </Link>
          <a
            href={`/cv/eduardo-castillo-cv-${locale}.pdf`}
            download
            className="px-6 py-3 border border-border text-muted hover:border-accent hover:text-accent font-mono rounded transition-colors flex items-center gap-2"
          >
            <Download size={16} />
            {dict.downloadCv}
          </a>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.5, duration: 0.6 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 font-mono text-xs text-muted/60 animate-bounce"
      >
        ↓ scroll to explore
      </motion.div>
    </section>
  );
}
