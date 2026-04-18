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
      "Frontend Developer with over 6 years of experience designing and developing modern, high-performance, user-oriented web applications. Specialized in Vue.js, Nuxt.js, and TypeScript, with strong focus on code quality, accessibility, and performance optimization. Experienced collaborating with designers and backend teams to transform design systems into fluid, scalable, and responsive interfaces. Passionate about animations, reusable components, and frontend best practices.",
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
        company: "Freelance Frontend Projects",
        role: "Frontend Developer (Freelance)",
        location: "Remote",
        period: "Jul 2024 - Jun 2025",
        highlights: [
          "BattleBucks (Costa Rica) -- Solana blockchain integration via Reown for authentication and transactions",
          "BattleBucks -- Real-time chat with WebSocket and REST API, PWA configuration",
          "Gitfast (Mexico) -- New features and UI component library, performance optimization",
          "Gitfast -- Frontend refactoring for scalability and readability",
        ],
      },
      {
        company: "Elkanodata",
        role: "Frontend Developer",
        location: "Remote, Spain",
        period: "Sep 2023 - Jun 2024",
        highlights: [
          "Animated and interactive interfaces with Canvas and SVG",
          "Design-to-code from Figma and Zeplin into responsive, cross-browser layouts",
          "Dynamic content integration via Prismic CMS and WordPress",
          "Performance optimization for loading times and animations across devices",
        ],
      },
      {
        company: "Teavaro",
        role: "Frontend Developer",
        location: "Remote, UK",
        period: "Aug 2022 - Sep 2023",
        highlights: [
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
          "UI design and development for administrative systems",
          "Reusable components and client-side rendering optimization",
          "REST and GraphQL API integration",
          "UX improvements based on user feedback",
        ],
      },
      {
        company: "El Catre",
        role: "Frontend Developer",
        location: "Remote, Cuba",
        period: "Aug 2019 - Sep 2020",
        highlights: [
          "Interactive UI components and pages with Vue.js and Nuxt.js",
          "GraphQL API integration and real-time updates",
          "Docker environments for frontend deployment",
          "UX optimization through performant layout and animations",
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
      Proficient: "React, Next.js, JavaScript (ES6+), Sass, Vitest, Jest, Vite, Webpack, Docker, PWA, SEO, Figma",
      "Working Knowledge": "Go, Python, Django, GraphQL, Solana/Web3, Firebase, Ionic/Capacitor, Canvas/SVG animations",
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
      "Desarrollador Frontend con m\u00e1s de 6 a\u00f1os de experiencia en el dise\u00f1o y desarrollo de aplicaciones web modernas, de alto rendimiento y orientadas al usuario. Especializado en Vue.js, Nuxt.js y TypeScript, con fuerte enfoque en la calidad del c\u00f3digo, accesibilidad y optimizaci\u00f3n del rendimiento. Experiencia colaborando con dise\u00f1adores y equipos backend para transformar sistemas de dise\u00f1o en interfaces fluidas, escalables y responsive.",
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
        company: "Proyectos Frontend Freelance",
        role: "Frontend Developer (Freelance)",
        location: "Remoto",
        period: "Jul 2024 - Jun 2025",
        highlights: [
          "BattleBucks (Costa Rica) -- Integraci\u00f3n blockchain Solana mediante Reown para autenticaci\u00f3n y transacciones",
          "BattleBucks -- Chat en tiempo real con WebSocket y REST API, configuraci\u00f3n PWA",
          "Gitfast (M\u00e9xico) -- Nuevas funcionalidades y librer\u00eda de componentes UI",
          "Gitfast -- Refactorizaci\u00f3n frontend para escalabilidad y legibilidad",
        ],
      },
      {
        company: "Elkanodata",
        role: "Frontend Developer",
        location: "Remoto, Espa\u00f1a",
        period: "Sep 2023 - Jun 2024",
        highlights: [
          "Interfaces animadas e interactivas con Canvas y SVG",
          "De Figma/Zeplin a layouts responsive y cross-browser",
          "Integraci\u00f3n de contenidos din\u00e1micos mediante Prismic CMS y WordPress",
          "Optimizaci\u00f3n de tiempos de carga y animaciones en dispositivos variados",
        ],
      },
      {
        company: "Teavaro",
        role: "Frontend Developer",
        location: "Remoto, Reino Unido",
        period: "Ago 2022 - Sep 2023",
        highlights: [
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
          "Dise\u00f1o y desarrollo de UI para sistemas administrativos",
          "Componentes reutilizables y optimizaci\u00f3n de rendering",
          "Integraci\u00f3n de APIs REST y GraphQL",
          "Mejoras de UX basadas en feedback de usuarios",
        ],
      },
      {
        company: "El Catre",
        role: "Frontend Developer",
        location: "Remoto, Cuba",
        period: "Ago 2019 - Sep 2020",
        highlights: [
          "Componentes UI interactivos con Vue.js y Nuxt.js",
          "Integraci\u00f3n de API GraphQL y actualizaciones en tiempo real",
          "Entornos Docker para despliegue frontend",
          "Optimizaci\u00f3n UX mediante layout y animaciones performantes",
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
      Competente: "React, Next.js, JavaScript (ES6+), Sass, Vitest, Jest, Vite, Webpack, Docker, PWA, SEO, Figma",
      "Conocimiento Pr\u00e1ctico": "Go, Python, Django, GraphQL, Solana/Web3, Firebase, Ionic/Capacitor, Canvas/SVG",
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
      "Sviluppatore Frontend con oltre 6 anni di esperienza nella progettazione e nello sviluppo di applicazioni web moderne, performanti e orientate all'utente. Specializzato in Vue.js, Nuxt.js e TypeScript, con forte attenzione alla pulizia del codice, all'accessibilit\u00e0 e all'ottimizzazione delle prestazioni. Abituato a collaborare con designer e team backend per trasformare sistemi di design in interfacce fluide, scalabili e responsive.",
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
        company: "Progetti Frontend Freelance",
        role: "Frontend Developer (Freelance)",
        location: "Remoto",
        period: "Lug 2024 - Giu 2025",
        highlights: [
          "BattleBucks (Costa Rica) -- Integrazione blockchain Solana tramite Reown per autenticazione e transazioni",
          "BattleBucks -- Chat in tempo reale con WebSocket e REST API, configurazione PWA",
          "Gitfast (Messico) -- Nuove funzionalit\u00e0 e libreria di componenti UI",
          "Gitfast -- Refactoring frontend per scalabilit\u00e0 e leggibilit\u00e0",
        ],
      },
      {
        company: "Elkanodata",
        role: "Frontend Developer",
        location: "Remoto, Spagna",
        period: "Set 2023 - Giu 2024",
        highlights: [
          "Creazione interfacce animate e interattive con Canvas e SVG",
          "Traduzione design da Figma e Zeplin in layout responsive e cross-browser",
          "Integrazione contenuti dinamici tramite Prismic CMS e WordPress",
          "Ottimizzazione tempi di caricamento e animazioni su dispositivi vari",
        ],
      },
      {
        company: "Teavaro",
        role: "Frontend Developer",
        location: "Remoto, Regno Unito",
        period: "Ago 2022 - Set 2023",
        highlights: [
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
          "Progettazione e sviluppo UI per sistemi amministrativi",
          "Creazione componenti riutilizzabili e ottimizzazione rendering lato client",
          "Integrazione REST e GraphQL API",
          "Miglioramento UX basato su feedback utenti",
        ],
      },
      {
        company: "El Catre",
        role: "Frontend Developer",
        location: "Remoto, Cuba",
        period: "Ago 2019 - Set 2020",
        highlights: [
          "Sviluppo componenti UI e pagine interattive con Vue.js e Nuxt.js",
          "Integrazione API GraphQL e aggiornamenti in tempo reale",
          "Configurazione ambienti Docker per deployment frontend",
          "Ottimizzazione UX tramite layout e animazioni performanti",
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
      Competente: "React, Next.js, JavaScript (ES6+), Sass, Vitest, Jest, Vite, Webpack, Docker, PWA, SEO, Figma",
      "Conoscenza Pratica": "Go, Python, Django, GraphQL, Solana/Web3, Firebase, Ionic/Capacitor, Canvas/SVG",
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
