export function JsonLd({ locale }: { locale: string }) {
  const baseUrl = "https://eduardocastillo.dev";

  const personSchema = {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": `${baseUrl}/#person`,
    name: "Eduardo Castillo",
    givenName: "Eduardo",
    familyName: "Castillo",
    jobTitle: "Frontend Developer",
    description:
      "Frontend Developer with 6+ years of experience specializing in Vue.js, React, Next.js, TypeScript, Go, and Python. Available for hire — remote from Italy.",
    url: `${baseUrl}/${locale}`,
    sameAs: [
      "https://github.com/edwardcastle",
      "https://www.linkedin.com/in/eduardo-castillo-dev",
    ],
    email: "sir.edwardcastle@gmail.com",
    telephone: "+39 348 3448387",
    address: {
      "@type": "PostalAddress",
      addressCountry: "IT",
    },
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
      "GraphQL",
      "REST APIs",
      "Docker",
      "Tailwind CSS",
      "Frontend Development",
      "Backend Development",
      "Frontend Development",
      "Web Engineering",
      "Progressive Web Apps",
      "Responsive Design",
      "CI/CD",
      "DevOps",
      "Web Performance Optimization",
      "Accessibility",
      "E-commerce Development",
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
        "Vue.js, Nuxt.js, TypeScript, React, Next.js, Go, Python, Django, Docker, HTML, CSS, Tailwind CSS, JavaScript, GraphQL, REST APIs, Git, CI/CD",
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
      "Full-stack web development, UI/UX implementation, DevOps & deployment, and technical consulting. 6+ years of experience serving companies across Europe and the Americas.",
    priceRange: "$$",
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Web Development Services",
      itemListElement: [
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Frontend Web Development",
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
    description:
      "Portfolio of Eduardo Castillo, a Frontend Developer available for hire. Specializing in Vue.js, React, Next.js, TypeScript, Go, and Python.",
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: `${baseUrl}/${locale}`,
      },
    ],
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "What technologies does Eduardo Castillo work with?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Eduardo works with Vue.js, Nuxt.js, React, Next.js, TypeScript, JavaScript, Go, Python, Django, Docker, GraphQL, REST APIs, Tailwind CSS, and more.",
        },
      },
      {
        "@type": "Question",
        name: "Is Eduardo available for remote work?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes, Eduardo works remotely from Italy and has served clients across Europe, Latin America, and worldwide.",
        },
      },
      {
        "@type": "Question",
        name: "What services does Eduardo offer?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Eduardo offers frontend web development, UI/UX implementation, DevOps & deployment, and technical consulting services.",
        },
      },
      {
        "@type": "Question",
        name: "How much experience does Eduardo have?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Eduardo has over 6 years of professional experience and has worked with 8+ companies across different industries and countries.",
        },
      },
    ],
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
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
    </>
  );
}
