"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Layers, Palette, Rocket, MessagesSquare, ArrowRight } from "lucide-react";
import Link from "next/link";
import type { Dictionary } from "@/i18n/types";
import type { ElementType } from "react";

const serviceIcons: ElementType[] = [Layers, Palette, Rocket, MessagesSquare];

export function ServicesPreview({
  dict,
  homeSections,
  locale,
}: {
  dict: Dictionary["services"];
  homeSections: Dictionary["homeSections"];
  locale: string;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="py-24 px-6 bg-surface/50">
      <div className="max-w-6xl mx-auto">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl font-bold mb-2">
            {homeSections.servicesTitle}
            <span className="text-accent">.</span>
          </h2>
          <p className="text-muted mb-12 max-w-xl">
            {homeSections.servicesSubtitle}
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {dict.items.map((item, index) => {
            const Icon = serviceIcons[index];
            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 30 }}
                animate={
                  isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }
                }
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="p-6 rounded-xl bg-surface border border-border hover:border-accent/30 transition-all text-center"
              >
                <div className="p-3 rounded-lg bg-accent/10 w-fit mx-auto mb-4">
                  <Icon size={22} className="text-accent" />
                </div>
                <h3 className="font-semibold">{item.title}</h3>
              </motion.div>
            );
          })}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="text-center mt-10"
        >
          <Link
            href={`/${locale}/services`}
            className="inline-flex items-center gap-2 text-accent hover:text-accent-light font-medium transition-colors"
          >
            {homeSections.servicesCta}
            <ArrowRight size={16} />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
