"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { MapPin, Briefcase, GraduationCap, Languages } from "lucide-react";
import type { Dictionary } from "@/i18n/types";

function AnimatedSection({ children }: { children: React.ReactNode }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
      transition={{ duration: 0.6 }}
    >
      {children}
    </motion.div>
  );
}

export function About({ dict }: { dict: Dictionary["about"] }) {
  const highlights = [
    {
      icon: MapPin,
      title: dict.locationTitle,
      value: dict.locationValue,
    },
    {
      icon: Briefcase,
      title: dict.experienceTitle,
      value: dict.experienceValue,
    },
    {
      icon: GraduationCap,
      title: dict.educationTitle,
      value: dict.educationValue,
    },
    {
      icon: Languages,
      title: dict.languagesTitle,
      value: dict.languagesValue,
    },
  ];

  return (
    <section id="about" className="py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <AnimatedSection>
          <h2 className="text-3xl font-bold mb-2">
            {dict.title}<span className="text-accent">.</span>
          </h2>
          <p className="text-muted mb-12 max-w-xl">
            {dict.subtitle}
          </p>
        </AnimatedSection>

        <div className="grid md:grid-cols-2 gap-12">
          <AnimatedSection>
            <div className="space-y-4 text-muted leading-relaxed">
              <p>
                {dict.p1Before}
                <span className="text-foreground font-medium">{dict.p1Emphasis}</span>
                {dict.p1After}
              </p>
              <p>
                {dict.p2Before}
                <span className="text-foreground font-medium">{dict.p2Emphasis}</span>
                {dict.p2After}
              </p>
              <p>
                {dict.p3Before}
                <span className="text-foreground font-medium">{dict.p3Emphasis}</span>
                {dict.p3After}
              </p>
            </div>
          </AnimatedSection>

          <AnimatedSection>
            <div className="grid grid-cols-2 gap-4">
              {highlights.map((item) => (
                <div
                  key={item.title}
                  className="p-5 rounded-xl bg-surface border border-border hover:border-accent/30 transition-colors"
                >
                  <item.icon size={20} className="text-accent mb-3" />
                  <p className="text-xs text-muted uppercase tracking-wider mb-1">
                    {item.title}
                  </p>
                  <p className="font-medium">{item.value}</p>
                </div>
              ))}
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
}
