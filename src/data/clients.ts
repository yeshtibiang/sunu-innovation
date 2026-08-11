export type CaseStudy = {
  slug: string;
  client: string;
  sector: string;
  title: string;
  summary: string;
  image: string;
  services: string[];
};

export const caseStudies: CaseStudy[] = [
  {
    slug: "kfc",
    client: "KFC",
    sector: "Restauration",
    title: "Des campagnes qui remplissent les restaurants",
    summary:
      "Déclinaisons visuelles et animation des réseaux sociaux autour des offres, avec un rythme de publication soutenu et un ton adapté à l'audience locale.",
    image: "/images/clients/kfc.jpg",
    services: ["Social media", "Infographie"],
  },
  {
    slug: "sedima",
    client: "Sedima",
    sector: "Agro-industrie",
    title: "Rendre lisible un groupe aux multiples activités",
    summary:
      "Un système visuel commun pour parler d'un groupe complexe avec clarté, décliné sur l'ensemble des supports de communication.",
    image: "/images/clients/sedima.jpg",
    services: ["Stratégie digitale", "Infographie"],
  },
  {
    slug: "terhal",
    client: "Terhal",
    sector: "Voyage",
    title: "Une identité digitale qui donne envie de partir",
    summary:
      "Direction artistique et contenus social media pensés pour l'inspiration, avec une bibliothèque de templates réutilisables.",
    image: "/images/clients/terhal.jpg",
    services: ["Social media", "Design"],
  },
  {
    slug: "iface",
    client: "IFACE",
    sector: "Formation",
    title: "Attirer les candidats sur les bons programmes",
    summary:
      "Campagnes de recrutement d'étudiants et refonte des supports de présentation des filières.",
    image: "/images/clients/iface.jpg",
    services: ["Marketing digital", "Infographie"],
  },
  {
    slug: "leam",
    client: "Leam",
    sector: "Services",
    title: "Poser des bases de marque solides",
    summary:
      "Charte graphique, gabarits de publication et accompagnement des équipes internes pour gagner en autonomie.",
    image: "/images/clients/leam.jpg",
    services: ["Design", "Formation"],
  },
];

// Bandeau de logos — un logo par client, uniquement ceux disponibles dans /public/images/logos
export const clientLogos = [
  { name: "Sedima", src: "/images/logos/sedima.webp" },
  { name: "KFC", src: "/images/logos/logo_kfc.png" },
  { name: "Kabirex", src: "/images/logos/kabirex.jpg" },
  { name: "Horizon RH", src: "/images/logos/hrhgroup.jpg" },
  { name: "IFAGE", src: "/images/logos/Logo-ifage.jpg" },
] as const;
