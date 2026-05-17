import { CaseStudy } from "@/components/CaseStudy";
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
  const cs = dict.caseStudy.unfpa;

  return {
    title: `${cs.title} | Eduardo Castillo`,
    description: cs.challenge.slice(0, 155),
    alternates: {
      canonical: `${baseUrl}/${locale}/work/unfpa-equity`,
      languages: Object.fromEntries(
        locales.map((l) => [l, `${baseUrl}/${l}/work/unfpa-equity`]),
      ),
    },
    openGraph: {
      title: cs.title,
      description: cs.challenge.slice(0, 155),
      url: `${baseUrl}/${locale}/work/unfpa-equity`,
    },
  };
}

export default async function UNFPACaseStudyPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isValidLocale(locale)) notFound();
  const dict = await getDictionary(locale);

  return (
    <CaseStudy
      dict={dict.caseStudy}
      project="unfpa"
      locale={locale}
      liveUrl="https://www.unfpa.org/"
      ogImage="https://www.unfpa.org/sites/default/files/unfpa_global_redesign/images/placeholders/unfpa-social-img-en.svg"
    />
  );
}
