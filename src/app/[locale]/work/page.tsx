import { WorkShowcase } from "@/components/WorkShowcase";
import { Projects } from "@/components/Projects";
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
    title: dict.meta.workTitle,
    description: dict.meta.workDescription,
    alternates: {
      canonical: `${baseUrl}/${locale}/work`,
      languages: Object.fromEntries(
        locales.map((l) => [l, `${baseUrl}/${l}/work`]),
      ),
    },
    openGraph: {
      title: dict.meta.workTitle,
      description: dict.meta.workDescription,
      url: `${baseUrl}/${locale}/work`,
    },
  };
}

export default async function WorkPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isValidLocale(locale)) notFound();
  const dict = await getDictionary(locale);

  return (
    <>
      <WorkShowcase dict={dict.work} />
      <Projects dict={dict.projects} />
    </>
  );
}
