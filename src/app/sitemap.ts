import type { MetadataRoute } from "next";
import { locales } from "@/i18n/config";

const baseUrl = "https://eduardocastillo.dev";

const pages = [
  "",
  "/work",
  "/work/unaids-let-communities-lead",
  "/work/battlebucks",
  "/work/zenocircle",
  "/work/unfpa-equity",
  "/work/peace-begins-with-me",
  "/work/cubita-producciones",
  "/work/freemock",
  "/work/el-catre",
  "/work/casa-in-ordine",
  "/work/iom-climate-migration",
  "/work/unaids-gcai",
  "/work/ifad-ride-2023",
  "/work/utiq",
  "/work/luna-tour",
  "/work/uhc-assessment-tool",
  "/work/covenant-house",
  "/work/ebu-eurovision-news",
  "/services",
  "/contact",
] as const;

export default function sitemap(): MetadataRoute.Sitemap {
  return locales.flatMap((locale) =>
    pages.map((page) => ({
      url: `${baseUrl}/${locale}${page}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: page === "" ? 1 : 0.8,
      alternates: {
        languages: Object.fromEntries(
          locales.map((l) => [l, `${baseUrl}/${l}${page}`]),
        ),
      },
    })),
  );
}
