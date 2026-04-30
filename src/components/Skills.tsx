"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Zap, Code2, BookOpen, Wrench } from "lucide-react";
import type { Dictionary } from "@/i18n/types";
import type { ElementType } from "react";
import { GlowOnScroll } from "./SmoothScroll";

interface SkillTier {
  icon: ElementType;
  titleKey: keyof Dictionary["skills"];
  label?: keyof Dictionary["skills"];
  skills: string[];
}

const tiers: SkillTier[] = [
  {
    icon: Zap,
    titleKey: "coreStack",
    label: "coreStackLabel",
    skills: ["Vue 3", "Nuxt 3", "TypeScript", "Tailwind CSS", "PrimeVue", "Pinia", "REST APIs", "Git"],
  },
  {
    icon: Code2,
    titleKey: "proficient",
    skills: ["React", "Next.js", "JavaScript (ES6+)", "Sass", "Vitest", "Jest", "Vite", "Webpack", "Docker", "PWA", "SEO", "Figma"],
  },
  {
    icon: BookOpen,
    titleKey: "workingKnowledge",
    skills: ["Go", "Python", "Django", "GraphQL", "Solana/Web3", "Firebase", "Ionic/Capacitor", "Canvas/SVG animations"],
  },
  {
    icon: Wrench,
    titleKey: "tools",
    skills: ["VS Code", "IntelliJ IDEA", "Postman", "Insomnia", "Trello", "Linux"],
  },
];

function TierCard({
  tier,
  dict,
  index,
}: {
  tier: SkillTier;
  dict: Dictionary["skills"];
  index: number;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <GlowOnScroll>
        <div className="glass-card p-4 sm:p-6 transition-colors">
          <div className="font-mono text-xs text-accent/50 mb-3">
            {String(index + 1).padStart(2, "0")} //
          </div>
          <tier.icon size={22} className="text-accent mb-4" />
          <h3 className="font-semibold mb-1 text-foreground">
            {dict[tier.titleKey] as string}
          </h3>
          {tier.label && (
            <p className="text-xs text-muted font-mono mb-4">
              {dict[tier.label] as string}
            </p>
          )}
          {!tier.label && <div className="mb-3" />}
          <div className="flex flex-wrap gap-2">
            {tier.skills.map((skill) => (
              <span
                key={skill}
                className="px-3 py-1 text-xs rounded-full bg-accent/5 text-muted border border-border hover:text-accent hover:border-accent/40 transition-colors font-mono"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      </GlowOnScroll>
    </motion.div>
  );
}

export function Skills({ dict }: { dict: Dictionary["skills"] }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="skills" className="py-16 sm:py-24 px-4 sm:px-6 relative z-10">
      <div className="max-w-6xl mx-auto">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
          transition={{ duration: 0.6 }}
        >
          <div className="font-mono text-xs text-accent/60 mb-4 tracking-wider">
            {'<'} skills {'/>'}
          </div>
          <h2 className="text-3xl font-bold mb-2 text-foreground">
            {dict.title}
            <span className="text-accent">.</span>
          </h2>
          <p className="text-muted mb-12 max-w-xl">{dict.subtitle}</p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-4 md:gap-6">
          {tiers.map((tier, index) => (
            <TierCard key={tier.titleKey} tier={tier} dict={dict} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
