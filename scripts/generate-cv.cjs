const PDFDocument = require("pdfkit");
const fs = require("fs");
const path = require("path");

const MARGIN = 50;
const PAGE_WIDTH = 595.28; // A4
const CONTENT_WIDTH = PAGE_WIDTH - MARGIN * 2;

const cvData = {
  en: {
    name: "Eduardo Castillo",
    title: "Frontend Developer / Web Engineer",
    location: "Remote, Italy",
    phone: "+39 348 3448387",
    email: "sir.edwardcastle@gmail.com",
    github: "edwardcastle",
    linkedin: "eduardo-castillo-dev",
    profileTitle: "Professional Profile",
    profile:
      "Frontend Developer with over 6 years of experience designing and developing modern, high-performance, user-oriented web applications. Specialized in Vue.js, Nuxt.js, and TypeScript, with web work spanning UN agencies (UNAIDS, UNFPA, IOM, IFAD), EBU Eurovision, AdTech (UTIQ), NGOs, and startups. Strong focus on code quality, accessibility, performance optimization, and design-system implementation. Experienced collaborating with designers and backend teams to deliver fluid, scalable, responsive interfaces.",
    experienceTitle: "Work Experience",
    jobs: [
      {
        company: "Frontend Developer -- Enterprise Projects",
        role: "Employer: Dacomat S.r.l. - Delivery partner: Reply S.p.A.",
        location: "Remote, Italy",
        period: "Jun 2025 - Present",
        highlights: [
          "Frontend development for enterprise clients in the energy and industrial sectors",
          "Interactive dashboards and data management interfaces built with Vue 3 and TypeScript",
          "Dynamic tables with filtering, pagination, and optimized sorting",
          "File import/export flows and large-dataset handling",
          "Performance optimization: lazy loading, code splitting, reusable component libraries",
        ],
      },
      {
        company: "Elkanodata",
        role: "Frontend Developer",
        location: "Remote, Spain",
        period: "Sep 2023 - Jun 2024",
        highlights: [
          "Worked alongside two senior frontend developers on enterprise client engagements",
          "UN agencies: UNAIDS (Let Communities Lead, GCAI), UNFPA (Equity 2030, UHC Assessment Tool), IOM Climate-Related Migration, IFAD RIDE 2023, Peace Begins With Me",
          "Other clients: EBU Eurovision News (newsroom microsite), Covenant House (WordPress CMS integration on existing vanilla frontend)",
          "Stack: Nuxt 3, Vue 3, TypeScript, Prismic CMS, WordPress, D3.js, GSAP, Lenis, Swiper, Webpack, Vite",
        ],
      },
      {
        company: "Teavaro",
        role: "Frontend Developer",
        location: "Remote, UK",
        period: "Aug 2022 - Sep 2023",
        highlights: [
          "UTIQ -- corporate marketing site (Vue.js + TypeScript) supporting the TrustPid-to-UTIQ rebrand and expansion across European markets",
          "Admin platform maintenance and development for user and data management",
          "JavaScript to TypeScript migration for improved stability",
          "Reusable Vue components and automated testing implementation",
          "Backend collaboration for API optimization and caching",
        ],
      },
      {
        company: "JADE Solutions",
        role: "Frontend Developer (Freelance, part-time)",
        location: "Remote, Cuba",
        period: "Nov 2022 - Jul 2023",
        highlights: [
          "Luna Tour -- Vue 3 + Vite SPA for travel destination discovery (multilingual, mobile-first, WhatsApp handoff)",
          "CMS pages, SEO optimization, and Google OAuth integration",
          "Mobile layouts with Ionic and Capacitor",
          "E-commerce admin panels",
        ],
      },
      {
        company: "ONAT",
        role: "Frontend Developer",
        location: "Hybrid, Cuba",
        period: "Sep 2019 - Aug 2022",
        highlights: [
          "Frontend developer on internal administrative systems for Cuba's National Tax Administration Office (ONAT)",
          "Built and maintained a reusable Vue component library shared across multiple admin modules",
          "REST and GraphQL API integration with client-side caching and rendering optimization",
          "Iterated UX based on direct feedback from internal operational teams",
          "Three-year tenure with progressive ownership of larger surfaces and feature areas",
        ],
      },
      {
        company: "El Catre",
        role: "Frontend Developer",
        location: "Remote, Cuba",
        period: "Aug 2019 - Sep 2020",
        highlights: [
          "Built the frontend of Cuba's first independent e-commerce platform: Nuxt 2 + Vue 2 + Vuex + Buefy on an Apollo GraphQL client",
          "Seller storefronts, product catalog, cart, checkout, and seller analytics dashboards with ApexCharts",
          "Real-time chat and notifications over WebSockets backed by Django Channels + Redis",
          "Federated auth: Firebase phone verification, Facebook/Google OAuth, JWT",
          "PWA + SSR optimization tuned for Cuban network conditions; image cropping and QR code generation",
          "Backend support on Django + Graphene as secondary contributor (not the primary backend developer)",
        ],
      },
    ],
    personalProjectsTitle: "Freelance Projects",
    personalProjects: [
      {
        name: "ZenO -- Site Improvements & Email Integration",
        period: "2026",
        highlights: [
          "Responsiveness improvements, DNS and redirect setup",
          "Resend integration for questionnaire delivery to client and newsletter subscriptions",
        ],
      },
      {
        name: "Casa in Ordine",
        period: "2025-2026",
        highlights: [
          "Multilingual (IT/EN/ES) home-organization site for a Rome-based business",
          "Next.js 16 + React 19 + Tailwind v4, with 9-step Preventivo quote wizard",
          "Brevo email integration, Umami analytics, GDPR cookie consent",
        ],
      },
      {
        name: "FreeMock",
        period: "2025-present",
        highlights: [
          "Meme creator and social platform with web3 wallet auth (Reown AppKit)",
          "Nuxt 3 + Pinia + shadcn-vue + Fabric.js editor + WebSocket chat with Signal Protocol",
          "Go + govips image-rendering microservice; CI/CD with SonarQube and Codecov",
        ],
      },
      {
        name: "BattleBucks -- Play-to-Earn on Solana",
        period: "2025",
        highlights: [
          "Real-money battle royale and 1v1 PvP game on Solana, distributed as PWA and native iOS/Android",
          "Nuxt 3 + Pinia + Reown AppKit for Solana wallet connect and SIWX authentication",
          "Custom WebSocket store for real-time match flow and chat with reconnect logic",
          "Capacitor for native iOS/Android builds from a single Nuxt source; Sentry for observability",
        ],
      },
      {
        name: "Cubita Producciones",
        period: "2025",
        highlights: [
          "Trilingual (ES/EN/IT) Cuban talent agency site with artist catalog and booking flow",
          "Next.js 16 + App Router + Tailwind v4 + next-intl + Framer Motion",
          "Strapi v5 CMS scaffolded for eventual editorial cutover",
        ],
      },
      {
        name: "Gitfast",
        period: "2024",
        highlights: [
          "Mexico-based freelance engagement",
          "New features and reusable UI component library",
          "Performance optimization and frontend refactoring for scalability and readability",
        ],
      },
    ],
    educationTitle: "Education",
    education: {
      school: "UCI University",
      degree: "Computer Science Degree",
      location: "Cuba",
      period: "2013 - 2019",
      highlights: [
        "Specialization in Java and object-oriented programming",
        "ACM-ICPC competition participation",
        "Thesis: CAD system development with C++ and Qt",
      ],
    },
    skillsTitle: "Technical Skills",
    skills: {
      "Core Stack": "Vue 3, Nuxt 3, TypeScript, Tailwind CSS, PrimeVue, Pinia, REST APIs, Git",
      Proficient: "React, Next.js, JavaScript (ES6+), Sass, Vitest, Jest, Vite, Webpack, Docker, PWA, SEO, Figma, WordPress, Astro, GSAP, Framer Motion",
      "Working Knowledge": "Go, Python, Django, GraphQL, Solana/Web3, Reown AppKit, Firebase, Ionic/Capacitor, Canvas/SVG animations, Fabric.js, shadcn-vue, D3.js, Prismic, Strapi",
      Tools: "VS Code, IntelliJ IDEA, Postman, Insomnia, Trello, Linux",
    },
    languagesTitle: "Languages",
    languages: {
      Spanish: "Native",
      English: "Professional (written and spoken)",
      Italian: "Intermediate (written and spoken)",
    },
  },
  es: {
    name: "Eduardo Castillo",
    title: "Frontend Developer / Web Engineer",
    location: "Remoto, Italia",
    phone: "+39 348 3448387",
    email: "sir.edwardcastle@gmail.com",
    github: "edwardcastle",
    linkedin: "eduardo-castillo-dev",
    profileTitle: "Perfil Profesional",
    profile:
      "Desarrollador Frontend con m\u00e1s de 6 a\u00f1os de experiencia en el dise\u00f1o y desarrollo de aplicaciones web modernas, de alto rendimiento y orientadas al usuario. Especializado en Vue.js, Nuxt.js y TypeScript, con trabajo web abarcando agencias de la ONU (UNAIDS, UNFPA, IOM, IFAD), EBU Eurovision, AdTech (UTIQ), ONGs y startups. Fuerte enfoque en la calidad del c\u00f3digo, accesibilidad, optimizaci\u00f3n del rendimiento e implementaci\u00f3n de sistemas de dise\u00f1o. Experiencia colaborando con dise\u00f1adores y equipos backend para entregar interfaces fluidas, escalables y responsive.",
    experienceTitle: "Experiencia Laboral",
    jobs: [
      {
        company: "Frontend Developer -- Proyectos Enterprise",
        role: "Empleador: Dacomat S.r.l. - Partner de entrega: Reply S.p.A.",
        location: "Remoto, Italia",
        period: "Jun 2025 - Presente",
        highlights: [
          "Desarrollo frontend para clientes enterprise en los sectores de energ\u00eda e industria",
          "Dashboards interactivos e interfaces de gesti\u00f3n de datos con Vue 3 y TypeScript",
          "Tablas din\u00e1micas con filtrado, paginaci\u00f3n y ordenaci\u00f3n optimizada",
          "Flujos de importaci\u00f3n/exportaci\u00f3n de archivos y manejo de grandes vol\u00famenes de datos",
          "Optimizaci\u00f3n de rendimiento: lazy loading, code splitting, librer\u00edas de componentes reutilizables",
        ],
      },
      {
        company: "Elkanodata",
        role: "Frontend Developer",
        location: "Remoto, Espa\u00f1a",
        period: "Sep 2023 - Jun 2024",
        highlights: [
          "Trabaj\u00e9 junto a dos desarrolladores frontend senior en proyectos para clientes enterprise",
          "Agencias de la ONU: UNAIDS (Let Communities Lead, GCAI), UNFPA (Equity 2030, Herramienta UHC), IOM Migraci\u00f3n Clim\u00e1tica, IFAD RIDE 2023, Peace Begins With Me",
          "Otros clientes: EBU Eurovision News (microsite de noticias), Covenant House (integraci\u00f3n de WordPress como CMS sobre frontend vanilla existente)",
          "Stack: Nuxt 3, Vue 3, TypeScript, Prismic CMS, WordPress, D3.js, GSAP, Lenis, Swiper, Webpack, Vite",
        ],
      },
      {
        company: "Teavaro",
        role: "Frontend Developer",
        location: "Remoto, Reino Unido",
        period: "Ago 2022 - Sep 2023",
        highlights: [
          "UTIQ -- sitio corporativo (Vue.js + TypeScript) acompa\u00f1ando el rebrand TrustPid-a-UTIQ y la expansi\u00f3n por mercados europeos",
          "Mantenimiento y desarrollo de plataforma admin para gesti\u00f3n de usuarios y datos",
          "Migraci\u00f3n de JavaScript a TypeScript para mayor estabilidad",
          "Componentes Vue reutilizables e implementaci\u00f3n de tests automatizados",
          "Colaboraci\u00f3n con backend para optimizaci\u00f3n de API y caching",
        ],
      },
      {
        company: "JADE Solutions",
        role: "Frontend Developer (Freelance, medio tiempo)",
        location: "Remoto, Cuba",
        period: "Nov 2022 - Jul 2023",
        highlights: [
          "Luna Tour -- SPA Vue 3 + Vite para descubrimiento de destinos de viaje (multiling\u00fce, mobile-first, handoff a WhatsApp)",
          "P\u00e1ginas CMS, optimizaci\u00f3n SEO y Google OAuth",
          "Layouts m\u00f3viles con Ionic y Capacitor",
          "Paneles de administraci\u00f3n e-commerce",
        ],
      },
      {
        company: "ONAT",
        role: "Frontend Developer",
        location: "H\u00edbrido, Cuba",
        period: "Sep 2019 - Ago 2022",
        highlights: [
          "Desarrollador frontend en sistemas administrativos internos para la Oficina Nacional de Administraci\u00f3n Tributaria (ONAT) de Cuba",
          "Constru\u00ed y mantuve una librer\u00eda de componentes Vue reutilizables compartida entre m\u00faltiples m\u00f3dulos admin",
          "Integraci\u00f3n de APIs REST y GraphQL con cach\u00e9 del lado del cliente y optimizaci\u00f3n de rendering",
          "Iteraci\u00f3n de UX basada en feedback directo de equipos operativos internos",
          "Tenencia de tres a\u00f1os con propiedad progresiva sobre superficies y \u00e1reas funcionales m\u00e1s amplias",
        ],
      },
      {
        company: "El Catre",
        role: "Frontend Developer",
        location: "Remoto, Cuba",
        period: "Ago 2019 - Sep 2020",
        highlights: [
          "Constru\u00ed el frontend de la primera plataforma e-commerce independiente de Cuba: Nuxt 2 + Vue 2 + Vuex + Buefy sobre un cliente Apollo GraphQL",
          "Tiendas de vendedores, cat\u00e1logo de productos, carrito, checkout y dashboards de anal\u00edtica con ApexCharts",
          "Chat y notificaciones en tiempo real sobre WebSockets respaldado por Django Channels + Redis",
          "Autenticaci\u00f3n federada: verificaci\u00f3n telef\u00f3nica de Firebase, OAuth de Facebook/Google, JWT",
          "Optimizaci\u00f3n PWA + SSR ajustada para condiciones de red cubanas; recorte de im\u00e1genes y generaci\u00f3n de QR",
          "Soporte al backend en Django + Graphene como contribuidor secundario (no el desarrollador backend principal)",
        ],
      },
    ],
    personalProjectsTitle: "Proyectos Freelance",
    personalProjects: [
      {
        name: "ZenO -- Mejoras del Sitio e Integraci\u00f3n de Email",
        period: "2026",
        highlights: [
          "Mejoras de responsividad, configuraci\u00f3n de DNS y redirecciones",
          "Integraci\u00f3n de Resend para entrega de cuestionarios al cliente y suscripciones al newsletter",
        ],
      },
      {
        name: "Casa in Ordine",
        period: "2025-2026",
        highlights: [
          "Sitio multiling\u00fce (IT/EN/ES) de organizaci\u00f3n del hogar para un negocio romano",
          "Next.js 16 + React 19 + Tailwind v4, con wizard de Preventivo de 9 pasos",
          "Integraci\u00f3n de Brevo para email, anal\u00edtica Umami, consentimiento de cookies GDPR",
        ],
      },
      {
        name: "FreeMock",
        period: "2025-presente",
        highlights: [
          "Creador de memes y plataforma social con autenticaci\u00f3n web3 (Reown AppKit)",
          "Nuxt 3 + Pinia + shadcn-vue + editor Fabric.js + chat WebSocket con Signal Protocol",
          "Microservicio Go + govips para renderizado de im\u00e1genes; CI/CD con SonarQube y Codecov",
        ],
      },
      {
        name: "BattleBucks -- Play-to-Earn en Solana",
        period: "2025",
        highlights: [
          "Juego battle royale y 1v1 PvP con dinero real sobre Solana, distribuido como PWA y nativo iOS/Android",
          "Nuxt 3 + Pinia + Reown AppKit para wallet connect Solana y autenticaci\u00f3n SIWX",
          "Store WebSocket propio para flujo de partida en tiempo real y chat con l\u00f3gica de reconexi\u00f3n",
          "Capacitor para builds nativas iOS/Android desde \u00fanica fuente Nuxt; Sentry para observabilidad",
        ],
      },
      {
        name: "Cubita Producciones",
        period: "2025",
        highlights: [
          "Sitio triling\u00fce (ES/EN/IT) para agencia de talento cubano con cat\u00e1logo de artistas y flujo de booking",
          "Next.js 16 + App Router + Tailwind v4 + next-intl + Framer Motion",
          "CMS Strapi v5 scaffolded para eventual cambio editorial",
        ],
      },
      {
        name: "Gitfast",
        period: "2024",
        highlights: [
          "Engagement freelance con cliente basado en M\u00e9xico",
          "Nuevas funcionalidades y librer\u00eda de componentes UI reutilizables",
          "Optimizaci\u00f3n de rendimiento y refactorizaci\u00f3n frontend para escalabilidad y legibilidad",
        ],
      },
    ],
    educationTitle: "Formaci\u00f3n",
    education: {
      school: "Universidad UCI",
      degree: "Licenciatura en Inform\u00e1tica",
      location: "Cuba",
      period: "2013 - 2019",
      highlights: [
        "Especializaci\u00f3n en Java y programaci\u00f3n orientada a objetos",
        "Participaci\u00f3n en competiciones ACM-ICPC",
        "Tesis: desarrollo de sistema CAD en C++ con Qt",
      ],
    },
    skillsTitle: "Competencias T\u00e9cnicas",
    skills: {
      "Stack Principal": "Vue 3, Nuxt 3, TypeScript, Tailwind CSS, PrimeVue, Pinia, REST APIs, Git",
      Competente: "React, Next.js, JavaScript (ES6+), Sass, Vitest, Jest, Vite, Webpack, Docker, PWA, SEO, Figma, WordPress, Astro, GSAP, Framer Motion",
      "Conocimiento Pr\u00e1ctico": "Go, Python, Django, GraphQL, Solana/Web3, Reown AppKit, Firebase, Ionic/Capacitor, Canvas/SVG, Fabric.js, shadcn-vue, D3.js, Prismic, Strapi",
      Herramientas: "VS Code, IntelliJ IDEA, Postman, Insomnia, Trello, Linux",
    },
    languagesTitle: "Idiomas",
    languages: {
      "Espa\u00f1ol": "Nativo",
      "Ingl\u00e9s": "Profesional (escrito y hablado)",
      Italiano: "Intermedio (escrito y hablado)",
    },
  },
  it: {
    name: "Eduardo Castillo",
    title: "Frontend Developer / Web Engineer",
    location: "Remoto, Italia",
    phone: "+39 348 3448387",
    email: "sir.edwardcastle@gmail.com",
    github: "edwardcastle",
    linkedin: "eduardo-castillo-dev",
    profileTitle: "Profilo Professionale",
    profile:
      "Sviluppatore Frontend con oltre 6 anni di esperienza nella progettazione e nello sviluppo di applicazioni web moderne, performanti e orientate all'utente. Specializzato in Vue.js, Nuxt.js e TypeScript, con lavori web che spaziano da agenzie ONU (UNAIDS, UNFPA, IOM, IFAD), EBU Eurovision, AdTech (UTIQ), ONG e startup. Forte attenzione alla qualit\u00e0 del codice, accessibilit\u00e0, ottimizzazione delle performance e implementazione di design system. Abituato a collaborare con designer e team backend per consegnare interfacce fluide, scalabili e responsive.",
    experienceTitle: "Esperienza Lavorativa",
    jobs: [
      {
        company: "Frontend Developer -- Progetti Enterprise",
        role: "Datore di lavoro: Dacomat S.r.l. - Partner di delivery: Reply S.p.A.",
        location: "Remoto, Italia",
        period: "Giu 2025 - Presente",
        highlights: [
          "Sviluppo frontend per clienti enterprise nei settori energia e industria",
          "Dashboard interattive e interfacce di gestione dati con Vue 3 e TypeScript",
          "Tabelle dinamiche con filtri, paginazione e ordinamento ottimizzato",
          "Flussi di import/export di file e gestione di grandi volumi di dati",
          "Ottimizzazione delle performance: lazy loading, code splitting, librerie di componenti riutilizzabili",
        ],
      },
      {
        company: "Elkanodata",
        role: "Frontend Developer",
        location: "Remoto, Spagna",
        period: "Set 2023 - Giu 2024",
        highlights: [
          "Ho lavorato insieme a due sviluppatori frontend senior su progetti per clienti enterprise",
          "Agenzie ONU: UNAIDS (Let Communities Lead, GCAI), UNFPA (Equity 2030, Strumento UHC), IOM Migrazione Climatica, IFAD RIDE 2023, Peace Begins With Me",
          "Altri clienti: EBU Eurovision News (microsito di notizie), Covenant House (integrazione di WordPress come CMS su frontend vanilla esistente)",
          "Stack: Nuxt 3, Vue 3, TypeScript, Prismic CMS, WordPress, D3.js, GSAP, Lenis, Swiper, Webpack, Vite",
        ],
      },
      {
        company: "Teavaro",
        role: "Frontend Developer",
        location: "Remoto, Regno Unito",
        period: "Ago 2022 - Set 2023",
        highlights: [
          "UTIQ -- sito corporate (Vue.js + TypeScript) a supporto del rebrand da TrustPid a UTIQ e dell'espansione nei mercati europei",
          "Manutenzione e sviluppo piattaforma admin per gestione utenti e dati",
          "Migrazione codice JavaScript a TypeScript per maggiore stabilit\u00e0",
          "Creazione componenti Vue riutilizzabili e implementazione test automatici",
          "Collaborazione con backend per ottimizzazione API e caching",
        ],
      },
      {
        company: "JADE Solutions",
        role: "Frontend Developer (Freelance, part-time)",
        location: "Remoto, Cuba",
        period: "Nov 2022 - Lug 2023",
        highlights: [
          "Luna Tour -- SPA Vue 3 + Vite per la scoperta di destinazioni di viaggio (multilingue, mobile-first, handoff a WhatsApp)",
          "Implementazione pagine CMS e ottimizzazione SEO",
          "Integrazione autenticazione Google OAuth e API dinamiche",
          "Creazione layout mobile con Ionic e Capacitor",
        ],
      },
      {
        company: "ONAT",
        role: "Frontend Developer",
        location: "Ibrido, Cuba",
        period: "Set 2019 - Ago 2022",
        highlights: [
          "Sviluppatore frontend su sistemi amministrativi interni per l'Ufficio Nazionale di Amministrazione Tributaria (ONAT) di Cuba",
          "Ho costruito e mantenuto una libreria di componenti Vue riutilizzabili condivisa tra più moduli admin",
          "Integrazione di API REST e GraphQL con caching lato client e ottimizzazione del rendering",
          "Iterazione UX basata su feedback diretto dei team operativi interni",
          "Permanenza di tre anni con proprietà progressiva di superfici e aree funzionali più ampie",
        ],
      },
      {
        company: "El Catre",
        role: "Frontend Developer",
        location: "Remoto, Cuba",
        period: "Ago 2019 - Set 2020",
        highlights: [
          "Ho costruito il frontend della prima piattaforma e-commerce indipendente di Cuba: Nuxt 2 + Vue 2 + Vuex + Buefy su un client Apollo GraphQL",
          "Vetrine venditori, catalogo prodotti, carrello, checkout e dashboard di analytics con ApexCharts",
          "Chat e notifiche in tempo reale su WebSocket basate su Django Channels + Redis",
          "Autenticazione federata: verifica telefonica Firebase, OAuth Facebook/Google, JWT",
          "Ottimizzazione PWA + SSR calibrata per le condizioni di rete cubane; ritaglio immagini e generazione QR",
          "Supporto al backend Django + Graphene come contributore secondario (non sviluppatore backend principale)",
        ],
      },
    ],
    personalProjectsTitle: "Progetti Freelance",
    personalProjects: [
      {
        name: "ZenO -- Miglioramenti del Sito e Integrazione Email",
        period: "2026",
        highlights: [
          "Miglioramenti di responsività, configurazione DNS e redirect",
          "Integrazione di Resend per la consegna dei questionari al cliente e le iscrizioni alla newsletter",
        ],
      },
      {
        name: "Casa in Ordine",
        period: "2025-2026",
        highlights: [
          "Sito multilingue (IT/EN/ES) di organizzazione della casa per un'attività romana",
          "Next.js 16 + React 19 + Tailwind v4, con wizard Preventivo di 9 step",
          "Integrazione Brevo per email, analytics Umami, consenso cookie GDPR",
        ],
      },
      {
        name: "FreeMock",
        period: "2025-presente",
        highlights: [
          "Creatore di meme e piattaforma social con autenticazione web3 (Reown AppKit)",
          "Nuxt 3 + Pinia + shadcn-vue + editor Fabric.js + chat WebSocket con Signal Protocol",
          "Microservizio Go + govips per rendering immagini; CI/CD con SonarQube e Codecov",
        ],
      },
      {
        name: "BattleBucks -- Play-to-Earn su Solana",
        period: "2025",
        highlights: [
          "Gioco battle royale e 1v1 PvP con denaro reale su Solana, distribuito come PWA e nativo iOS/Android",
          "Nuxt 3 + Pinia + Reown AppKit per wallet connect Solana e autenticazione SIWX",
          "Store WebSocket custom per il flusso di partita in tempo reale e chat con logica di riconnessione",
          "Capacitor per build native iOS/Android da unica sorgente Nuxt; Sentry per l'osservabilità",
        ],
      },
      {
        name: "Cubita Producciones",
        period: "2025",
        highlights: [
          "Sito trilingue (ES/EN/IT) per agenzia di talento cubano con catalogo artisti e flusso di booking",
          "Next.js 16 + App Router + Tailwind v4 + next-intl + Framer Motion",
          "CMS Strapi v5 scaffolded per eventuale switch editoriale",
        ],
      },
      {
        name: "Gitfast",
        period: "2024",
        highlights: [
          "Engagement freelance con cliente basato in Messico",
          "Nuove funzionalità e libreria di componenti UI riutilizzabili",
          "Ottimizzazione delle performance e refactoring frontend per scalabilità e leggibilità",
        ],
      },
    ],
    educationTitle: "Formazione",
    education: {
      school: "Universit\u00e0 UCI",
      degree: "Laurea in Informatica",
      location: "Cuba",
      period: "2013 - 2019",
      highlights: [
        "Specializzazione in Java e programmazione orientata agli oggetti",
        "Partecipazione competizioni ACM-ICPC",
        "Tesi: sviluppo sistema CAD in C++ con Qt",
      ],
    },
    skillsTitle: "Competenze Tecniche",
    skills: {
      "Stack Principale": "Vue 3, Nuxt 3, TypeScript, Tailwind CSS, PrimeVue, Pinia, REST APIs, Git",
      Competente: "React, Next.js, JavaScript (ES6+), Sass, Vitest, Jest, Vite, Webpack, Docker, PWA, SEO, Figma, WordPress, Astro, GSAP, Framer Motion",
      "Conoscenza Pratica": "Go, Python, Django, GraphQL, Solana/Web3, Reown AppKit, Firebase, Ionic/Capacitor, Canvas/SVG, Fabric.js, shadcn-vue, D3.js, Prismic, Strapi",
      Strumenti: "VS Code, IntelliJ IDEA, Postman, Insomnia, Trello, Linux",
    },
    languagesTitle: "Lingue",
    languages: {
      Spagnolo: "Madrelingua",
      Inglese: "Professionale (scritto e parlato)",
      Italiano: "Intermedio (scritto e parlato)",
    },
  },
};

