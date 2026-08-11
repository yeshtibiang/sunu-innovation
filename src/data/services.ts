import type { LucideIcon } from "lucide-react";
import {
  BarChart3,
  GraduationCap,
  Megaphone,
  MonitorSmartphone,
  PenTool,
  Compass,
} from "lucide-react";

export type Service = {
  slug: string;
  title: string;
  shortTitle: string;
  excerpt: string;
  icon: LucideIcon;
  image: string;
  intro: string[];
  deliverables: string[];
  outcomes: string[];
  featured?: boolean;
};

export const services: Service[] = [
  {
    slug: "marketing-digital",
    title: "Marketing digital",
    shortTitle: "Marketing digital",
    excerpt:
      "Des campagnes pensées pour la visibilité, l'engagement et la conversion — mesurées à chaque étape.",
    icon: Megaphone,
    image: "/images/services/marketing-digital.svg",
    featured: true,
    intro: [
      "Le marketing digital est le cœur de notre méthode. Nous construisons des dispositifs sur mesure qui augmentent votre visibilité, l'engagement de votre audience et votre taux de conversion.",
      "De l'analyse de votre audience au pilotage de campagnes publicitaires, nous utilisons les leviers les plus performants pour installer durablement votre présence en ligne : référencement naturel (SEO), régie payante (SEA/SEM), display et campagnes ciblées sur les réseaux.",
    ],
    deliverables: [
      "Audit d'audience et de concurrence",
      "Plan média et budget prévisionnel",
      "Campagnes SEO / SEA / social ads",
      "Tableau de bord de performance mensuel",
    ],
    outcomes: [
      "Trafic qualifié en hausse",
      "Coût d'acquisition maîtrisé",
      "Décisions appuyées sur des données",
    ],
  },
  {
    slug: "social-media",
    title: "Social media management",
    shortTitle: "Social media",
    excerpt:
      "Une ligne éditoriale claire, des contenus qui donnent envie et une communauté animée au quotidien.",
    icon: BarChart3,
    image: "/images/services/social-media.svg",
    featured: true,
    intro: [
      "Chez Sunu Inovation, le social media management dépasse la simple gestion de comptes : c'est une véritable stratégie de communication digitale.",
      "Nous prenons en charge vos réseaux de bout en bout — ligne éditoriale, création de contenus visuels et rédactionnels, calendrier de publication, modération et reporting — pour transformer votre audience en communauté engagée.",
    ],
    deliverables: [
      "Ligne éditoriale et charte de ton",
      "Calendrier éditorial mensuel",
      "Création de contenus (visuels, vidéos, copies)",
      "Community management et modération",
    ],
    outcomes: [
      "Communauté active et fidèle",
      "Image de marque cohérente",
      "Contenus réutilisables sur tous vos canaux",
    ],
  },
  {
    slug: "infographie",
    title: "Infographie & design graphique",
    shortTitle: "Infographie",
    excerpt:
      "Des visuels qui rendent vos messages clairs, mémorables et immédiatement reconnaissables.",
    icon: PenTool,
    image: "/images/services/infographie.svg",
    intro: [
      "L'infographie allie créativité et stratégie. Nous donnons vie à vos idées à travers des visuels percutants : illustrations, infographies, chartes graphiques, supports print et digitaux.",
      "Chaque création simplifie l'information complexe et sert vos objectifs de communication, tout en restant fidèle à votre identité de marque.",
    ],
    deliverables: [
      "Charte graphique et déclinaisons",
      "Infographies et data visualisation",
      "Kits de campagne (print + digital)",
      "Templates réutilisables par vos équipes",
    ],
    outcomes: [
      "Messages compris en un regard",
      "Identité visuelle consistante",
      "Autonomie de vos équipes internes",
    ],
  },
  {
    slug: "creation-site-web",
    title: "Création de site web",
    shortTitle: "Création de site web",
    excerpt:
      "Des sites rapides, accessibles et pensés pour convertir — du premier écran jusqu'au référencement.",
    icon: MonitorSmartphone,
    image: "/images/services/creation-site-web.svg",
    featured: true,
    intro: [
      "Votre site est votre première vitrine. Nous concevons des sites fonctionnels, esthétiques et adaptés à vos besoins réels : vitrine, catalogue, plateforme métier ou e-commerce.",
      "Du design à l'ergonomie en passant par l'optimisation SEO et la performance, chaque projet est pensé pour offrir une expérience fluide, rapide et sécurisée sur tous les écrans.",
    ],
    deliverables: [
      "Architecture de l'information et maquettes",
      "Développement responsive et accessible",
      "Optimisation SEO technique et vitesse",
      "Formation à la prise en main et maintenance",
    ],
    outcomes: [
      "Site rapide sur mobile comme sur desktop",
      "Parcours orientés conversion",
      "Base saine pour évoluer dans le temps",
    ],
  },
  {
    slug: "strategie-digitale",
    title: "Conseil & stratégie digitale",
    shortTitle: "Stratégie digitale",
    excerpt:
      "Un diagnostic honnête, une feuille de route priorisée et un accompagnement dans la durée.",
    icon: Compass,
    image: "/images/services/strategie-digitale.svg",
    intro: [
      "Nous analysons vos objectifs, vos forces, vos contraintes et votre marché pour élaborer une stratégie digitale qui maximise votre potentiel — que vous soyez une start-up ou un groupe établi.",
      "Nous vous accompagnons ensuite dans la mise en œuvre : optimisation des processus internes, intégration de nouveaux outils et adoption des meilleures pratiques numériques.",
    ],
    deliverables: [
      "Diagnostic digital 360°",
      "Feuille de route priorisée sur 6 à 12 mois",
      "Choix des outils et de l'organisation",
      "Points de pilotage réguliers",
    ],
    outcomes: [
      "Priorités claires pour vos équipes",
      "Investissements mieux alloués",
      "Transformation digitale progressive",
    ],
  },
  {
    slug: "formation-certifiante",
    title: "Formation certifiante",
    shortTitle: "Formation certifiante",
    excerpt:
      "Des formations pratiques pour rendre vos équipes autonomes sur leurs propres canaux.",
    icon: GraduationCap,
    image: "/images/services/formation.svg",
    intro: [
      "Nous croyons à l'apprentissage continu. Nos formations certifiantes couvrent le marketing digital, la stratégie, la gestion des réseaux sociaux, la création de contenu et les outils du quotidien.",
      "Chaque parcours est conçu pour les professionnels, les entrepreneurs et les équipes qui veulent acquérir des compétences immédiatement applicables — en présentiel à Dakar ou à distance.",
    ],
    deliverables: [
      "Programme adapté à votre niveau",
      "Ateliers pratiques sur vos propres cas",
      "Supports et ressources à conserver",
      "Attestation de fin de parcours",
    ],
    outcomes: [
      "Équipes autonomes et outillées",
      "Montée en compétence mesurable",
      "Moins de dépendance aux prestataires",
    ],
  },
];

export const getService = (slug: string) =>
  services.find((service) => service.slug === slug);

export const processSteps = [
  {
    step: "01",
    title: "Écouter & diagnostiquer",
    description:
      "Un premier échange pour comprendre votre activité, vos objectifs et vos contraintes réelles. Puis un diagnostic sans détour.",
  },
  {
    step: "02",
    title: "Concevoir la stratégie",
    description:
      "Nous traduisons le diagnostic en feuille de route priorisée : canaux, messages, budget et indicateurs de succès.",
  },
  {
    step: "03",
    title: "Produire & déployer",
    description:
      "Design, contenus, développement, campagnes : notre équipe exécute avec un point d'avancement régulier et transparent.",
  },
  {
    step: "04",
    title: "Mesurer & ajuster",
    description:
      "Les résultats sont suivis, commentés et ajustés. Ce qui fonctionne est amplifié, le reste est corrigé rapidement.",
  },
];
