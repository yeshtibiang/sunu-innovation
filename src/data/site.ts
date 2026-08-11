export const site = {
  name: "Sunu Inovation",
  legalName: "Sunu Inovation",
  // ⚠️ Coordonnées à remplacer par les vraies informations.
  tagline: "Agence de marketing & communication digitale 360°",
  description:
    "Sunu Inovation accompagne entreprises, institutions et start-ups dans leur croissance digitale : stratégie, marketing, social media, création de sites web, design et formations certifiantes.",
  url: "https://sunuinovation.com",
  email: "hello@sunuinovation.com",
  phone: "+221 77 000 00 00",
  phoneHref: "+22177000000",
  address: "Dakar, Sénégal",
  countries: ["Sénégal", "Congo", "Tchad", "Côte d'Ivoire"],
  socials: [
    { label: "LinkedIn", href: "https://www.linkedin.com" },
    { label: "Instagram", href: "https://www.instagram.com" },
    { label: "Facebook", href: "https://www.facebook.com" },
  ],
} as const;

export const stats = [
  { value: "6", label: "expertises complémentaires" },
  // { value: "4", label: "pays de présence" }, // pas encore présents dans ces pays
  { value: "30+", label: "projets accompagnés" },
  { value: "48h", label: "pour recevoir votre devis" },
] as const;
