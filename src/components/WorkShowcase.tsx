"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { ExternalLink } from "lucide-react";
import type { Dictionary } from "@/i18n/types";

const sitesData: { url: string; image: string }[] = [
  {
    url: "https://letcommunitieslead.unaids.org/",
    image: "https://letcommunitieslead.unaids.org/img/share/sm-share-generic.jpg",
  },
  {
    url: "https://www.nairobisummiticpd.org/gcmf-dashboard",
    image:
      "https://www.nairobisummiticpd.org/sites/all/modules/custom/nairobi_gcmf/assets/share_cards/share.jpg",
  },
  {
    url: "https://www.inequalitycouncil.org/",
    image:
      "https://www.inequalitycouncil.org/wp-content/themes/unaids-gcai/assets/img/sharing-card.jpg",
  },
  {
    url: "https://utiq.com/",
    image: "https://utiq.com/wp-content/uploads/2023/05/utiq-logo@2x.png",
  },
  {
    url: "https://cubitaproducciones.com/",
    image: "https://www.cubitaproducciones.com/og-image.jpg",
  },
  {
    url: "https://casainordine.com/",
    image: "https://www.casainordine.com/images/logo/logo_1200x630.png",
  },
  {
    url: "https://freemock.art/",
    image:
      "https://res.cloudinary.com/doelo4gvm/image/upload/f_png,w_1200,h_630,c_fill/v1737588282/login-hero.svg",
  },
  {
    url: "https://www.luna-tour.com/",
    image: "/screenshots/luna-tour.png",
  },
  {
    url: "https://www.unfpa.org/",
    image:
      "https://www.unfpa.org/sites/default/files/unfpa_global_redesign/images/placeholders/unfpa-social-img-en.svg",
  },
  {
    url: "https://peacebeginswithme.un.org/en/",
    image:
      "https://images.prismic.io/peace-begins-with-me/65ce47599be9a5b998b5e239_SM1200x627_Generic.png?auto=format,compress,format&w=1280",
  },
];

function SiteCard({
  name,
  description,
  company,
  url,
  image,
  index,
}: {
  name: string;
  description: string;
  company: string;
  url: string;
  image: string;
  index: number;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <motion.a
      ref={ref}
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group block rounded-xl border border-border overflow-hidden bg-surface hover:shadow-lg hover:border-accent/30 transition-all hover:-translate-y-1"
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <div className="relative aspect-video bg-surface-light">
        <img src={image} alt={name} className="w-full h-full object-cover" />
      </div>
      <div className="p-5">
        <p className="text-xs text-muted uppercase tracking-wider mb-1">
          {company}
        </p>
        <div className="flex items-center justify-between mb-2">
          <h3 className="font-semibold group-hover:text-accent transition-colors">
            {name}
          </h3>
          <ExternalLink
            size={16}
            className="text-muted group-hover:text-accent transition-colors shrink-0"
          />
        </div>
        <p className="text-sm text-muted leading-relaxed">{description}</p>
      </div>
    </motion.a>
  );
}

export function WorkShowcase({ dict }: { dict: Dictionary["work"] }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="py-24 px-6 pt-32">
      <div className="max-w-6xl mx-auto">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-4xl font-bold mb-2">
            {dict.title}
            <span className="text-accent">.</span>
          </h1>
          <p className="text-muted mb-4 max-w-xl">{dict.subtitle}</p>
          <h2 className="text-xl font-semibold mb-8">{dict.websitesTitle}</h2>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {dict.sites.map((site, index) => (
            <SiteCard
              key={site.name}
              name={site.name}
              description={site.description}
              company={site.company}
              url={sitesData[index].url}
              image={sitesData[index].image}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
