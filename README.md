# Sunu Inovation — site web

Site vitrine de l'agence **Sunu Inovation**, reconstruit de zéro en Next.js.
Seuls les **couleurs** et les **polices** de l'ancien projet React/Vite ont été
conservés : tout le reste du design (mise en page, composants, navigation,
animations) est nouveau.

## Stack

| Élément     | Choix                                                   |
| ----------- | ------------------------------------------------------- |
| Framework   | Next.js 16 (App Router, React 19, TypeScript)           |
| Styles      | Tailwind CSS v4 (tokens dans `src/app/globals.css`)     |
| Composants  | shadcn/ui (Radix UI) — `src/components/ui`              |
| Icônes      | lucide-react                                            |
| Formulaires | react-hook-form + zod                                   |
| Polices     | @fontsource (auto-hébergées, aucun appel à Google)      |

## Démarrage

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # build de production
npm run start    # sert le build
npm run lint
```

## Design system

Tous les tokens sont définis dans `src/app/globals.css`, dans le bloc `@theme`.

**Couleurs (reprises de l'ancien projet)**

| Token          | Valeur    | Usage                                  |
| -------------- | --------- | -------------------------------------- |
| `primary`      | `#ed6f1c` | CTA, liens, accents                    |
| `primary-dark` | `#c85a12` | survol des boutons                     |
| `secondary`    | `#f9cf5d` | surlignages, ponctuation               |
| `ink`          | `#1b1b1a` | texte principal, sections sombres      |
| `ink-soft`     | `#4a4744` | texte courant                          |
| `ink-muted`    | `#857f78` | légendes, libellés mono                |
| `paper`        | `#ffffff` | fond principal                         |
| `mist`         | `#f6f4f1` | fond des sections alternées            |
| `line`         | `#e6e1da` | filets et bordures (1 px)              |

Les tokens sémantiques attendus par shadcn/ui (`background`, `foreground`,
`muted`, `border`, `ring`…) pointent vers ces mêmes valeurs : `npx shadcn add …`
produit donc des composants déjà à la charte.

**Polices (reprises de l'ancien projet)**

- `font-display` — Bricolage Grotesque (titres)
- `font-sans` — Inter (texte courant)
- `font-mono` — IBM Plex Mono (sur-titres, chiffres, libellés)

**Parti pris visuel** : fond clair dominant, filets de 1 px plutôt que des
ombres lourdes, sur-titres en monospace, grille « bento » pour les services,
une seule bande sombre et un seul dégradé orange par page pour le rythme.

## Structure

```
src/
├── app/
│   ├── layout.tsx            en-tête + pied de page + métadonnées globales
│   ├── page.tsx              accueil
│   ├── a-propos/             agence (présentation, vision, valeurs, mission)
│   ├── services/             vue d'ensemble + [slug] = 6 pages générées
│   ├── equipe/  clients/  contact/  devis/
│   ├── sitemap.ts  robots.ts  not-found.tsx  icon.svg
│   └── globals.css           tokens + utilitaires maison
├── components/
│   ├── brand/logo.tsx        marque (mark + wordmark)
│   ├── layout/               site-header (mega-menu + sheet mobile), site-footer
│   ├── sections/             hero, services-grid, process, marquee, cta-band
│   ├── shared/               section/container/eyebrow, page-hero, reveal
│   ├── forms/                contact-form, quote-form (3 étapes), newsletter
│   └── ui/                   composants shadcn/ui
├── data/                     site, services, about, team, clients, navigation
└── lib/utils.ts              helper `cn()`
```

Le **contenu est centralisé dans `src/data`** : modifier un texte, un service ou
un membre de l'équipe ne demande pas de toucher aux composants.

## À finaliser avant mise en ligne

1. **Coordonnées** — `src/data/site.ts` : téléphone, e-mail, adresse, URL et
   liens réseaux sociaux sont des valeurs de démonstration.
2. **Chiffres** — les statistiques (`stats`, « 30+ projets ») sont indicatives.
3. **Envoi des formulaires** — `contact-form.tsx`, `quote-form.tsx` et
   `newsletter-form.tsx` ouvrent aujourd'hui la messagerie de l'utilisateur
   (`mailto:`). Voir les `// TODO` : brancher une route API (Resend, Brevo…).
4. **Logos clients** — le bandeau affiche les noms en typographie
   (`clientNames` dans `src/data/clients.ts`). Remplacer par de vrais fichiers
   si vous les avez.
5. **Images** — reprises de l'ancien projet dans `public/images`. Les visuels
   d'équipe et de réalisations sont réels ; l'illustration du hero peut être
   remplacée.
6. **Textes juridiques** — pages mentions légales / politique de
   confidentialité à créer si nécessaire.

## Accessibilité & performance

- Contrastes AA sur les couleurs de texte, focus visible sur tous les
  interactifs, lien d'évitement vers le contenu.
- Navigation clavier complète (mega-menu accessible via `focus-within`,
  menu mobile Radix Dialog).
- `prefers-reduced-motion` respecté (animations neutralisées en CSS).
- Toutes les pages sont prégénérées en statique ; images servies via
  `next/image`.
