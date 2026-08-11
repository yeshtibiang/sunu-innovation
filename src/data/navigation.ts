import { services } from "./services";

export type NavLink = {
  label: string;
  href: string;
  description?: string;
};

export const aboutLinks: NavLink[] = [
  {
    label: "Qui sommes-nous ?",
    href: "/a-propos#presentation",
    description: "L'agence, ses expertises et sa façon de travailler.",
  },
  {
    label: "Notre vision",
    href: "/a-propos#vision",
    description: "Le partenaire stratégique de vos projets, de l'idée à l'impact.",
  },
  {
    label: "Nos valeurs",
    href: "/a-propos#valeurs",
    description: "Humanité, créativité, professionnalisme, fiabilité.",
  },
  {
    label: "Notre mission",
    href: "/a-propos#mission",
    description: "Ce que nous nous engageons à faire pour vous.",
  },
];

export const serviceLinks: NavLink[] = services.map((service) => ({
  label: service.shortTitle,
  href: `/services/${service.slug}`,
  description: service.excerpt,
}));

export const mainNav: NavLink[] = [
  { label: "Accueil", href: "/" },
  { label: "Agence", href: "/a-propos" },
  { label: "Services", href: "/services" },
  { label: "Équipe", href: "/equipe" },
  { label: "Clients", href: "/clients" },
  { label: "Contact", href: "/contact" },
];

export const footerNav = [
  {
    title: "Agence",
    links: [
      { label: "Qui sommes-nous ?", href: "/a-propos#presentation" },
      { label: "Notre vision", href: "/a-propos#vision" },
      { label: "Nos valeurs", href: "/a-propos#valeurs" },
      { label: "L'équipe", href: "/equipe" },
    ],
  },
  {
    title: "Services",
    links: serviceLinks.map(({ label, href }) => ({ label, href })),
  },
  {
    title: "Ressources",
    links: [
      { label: "Nos réalisations", href: "/clients" },
      { label: "Demander un devis", href: "/devis" },
      { label: "Nous contacter", href: "/contact" },
    ],
  },
];
