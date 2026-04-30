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
    url: "https://www.nairobisummiticpd.org/gcmf-dashboard",
    image: "https://www.nairobisummiticpd.org/sites/all/modules/custom/nairobi_gcmf/assets/share_cards/share.jpg",
  },
  {
    url: "https://utiq.com/",
    image: "https://utiq.com/wp-content/uploads/2023/05/utiq-logo@2x.png",
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

  const featured = dict.sites.slice(0, 3);

  return (
    <section className="py-16 sm:py-24 px-4 sm:px-6 relative z-10">
      <div className="max-w-6xl mx-auto">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
          transition={{ duration: 0.6 }}
        >
          <div className="font-mono text-xs text-accent/60 mb-4 tracking-wider">
            {'<'} work {'/>'}
          </div>
          <h2 className="text-3xl font-bold mb-2 text-foreground">
            {homeSections.workTitle}
            <span className="text-accent">.</span>
          </h2>
          <p className="text-muted mb-12 max-w-xl">
            {homeSections.workSubtitle}
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-4 md:gap-6">
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
              className="group block glass-card overflow-hidden hover:-translate-y-1 transition-all"
            >
              <div className="relative aspect-video bg-background/50">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={featuredSites[index].image}
                  alt={site.name}
                  className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity"
                  loading="lazy"
                />
              </div>
              <div className="p-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold text-sm text-foreground group-hover:text-accent transition-colors">
                    {site.name}
                  </h3>
                  <ExternalLink
                    size={14}
                    className="text-muted group-hover:text-accent transition-colors shrink-0"
                  />
                </div>
                <p className="text-xs text-muted font-mono mt-1">{site.company}</p>
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
            className="inline-flex items-center gap-2 text-accent hover:text-accent-light font-mono font-medium transition-colors"
          >
            {homeSections.workCta}
            <ArrowRight size={16} />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
