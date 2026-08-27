export type TeamMember = {
  name: string;
  role: string;
  image: string;
};

export const team: TeamMember[] = [
  {
    name: "Artin Babingui",
    role: "Co-fondateur",
    image: "/images/team/artin.webp",
  },
  {
    name: "Tibiang Yeshua Doumgou",
    role: "Co-fondateur et CTO",
    image: "/images/team/yeshua.jpg",
  },
  {
    name: "Chancel Obessa",
    role: "Co-fondateur et Designer Graphique",
    image: "/images/team/chancel.webp",
  },
  {
    name: "Amédé Nadjilem Londoul",
    role: "Co-fondateur",
    image: "/images/team/amede.webp",
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
