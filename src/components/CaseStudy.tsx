"use client";

import { motion } from "framer-motion";
import { ArrowLeft, ExternalLink, CheckCircle2 } from "lucide-react";
import Link from "next/link";
import type { Dictionary } from "@/i18n/types";

export function CaseStudy({
  dict,
  project,
  locale,
  liveUrl,
  ogImage,
}: {
  dict: Dictionary["caseStudy"];
  project: "unaids";
  locale: string;
  liveUrl: string;
  ogImage: string;
}) {
  const data = dict[project];

  return (
    <section className="py-24 px-6 pt-24 sm:pt-32">
      <div className="max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Link
            href={`/${locale}/work`}
            className="inline-flex items-center gap-2 text-sm text-muted hover:text-accent transition-colors mb-8"
          >
            <ArrowLeft size={16} />
            {dict.backToWork}
          </Link>

          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-6">
            {data.title}
            <span className="text-accent">.</span>
          </h1>

          {/* Meta row */}
          <div className="flex flex-wrap gap-3 sm:gap-6 text-sm text-muted mb-8 pb-8 border-b border-border">
            <div>
              <span className="text-xs uppercase tracking-wider block mb-1">
                {dict.client}
              </span>
              <span className="text-foreground font-medium">{data.client}</span>
            </div>
            <div>
              <span className="text-xs uppercase tracking-wider block mb-1">
                {dict.year}
              </span>
              <span className="text-foreground font-medium">{data.year}</span>
            </div>
            <div>
              <span className="text-xs uppercase tracking-wider block mb-1">
                {dict.role}
              </span>
              <span className="text-foreground font-medium">{data.role}</span>
            </div>
            <div className="ml-auto">
              <a
                href={liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 bg-accent hover:bg-accent-light text-white text-sm rounded-lg transition-colors"
              >
                <ExternalLink size={14} />
                {dict.liveLabel}
              </a>
            </div>
          </div>
        </motion.div>

        {/* Hero image */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="rounded-xl overflow-hidden border border-border mb-12"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={ogImage}
            alt={data.title}
            className="w-full aspect-video object-cover"
            loading="lazy"
          />
        </motion.div>

        {/* Content sections */}
        <div className="space-y-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h2 className="text-xl font-semibold mb-3">
              {dict.challengeTitle}
            </h2>
            <p className="text-muted leading-relaxed">{data.challenge}</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <h2 className="text-xl font-semibold mb-3">
              {dict.approachTitle}
            </h2>
            <p className="text-muted leading-relaxed">{data.approach}</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.35 }}
          >
            <h2 className="text-xl font-semibold mb-3">{dict.stackTitle}</h2>
            <div className="flex flex-wrap gap-2">
              {data.stack.split(", ").map((tech) => (
                <span
                  key={tech}
                  className="px-3 py-1 text-xs font-mono rounded-full bg-accent/10 text-accent border border-accent/20"
                >
                  {tech}
                </span>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <h2 className="text-xl font-semibold mb-3">
              {dict.outcomeTitle}
            </h2>
            <p className="text-muted leading-relaxed">{data.outcome}</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.45 }}
          >
            <h2 className="text-xl font-semibold mb-3">
              {dict.contributionsTitle}
            </h2>
            <ul className="space-y-3">
              {data.contributions.map((c, i) => (
                <li
                  key={i}
                  className="flex items-start gap-3 text-muted"
                >
                  <CheckCircle2
                    size={16}
                    className="text-accent mt-0.5 shrink-0"
                  />
                  <span className="leading-relaxed">{c}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
