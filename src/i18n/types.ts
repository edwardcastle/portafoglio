export interface Dictionary {
  header: {
    home: string;
    work: string;
    services: string;
    contact: string;
  };
  hero: {
    greeting: string;
    role: string;
    description: string;
    availability: string;
    cta: string;
    ctaSecondary: string;
    downloadCv: string;
  };
  about: {
    title: string;
    subtitle: string;
    p1Before: string;
    p1Emphasis: string;
    p1After: string;
    p2Before: string;
    p2Emphasis: string;
    p2After: string;
    p3Before: string;
    p3Emphasis: string;
    p3After: string;
    locationTitle: string;
    locationValue: string;
    experienceTitle: string;
    experienceValue: string;
    educationTitle: string;
    educationValue: string;
    languagesTitle: string;
    languagesValue: string;
  };
  experience: {
    title: string;
    subtitle: string;
    jobs: Array<{
      company: string;
      role: string;
      type: string;
      period: string;
      location: string;
      highlights: string[];
      links?: Array<{ label: string; url: string }>;
    }>;
  };
  skills: {
    title: string;
    subtitle: string;
    coreStack: string;
    coreStackLabel: string;
    proficient: string;
    workingKnowledge: string;
    tools: string;
  };
  services: {
    title: string;
    subtitle: string;
    cta: string;
    items: Array<{
      title: string;
      description: string;
      features: string[];
      examples?: string;
      timeline?: string;
    }>;
  };
  projects: {
    title: string;
    subtitle: string;
    viewAll: string;
    items: Array<{
      name: string;
      description: string;
    }>;
  };
  work: {
    title: string;
    subtitle: string;
    websitesTitle: string;
    projectsTitle: string;
    sites: Array<{
      name: string;
      description: string;
      company: string;
    }>;
  };
  caseStudy: {
    backToWork: string;
    client: string;
    year: string;
    role: string;
    liveLabel: string;
    challengeTitle: string;
    approachTitle: string;
    stackTitle: string;
    outcomeTitle: string;
    contributionsTitle: string;
    unaids: {
      title: string;
      client: string;
      year: string;
      role: string;
      challenge: string;
      approach: string;
      stack: string;
      outcome: string;
      contributions: string[];
    };
    zenocircle: {
      title: string;
      client: string;
      year: string;
      role: string;
      challenge: string;
      approach: string;
      stack: string;
      outcome: string;
      contributions: string[];
    };
    battlebucks: {
      title: string;
      client: string;
      year: string;
      role: string;
      challenge: string;
      approach: string;
      stack: string;
      outcome: string;
      contributions: string[];
    };
    unfpa: {
      title: string;
      client: string;
      year: string;
      role: string;
      challenge: string;
      approach: string;
      stack: string;
      outcome: string;
      contributions: string[];
    };
    peacebeginswithme: {
      title: string;
      client: string;
      year: string;
      role: string;
      challenge: string;
      approach: string;
      stack: string;
      outcome: string;
      contributions: string[];
    };
    cubita: {
      title: string;
      client: string;
      year: string;
      role: string;
      challenge: string;
      approach: string;
      stack: string;
      outcome: string;
      contributions: string[];
    };
    freemock: {
      title: string;
      client: string;
      year: string;
      role: string;
      challenge: string;
      approach: string;
      stack: string;
      outcome: string;
      contributions: string[];
    };
    elcatre: {
      title: string;
      client: string;
      year: string;
      role: string;
      challenge: string;
      approach: string;
      stack: string;
      outcome: string;
      contributions: string[];
    };
    casainordine: {
      title: string;
      client: string;
      year: string;
      role: string;
      challenge: string;
      approach: string;
      stack: string;
      outcome: string;
      contributions: string[];
    };
    iomclimatemigration: {
      title: string;
      client: string;
      year: string;
      role: string;
      challenge: string;
      approach: string;
      stack: string;
      outcome: string;
      contributions: string[];
    };
    unaidsgcai: {
      title: string;
      client: string;
      year: string;
      role: string;
      challenge: string;
      approach: string;
      stack: string;
      outcome: string;
      contributions: string[];
    };
    ifadride2023: {
      title: string;
      client: string;
      year: string;
      role: string;
      challenge: string;
      approach: string;
      stack: string;
      outcome: string;
      contributions: string[];
    };
    uhcassessmenttool: {
      title: string;
      client: string;
      year: string;
      role: string;
      challenge: string;
      approach: string;
      stack: string;
      outcome: string;
      contributions: string[];
    };
    covenanthouse: {
      title: string;
      client: string;
      year: string;
      role: string;
      challenge: string;
      approach: string;
      stack: string;
      outcome: string;
      contributions: string[];
    };
    ebueurovisionnews: {
      title: string;
      client: string;
      year: string;
      role: string;
      challenge: string;
      approach: string;
      stack: string;
      outcome: string;
      contributions: string[];
    };
    utiq: {
      title: string;
      client: string;
      year: string;
      role: string;
      challenge: string;
      approach: string;
      stack: string;
      outcome: string;
      contributions: string[];
    };
    lunatour: {
      title: string;
      client: string;
      year: string;
      role: string;
      challenge: string;
      approach: string;
      stack: string;
      outcome: string;
      contributions: string[];
    };
  };
  homeSections: {
    servicesTitle: string;
    servicesSubtitle: string;
    servicesCta: string;
    workTitle: string;
    workSubtitle: string;
    workCta: string;
  };
  contact: {
    title: string;
    subtitle: string;
    email: string;
    phone: string;
    location: string;
    locationValue: string;
    github: string;
    linkedin: string;
    nameLabel: string;
    namePlaceholder: string;
    emailLabel: string;
    emailPlaceholder: string;
    messageLabel: string;
    messagePlaceholder: string;
    send: string;
    sending: string;
    success: string;
    error: string;
  };
  footer: {
    rights: string;
  };
  meta: {
    title: string;
    description: string;
    ogDescription: string;
    keywords: string[];
    workTitle: string;
    workDescription: string;
    servicesTitle: string;
    servicesDescription: string;
    contactTitle: string;
    contactDescription: string;
  };
}
