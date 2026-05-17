"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { ExternalLink, ArrowRight } from "lucide-react";
import Link from "next/link";
import type { Dictionary } from "@/i18n/types";

const sitesData: { url?: string; image: string; caseStudy?: string; status?: "offline" | "dev" }[] = [
  {
    url: "https://zenocircle.it",
    image: "/screenshots/zenocircle.jpg",
    caseStudy: "zenocircle",
  },
  {
    url: "https://casainordine.com/",
    image: "https://www.casainordine.com/images/logo/logo_1200x630.png",
    caseStudy: "casa-in-ordine",
  },
  {
    image: "/screenshots/battlebucks.png",
    caseStudy: "battlebucks",
    status: "offline",
  },
  {
    url: "https://cubitaproducciones.com/",
    image: "https://www.cubitaproducciones.com/og-image.jpg",
    caseStudy: "cubita-producciones",
  },
  {
    url: "https://www.nairobisummiticpd.org/gcmf-dashboard",
    image:
      "https://www.nairobisummiticpd.org/sites/all/modules/custom/nairobi_gcmf/assets/share_cards/share.jpg",
  },
  {
    url: "https://peacebeginswithme.un.org/en/",
    image:
      "https://images.prismic.io/peace-begins-with-me/65ce47599be9a5b998b5e239_SM1200x627_Generic.png?auto=format,compress,format&w=1280",
    caseStudy: "peace-begins-with-me",
  },
  {
    url: "https://letcommunitieslead.unaids.org/",
    image: "https://letcommunitieslead.unaids.org/img/share/sm-share-generic.jpg",
    caseStudy: "unaids-let-communities-lead",
  },
  {
    url: "https://eurovisionnews.ebu.ch/",
    image: "/screenshots/ebu-eurovision-news.jpg",
    caseStudy: "ebu-eurovision-news",
  },
  {
    url: "https://www.ifad.org/en/ride-report-2023/development-impact-and-results.html",
    image: "/screenshots/ifad-ride-2023.png",
    caseStudy: "ifad-ride-2023",
  },
  {
    url: "https://environmentalmigration.iom.int/",
    image:
      "https://environmentalmigration.iom.int/sites/g/files/tmzbdl1411/files/styles/social_media/public/banner/2026-02/dji_0181.jpg?h=635a26b7&itok=-__HxuPV",
    caseStudy: "iom-climate-migration",
  },
  {
    url: "https://www.unfpa.org/HRSRHcalculator",
    image:
      "https://www.unfpa.org/sites/default/files/unfpa_global_uhc/assets/img/home-header.jpg",
    caseStudy: "uhc-assessment-tool",
  },
  {
    url: "https://www.inequalitycouncil.org/",
    image:
      "https://www.inequalitycouncil.org/wp-content/themes/unaids-gcai/assets/img/sharing-card.jpg",
    caseStudy: "unaids-gcai",
  },
  {
    url: "https://www.unfpa.org/",
    image:
      "https://www.unfpa.org/sites/default/files/unfpa_global_redesign/images/placeholders/unfpa-social-img-en.svg",
    caseStudy: "unfpa-equity",
  },
  {
    url: "https://www.covenanthouse.org/",
    image:
      "https://www.covenanthouse.org/sites/default/files/styles/1200x630/public/2024-10/young-man-test-b-topaz.jpg.webp?itok=zIbg4HzO",
    caseStudy: "covenant-house",
  },
  {
    url: "https://www.luna-tour.com/",
    image: "/screenshots/luna-tour.png",
    caseStudy: "luna-tour",
  },
  {
    url: "https://utiq.com/",
    image: "https://utiq.com/wp-content/uploads/2023/05/utiq-logo@2x.png",
    caseStudy: "utiq",
  },
  {
    image: "/screenshots/el-catre.png",
    caseStudy: "el-catre",
    status: "offline",
  },
  {
    url: "https://freemock.art/",
    image:
      "https://res.cloudinary.com/doelo4gvm/image/upload/f_png,w_1200,h_630,c_fill/v1737588282/login-hero.svg",
    caseStudy: "freemock",
    status: "dev",
  },
];

function SiteCard({
  name,
  description,
  company,
  url,
  image,
  caseStudy,
  status,
  locale,
  index,
}: {
  name: string;
  description: string;
  company: string;
  url?: string;
  image: string;
  caseStudy?: string;
  status?: "offline" | "dev";
  locale: string;
  index: number;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });

  const content = (
    <>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <div className="relative aspect-video bg-background/50">
        <img src={image} alt={name} className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity" loading="lazy" />
        <span className={`absolute top-2 right-2 flex items-center gap-1.5 px-2 py-0.5 text-[10px] font-mono uppercase tracking-wider rounded bg-background/80 backdrop-blur-sm ${
          status === "offline"
            ? "text-red-400"
            : status === "dev"
              ? "text-amber-400"
              : "text-emerald-400"
        }`}>
          <span className={`w-1.5 h-1.5 rounded-full ${
            status === "offline"
              ? "bg-red-400"
              : status === "dev"
                ? "bg-amber-400 animate-pulse"
                : "bg-emerald-400 animate-pulse"
          }`} />
          {status === "offline" ? "Offline" : status === "dev" ? "In Dev" : "Online"}
        </span>
      </div>
      <div className="p-3 sm:p-5">
        <p className="text-xs text-muted uppercase tracking-wider mb-1">
          {company}
        </p>
        <div className="flex items-center justify-between mb-2">
          <h3 className="font-semibold group-hover:text-accent transition-colors">
            {name}
          </h3>
          {caseStudy ? (
            <ArrowRight
              size={16}
              className="text-muted group-hover:text-accent transition-colors shrink-0"
            />
          ) : url ? (
            <ExternalLink
              size={16}
              className="text-muted group-hover:text-accent transition-colors shrink-0"
            />
          ) : null}
        </div>
        <p className="text-sm text-muted leading-relaxed">{description}</p>
      </div>
    </>
  );

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group glass-card overflow-hidden hover:shadow-lg transition-all hover:-translate-y-1"
    >
      {caseStudy ? (
        <Link href={`/${locale}/work/${caseStudy}`} className="block">
          {content}
        </Link>
      ) : url ? (
        <a href={url} target="_blank" rel="noopener noreferrer" className="block">
          {content}
        </a>
      ) : (
        <div className="block">{content}</div>
      )}
    </motion.div>
  );
}

export function WorkShowcase({ dict, locale }: { dict: Dictionary["work"]; locale: string }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="py-16 sm:py-24 px-4 sm:px-6 pt-24 sm:pt-32 relative z-10">
      <div className="max-w-6xl mx-auto">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
          transition={{ duration: 0.6 }}
        >
          <div className="font-mono text-xs text-accent/60 mb-4 tracking-wider">{'<'} work {'/>'}</div>
          <h1 className="text-4xl font-bold mb-2 text-foreground">
            {dict.title}
            <span className="text-accent">.</span>
          </h1>
          <p className="text-muted mb-4 max-w-xl">{dict.subtitle}</p>
          <h2 className="text-xl font-semibold mb-8 text-foreground">{dict.websitesTitle}</h2>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {dict.sites.map((site, index) => (
            <SiteCard
              key={site.name}
              name={site.name}
              description={site.description}
              company={site.company}
              url={sitesData[index]?.url}
              image={sitesData[index]?.image ?? ""}
              caseStudy={sitesData[index]?.caseStudy}
              status={sitesData[index]?.status}
              locale={locale}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
