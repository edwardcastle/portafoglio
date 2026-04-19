import { BlogList } from "@/components/BlogList";
import { getDictionary } from "@/i18n/get-dictionary";
import { locales, isValidLocale } from "@/i18n/config";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

const baseUrl = "https://eduardocastillo.dev";

export async function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!isValidLocale(locale)) return {};
  const dict = await getDictionary(locale);

  return {
    title: `${dict.blog.title} | Eduardo Castillo`,
    description: dict.blog.subtitle,
    alternates: {
      canonical: `${baseUrl}/${locale}/blog`,
      languages: Object.fromEntries(
        locales.map((l) => [l, `${baseUrl}/${l}/blog`]),
      ),
    },
    openGraph: {
      title: `${dict.blog.title} | Eduardo Castillo`,
      description: dict.blog.subtitle,
      url: `${baseUrl}/${locale}/blog`,
    },
  };
}

export default async function BlogPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isValidLocale(locale)) notFound();
  const dict = await getDictionary(locale);

  return <BlogList dict={dict.blog} locale={locale} />;
}
