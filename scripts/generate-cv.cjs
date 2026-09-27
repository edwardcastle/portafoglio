const PDFDocument = require("pdfkit");
const fs = require("fs");
const path = require("path");

const MARGIN = 56;
const PAGE_WIDTH = 595.28; // A4
const PAGE_HEIGHT = 841.89;
const CONTENT_WIDTH = PAGE_WIDTH - MARGIN * 2;
const CONTENT_BOTTOM = PAGE_HEIGHT - 60;

const BLUE = "#1F4E79";
const TEXT = "#222222";
const GRAY = "#555555";

const BULLET_INDENT = 8;
const BULLET_TEXT_INDENT = 18;
const LINE_GAP = 1.5;

const contact = {
  name: "Eduardo Castillo",
  title: "Frontend Developer / Web Engineer",
  phone: "+39 348 3448387",
  email: "sir.edwardcastle@gmail.com",
  github: "github.com/edwardcastle",
  linkedin: "linkedin.com/in/eduardo-castillo-dev",
};

const cvData = {
  en: {
    ...contact,
    location: "Remote, Italy",
    profileTitle: "Professional Summary",
    profile:
      "Frontend Developer with 7+ years of experience designing and building modern, high-performance, user-centered web applications. Specialized in Vue.js, Nuxt.js and TypeScript, with full-stack experience in React/Next.js and Python/FastAPI backends. Project experience for UN agencies (UNAIDS, UNFPA, IOM, IFAD), EBU Eurovision, AdTech (UTIQ), aerospace/logistics (Altec), industry, NGOs and startups. Strong focus on code quality, accessibility, performance optimization and design system implementation. Experienced in collaborating with designers and backend teams to deliver fluid, scalable and responsive interfaces.",
    experienceTitle: "Work Experience",
    jobs: [
      {
        title: "Frontend Developer / Web Engineer — Enterprise Projects",
        org: "Employer: Dacomat S.r.l. — Delivery partner: Reply S.p.A.",
        period: "Jun 2025 – Present",
        highlights: [
          "Development for enterprise clients in the aerospace/logistics (Altec), industrial (Ferwood) and energy (Eni) sectors.",
        ],
        groups: [
          {
            title: "LISUP (Altec) — web-based logistics / warehouse management system (Vue 3, PrimeVue 4, TypeScript, Tailwind):",
            highlights: [
              "Interactive dashboards and data management interfaces for logistics modules (IWM, spare parts, shipments, inbound/outbound inspections, TRF)",
              "Dynamic tables with filtering, pagination and optimized sorting",
              "File import/export flows and handling of large data volumes",
              "SSO authentication with Keycloak, internationalization (vue-i18n) and real-time updates via WebSocket (STOMP/SockJS)",
              "Performance optimization (lazy loading, code splitting, reusable components); testing with Vitest and Cypress, code quality with SonarQube",
            ],
          },
          {
            title: "Ferwood — e-commerce platform for refurbished industrial machinery (replacing the legacy Magento/Elasticsearch stack):",
            highlights: [
              "New multi-market public website (Next.js 16, React 19, TypeScript, Tailwind): catalog with data-driven filters from OpenSearch, i18n across 10+ languages (next-intl), SEO overhaul (metadata, JSON-LD, hreflang, 301 redirects + proxy for legacy URLs), Contentful CMS, authentication and wishlist",
              "Custom backend API (FastAPI, Python 3.13): Redshift-to-OpenSearch reindexing pipeline, catalog/search and recommendation APIs, write integration with Dynamics CRM, transactional emails (AWS SES / Microsoft 365)",
              "Deployment on AWS ECS Fargate behind ALB via CodePipeline, Docker builds with test gates, automated reindexing via EventBridge Scheduler",
              "Internal tools (Next.js, React, PrimeReact) replacing legacy Excel pricing tools (\"Prova Prezzi\" price calculator, unified price list)",
            ],
          },
          {
            title: "Eni:",
            highlights: ["Bug fixing and maintenance of data management interfaces"],
          },
        ],
      },
      {
        title: "Frontend Developer",
        org: "Elkanodata — Remote, Spain",
        period: "Sep 2023 – Jun 2024",
        highlights: [
          "Worked alongside two senior frontend developers on projects for enterprise clients",
          "UN agencies: UNAIDS (Let Communities Lead, GCAI), UNFPA (Equity 2030, UHC Assessment Tool), IOM Climate-Related Migration, IFAD RIDE 2023, Peace Begins With Me",
          "Other clients: EBU Eurovision News (newsroom microsite), Covenant House (WordPress CMS integration into an existing vanilla frontend)",
          "Stack: Nuxt 3, Vue 3, TypeScript, Prismic CMS, WordPress, D3.js, GSAP, Lenis, Swiper, Webpack, Vite",
        ],
      },
      {
        title: "Frontend Developer",
        org: "Teavaro — Remote, United Kingdom",
        period: "Aug 2022 – Sep 2023",
        highlights: [
          "UTIQ — corporate marketing website (Vue.js + TypeScript) supporting the rebrand from TrustPid to UTIQ and expansion into European markets",
          "Maintenance and development of the admin platform for user and data management",
          "Migration from JavaScript to TypeScript for greater stability",
          "Implementation of reusable Vue components and automated tests",
          "Collaboration with the backend team on API optimization and caching",
        ],
      },
      {
        title: "Frontend Developer (Freelance, part-time)",
        org: "JADE Solutions — Remote, Cuba",
        period: "Nov 2022 – Jul 2023",
        highlights: [
          "Luna Tour — Vue 3 + Vite SPA for discovering tourist destinations (multilingual, mobile-first, WhatsApp handoff)",
          "CMS pages, SEO optimization and Google OAuth integration",
          "Mobile layouts with Ionic and Capacitor",
          "E-commerce admin panels",
        ],
      },
      {
        title: "Full Stack Developer",
        org: "ONAT — Hybrid, Cuba",
        period: "Sep 2019 – Aug 2022",
        highlights: [
          "Full-stack developer on internal administrative systems for Cuba's National Tax Administration Office (ONAT)",
          "Built and maintained a reusable Vue component library shared across multiple administrative modules",
          "Backend development and database modeling with Django, exposing REST and GraphQL APIs",
          "Client-side API integration with caching and rendering optimization",
          "UX iteration based on direct feedback from internal operations teams",
          "Three-year tenure with growing responsibility over broader areas and features",
        ],
      },
      {
        title: "Full Stack Developer",
        org: "El Catre — Remote, Cuba",
        period: "Aug 2019 – Sep 2020",
        highlights: [
          "Built the frontend of Cuba's first independent e-commerce platform: Nuxt 2 + Vue 2 + Vuex + Buefy on an Apollo GraphQL client",
          "Seller storefronts, product catalog, cart, checkout and seller analytics dashboards with ApexCharts",
          "Real-time chat and notifications via WebSocket with Django Channels + Redis",
          "Federated authentication: Firebase phone verification, Facebook/Google OAuth, JWT",
          "PWA and SSR optimization tuned for Cuban network conditions; image cropping and QR code generation",
          "Backend support with Django + Graphene (GraphQL): database modeling and API endpoints",
        ],
      },
    ],
    projectsTitle: "Freelance Projects",
    projects: [
      {
        title: "ZenO — Website improvements and email integration",
        period: "2026",
        highlights: [
          "Responsiveness improvements, DNS configuration and redirects",
          "Resend integration for sending client questionnaires and newsletter sign-ups",
        ],
      },
      {
        title: "Casa in Ordine",
        period: "2025 – 2026",
        highlights: [
          "Multilingual website (IT/EN/ES) for a Rome-based home organizing business",
          "Next.js 16 + React 19 + Tailwind v4, with a 9-step quote wizard",
          "Brevo email integration, Umami analytics, GDPR cookie consent",
        ],
      },
      {
        title: "FreeMock",
        period: "2025 – Present",
        highlights: [
          "Meme creator and social platform with web3 wallet authentication (Reown AppKit)",
          "Nuxt 3 + Pinia + shadcn-vue + Fabric.js editor + WebSocket chat with Signal protocol",
          "Image rendering microservice in Go + govips; CI/CD with SonarQube and Codecov",
        ],
      },
      {
        title: "BattleBucks — Play-to-Earn on Solana",
        period: "2025",
        highlights: [
          "Real-money battle royale and 1v1 PvP game on Solana, shipped as a PWA and native iOS/Android app",
          "Nuxt 3 + Pinia + Reown AppKit for Solana wallet connection and SIWX authentication",
          "Custom WebSocket store for real-time gameplay flow and chat with reconnection logic",
          "Capacitor for native iOS/Android builds from a single Nuxt codebase; Sentry for observability",
        ],
      },
      {
        title: "Cubita Producciones",
        period: "2025",
        highlights: [
          "Trilingual website (ES/EN/IT) for a Cuban talent agency, with artist catalog and booking flow",
          "Next.js 16 + App Router + Tailwind v4 + next-intl + Framer Motion",
          "Strapi v5 CMS set up for a future editorial handover",
        ],
      },
      {
        title: "Gitfast",
        period: "2024",
        highlights: [
          "Freelance collaboration with a client in Mexico",
          "New features and a reusable UI component library",
          "Performance optimization and frontend refactoring for scalability and readability",
        ],
      },
    ],
    educationTitle: "Education",
    education: {
      title: "B.Sc. in Computer Science",
      org: "Universidad de las Ciencias Informáticas (UCI), Cuba",
      period: "2013 – 2019",
      highlights: [
        "Specialization in Java and object-oriented programming",
        "Participation in the ACM-ICPC programming contest",
        "Thesis: development of a CAD system with C++ and Qt",
      ],
    },
    skillsTitle: "Technical Skills",
    skills: {
      "Core stack": "Vue 3, Nuxt 3, TypeScript, Tailwind CSS, PrimeVue, Pinia, REST APIs, Git",
      Advanced: "React, Next.js, JavaScript (ES6+), Python, Sass, Vitest, Jest, Cypress, Vite, Webpack, Docker, PWA, SEO, Figma, WordPress, Astro, GSAP, Framer Motion, Canvas/SVG animations",
      "Working knowledge": "FastAPI, AWS (ECS/Fargate, OpenSearch, Redshift, SES), PostgreSQL, Contentful, Keycloak, WebSocket (STOMP/SockJS), next-intl, Go, Django, GraphQL, Solana/Web3, Reown AppKit, Firebase, Ionic/Capacitor, Fabric.js, shadcn-vue, D3.js, Prismic, Strapi",
      Tools: "VS Code, IntelliJ IDEA, Postman, Insomnia, Trello, Linux",
    },
    languagesTitle: "Languages",
    languages: {
      Spanish: "Native",
      English: "Professional working proficiency (written and spoken)",
      Italian: "Intermediate (written and spoken)",
    },
  },
  es: {
    ...contact,
    location: "Remoto, Italia",
    profileTitle: "Perfil Profesional",
    profile:
      "Desarrollador Frontend con más de 7 años de experiencia en el diseño y desarrollo de aplicaciones web modernas, de alto rendimiento y centradas en el usuario. Especializado en Vue.js, Nuxt.js y TypeScript, con experiencia full-stack en React/Next.js y backends Python/FastAPI. Experiencia en proyectos para agencias de la ONU (UNAIDS, UNFPA, IOM, IFAD), EBU Eurovision, AdTech (UTIQ), sector aeroespacial/logístico (Altec), industria, ONG y startups. Fuerte enfoque en la calidad del código, la accesibilidad, la optimización del rendimiento y la implementación de design systems. Experiencia colaborando con diseñadores y equipos backend para entregar interfaces fluidas, escalables y responsive.",
    experienceTitle: "Experiencia Laboral",
    jobs: [
      {
        title: "Frontend Developer / Web Engineer — Proyectos Enterprise",
        org: "Empleador: Dacomat S.r.l. — Partner de entrega: Reply S.p.A.",
        period: "Jun 2025 – Presente",
        highlights: [
          "Desarrollo para clientes enterprise en los sectores aeroespacial/logístico (Altec), industrial (Ferwood) y energético (Eni).",
        ],
        groups: [
          {
            title: "LISUP (Altec) — sistema web de logística / gestión de almacén (Vue 3, PrimeVue 4, TypeScript, Tailwind):",
            highlights: [
              "Dashboards interactivos e interfaces de gestión de datos para los módulos logísticos (IWM, repuestos, envíos, inspecciones de entrada/salida, TRF)",
              "Tablas dinámicas con filtrado, paginación y ordenación optimizada",
              "Flujos de importación/exportación de archivos y manejo de grandes volúmenes de datos",
              "Autenticación SSO con Keycloak, internacionalización (vue-i18n) y actualizaciones en tiempo real vía WebSocket (STOMP/SockJS)",
              "Optimización del rendimiento (lazy loading, code splitting, componentes reutilizables); testing con Vitest y Cypress, calidad de código con SonarQube",
            ],
          },
          {
            title: "Ferwood — plataforma e-commerce de maquinaria industrial reacondicionada (en sustitución del stack legacy Magento/Elasticsearch):",
            highlights: [
              "Nuevo sitio público multimercado (Next.js 16, React 19, TypeScript, Tailwind): catálogo con filtros data-driven desde OpenSearch, i18n en más de 10 idiomas (next-intl), renovación SEO (metadata, JSON-LD, hreflang, redirecciones 301 + proxy para URLs legacy), CMS Contentful, autenticación y wishlist",
              "API backend a medida (FastAPI, Python 3.13): pipeline de reindexación de Redshift a OpenSearch, APIs de catálogo/búsqueda y recomendación, integración de escritura con Dynamics CRM, emails transaccionales (AWS SES / Microsoft 365)",
              "Despliegue en AWS ECS Fargate detrás de ALB mediante CodePipeline, builds Docker con gates de tests, reindexación automatizada vía EventBridge Scheduler",
              "Herramientas internas (Next.js, React, PrimeReact) en sustitución de las antiguas herramientas Excel de pricing (calculadora \"Prova Prezzi\", lista de precios unificada)",
            ],
          },
          {
            title: "Eni:",
            highlights: ["Corrección de bugs y mantenimiento de interfaces de gestión de datos"],
          },
        ],
      },
      {
        title: "Frontend Developer",
        org: "Elkanodata — Remoto, España",
        period: "Sep 2023 – Jun 2024",
        highlights: [
          "Trabajo junto a dos desarrolladores frontend senior en proyectos para clientes enterprise",
          "Agencias de la ONU: UNAIDS (Let Communities Lead, GCAI), UNFPA (Equity 2030, UHC Assessment Tool), IOM Climate-Related Migration, IFAD RIDE 2023, Peace Begins With Me",
          "Otros clientes: EBU Eurovision News (micrositio de redacción), Covenant House (integración de WordPress como CMS sobre un frontend vanilla existente)",
          "Stack: Nuxt 3, Vue 3, TypeScript, Prismic CMS, WordPress, D3.js, GSAP, Lenis, Swiper, Webpack, Vite",
        ],
      },
      {
        title: "Frontend Developer",
        org: "Teavaro — Remoto, Reino Unido",
        period: "Ago 2022 – Sep 2023",
        highlights: [
          "UTIQ — sitio corporativo de marketing (Vue.js + TypeScript) en apoyo al rebranding de TrustPid a UTIQ y a la expansión en los mercados europeos",
          "Mantenimiento y desarrollo de la plataforma de administración para la gestión de usuarios y datos",
          "Migración de JavaScript a TypeScript para una mayor estabilidad",
          "Implementación de componentes Vue reutilizables y tests automatizados",
          "Colaboración con el equipo backend en la optimización de APIs y caching",
        ],
      },
      {
        title: "Frontend Developer (Freelance, medio tiempo)",
        org: "JADE Solutions — Remoto, Cuba",
        period: "Nov 2022 – Jul 2023",
        highlights: [
          "Luna Tour — SPA Vue 3 + Vite para descubrir destinos turísticos (multilingüe, mobile-first, handoff a WhatsApp)",
          "Páginas CMS, optimización SEO e integración de Google OAuth",
          "Layouts móviles con Ionic y Capacitor",
          "Paneles de administración e-commerce",
        ],
      },
      {
        title: "Full Stack Developer",
        org: "ONAT — Híbrido, Cuba",
        period: "Sep 2019 – Ago 2022",
        highlights: [
          "Desarrollador full-stack en sistemas administrativos internos para la Oficina Nacional de Administración Tributaria (ONAT) de Cuba",
          "Construcción y mantenimiento de una librería de componentes Vue reutilizables, compartida entre múltiples módulos administrativos",
          "Desarrollo backend y modelado de bases de datos con Django, exponiendo APIs REST y GraphQL",
          "Integración de APIs del lado del cliente con caché y optimización del rendering",
          "Iteración de UX basada en el feedback directo de los equipos operativos internos",
          "Permanencia de tres años con responsabilidad creciente sobre áreas y funcionalidades más amplias",
        ],
      },
      {
        title: "Full Stack Developer",
        org: "El Catre — Remoto, Cuba",
        period: "Ago 2019 – Sep 2020",
        highlights: [
          "Desarrollo del frontend de la primera plataforma e-commerce independiente de Cuba: Nuxt 2 + Vue 2 + Vuex + Buefy sobre un cliente Apollo GraphQL",
          "Tiendas de vendedores, catálogo de productos, carrito, checkout y dashboards de analítica para vendedores con ApexCharts",
          "Chat y notificaciones en tiempo real vía WebSocket con Django Channels + Redis",
          "Autenticación federada: verificación telefónica de Firebase, OAuth de Facebook/Google, JWT",
          "PWA y optimización SSR ajustadas a las condiciones de red cubanas; recorte de imágenes y generación de códigos QR",
          "Soporte backend con Django + Graphene (GraphQL): modelado de bases de datos y endpoints de API",
        ],
      },
    ],
    projectsTitle: "Proyectos Freelance",
    projects: [
      {
        title: "ZenO — Mejoras del sitio e integración de email",
        period: "2026",
        highlights: [
          "Mejoras de responsividad, configuración de DNS y redirecciones",
          "Integración de Resend para el envío de cuestionarios al cliente y las suscripciones a la newsletter",
        ],
      },
      {
        title: "Casa in Ordine",
        period: "2025 – 2026",
        highlights: [
          "Sitio multilingüe (IT/EN/ES) para un negocio de organización del hogar con sede en Roma",
          "Next.js 16 + React 19 + Tailwind v4, con un wizard de presupuesto de 9 pasos",
          "Integración de email con Brevo, analítica Umami, consentimiento de cookies GDPR",
        ],
      },
      {
        title: "FreeMock",
        period: "2025 – Presente",
        highlights: [
          "Creador de memes y plataforma social con autenticación mediante wallet web3 (Reown AppKit)",
          "Nuxt 3 + Pinia + shadcn-vue + editor Fabric.js + chat WebSocket con protocolo Signal",
          "Microservicio de renderizado de imágenes en Go + govips; CI/CD con SonarQube y Codecov",
        ],
      },
      {
        title: "BattleBucks — Play-to-Earn en Solana",
        period: "2025",
        highlights: [
          "Juego battle royale y 1v1 PvP con dinero real en Solana, distribuido como PWA y app nativa iOS/Android",
          "Nuxt 3 + Pinia + Reown AppKit para la conexión de wallets Solana y la autenticación SIWX",
          "Store WebSocket a medida para el flujo de juego en tiempo real y chat con lógica de reconexión",
          "Capacitor para builds nativas iOS/Android desde una única base de código Nuxt; Sentry para observabilidad",
        ],
      },
      {
        title: "Cubita Producciones",
        period: "2025",
        highlights: [
          "Sitio trilingüe (ES/EN/IT) para una agencia de talento cubano, con catálogo de artistas y flujo de reservas",
          "Next.js 16 + App Router + Tailwind v4 + next-intl + Framer Motion",
          "CMS Strapi v5 preparado para un futuro traspaso editorial",
        ],
      },
      {
        title: "Gitfast",
        period: "2024",
        highlights: [
          "Colaboración freelance con un cliente en México",
          "Nuevas funcionalidades y una librería de componentes UI reutilizables",
          "Optimización del rendimiento y refactorización del frontend para escalabilidad y legibilidad",
        ],
      },
    ],
    educationTitle: "Formación",
    education: {
      title: "Licenciatura en Informática",
      org: "Universidad de las Ciencias Informáticas (UCI), Cuba",
      period: "2013 – 2019",
      highlights: [
        "Especialización en Java y programación orientada a objetos",
        "Participación en la competición de programación ACM-ICPC",
        "Tesis: desarrollo de un sistema CAD con C++ y Qt",
      ],
    },
    skillsTitle: "Competencias Técnicas",
    skills: {
      "Stack principal": "Vue 3, Nuxt 3, TypeScript, Tailwind CSS, PrimeVue, Pinia, APIs REST, Git",
      Avanzado: "React, Next.js, JavaScript (ES6+), Python, Sass, Vitest, Jest, Cypress, Vite, Webpack, Docker, PWA, SEO, Figma, WordPress, Astro, GSAP, Framer Motion, animaciones Canvas/SVG",
      "Conocimiento práctico": "FastAPI, AWS (ECS/Fargate, OpenSearch, Redshift, SES), PostgreSQL, Contentful, Keycloak, WebSocket (STOMP/SockJS), next-intl, Go, Django, GraphQL, Solana/Web3, Reown AppKit, Firebase, Ionic/Capacitor, Fabric.js, shadcn-vue, D3.js, Prismic, Strapi",
      Herramientas: "VS Code, IntelliJ IDEA, Postman, Insomnia, Trello, Linux",
    },
    languagesTitle: "Idiomas",
    languages: {
      Español: "Nativo",
      Inglés: "Competencia profesional (escrito y hablado)",
      Italiano: "Intermedio (escrito y hablado)",
    },
  },
  it: {
    ...contact,
    location: "Remote, Italia",
    profileTitle: "Profilo Professionale",
    profile:
      "Frontend Developer con oltre 7 anni di esperienza nella progettazione e sviluppo di applicazioni web moderne, performanti e orientate all'utente. Specializzato in Vue.js, Nuxt.js e TypeScript, con esperienza full-stack in React/Next.js e backend Python/FastAPI. Esperienza in progetti per agenzie ONU (UNAIDS, UNFPA, IOM, IFAD), EBU Eurovision, AdTech (UTIQ), settore aerospaziale/logistico (Altec), industria, oltre a ONG e startup. Forte attenzione alla qualità del codice, all'accessibilità, all'ottimizzazione delle performance e all'implementazione di design system. Esperienza nella collaborazione con designer e team backend per realizzare interfacce fluide, scalabili e responsive.",
    experienceTitle: "Esperienza Lavorativa",
    jobs: [
      {
        title: "Frontend Developer / Web Engineer — Progetti Enterprise",
        org: "Datore di lavoro: Dacomat S.r.l. — Partner di delivery: Reply S.p.A.",
        period: "Giu 2025 – Presente",
        highlights: [
          "Sviluppo per clienti enterprise nei settori aerospaziale/logistico (Altec), industriale (Ferwood) ed energetico (Eni).",
        ],
        groups: [
          {
            title: "LISUP (Altec) — sistema web di logistica/gestione magazzino (Vue 3, PrimeVue 4, TypeScript, Tailwind):",
            highlights: [
              "Dashboard interattive e interfacce di gestione dati per i moduli logistici (IWM, ricambi, spedizioni, ispezioni in entrata/uscita, TRF)",
              "Tabelle dinamiche con filtri, paginazione e ordinamento ottimizzato",
              "Flussi di importazione/esportazione file e gestione di grandi volumi di dati",
              "Autenticazione SSO con Keycloak, internazionalizzazione (vue-i18n) e aggiornamenti in tempo reale via WebSocket (STOMP/SockJS)",
              "Ottimizzazione delle performance (lazy loading, code splitting, componenti riutilizzabili); test con Vitest e Cypress, qualità del codice con SonarQube",
            ],
          },
          {
            title: "Ferwood — piattaforma e-commerce per macchinari industriali rigenerati (sostituzione dello stack legacy Magento/Elasticsearch):",
            highlights: [
              "Nuovo sito pubblico multi-mercato (Next.js 16, React 19, TypeScript, Tailwind): catalogo con filtri data-driven da OpenSearch, i18n su oltre 10 lingue (next-intl), revisione SEO (metadata, JSON-LD, hreflang, redirect 301 + proxy per URL legacy), CMS Contentful, autenticazione e wishlist",
              "API backend custom (FastAPI, Python 3.13): pipeline di reindicizzazione da Redshift a OpenSearch, API di catalogo/ricerca e raccomandazione, integrazione in scrittura con Dynamics CRM, email transazionali (AWS SES / Microsoft 365)",
              "Deploy su AWS ECS Fargate dietro ALB tramite CodePipeline, build Docker con gate di test, reindicizzazione automatizzata via EventBridge Scheduler",
              "Strumenti interni (Next.js, React, PrimeReact) in sostituzione dei vecchi tool Excel per il pricing (calcolatore \"Prova Prezzi\", listino prezzi unificato)",
            ],
          },
          {
            title: "Eni:",
            highlights: ["Bug fixing e manutenzione su interfacce di gestione dati"],
          },
        ],
      },
      {
        title: "Frontend Developer",
        org: "Elkanodata — Remote, Spagna",
        period: "Set 2023 – Giu 2024",
        highlights: [
          "Lavoro a fianco di due frontend developer senior su progetti per clienti enterprise",
          "Agenzie ONU: UNAIDS (Let Communities Lead, GCAI), UNFPA (Equity 2030, UHC Assessment Tool), IOM Climate-Related Migration, IFAD RIDE 2023, Peace Begins With Me",
          "Altri clienti: EBU Eurovision News (microsito newsroom), Covenant House (integrazione CMS WordPress su frontend vanilla esistente)",
          "Stack: Nuxt 3, Vue 3, TypeScript, Prismic CMS, WordPress, D3.js, GSAP, Lenis, Swiper, Webpack, Vite",
        ],
      },
      {
        title: "Frontend Developer",
        org: "Teavaro — Remote, Regno Unito",
        period: "Ago 2022 – Set 2023",
        highlights: [
          "UTIQ — sito corporate marketing (Vue.js + TypeScript) a supporto del rebranding da TrustPid a UTIQ e dell'espansione nei mercati europei",
          "Manutenzione e sviluppo della piattaforma di amministrazione per la gestione utenti e dati",
          "Migrazione da JavaScript a TypeScript per una maggiore stabilità",
          "Implementazione di componenti Vue riutilizzabili e test automatizzati",
          "Collaborazione con il backend per l'ottimizzazione delle API e il caching",
        ],
      },
      {
        title: "Frontend Developer (Freelance, part-time)",
        org: "JADE Solutions — Remote, Cuba",
        period: "Nov 2022 – Lug 2023",
        highlights: [
          "Luna Tour — SPA Vue 3 + Vite per la scoperta di destinazioni turistiche (multilingua, mobile-first, handoff su WhatsApp)",
          "Pagine CMS, ottimizzazione SEO e integrazione Google OAuth",
          "Layout mobile con Ionic e Capacitor",
          "Pannelli di amministrazione e-commerce",
        ],
      },
      {
        title: "Full Stack Developer",
        org: "ONAT — Ibrido, Cuba",
        period: "Set 2019 – Ago 2022",
        highlights: [
          "Full-stack developer su sistemi amministrativi interni per l'Ufficio Nazionale dell'Amministrazione Tributaria di Cuba (ONAT)",
          "Realizzazione e manutenzione di una libreria di componenti Vue riutilizzabile, condivisa tra più moduli amministrativi",
          "Sviluppo backend e modellazione database con Django, esponendo API REST e GraphQL",
          "Integrazione API lato client con caching e ottimizzazione del rendering",
          "Iterazione UX basata sul feedback diretto dei team operativi interni",
          "Permanenza di tre anni con crescente responsabilità su aree e funzionalità più ampie",
        ],
      },
      {
        title: "Full Stack Developer",
        org: "El Catre — Remote, Cuba",
        period: "Ago 2019 – Set 2020",
        highlights: [
          "Sviluppo del frontend della prima piattaforma e-commerce indipendente di Cuba: Nuxt 2 + Vue 2 + Vuex + Buefy su client Apollo GraphQL",
          "Storefront per venditori, catalogo prodotti, carrello, checkout e dashboard di analisi per i venditori con ApexCharts",
          "Chat e notifiche in tempo reale via WebSocket con Django Channels + Redis",
          "Autenticazione federata: verifica telefonica Firebase, OAuth Facebook/Google, JWT",
          "PWA e ottimizzazione SSR calibrate per le condizioni di rete cubane; ritaglio immagini e generazione QR code",
          "Supporto backend su Django + Graphene (GraphQL): modellazione database ed endpoint API",
        ],
      },
    ],
    projectsTitle: "Progetti Freelance",
    projects: [
      {
        title: "ZenO — Miglioramenti al sito e integrazione email",
        period: "2026",
        highlights: [
          "Miglioramenti alla responsività, configurazione DNS e redirect",
          "Integrazione Resend per l'invio dei questionari al cliente e per le iscrizioni alla newsletter",
        ],
      },
      {
        title: "Casa in Ordine",
        period: "2025 – 2026",
        highlights: [
          "Sito multilingua (IT/EN/ES) per il riordino domestico, per un'attività con sede a Roma",
          "Next.js 16 + React 19 + Tailwind v4, con wizard di preventivo a 9 step",
          "Integrazione email Brevo, analytics Umami, cookie consent GDPR",
        ],
      },
      {
        title: "FreeMock",
        period: "2025 – Presente",
        highlights: [
          "Meme creator e piattaforma social con autenticazione wallet web3 (Reown AppKit)",
          "Nuxt 3 + Pinia + shadcn-vue + editor Fabric.js + chat WebSocket con protocollo Signal",
          "Microservizio di rendering immagini in Go + govips; CI/CD con SonarQube e Codecov",
        ],
      },
      {
        title: "BattleBucks — Play-to-Earn su Solana",
        period: "2025",
        highlights: [
          "Gioco battle royale e 1v1 PvP con soldi reali su Solana, distribuito come PWA e app nativa iOS/Android",
          "Nuxt 3 + Pinia + Reown AppKit per la connessione wallet Solana e l'autenticazione SIWX",
          "Store WebSocket custom per il flusso di gioco in tempo reale e chat con logica di riconnessione",
          "Capacitor per build native iOS/Android da un'unica base Nuxt; Sentry per l'osservabilità",
        ],
      },
      {
        title: "Cubita Producciones",
        period: "2025",
        highlights: [
          "Sito trilingue (ES/EN/IT) per un'agenzia di talenti cubani, con catalogo artisti e flusso di prenotazione",
          "Next.js 16 + App Router + Tailwind v4 + next-intl + Framer Motion",
          "CMS Strapi v5 predisposto per un futuro passaggio editoriale",
        ],
      },
      {
        title: "Gitfast",
        period: "2024",
        highlights: [
          "Collaborazione freelance con cliente in Messico",
          "Nuove funzionalità e libreria di componenti UI riutilizzabili",
          "Ottimizzazione delle performance e refactoring del frontend per scalabilità e leggibilità",
        ],
      },
    ],
    educationTitle: "Formazione",
    education: {
      title: "Laurea in Informatica",
      org: "Universidad de las Ciencias Informáticas (UCI), Cuba",
      period: "2013 – 2019",
      highlights: [
        "Specializzazione in Java e programmazione orientata agli oggetti",
        "Partecipazione alla competizione ACM-ICPC",
        "Tesi: sviluppo di un sistema CAD con C++ e Qt",
      ],
    },
    skillsTitle: "Competenze Tecniche",
    skills: {
      "Stack principale": "Vue 3, Nuxt 3, TypeScript, Tailwind CSS, PrimeVue, Pinia, API REST, Git",
      "Competenza avanzata": "React, Next.js, JavaScript (ES6+), Python, Sass, Vitest, Jest, Cypress, Vite, Webpack, Docker, PWA, SEO, Figma, WordPress, Astro, GSAP, Framer Motion, animazioni Canvas/SVG",
      "Conoscenza operativa": "FastAPI, AWS (ECS/Fargate, OpenSearch, Redshift, SES), PostgreSQL, Contentful, Keycloak, WebSocket (STOMP/SockJS), next-intl, Go, Django, GraphQL, Solana/Web3, Reown AppKit, Firebase, Ionic/Capacitor, Fabric.js, shadcn-vue, D3.js, Prismic, Strapi",
      Strumenti: "VS Code, IntelliJ IDEA, Postman, Insomnia, Trello, Linux",
    },
    languagesTitle: "Lingue",
    languages: {
      Spagnolo: "Madrelingua",
      Inglese: "Livello professionale (scritto e parlato)",
      Italiano: "Livello intermedio (scritto e parlato)",
    },
  },
};

