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
  const cs = dict.caseStudy.peacebeginswithme;

  return {
    title: `${cs.title} | Eduardo Castillo`,
    description: cs.challenge.slice(0, 155),
    alternates: {
      canonical: `${baseUrl}/${locale}/work/peace-begins-with-me`,
      languages: Object.fromEntries(
        locales.map((l) => [l, `${baseUrl}/${l}/work/peace-begins-with-me`]),
      ),
    },
    openGraph: {
      title: cs.title,
      description: cs.challenge.slice(0, 155),
      url: `${baseUrl}/${locale}/work/peace-begins-with-me`,
    },
  };
}

export default async function PeaceBeginsWithMeCaseStudyPage({
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
      project="peacebeginswithme"
      locale={locale}
      liveUrl="https://peacebeginswithme.un.org/en/"
      ogImage="https://images.prismic.io/peace-begins-with-me/65ce47599be9a5b998b5e239_SM1200x627_Generic.png?auto=format,compress,format&w=1280"
    />
  );
}
