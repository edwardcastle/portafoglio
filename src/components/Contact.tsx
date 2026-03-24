"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Mail, Phone, MapPin, Send } from "lucide-react";
import { GithubIcon } from "./icons";
import type { Dictionary } from "@/i18n/types";

export function Contact({ dict }: { dict: Dictionary["contact"] }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const contactInfo = [
    {
      icon: Mail,
      label: dict.email,
      value: "sir.edwardcastle@gmail.com",
      href: "mailto:sir.edwardcastle@gmail.com",
    },
    {
      icon: Phone,
      label: dict.phone,
      value: "+39 348 3448387",
      href: "tel:+393483448387",
    },
    {
      icon: MapPin,
      label: dict.location,
      value: dict.locationValue,
      href: null as string | null,
    },
    {
      icon: GithubIcon,
      label: dict.github,
      value: "edwardcastle",
      href: "https://github.com/edwardcastle",
    },
  ];

  return (
    <section id="contact" className="py-24 px-6 bg-surface/50">
      <div className="max-w-4xl mx-auto">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl font-bold mb-2">
            {dict.title}<span className="text-accent">.</span>
          </h2>
          <p className="text-muted mb-12 max-w-xl">
            {dict.subtitle}
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="space-y-6"
          >
            {contactInfo.map((item) => {
              const content = (
                <div className="flex items-center gap-4 group">
                  <div className="p-3 rounded-lg bg-surface border border-border group-hover:border-accent/30 transition-colors">
                    <item.icon size={20} className="text-accent" />
                  </div>
                  <div>
                    <p className="text-xs text-muted uppercase tracking-wider">
                      {item.label}
                    </p>
                    <p className="font-medium group-hover:text-accent transition-colors">
                      {item.value}
                    </p>
                  </div>
                </div>
              );

              return item.href ? (
                <a
                  key={item.label}
                  href={item.href}
                  target={item.href.startsWith("http") ? "_blank" : undefined}
                  rel={
                    item.href.startsWith("http")
                      ? "noopener noreferrer"
                      : undefined
                  }
                >
                  {content}
                </a>
              ) : (
                <div key={item.label}>{content}</div>
              );
            })}
          </motion.div>

          <motion.form
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 30 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="space-y-4"
            action={`mailto:sir.edwardcastle@gmail.com`}
            method="GET"
            encType="text/plain"
          >
            <div>
              <label htmlFor="name" className="block text-sm text-muted mb-1.5">
                {dict.nameLabel}
              </label>
              <input
                type="text"
                id="name"
                name="name"
                required
                className="w-full px-4 py-3 rounded-lg bg-surface border border-border focus:border-accent focus:outline-none text-foreground placeholder:text-muted/50 transition-colors"
                placeholder={dict.namePlaceholder}
              />
            </div>
            <div>
              <label
                htmlFor="email"
                className="block text-sm text-muted mb-1.5"
              >
                {dict.emailLabel}
              </label>
              <input
                type="email"
                id="email"
                name="email"
                required
                className="w-full px-4 py-3 rounded-lg bg-surface border border-border focus:border-accent focus:outline-none text-foreground placeholder:text-muted/50 transition-colors"
                placeholder={dict.emailPlaceholder}
              />
            </div>
            <div>
              <label
                htmlFor="message"
                className="block text-sm text-muted mb-1.5"
              >
                {dict.messageLabel}
              </label>
              <textarea
                id="message"
                name="body"
                rows={4}
                required
                className="w-full px-4 py-3 rounded-lg bg-surface border border-border focus:border-accent focus:outline-none text-foreground placeholder:text-muted/50 transition-colors resize-none"
                placeholder={dict.messagePlaceholder}
              />
            </div>
            <button
              type="submit"
              className="w-full px-6 py-3 bg-accent hover:bg-accent-light text-white rounded-lg font-medium transition-colors flex items-center justify-center gap-2"
            >
              <Send size={16} />
              {dict.send}
            </button>
          </motion.form>
        </div>
      </div>
    </section>
  );
}