function ensureSpace(doc, height) {
  if (doc.y + height > CONTENT_BOTTOM) doc.addPage();
}

function bulletStyle(doc) {
  return doc.fontSize(9).font("Helvetica").fillColor(TEXT);
}

function bulletHeight(doc, text) {
  return bulletStyle(doc).heightOfString(text, { width: CONTENT_WIDTH - BULLET_TEXT_INDENT, lineGap: LINE_GAP }) + 1;
}

function bullet(doc, text) {
  ensureSpace(doc, bulletHeight(doc, text));
  const y = doc.y;
  doc.circle(MARGIN + BULLET_INDENT + 2, y + 4.2, 1.3).fill(TEXT);
  bulletStyle(doc).text(text,MARGIN + BULLET_TEXT_INDENT, y, { width: CONTENT_WIDTH - BULLET_TEXT_INDENT, lineGap: LINE_GAP });
  doc.y += 1;
}

function groupTitleHeight(doc, title) {
  return doc.fontSize(9).font("Helvetica-Bold").heightOfString(title, { width: CONTENT_WIDTH, lineGap: LINE_GAP }) + 5;
}

function sectionTitle(doc, title) {
  ensureSpace(doc, 70);
  doc.y += 10;
  doc.fontSize(11).font("Helvetica-Bold").fillColor(BLUE).text(title.toUpperCase(), MARGIN, doc.y);
  const lineY = doc.y + 1;
  doc.moveTo(MARGIN, lineY).lineTo(PAGE_WIDTH - MARGIN, lineY).strokeColor(BLUE).lineWidth(0.75).stroke();
  doc.y = lineY + 7;
}

