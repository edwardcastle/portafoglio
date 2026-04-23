import { Services } from "@/components/Services";
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
    title: dict.meta.servicesTitle,
    description: dict.meta.servicesDescription,
    alternates: {
      canonical: `${baseUrl}/${locale}/services`,
      languages: Object.fromEntries(
        locales.map((l) => [l, `${baseUrl}/${l}/services`]),
      ) as Record<string, string>,
    },
    openGraph: {
      title: dict.meta.servicesTitle,
      description: dict.meta.servicesDescription,
      url: `${baseUrl}/${locale}/services`,
    },
  };
}

export default async function ServicesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isValidLocale(locale)) notFound();
  const dict = await getDictionary(locale);

  return <Services dict={dict.services} />;
}
