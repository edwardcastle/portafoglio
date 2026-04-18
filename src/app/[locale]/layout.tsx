import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "../globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { JsonLd } from "@/components/JsonLd";
import { getDictionary } from "@/i18n/get-dictionary";
import { locales, isValidLocale, type Locale } from "@/i18n/config";
import { notFound } from "next/navigation";
import { SsrCleanup } from "@/components/SsrCleanup";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const baseUrl = "https://eduardocastillo.dev";

const ogLocaleMap: Record<Locale, string> = {
  en: "en_US",
  it: "it_IT",
  es: "es_ES",
};

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
    metadataBase: new URL(baseUrl),
    title: dict.meta.title,
    description: dict.meta.description,
    authors: [{ name: "Eduardo Castillo", url: baseUrl }],
    creator: "Eduardo Castillo",
    category: "technology",
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-snippet": -1,
        "max-image-preview": "large",
      },
    },
    alternates: {
      canonical: `${baseUrl}/${locale}`,
      languages: Object.fromEntries(
        locales.map((l) => [l, `${baseUrl}/${l}`]),
      ),
    },
    openGraph: {
      title: dict.meta.title,
      description: dict.meta.ogDescription,
      type: "website",
      locale: ogLocaleMap[locale],
      alternateLocale: locales
        .filter((l) => l !== locale)
        .map((l) => ogLocaleMap[l]),
      url: `${baseUrl}/${locale}`,
      siteName: "Eduardo Castillo — Frontend Developer",
    },
    twitter: {
      card: "summary_large_image",
      title: dict.meta.title,
      description: dict.meta.ogDescription,
      creator: "@edwardcastle",
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isValidLocale(locale)) notFound();
  const dict = await getDictionary(locale);

  return (
    <html
      lang={locale}
      data-scroll-behavior="smooth"
      className={`${geistSans.variable} ${geistMono.variable} antialiased`}
    >
      <body className="min-h-screen flex flex-col">
        {/* Ensure SSR content is visible for search engine crawlers.
            Removed after React hydration so Framer Motion animations work. */}
        <style
          id="ssr-visible"
          dangerouslySetInnerHTML={{
            __html: `[style*="opacity: 0"],[style*="opacity:0"]{opacity:1!important;transform:none!important}`,
          }}
        />
        <SsrCleanup />
        <JsonLd locale={locale} />
        <Header dict={dict.header} locale={locale} />
        <main className="flex-1">{children}</main>
        <Footer dict={dict.footer} />
      </body>
    </html>
  );
}
