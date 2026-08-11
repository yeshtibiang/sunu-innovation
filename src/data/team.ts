export type TeamMember = {
  name: string;
  role: string;
  image: string;
  focus: string;
};

export const team: TeamMember[] = [
  {
    name: "Artin Babingui",
    role: "Social Media Manager",
    image: "/images/team/artin.png",
    focus: "Ligne éditoriale, community management, campagnes social ads.",
  },
  {
    name: "Yeshua Doumgou",
    role: "Développeur Web",
    image: "/images/team/yeshua.png",
    focus: "Sites web performants, intégrations et automatisations.",
  },
  {
    name: "Chancel Obessa",
    role: "Designer Graphique",
    image: "/images/team/chancel.png",
    focus: "Identité visuelle, infographie et direction artistique.",
  },
];

export const contactIntents = [
  {
    label: "Je veux développer ma visibilité",
    subject: "Développer ma visibilité",
  },
  {
    label: "Je cherche un community manager",
    subject: "Demande d'un community manager",
  },
  {
    label: "J'ai une crise à gérer, je ne sais pas quoi faire",
    subject: "Gestion de crise",
  },
  {
    label: "Je veux rejoindre l'équipe",
    subject: "Candidature spontanée",
  },
];
