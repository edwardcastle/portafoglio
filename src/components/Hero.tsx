"use client";

import { motion } from "framer-motion";
import { ArrowDown, Mail, Phone, Download } from "lucide-react";
import Link from "next/link";
import type { Dictionary } from "@/i18n/types";

export function Hero({
  dict,
  locale,
}: {
  dict: Dictionary["hero"];
  locale: string;
}) {
  return (
    <section className="relative min-h-screen flex items-center justify-center px-6 overflow-hidden">
      {/* Gradient background */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-accent/5 blur-[120px]" />
        <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] rounded-full bg-purple-500/5 blur-[100px]" />
      </div>

      <div className="max-w-4xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <p className="text-accent font-mono text-sm mb-4 tracking-wider">
            {dict.greeting}
          </p>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mb-6"
        >
          <span className="block text-5xl md:text-7xl font-bold tracking-tight">
            Eduardo{" "}
            <span className="bg-gradient-to-r from-accent to-purple-400 bg-clip-text text-transparent">
              Castillo
            </span>
          </span>
          <span className="block text-xl md:text-2xl text-muted mt-4">
            {dict.role}
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-muted max-w-2xl mx-auto mb-10 leading-relaxed"
        >
          {dict.description}
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.35 }}
          className="text-accent text-sm font-medium max-w-2xl mx-auto mb-10"
        >
          {dict.availability}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="flex items-center justify-center gap-4 mb-16"
        >
          <Link
            href={`/${locale}/contact`}
            className="px-6 py-3 bg-accent hover:bg-accent-light text-white rounded-lg font-medium transition-colors"
          >
            {dict.cta}
          </Link>
          <Link
            href={`/${locale}/services`}
            className="px-6 py-3 border border-border hover:border-accent/40 text-foreground rounded-lg font-medium transition-colors flex items-center gap-2"
          >
            {dict.ctaSecondary}
          </Link>
          {/* TODO: Add CV PDF at /public/cv/eduardo-castillo-cv.pdf */}
          <a
            href="/cv/eduardo-castillo-cv.pdf"
            download
            className="px-6 py-3 border border-border hover:border-accent/40 text-foreground rounded-lg font-medium transition-colors flex items-center gap-2"
          >
            <Download size={16} />
            {dict.downloadCv}
          </a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="flex items-center justify-center gap-6 text-sm text-muted"
        >
          <a
            href="mailto:sir.edwardcastle@gmail.com"
            className="flex items-center gap-2 hover:text-foreground transition-colors"
          >
            <Mail size={14} />
            sir.edwardcastle@gmail.com
          </a>
          <span className="hidden sm:inline text-border">|</span>
          <a
            href="tel:+393483448387"
            className="hidden sm:flex items-center gap-2 hover:text-foreground transition-colors"
          >
            <Phone size={14} />
            +39 348 3448387
          </a>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.6 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <ArrowDown
          size={20}
          className="text-muted animate-bounce"
        />
      </motion.div>
    </section>
  );
}