// Entry = bold title with right-aligned period, optional italic org line, bullets and optional titled bullet groups
function entry(doc, { title, org, period, highlights, groups = [] }) {
  const periodWidth = doc.fontSize(9).font("Helvetica-Bold").widthOfString(period);
  const titleWidth = CONTENT_WIDTH - periodWidth - 12;
  const headerHeight =
    doc.fontSize(10).font("Helvetica-Bold").heightOfString(title, { width: titleWidth }) +
    (org ? 13 : 2);
  const bulletsHeight = highlights.reduce((sum, h) => sum + bulletHeight(doc, h), 0);

  // Short entries stay on one page; grouped ones only keep the header with its first bullets
  ensureSpace(doc, headerHeight + bulletsHeight + (groups.length ? groupTitleHeight(doc, groups[0].title) : 0));

  const y = doc.y;
  doc.fontSize(9).font("Helvetica-Bold").fillColor(GRAY).text(period, MARGIN, y + 1, { width: CONTENT_WIDTH, align: "right", lineBreak: false });
  doc.fontSize(10).font("Helvetica-Bold").fillColor(TEXT).text(title, MARGIN, y, { width: titleWidth });
  if (org) {
    doc.fontSize(9).font("Helvetica-Oblique").fillColor(GRAY).text(org, MARGIN + BULLET_INDENT, doc.y + 1, { width: CONTENT_WIDTH - BULLET_INDENT });
  }
  doc.y += 2;

  for (const h of highlights) bullet(doc, h);

  for (const group of groups) {
    ensureSpace(doc, groupTitleHeight(doc, group.title) + bulletHeight(doc, group.highlights[0]));
    doc.y += 3;
    doc.fontSize(9).font("Helvetica-Bold").fillColor(TEXT).text(group.title, MARGIN + BULLET_INDENT, doc.y, { width: CONTENT_WIDTH - BULLET_INDENT, lineGap: LINE_GAP });
    doc.y += 1;
    for (const h of group.highlights) bullet(doc, h);
  }

  doc.y += 8;
}

