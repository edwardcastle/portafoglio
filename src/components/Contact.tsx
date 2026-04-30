"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { Mail, Phone, MapPin, Send, CheckCircle2, AlertCircle } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "./icons";
import type { Dictionary } from "@/i18n/types";

export function Contact({ dict }: { dict: Dictionary["contact"] }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");

  const contactInfo = [
    { icon: Mail, label: dict.email, value: "sir.edwardcastle@gmail.com", href: "mailto:sir.edwardcastle@gmail.com" },
    { icon: Phone, label: dict.phone, value: "+39 348 3448387", href: "tel:+393483448387" },
    { icon: MapPin, label: dict.location, value: dict.locationValue, href: null as string | null },
    { icon: GithubIcon, label: dict.github, value: "edwardcastle", href: "https://github.com/edwardcastle" },
    { icon: LinkedinIcon, label: dict.linkedin, value: "eduardo-castillo-dev", href: "https://www.linkedin.com/in/eduardo-castillo-dev" },
  ];

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");
    const form = e.currentTarget;
    const formData = new FormData(form);
    const res = await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: formData.get("name"),
        email: formData.get("email"),
        message: formData.get("message"),
      }),
    });
    if (res.ok) { setStatus("success"); form.reset(); }
    else { setStatus("error"); }
  }

  return (
    <section id="contact" className="py-16 sm:py-24 px-4 sm:px-6 relative z-10">
      <div className="max-w-4xl mx-auto">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
          transition={{ duration: 0.6 }}
        >
          <div className="font-mono text-xs text-accent/60 mb-4 tracking-wider text-center">
            {'<'} contact {'/>'}
          </div>
          <h2 className="text-3xl font-bold mb-2 text-center text-foreground">
            {dict.title}<span className="text-accent">.</span>
          </h2>
          <p className="text-muted mb-12 max-w-xl text-center mx-auto">
            {dict.subtitle}
          </p>
        </motion.div>

        <div className="flex flex-col items-center gap-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex flex-wrap justify-center gap-3 sm:gap-6"
          >
            {contactInfo.map((item) => {
              const content = (
                <div className="flex items-center gap-3 sm:gap-4 group">
                  <div className="p-3 rounded-lg bg-accent/5 border border-border group-hover:border-accent/30 transition-colors">
                    <item.icon size={20} className="text-accent" />
                  </div>
                  <div>
                    <p className="text-xs text-muted uppercase tracking-wider font-mono">
                      {item.label}
                    </p>
                    <p className="font-medium text-foreground group-hover:text-accent transition-colors">
                      {item.value}
                    </p>
                  </div>
                </div>
              );
              return item.href ? (
                <a key={item.label} href={item.href} target={item.href.startsWith("http") ? "_blank" : undefined} rel={item.href.startsWith("http") ? "noopener noreferrer" : undefined}>
                  {content}
                </a>
              ) : (
                <div key={item.label}>{content}</div>
              );
            })}
          </motion.div>

          <motion.form
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="space-y-4 w-full max-w-lg"
            onSubmit={handleSubmit}
          >
            <div>
              <label htmlFor="name" className="block text-sm text-muted font-mono mb-1.5">{dict.nameLabel}</label>
              <input type="text" id="name" name="name" required className="w-full px-4 py-3 rounded-lg bg-background/50 border border-border focus:border-accent focus:shadow-[0_0_8px_rgba(6,182,212,0.2)] focus:outline-none text-foreground placeholder:text-muted/50 transition-all" placeholder={dict.namePlaceholder} />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm text-muted font-mono mb-1.5">{dict.emailLabel}</label>
              <input type="email" id="email" name="email" required className="w-full px-4 py-3 rounded-lg bg-background/50 border border-border focus:border-accent focus:shadow-[0_0_8px_rgba(6,182,212,0.2)] focus:outline-none text-foreground placeholder:text-muted/50 transition-all" placeholder={dict.emailPlaceholder} />
            </div>
            <div>
              <label htmlFor="message" className="block text-sm text-muted font-mono mb-1.5">{dict.messageLabel}</label>
              <textarea id="message" name="message" rows={4} required className="w-full px-4 py-3 rounded-lg bg-background/50 border border-border focus:border-accent focus:shadow-[0_0_8px_rgba(6,182,212,0.2)] focus:outline-none text-foreground placeholder:text-muted/50 transition-all resize-none" placeholder={dict.messagePlaceholder} />
            </div>
            <button type="submit" disabled={status === "sending"} className="w-full px-6 py-3 bg-accent hover:bg-accent-light disabled:opacity-60 disabled:cursor-not-allowed text-background rounded-lg font-mono font-medium transition-colors flex items-center justify-center gap-2">
              <Send size={16} />
              {status === "sending" ? dict.sending : dict.send}
            </button>
            {status === "success" && (
              <p className="flex items-center gap-2 text-sm text-accent">
                <CheckCircle2 size={16} /> {dict.success}
              </p>
            )}
            {status === "error" && (
              <p className="flex items-center gap-2 text-sm text-red-400">
                <AlertCircle size={16} /> {dict.error}
              </p>
            )}
          </motion.form>
        </div>
      </div>
    </section>
  );
}
