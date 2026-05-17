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
  const cs = dict.caseStudy.unaidsgcai;

  return {
    title: `${cs.title} | Eduardo Castillo`,
    description: cs.challenge.slice(0, 155),
    alternates: {
      canonical: `${baseUrl}/${locale}/work/unaids-gcai`,
      languages: Object.fromEntries(
        locales.map((l) => [l, `${baseUrl}/${l}/work/unaids-gcai`]),
      ),
    },
    openGraph: {
      title: cs.title,
      description: cs.challenge.slice(0, 155),
      url: `${baseUrl}/${locale}/work/unaids-gcai`,
    },
  };
}

export default async function UNAIDSGCAICaseStudyPage({
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
      project="unaidsgcai"
      locale={locale}
      liveUrl="https://www.inequalitycouncil.org/"
      ogImage="https://www.inequalitycouncil.org/wp-content/themes/unaids-gcai/assets/img/sharing-card.jpg"
    />
  );
}