function drawLine(doc, y) {
  doc
    .moveTo(MARGIN, y)
    .lineTo(PAGE_WIDTH - MARGIN, y)
    .strokeColor("#999999")
    .lineWidth(0.5)
    .stroke();
}

function sectionTitle(doc, title) {
  const y = doc.y;
  doc.fontSize(13).font("Helvetica-Bold").text(title, MARGIN, y);
  drawLine(doc, doc.y + 2);
  doc.moveDown(0.5);
}

function generateCV(lang) {
  const data = cvData[lang];
  const doc = new PDFDocument({ size: "A4", margin: MARGIN });
  const outPath = path.join(__dirname, "..", "public", "cv", `eduardo-castillo-cv-${lang}.pdf`);
  const stream = fs.createWriteStream(outPath);
  doc.pipe(stream);

  // Header
  doc.fontSize(24).font("Helvetica-Bold").text("Eduardo ", { continued: true });
  doc.font("Helvetica-Bold").text("Castillo", { continued: true });
  doc.font("Helvetica").fontSize(24).text(` | ${data.title}`, { align: "center" });
  doc.moveDown(0.2);
  doc.fontSize(10).font("Helvetica").fillColor("#555555");
  doc.text(data.location, { align: "center" });
  doc.text(
    `${data.phone}  |  ${data.email}  |  github.com/${data.github}  |  linkedin.com/in/${data.linkedin}`,
    { align: "center" }
  );
  doc.fillColor("#000000");
  doc.moveDown(1);

  // Profile
  sectionTitle(doc, data.profileTitle);
  doc.fontSize(9.5).font("Helvetica").text(data.profile, { lineGap: 2 });
  doc.moveDown(0.8);

  // Experience
  sectionTitle(doc, data.experienceTitle);
  for (const job of data.jobs) {
    // Check if we need a new page
    if (doc.y > 700) doc.addPage();

    doc.fontSize(10).font("Helvetica-Bold").text(job.company, MARGIN, doc.y, { continued: true, width: CONTENT_WIDTH * 0.6 });
    doc.font("Helvetica").text(job.location, { align: "right", width: CONTENT_WIDTH });

    // Reset x position after right-aligned text
    doc.fontSize(9).font("Helvetica-Oblique").text(job.role, MARGIN, doc.y, { continued: true, width: CONTENT_WIDTH * 0.6 });
    doc.font("Helvetica-Oblique").text(job.period, { align: "right", width: CONTENT_WIDTH });

    doc.fontSize(9).font("Helvetica");
    for (const h of job.highlights) {
      if (doc.y > 750) doc.addPage();
      doc.text(`  -  ${h}`, MARGIN + 5, doc.y, { width: CONTENT_WIDTH - 10, lineGap: 1 });
    }
    doc.moveDown(0.5);
  }

  // Personal Projects
  if (data.personalProjects && data.personalProjects.length) {
    if (doc.y > 650) doc.addPage();
    sectionTitle(doc, data.personalProjectsTitle);
    for (const p of data.personalProjects) {
      if (doc.y > 700) doc.addPage();
      doc.fontSize(10).font("Helvetica-Bold").text(p.name, MARGIN, doc.y, { continued: true, width: CONTENT_WIDTH * 0.7 });
      doc.fontSize(9).font("Helvetica-Oblique").text(p.period, { align: "right", width: CONTENT_WIDTH });
      doc.fontSize(9).font("Helvetica");
      for (const h of p.highlights) {
        if (doc.y > 750) doc.addPage();
        doc.text(`  -  ${h}`, MARGIN + 5, doc.y, { width: CONTENT_WIDTH - 10, lineGap: 1 });
      }
      doc.moveDown(0.5);
    }
  }

  // Education
  if (doc.y > 650) doc.addPage();
  sectionTitle(doc, data.educationTitle);
  doc.fontSize(10).font("Helvetica-Bold").text(data.education.school, MARGIN, doc.y, { continued: true, width: CONTENT_WIDTH * 0.6 });
  doc.font("Helvetica").text(data.education.location, { align: "right", width: CONTENT_WIDTH });
  doc.fontSize(9).font("Helvetica-Oblique").text(data.education.degree, MARGIN, doc.y, { continued: true, width: CONTENT_WIDTH * 0.6 });
  doc.text(data.education.period, { align: "right", width: CONTENT_WIDTH });
  doc.font("Helvetica");
  for (const h of data.education.highlights) {
    doc.text(`  -  ${h}`, MARGIN + 5, doc.y, { width: CONTENT_WIDTH - 10, lineGap: 1 });
  }
  doc.moveDown(0.8);

  // Skills
  if (doc.y > 650) doc.addPage();
  sectionTitle(doc, data.skillsTitle);
  doc.fontSize(9).font("Helvetica");
  for (const [cat, skills] of Object.entries(data.skills)) {
    doc.font("Helvetica-Bold").text(`${cat}: `, { continued: true });
    doc.font("Helvetica").text(skills);
    doc.moveDown(0.2);
  }
  doc.moveDown(0.5);

  // Languages
  sectionTitle(doc, data.languagesTitle);
  doc.fontSize(9).font("Helvetica");
  for (const [lang2, level] of Object.entries(data.languages)) {
    doc.font("Helvetica-Bold").text(`${lang2}: `, { continued: true });
    doc.font("Helvetica").text(level);
  }

  doc.end();
  return new Promise((resolve) => stream.on("finish", () => { console.log(`Generated: ${outPath}`); resolve(); }));
}

async function main() {
  fs.mkdirSync(path.join(__dirname, "..", "public", "cv"), { recursive: true });
  await Promise.all([generateCV("en"), generateCV("es"), generateCV("it")]);
}

main();