function header(doc, data) {
  doc.fontSize(26).font("Helvetica-Bold").fillColor(BLUE).text(data.name, MARGIN, doc.y);
  doc.fontSize(13).font("Helvetica").fillColor(TEXT).text(data.title, MARGIN, doc.y);
  doc.y += 3;

  const separator = "  |  ";
  const parts = [
    { text: data.location },
    { text: data.phone },
    { text: data.email, link: `mailto:${data.email}` },
    { text: data.github, link: `https://${data.github}` },
    { text: data.linkedin, link: `https://www.${data.linkedin}` },
  ];
  doc.fontSize(9).font("Helvetica").fillColor(GRAY);
  const lineHeight = doc.currentLineHeight() + 3;
  const separatorWidth = doc.widthOfString(separator);
  let x = MARGIN;
  let y = doc.y;
  // Placed part by part so a line only ever breaks at a separator, never inside a URL
  parts.forEach((part, i) => {
    const width = doc.widthOfString(part.text);
    if (x + width > PAGE_WIDTH - MARGIN) {
      x = MARGIN;
      y += lineHeight;
    }
    doc.text(part.text, x, y, { lineBreak: false });
    if (part.link) doc.link(x, y, width, doc.currentLineHeight(), part.link);
    x += width;
    if (i < parts.length - 1) {
      doc.text(separator, x, y, { lineBreak: false });
      x += separatorWidth;
    }
  });
  doc.x = MARGIN;
  doc.y = y + lineHeight + 2;
}

