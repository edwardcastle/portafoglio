export function JsonLd({ locale }: { locale: string }) {
  const baseUrl = "https://eduardocastillo.dev";

  const personSchema = {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": `${baseUrl}/#person`,
    name: "Eduardo Castillo",
    givenName: "Eduardo",
    familyName: "Castillo",
    jobTitle: "Full-Stack Web Developer",
    description:
      "Freelance Frontend Developer with 6+ years of experience specializing in Vue.js, Nuxt.js, TypeScript, and React.",
    url: `${baseUrl}/${locale}`,
    sameAs: ["https://github.com/edwardcastle"],
    email: "sir.edwardcastle@gmail.com",
    telephone: "+39 348 3448387",
    knowsLanguage: [
      { "@type": "Language", name: "English", alternateName: "en" },
      { "@type": "Language", name: "Italian", alternateName: "it" },
      { "@type": "Language", name: "Spanish", alternateName: "es" },
    ],
    alumniOf: {
      "@type": "CollegeOrUniversity",
      name: "Universidad de las Ciencias Informáticas (UCI)",
    },
    knowsAbout: [
      "Vue.js",
      "Nuxt.js",
      "TypeScript",
      "React",
      "Next.js",
      "JavaScript",
      "Go",
      "Golang",
      "Python",
      "Django",
      "Frontend Development",
      "Backend Development",
      "Full-Stack Development",
      "Web Engineering",
      "Progressive Web Apps",
      "Responsive Design",
    ],
    hasOccupation: {
      "@type": "Occupation",
      name: "Frontend Developer",
      occupationLocation: { "@type": "Country", name: "Italy" },
      estimatedSalary: {
        "@type": "MonetaryAmountDistribution",
        currency: "EUR",
      },
      skills:
        "Vue.js, Nuxt.js, TypeScript, React, Next.js, Go, Python, Django, Docker, HTML, CSS, Tailwind CSS, JavaScript",
    },
    workLocation: {
      "@type": "VirtualLocation",
      description: "Remote",
    },
  };

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "@id": `${baseUrl}/#service`,
    name: "Eduardo Castillo — Web Development Services",
    provider: { "@id": `${baseUrl}/#person` },
    url: `${baseUrl}/${locale}`,
    areaServed: "Worldwide",
    serviceType: "Web Development",
    description:
      "Full-stack web development, UI/UX implementation, DevOps & deployment, and technical consulting.",
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Web Development Services",
      itemListElement: [
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Full-Stack Web Development",
            description:
              "End-to-end web applications with Vue.js, React, Next.js, Go, Python, Django, GraphQL, and REST APIs.",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "UI/UX Implementation",
            description:
              "Pixel-perfect design-to-code from Figma/Zeplin with animations and WCAG accessibility.",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "DevOps & Deployment",
            description:
              "Docker containerization, CI/CD pipelines, cloud deployment, and infrastructure setup.",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Technical Consulting",
            description:
              "System architecture reviews, JS-to-TS migration, code audits, and team mentoring.",
          },
        },
      ],
    },
  };

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${baseUrl}/#website`,
    name: "Eduardo Castillo — Frontend Developer",
    url: baseUrl,
    inLanguage: ["en", "it", "es"],
    author: { "@id": `${baseUrl}/#person` },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />
    </>
  );
}
