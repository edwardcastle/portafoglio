"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Layers, Palette, Rocket, MessagesSquare, CheckCircle2 } from "lucide-react";
import type { Dictionary } from "@/i18n/types";
import type { ElementType } from "react";

const serviceIcons: ElementType[] = [Layers, Palette, Rocket, MessagesSquare];

function ServiceCard({
  item,
  index,
}: {
  item: Dictionary["services"]["items"][number];
  index: number;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });
  const Icon = serviceIcons[index];

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="p-6 rounded-xl bg-surface border border-border hover:border-accent/30 transition-all group"
    >
      <div className="p-3 rounded-lg bg-accent/10 w-fit mb-5">
        <Icon size={22} className="text-accent" />
      </div>

      <h3 className="text-lg font-semibold mb-3 group-hover:text-accent transition-colors">
        {item.title}
      </h3>
      <p className="text-sm text-muted leading-relaxed mb-5">
        {item.description}
      </p>

      <ul className="space-y-2">
        {item.features.map((feature) => (
          <li
            key={feature}
            className="flex items-start gap-2 text-sm text-muted"
          >
            <CheckCircle2
              size={14}
              className="text-accent mt-0.5 shrink-0"
            />
            {feature}
          </li>
        ))}
      </ul>
    </motion.div>
  );
}

export function Services({ dict }: { dict: Dictionary["services"] }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="services" className="py-24 px-6 bg-surface/50">
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

        <div className="grid md:grid-cols-2 gap-6">
          {dict.items.map((item, index) => (
            <ServiceCard key={item.title} item={item} index={index} />
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="text-center mt-12"
        >
          <a
            href="#contact"
            className="inline-flex items-center gap-2 px-8 py-3 bg-accent hover:bg-accent-light text-white rounded-lg font-medium transition-colors"
          >
            {dict.cta}
          </a>
        </motion.div>
      </div>
    </section>
  );
}
