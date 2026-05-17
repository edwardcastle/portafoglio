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
  const cs = dict.caseStudy.ifadride2023;

  return {
    title: `${cs.title} | Eduardo Castillo`,
    description: cs.challenge.slice(0, 155),
    alternates: {
      canonical: `${baseUrl}/${locale}/work/ifad-ride-2023`,
      languages: Object.fromEntries(
        locales.map((l) => [l, `${baseUrl}/${l}/work/ifad-ride-2023`]),
      ),
    },
    openGraph: {
      title: cs.title,
      description: cs.challenge.slice(0, 155),
      url: `${baseUrl}/${locale}/work/ifad-ride-2023`,
    },
  };
}

export default async function IFADRide2023CaseStudyPage({
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
      project="ifadride2023"
      locale={locale}
      liveUrl="https://www.ifad.org/en/ride-report-2023/development-impact-and-results.html"
      ogImage="/screenshots/ifad-ride-2023.png"
    />
  );
}
