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
      "Visuels produits, offres promotionnelles et mécaniques de jeu comme la Méga Tombola : un rythme de publication soutenu et un ton adapté à l'audience sénégalaise.",
    image: "/images/clients/kfc_work.webp",
    services: ["Social media", "Infographie"],
  },
  {
    slug: "sedima",
    client: "Sedima",
    sector: "Agro-industrie",
    title: "Faire vivre les marques d'un groupe agro-industriel",
    summary:
      "Direction artistique et animation digitale autour des farines Coumba et Baguédor, du jeu concours « Les douceurs de Coumba » aux lancements de nouveaux formats.",
    image: "/images/clients/sedima_work.webp",
    services: ["Stratégie digitale", "Infographie"],
  },
  {
    slug: "ifage",
    client: "IFAGE",
    sector: "Formation",
    title: "Attirer les candidats sur les bons programmes",
    summary:
      "Campagnes d'admission entre Dakar et Abidjan, annonces de bourses et mise en avant des filières : des supports pensés pour générer des candidatures qualifiées.",
    image: "/images/clients/iface_work.webp",
    services: ["Marketing digital", "Infographie"],
  },
  {
    slug: "terhal",
    client: "Ter'hal",
    sector: "Agroalimentaire",
    title: "Installer une marque de volaille 100 % sénégalaise",
    summary:
      "Contenus gourmands, quiz et recettes qui valorisent le poulet local et halal, avec un univers visuel chaleureux décliné sur tous les formats social media.",
    image: "/images/clients/terhal_work.webp",
    services: ["Social media", "Infographie"],
  },
  {
    slug: "kabirex",
    client: "Kabirex",
    sector: "Électroménager",
    title: "Transformer un catalogue produits en rendez-vous d'achat",
    summary:
      "Fiches produits animées, promotions saisonnières et opérations de rentrée : un gabarit clair pour afficher prix, caractéristiques et point de vente en un regard.",
    image: "/images/clients/kabirex_work.webp",
    services: ["Social media", "Infographie"],
  },
  {
    slug: "technologies-services",
    client: "Technologies Services",
    sector: "Santé",
    title: "Sensibiliser sans jamais perdre en crédibilité",
    summary:
      "Prise de parole sur les grandes causes de santé — Octobre Rose, journées internationales — avec une ligne graphique sobre et un message de prévention lisible.",
    image: "/images/clients/tech_service_work.webp",
    services: ["Social media", "Infographie"],
  },
  {
    slug: "atelier-parental",
    client: "Atelier Parental",
    sector: "Éducation",
    title: "Une école pour les parents, visible en ligne",
    summary:
      "Conseils pratiques, témoignages et annonces d'ateliers déclinés dans une identité douce et reconnaissable, au service des inscriptions.",
    image: "/images/clients/atelier_parental_work.webp",
    services: ["Social media", "Infographie"],
  },
  {
    slug: "necom-edition",
    client: "NECOM Édition",
    sector: "Édition",
    title: "Des couvertures qui donnent envie d'ouvrir le livre",
    summary:
      "Conception de couvertures et de quatrièmes de couverture pour plusieurs ouvrages, du développement personnel au récit spirituel, avec mise en situation pour la promotion.",
    image: "/images/clients/livre_work.webp",
    services: ["Infographie", "Design éditorial"],
  },
];

// Bandeau de logos — un logo par client, uniquement ceux disponibles dans /public/images/logos
export const clientLogos = [
  { name: "KFC", src: "/images/logos/logo_kfc.png" },
  { name: "Sedima", src: "/images/logos/sedima.webp" },
  { name: "IFAGE", src: "/images/logos/Logo-ifage.jpg" },
  { name: "Kabirex", src: "/images/logos/kabirex.jpg" },
  { name: "HRH Group", src: "/images/logos/hrhgroup.jpg" },
  {
    name: "Technologies Services",
    src: "/images/logos/technologies_services_logo.svg",
  },
  { name: "Atelier Parental", src: "/images/logos/atelier_parental_logo.svg" },
  { name: "NECOM", src: "/images/logos/necom_logo.svg" },
  { name: "Nesh Edition", src: "/images/logos/nesh_edition_logo.svg" },
  {
    name: "Graines de Confiance",
    src: "/images/logos/graines_de_confiance_logo.svg",
  },
  { name: "PUMA", src: "/images/logos/puma_logo.svg" },
  { name: "Sengov'Risk", src: "/images/logos/sengov'_risk_logo.svg" },
  { name: "Revina Tours", src: "/images/logos/logo_revina.png" },
] as const;
