"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import {
  Code2,
  Palette,
  Gauge,
  Server,
  Wrench,
} from "lucide-react";
import type { Dictionary } from "@/i18n/types";
import type { ElementType } from "react";

interface SkillCategory {
  icon: ElementType;
  title: string;
  skills: string[];
}

function SkillCard({
  category,
  index,
}: {
  category: SkillCategory;
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
      className="p-6 rounded-xl bg-surface border border-border hover:border-accent/30 transition-colors"
    >
      <category.icon size={22} className="text-accent mb-4" />
      <h3 className="font-semibold mb-4">{category.title}</h3>
      <div className="flex flex-wrap gap-2">
        {category.skills.map((skill) => (
          <span
            key={skill}
            className="px-3 py-1 text-xs rounded-full bg-surface-light text-muted border border-border hover:text-foreground hover:border-accent/40 transition-colors"
          >
            {skill}
          </span>
        ))}
      </div>
    </motion.div>
  );
}

const skillsData: { key: keyof Dictionary["skills"]; icon: ElementType; skills: string[] }[] = [
  {
    key: "frontend",
    icon: Code2,
    skills: [
      "HTML5", "CSS3", "Sass", "Tailwind", "Vuetify", "Quasar",
      "JavaScript (ES6+)", "TypeScript",
      "Vue.js", "Nuxt.js", "Pinia", "Vuex",
      "Axios", "Vitest", "Jest", "PrimeVue",
    ],
  },
  {
    key: "designUi",
    icon: Palette,
    skills: [
      "Responsive Design", "Accessibility (WCAG)",
      "Figma", "Zeplin",
      "Canvas Animations", "SVG Animations", "SEO",
    ],
  },
  {
    key: "performanceTools",
    icon: Gauge,
    skills: ["Webpack", "Vite", "PWA", "Cache Strategies", "Git", "Docker", "Linux"],
  },
  {
    key: "backend",
    icon: Server,
    skills: ["Python", "Django", "Go", "Nuxt.js", "GraphQL", "REST API"],
  },
  {
    key: "otherTools",
    icon: Wrench,
    skills: ["Firebase", "Trello", "Postman", "Insomnia", "VS Code", "IntelliJ IDEA"],
  },
];

export function Skills({ dict }: { dict: Dictionary["skills"] }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const categories: SkillCategory[] = skillsData.map((item) => ({
    icon: item.icon,
    title: dict[item.key] as string,
    skills: item.skills,
  }));

  return (
    <section id="skills" className="py-24 px-6 bg-surface/50">
      <div className="max-w-6xl mx-auto">
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

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((cat, index) => (
            <SkillCard key={cat.title} category={cat} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