function footer(doc, data) {
  const range = doc.bufferedPageRange();
  for (let i = 0; i < range.count; i++) {
    doc.switchToPage(range.start + i);
    // Footer sits inside the bottom margin; zero it so pdfkit doesn't push the text to a new page
    doc.page.margins.bottom = 0;
    doc
      .fontSize(8)
      .font("Helvetica")
      .fillColor(GRAY)
      .text(`${data.name} — CV — ${i + 1}`, MARGIN, PAGE_HEIGHT - 42, { width: CONTENT_WIDTH, align: "right", lineBreak: false });
  }
}

function generateCV(lang) {
  const data = cvData[lang];
  const doc = new PDFDocument({
    size: "A4",
    margins: { top: 50, bottom: 50, left: MARGIN, right: MARGIN },
    bufferPages: true,
    info: { Title: `${data.name} — CV`, Author: data.name },
  });
  const outPath = path.join(__dirname, "..", "public", "cv", `eduardo-castillo-cv-${lang}.pdf`);
  const stream = fs.createWriteStream(outPath);
  doc.pipe(stream);

  header(doc, data);

  // Profile
  sectionTitle(doc, data.profileTitle);
  doc.fontSize(9).font("Helvetica").fillColor(TEXT).text(data.profile, MARGIN, doc.y, { width: CONTENT_WIDTH, lineGap: 2 });
  doc.y += 4;

  // Experience
  sectionTitle(doc, data.experienceTitle);
  for (const job of data.jobs) entry(doc, job);

  // Freelance projects
  sectionTitle(doc, data.projectsTitle);
  for (const project of data.projects) entry(doc, project);

  // Education
  sectionTitle(doc, data.educationTitle);
  entry(doc, data.education);

  // Skills
  sectionTitle(doc, data.skillsTitle);
  for (const [category, skills] of Object.entries(data.skills)) {
    const options = { width: CONTENT_WIDTH, lineGap: LINE_GAP };
    ensureSpace(doc, doc.fontSize(9).font("Helvetica").heightOfString(`${category}: ${skills}`, options));
    doc.font("Helvetica-Bold").fillColor(TEXT).text(`${category}: `, MARGIN, doc.y, { ...options, continued: true });
    doc.font("Helvetica").text(skills, options);
    doc.y += 3;
  }

  // Languages
  sectionTitle(doc, data.languagesTitle);
  const languages = Object.entries(data.languages);
  languages.forEach(([language, level], i) => {
    const last = i === languages.length - 1;
    const options = { width: CONTENT_WIDTH, lineGap: LINE_GAP, continued: true };
    doc.fontSize(9).font("Helvetica-Bold").fillColor(TEXT);
    if (i === 0) doc.text(`${language}: `, MARGIN, doc.y, options);
    else doc.text(`${language}: `, options);
    doc.font("Helvetica").text(last ? level : `${level}   |   `, { ...options, continued: !last });
  });

  footer(doc, data);

  doc.end();
  return new Promise((resolve) => stream.on("finish", () => { console.log(`Generated: ${outPath}`); resolve(); }));
}

async function main() {
  fs.mkdirSync(path.join(__dirname, "..", "public", "cv"), { recursive: true });
  await Promise.all([generateCV("en"), generateCV("es"), generateCV("it")]);
}

if (require.main === module) main();

module.exports = { cvData };
