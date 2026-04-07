import type { MetadataRoute } from "next";
import { locales } from "@/i18n/config";

const baseUrl = "https://eduardocastillo.dev";

export default function sitemap(): MetadataRoute.Sitemap {
  const localeEntries: MetadataRoute.Sitemap = locales.map((locale) => ({
    url: `${baseUrl}/${locale}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 1,
    alternates: {
      languages: Object.fromEntries(
        locales.map((l) => [l, `${baseUrl}/${l}`]),
      ),
    },
  }));

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
      alternates: {
        languages: Object.fromEntries(
          locales.map((locale) => [locale, `${baseUrl}/${locale}`]),
        ),
      },
    },
    ...localeEntries,
  ];
}
