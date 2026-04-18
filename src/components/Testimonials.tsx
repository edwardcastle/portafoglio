"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Quote } from "lucide-react";

interface Testimonial {
  quote: string;
  author: string;
  role: string;
  company: string;
}

// TODO: Replace with real testimonials from LinkedIn recommendations
const testimonials: Testimonial[] = [];

export function Testimonials() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  if (testimonials.length === 0) return null;

  return (
    <section className="py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl font-bold mb-12">
            What clients say<span className="text-accent">.</span>
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((t, index) => (
            <motion.div
              key={t.author}
              initial={{ opacity: 0, y: 30 }}
              animate={
                isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }
              }
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="p-6 rounded-xl bg-surface border border-border"
            >
              <Quote size={20} className="text-accent mb-4" />
              <p className="text-sm text-muted leading-relaxed mb-4">
                &ldquo;{t.quote}&rdquo;
              </p>
              <div>
                <p className="font-semibold text-sm">{t.author}</p>
                <p className="text-xs text-muted">
                  {t.role}, {t.company}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
