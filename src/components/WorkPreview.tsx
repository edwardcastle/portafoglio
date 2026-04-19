"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { ArrowRight, ExternalLink } from "lucide-react";
import Link from "next/link";
import type { Dictionary } from "@/i18n/types";

const featuredSites = [
  {
    url: "https://letcommunitieslead.unaids.org/",
    image: "https://letcommunitieslead.unaids.org/img/share/sm-share-generic.jpg",
  },
  {
    url: "https://utiq.com/",
    image: "https://utiq.com/wp-content/uploads/2023/05/utiq-logo@2x.png",
  },
  {
    url: "https://peacebeginswithme.un.org/en/",
    image:
      "https://images.prismic.io/peace-begins-with-me/65ce47599be9a5b998b5e239_SM1200x627_Generic.png?auto=format,compress,format&w=1280",
  },
];

export function WorkPreview({
  dict,
  homeSections,
  locale,
}: {
  dict: Dictionary["work"];
  homeSections: Dictionary["homeSections"];
  locale: string;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  // Show only first 3 sites as featured
  const featured = dict.sites.slice(0, 3);

  return (
    <section className="py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl font-bold mb-2">
            {homeSections.workTitle}
            <span className="text-accent">.</span>
          </h2>
          <p className="text-muted mb-12 max-w-xl">
            {homeSections.workSubtitle}
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          {featured.map((site, index) => (
            <motion.a
              key={site.name}
              href={featuredSites[index].url}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 30 }}
              animate={
                isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }
              }
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group block rounded-xl border border-border overflow-hidden bg-surface hover:shadow-lg hover:border-accent/30 transition-all hover:-translate-y-1"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <div className="relative aspect-video bg-surface-light">
                <img
                  src={featuredSites[index].image}
                  alt={site.name}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>
              <div className="p-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold text-sm group-hover:text-accent transition-colors">
                    {site.name}
                  </h3>
                  <ExternalLink
                    size={14}
                    className="text-muted group-hover:text-accent transition-colors shrink-0"
                  />
                </div>
                <p className="text-xs text-muted mt-1">{site.company}</p>
              </div>
            </motion.a>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="text-center mt-10"
        >
          <Link
            href={`/${locale}/work`}
            className="inline-flex items-center gap-2 text-accent hover:text-accent-light font-medium transition-colors"
          >
            {homeSections.workCta}
            <ArrowRight size={16} />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
