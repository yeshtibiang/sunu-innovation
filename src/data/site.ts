export const site = {
  name: "Sunu Innovation",
  legalName: "Sunu Innovation",
  // ⚠️ Coordonnées à remplacer par les vraies informations.
  tagline: "Agence de marketing & communication digitale 360°",
  description:
    "Sunu Innovation accompagne entreprises, institutions et start-ups dans leur croissance digitale : stratégie, marketing, social media, création de sites web, design et formations certifiantes.",
  url: "https://sunuinnovation.com",
  email: "contact@sunuinnovation.com",
  phone: "+221 77 499 77 95",
  phoneHref: "+221774997795",
  address: "Dakar, Sénégal",
  countries: ["Sénégal", "Congo", "Tchad", "Côte d'Ivoire"],
  socials: [
    {
      label: "LinkedIn",
      href: "https://www.linkedin.com/company/char-agency",
    },
    { label: "Instagram", href: "https://www.instagram.com" },
    { label: "Facebook", href: "https://www.facebook.com/sunuinnovation01/" },
  ],
} as const;

export const stats = [
  { value: "6", label: "expertises complémentaires" },
  // { value: "4", label: "pays de présence" }, // pas encore présents dans ces pays
  { value: "10+", label: "projets accompagnés" },
  { value: "24h", label: "pour recevoir votre devis" },
] as const;
