"use client";

import { motion } from "framer-motion";
import { ArrowDown, Mail, Phone } from "lucide-react";
import { GithubIcon } from "./icons";
import type { Dictionary } from "@/i18n/types";

export function Hero({ dict }: { dict: Dictionary["hero"] }) {
  return (
    <section className="relative min-h-screen flex items-center justify-center px-6 overflow-hidden">
      {/* Gradient background */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-accent/10 blur-[120px]" />
        <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] rounded-full bg-purple-500/8 blur-[100px]" />
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
          className="text-5xl md:text-7xl font-bold tracking-tight mb-6"
        >
          Eduardo{" "}
          <span className="bg-gradient-to-r from-accent to-purple-400 bg-clip-text text-transparent">
            Castillo
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-xl md:text-2xl text-muted mb-4"
        >
          {dict.role}
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-muted max-w-2xl mx-auto mb-10 leading-relaxed"
        >
          {dict.description}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="flex items-center justify-center gap-4 mb-16"
        >
          <a
            href="#contact"
            className="px-6 py-3 bg-accent hover:bg-accent-light text-white rounded-lg font-medium transition-colors"
          >
            {dict.cta}
          </a>
          <a
            href="https://github.com/edwardcastle"
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-3 border border-border hover:border-muted text-foreground rounded-lg font-medium transition-colors flex items-center gap-2"
          >
            <GithubIcon size={18} />
            GitHub
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
        <a href="#about" aria-label="Scroll down">
          <ArrowDown
            size={20}
            className="text-muted animate-bounce"
          />
        </a>
      </motion.div>
    </section>
  );
}
