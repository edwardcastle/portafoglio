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
  const cs = dict.caseStudy.iomclimatemigration;

  return {
    title: `${cs.title} | Eduardo Castillo`,
    description: cs.challenge.slice(0, 155),
    alternates: {
      canonical: `${baseUrl}/${locale}/work/iom-climate-migration`,
      languages: Object.fromEntries(
        locales.map((l) => [l, `${baseUrl}/${l}/work/iom-climate-migration`]),
      ),
    },
    openGraph: {
      title: cs.title,
      description: cs.challenge.slice(0, 155),
      url: `${baseUrl}/${locale}/work/iom-climate-migration`,
    },
  };
}

export default async function IOMClimateMigrationCaseStudyPage({
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
      project="iomclimatemigration"
      locale={locale}
      liveUrl="https://environmentalmigration.iom.int/"
      ogImage="https://environmentalmigration.iom.int/sites/g/files/tmzbdl1411/files/styles/social_media/public/banner/2026-02/dji_0181.jpg?h=635a26b7&itok=-__HxuPV"
    />
  );
}
