export interface Dictionary {
  header: {
    about: string;
    experience: string;
    skills: string;
    services: string;
    projects: string;
    contact: string;
  };
  hero: {
    greeting: string;
    role: string;
    description: string;
    cta: string;
    ctaSecondary: string;
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
    }>;
  };
  skills: {
    title: string;
    subtitle: string;
    frontend: string;
    designUi: string;
    performanceTools: string;
    backend: string;
    otherTools: string;
  };
  services: {
    title: string;
    subtitle: string;
    cta: string;
    items: Array<{
      title: string;
      description: string;
      features: string[];
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
  contact: {
    title: string;
    subtitle: string;
    email: string;
    phone: string;
    location: string;
    locationValue: string;
    github: string;
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
  };
}
