import { Hero } from "@/components/Hero";
import { About } from "@/components/About";
import { Experience } from "@/components/Experience";
import { Skills } from "@/components/Skills";
import { ServicesPreview } from "@/components/ServicesPreview";
import { WorkPreview } from "@/components/WorkPreview";
import { getDictionary } from "@/i18n/get-dictionary";
import { isValidLocale } from "@/i18n/config";
import { notFound } from "next/navigation";

export default async function Home({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isValidLocale(locale)) notFound();
  const dict = await getDictionary(locale);

  return (
    <>
      <Hero dict={dict.hero} locale={locale} />
      <ServicesPreview
        dict={dict.services}
        homeSections={dict.homeSections}
        locale={locale}
      />
      <About dict={dict.about} />
      <Experience dict={dict.experience} />
      <Skills dict={dict.skills} />
      <WorkPreview
        dict={dict.work}
        homeSections={dict.homeSections}
        locale={locale}
      />
    </>
  );
}
