"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { ExternalLink } from "lucide-react";
import { GithubIcon } from "./icons";
import type { Dictionary } from "@/i18n/types";

const projectsData = [
  {
    tech: ["TypeScript", "Real-time", "WebSocket"],
    github: "https://github.com/edwardcastle/chat-for-team",
  },
  {
    tech: ["TypeScript", "Twilio", "WhatsApp API"],
    github: "https://github.com/edwardcastle/chat-whatsapp",
  },
  {
    tech: ["Vue.js", "Web Scraping", "Data"],
    github: "https://github.com/edwardcastle/festival-concert-scrapper",
  },
  {
    tech: ["Python", "Scraping", "Google Maps"],
    github: "https://github.com/edwardcastle/google-map-scrapper",
  },
  {
    tech: ["TypeScript", "CMS", "Web App"],
    github: "https://github.com/edwardcastle/cubita-producciones",
  },
  {
    tech: ["JavaScript", "Social Media", "REST API"],
    github: "https://github.com/edwardcastle/twitter-clone",
  },
];

function ProjectCard({
  name,
  description,
  tech,
  github,
  index,
}: {
  name: string;
  description: string;
  tech: string[];
  github: string;
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
      className="group p-6 rounded-xl bg-surface border border-border hover:border-accent/30 transition-all hover:-translate-y-1"
    >
      <div className="flex items-start justify-between mb-4">
        <div className="p-2 rounded-lg bg-accent/10">
          <GithubIcon size={20} className="text-accent" />
        </div>
        <a
          href={github}
          target="_blank"
          rel="noopener noreferrer"
          className="text-muted hover:text-accent transition-colors"
          aria-label={`View ${name} on GitHub`}
        >
          <ExternalLink size={18} />
        </a>
      </div>

      <h3 className="font-semibold mb-2 group-hover:text-accent transition-colors">
        {name}
      </h3>
      <p className="text-sm text-muted mb-4 leading-relaxed">
        {description}
      </p>

      <div className="flex flex-wrap gap-2">
        {tech.map((t) => (
          <span
            key={t}
            className="px-2 py-0.5 text-xs font-mono text-accent bg-accent/10 rounded"
          >
            {t}
          </span>
        ))}
      </div>
    </motion.div>
  );
}

export function Projects({ dict }: { dict: Dictionary["projects"] }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="projects" className="py-24 px-6">
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
          {dict.items.map((project, index) => (
            <ProjectCard
              key={project.name}
              name={project.name}
              description={project.description}
              tech={projectsData[index].tech}
              github={projectsData[index].github}
              index={index}
            />
          ))}
        </div>

        <div className="text-center mt-12">
          <a
            href="https://github.com/edwardcastle"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 border border-border hover:border-accent text-muted hover:text-foreground rounded-lg transition-colors"
          >
            <GithubIcon size={18} />
            {dict.viewAll}
          </a>
        </div>
      </div>
    </section>
  );
}
