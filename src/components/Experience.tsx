"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import type { Dictionary } from "@/i18n/types";

interface Job {
  company: string;
  role: string;
  type: string;
  period: string;
  location: string;
  highlights: string[];
}

function TimelineItem({ job, index }: { job: Job; index: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
      animate={
        isInView
          ? { opacity: 1, x: 0 }
          : { opacity: 0, x: index % 2 === 0 ? -30 : 30 }
      }
      transition={{ duration: 0.5, delay: 0.1 }}
      className="relative pl-8 pb-12 last:pb-0 border-l border-border"
    >
      {/* Timeline dot */}
      <div className="absolute left-0 top-1 -translate-x-1/2 w-3 h-3 rounded-full bg-accent border-2 border-background" />

      <div className="p-5 rounded-xl bg-surface border border-border hover:border-accent/30 transition-colors">
        <div className="flex flex-wrap items-start justify-between gap-2 mb-3">
          <div>
            <h3 className="font-semibold text-lg">{job.company}</h3>
            <p className="text-accent text-sm">
              {job.role}{" "}
              <span className="text-muted">({job.type})</span>
            </p>
          </div>
          <div className="text-right">
            <p className="text-sm text-muted">{job.period}</p>
            <p className="text-xs text-muted">{job.location}</p>
          </div>
        </div>

        <ul className="space-y-1.5">
          {job.highlights.map((item, i) => (
            <li key={i} className="text-sm text-muted flex items-start gap-2">
              <span className="text-accent mt-1.5 shrink-0 w-1 h-1 rounded-full bg-accent" />
              {item}
            </li>
          ))}
        </ul>
      </div>
    </motion.div>
  );
}

export function Experience({ dict }: { dict: Dictionary["experience"] }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="experience" className="py-24 px-6">
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

        <div className="relative">
          {dict.jobs.map((job, index) => (
            <TimelineItem key={job.company + job.period} job={job} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
