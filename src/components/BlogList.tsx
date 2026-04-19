"use client";

import { motion } from "framer-motion";
import { ArrowRight, Clock } from "lucide-react";
import Link from "next/link";
import { blogPosts } from "@/data/blog-posts";
import type { Dictionary } from "@/i18n/types";

export function BlogList({
  dict,
  locale,
}: {
  dict: Dictionary["blog"];
  locale: string;
}) {
  const posts = blogPosts.filter(
    (p) => p.title[locale] || p.title.en,
  );

  return (
    <section className="py-24 px-6 pt-32">
      <div className="max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-4xl font-bold mb-2">
            {dict.title}
            <span className="text-accent">.</span>
          </h1>
          <p className="text-muted mb-12 max-w-xl">{dict.subtitle}</p>
        </motion.div>

        {posts.length === 0 ? (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-muted text-center py-16 bg-surface rounded-xl border border-border"
          >
            {dict.comingSoon}
          </motion.p>
        ) : (
          <div className="space-y-6">
            {posts.map((post, index) => (
              <motion.article
                key={post.slug}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Link
                  href={`/${locale}/blog/${post.slug}`}
                  className="group block p-6 rounded-xl bg-surface border border-border hover:border-accent/30 transition-all"
                >
                  <div className="flex items-center gap-3 text-xs text-muted mb-3">
                    <time>{post.date}</time>
                    <span className="flex items-center gap-1">
                      <Clock size={12} />
                      {post.readTime} {dict.minRead}
                    </span>
                  </div>
                  <h2 className="text-lg font-semibold mb-2 group-hover:text-accent transition-colors">
                    {post.title[locale] || post.title.en}
                  </h2>
                  <p className="text-sm text-muted leading-relaxed mb-3">
                    {post.excerpt[locale] || post.excerpt.en}
                  </p>
                  <div className="flex items-center gap-4">
                    <span className="inline-flex items-center gap-1 text-sm text-accent font-medium">
                      {dict.readMore}
                      <ArrowRight size={14} />
                    </span>
                    <div className="flex gap-2">
                      {post.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-2 py-0.5 text-xs font-mono text-muted bg-surface-light rounded"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </Link>
              </motion.article>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
