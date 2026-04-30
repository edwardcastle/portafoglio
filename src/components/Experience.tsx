"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { ExternalLink } from "lucide-react";
import type { Dictionary } from "@/i18n/types";

interface Job {
  company: string;
  role: string;
  type: string;
  period: string;
  location: string;
  highlights: string[];
  links?: Array<{ label: string; url: string }>;
}

function TimelineItem({ job, index }: { job: Job; index: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: index % 2 === 0 ? -40 : 40, rotateY: index % 2 === 0 ? -5 : 5 }}
      animate={
        isInView
          ? { opacity: 1, x: 0, rotateY: 0 }
          : { opacity: 0, x: index % 2 === 0 ? -40 : 40, rotateY: index % 2 === 0 ? -5 : 5 }
      }
      transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
      className="relative pl-6 sm:pl-8 pb-12 last:pb-0 border-l border-accent/20"
    >
      <div className="absolute left-0 top-1 -translate-x-1/2 w-3 h-3 rounded-full bg-accent shadow-[0_0_8px_rgba(6,182,212,0.5)]" />
      {isInView && (
        <motion.div
          initial={{ scale: 1, opacity: 0.5 }}
          animate={{ scale: 2, opacity: 0 }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeOut" }}
          className="absolute left-0 top-1 -translate-x-1/2 w-3 h-3 rounded-full bg-accent"
        />
      )}

      <div className="glass-card p-3 sm:p-5 transition-colors">
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-3">
          <div>
            <h3 className="font-semibold text-lg text-foreground">{job.company}</h3>
            <p className="text-accent text-sm font-mono">
              {job.role}{" "}
              <span className="text-muted">({job.type})</span>
            </p>
          </div>
          <div className="text-right">
            <time className="text-sm text-muted font-mono block">{job.period}</time>
            <p className="text-xs text-muted">{job.location}</p>
          </div>
        </div>

        <ul className="space-y-1.5">
          {job.highlights.map((item, i) => (
            <li key={i} className="text-sm text-muted flex items-start gap-2">
              <span className="mt-1.5 shrink-0 w-1 h-1 rounded-full bg-accent" />
              {item}
            </li>
          ))}
        </ul>

        {job.links && job.links.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-3 pt-3 border-t border-border">
            {job.links.map((link) => (
              <a
                key={link.url}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1 text-xs font-mono text-accent bg-accent/10 hover:bg-accent/20 rounded-full transition-colors"
              >
                <ExternalLink size={12} />
                {link.label}
              </a>
            ))}
          </div>
        )}
      </div>
    </motion.div>
  );
}

export function Experience({ dict }: { dict: Dictionary["experience"] }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="experience" className="py-16 sm:py-24 px-4 sm:px-6 relative z-10">
      <div className="max-w-4xl mx-auto">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
          transition={{ duration: 0.6 }}
        >
          <div className="font-mono text-xs text-accent/60 mb-4 tracking-wider">
            {'<'} experience {'/>'}
          </div>
          <h2 className="text-3xl font-bold mb-2 text-foreground">
            {dict.title}<span className="text-accent">.</span>
          </h2>
          <p className="text-muted mb-12 max-w-xl">
            {dict.subtitle}
          </p>
        </motion.div>

        <div className="relative">
          {dict.jobs.map((job, index) => (
            <TimelineItem key={job.company + job.period} job={job} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
