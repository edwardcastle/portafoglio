"use client";

import { motion } from "framer-motion";
import { ArrowLeft, Clock } from "lucide-react";
import Link from "next/link";
import type { BlogPost } from "@/data/blog-posts";
import type { Dictionary } from "@/i18n/types";

export function BlogPostView({
  post,
  dict,
  locale,
}: {
  post: BlogPost;
  dict: Dictionary["blog"];
  locale: string;
}) {
  const title = post.title[locale] || post.title.en;
  const content = post.content[locale] || post.content.en;

  return (
    <article className="py-24 px-6 pt-32">
      <div className="max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Link
            href={`/${locale}/blog`}
            className="inline-flex items-center gap-2 text-sm text-muted hover:text-accent transition-colors mb-8"
          >
            <ArrowLeft size={16} />
            {dict.backToBlog}
          </Link>

          <div className="flex items-center gap-3 text-xs text-muted mb-4">
            <time>{post.date}</time>
            <span className="flex items-center gap-1">
              <Clock size={12} />
              {post.readTime} {dict.minRead}
            </span>
          </div>

          <h1 className="text-4xl font-bold mb-6">{title}</h1>

          <div className="flex gap-2 mb-8">
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="px-3 py-1 text-xs font-mono text-accent bg-accent/10 rounded-full"
              >
                {tag}
              </span>
            ))}
          </div>
        </motion.div>

        {post.image && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="rounded-xl overflow-hidden border border-border mb-10"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={post.image}
              alt={title}
              className="w-full aspect-video object-cover"
              loading="lazy"
            />
          </motion.div>
        )}

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="prose prose-slate max-w-none [&_h2]:text-xl [&_h2]:font-semibold [&_h2]:mt-8 [&_h2]:mb-3 [&_p]:text-muted [&_p]:leading-relaxed [&_p]:mb-4 [&_code]:text-accent [&_code]:bg-accent/10 [&_code]:px-1.5 [&_code]:py-0.5 [&_code]:rounded [&_code]:text-sm [&_pre]:bg-surface [&_pre]:border [&_pre]:border-border [&_pre]:rounded-xl [&_pre]:p-4 [&_pre]:overflow-x-auto [&_ul]:space-y-2 [&_ul]:text-muted [&_li]:text-muted [&_a]:text-accent [&_a]:underline"
          dangerouslySetInnerHTML={{ __html: content }}
        />
      </div>
    </article>
  );
}
