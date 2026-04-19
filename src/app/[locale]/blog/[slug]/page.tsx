import { BlogPostView } from "@/components/BlogPostView";
import { blogPosts } from "@/data/blog-posts";
import { getDictionary } from "@/i18n/get-dictionary";
import { locales, isValidLocale } from "@/i18n/config";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

const baseUrl = "https://eduardocastillo.dev";

export async function generateStaticParams() {
  return locales.flatMap((locale) =>
    blogPosts.map((post) => ({ locale, slug: post.slug })),
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  if (!isValidLocale(locale)) return {};
  const post = blogPosts.find((p) => p.slug === slug);
  if (!post) return {};

  return {
    title: `${post.title[locale] || post.title.en} | Eduardo Castillo`,
    description: post.excerpt[locale] || post.excerpt.en,
    alternates: {
      canonical: `${baseUrl}/${locale}/blog/${slug}`,
      languages: Object.fromEntries(
        locales.map((l) => [l, `${baseUrl}/${l}/blog/${slug}`]),
      ),
    },
    openGraph: {
      title: post.title[locale] || post.title.en,
      description: post.excerpt[locale] || post.excerpt.en,
      url: `${baseUrl}/${locale}/blog/${slug}`,
      type: "article",
    },
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  if (!isValidLocale(locale)) notFound();

  const post = blogPosts.find((p) => p.slug === slug);
  if (!post) notFound();

  const dict = await getDictionary(locale);

  return <BlogPostView post={post} dict={dict.blog} locale={locale} />;
}
