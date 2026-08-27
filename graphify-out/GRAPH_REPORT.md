# Graph Report - sunuinovation  (2026-08-26)

## Corpus Check
- 87 files · ~294,271 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 299 nodes · 575 edges · 13 communities (10 shown, 3 thin omitted)
- Extraction: 99% EXTRACTED · 1% INFERRED · 0% AMBIGUOUS · INFERRED: 6 edges (avg confidence: 0.77)
- Token cost: 1,900 input · 3,400 output

## Community Hubs (Navigation)
- Formulaires & primitives UI
- Dependances runtime npm
- Pages de routes & metadonnees
- Accueil & contenu editorial
- Outillage build & devDependencies
- Configuration TypeScript
- En-tete, navigation & marque
- Configuration shadcn/ui
- Enveloppe du site & SEO
- Charte graphique & design system
- Config ESLint
- Config Next.js
- Config PostCSS

## God Nodes (most connected - your core abstractions)
1. `cn()` - 50 edges
2. `Container()` - 17 edges
3. `compilerOptions` - 16 edges
4. `Button()` - 14 edges
5. `site` - 13 edges
6. `Section()` - 11 edges
7. `PageHero()` - 9 edges
8. `Reveal()` - 9 edges
9. `Eyebrow()` - 8 edges
10. `services` - 8 edges

## Surprising Connections (you probably didn't know these)
- `Logos clients a remplacer (clientNames)` --references--> `clientLogos`  [AMBIGUOUS]
  README.md → src/data/clients.ts
- `Design system (tokens @theme)` --conceptually_related_to--> `cn()`  [INFERRED]
  README.md → src/lib/utils.ts
- `Logos clients a remplacer (clientNames)` --references--> `ClientMarquee()`  [INFERRED]
  README.md → src/components/sections/marquee.tsx
- `LogoMark()` --calls--> `cn()`  [EXTRACTED]
  src/components/brand/logo.tsx → src/lib/utils.ts
- `MenuPanel()` --calls--> `cn()`  [EXTRACTED]
  src/components/layout/site-header.tsx → src/lib/utils.ts

## Import Cycles
- None detected.

## Hyperedges (group relationships)
- **Chantiers a finaliser avant mise en ligne** — readme_mailto_forms, readme_placeholder_data, readme_client_logos_todo, readme_legal_pages_todo [EXTRACTED 1.00]
- **Charte de marque heritee de l'ancien projet** — readme_color_palette, readme_typography, readme_self_hosted_fonts, readme_shadcn_token_mapping [EXTRACTED 1.00]
- **Les trois formulaires en attente de route API** — src_components_forms_contact_form, src_components_forms_quote_form, src_components_forms_newsletter_form, readme_mailto_forms [EXTRACTED 1.00]

## Communities (13 total, 3 thin omitted)

### Community 0 - "Formulaires & primitives UI"
Cohesion: 0.09
Nodes (31): Formulaires en mailto: (route API a brancher), ContactValues, TODO: remplacer par un appel API (route handler, Resend, Formspree…)., schema, NewsletterForm(), TODO: brancher un service d'emailing (Brevo, Mailchimp, Resend…)., BUDGETS, DEADLINES (+23 more)

### Community 1 - "Dependances runtime npm"
Cohesion: 0.05
Nodes (43): class-variance-authority, clsx, @fontsource/ibm-plex-mono, @fontsource-variable/bricolage-grotesque, @fontsource-variable/inter, @hookform/resolvers, lucide-react, motion (+35 more)

### Community 2 - "Pages de routes & metadonnees"
Cohesion: 0.12
Nodes (24): metadata, metadata, infos, metadata, guarantees, metadata, metadata, metadata (+16 more)

### Community 3 - "Accueil & contenu editorial"
Cohesion: 0.10
Nodes (24): Logos clients a remplacer (clientNames), Contenu centralise dans src/data, Pages juridiques manquantes, Donnees de demonstration a remplacer, Hero(), ClientMarquee(), ServicesGrid(), SPANS (+16 more)

### Community 4 - "Outillage build & devDependencies"
Cohesion: 0.07
Nodes (29): eslint, eslint-config-next, allowScripts, unrs-resolver@1.12.2, devDependencies, eslint, eslint-config-next, tailwindcss (+21 more)

### Community 5 - "Configuration TypeScript"
Cohesion: 0.07
Nodes (28): dom, dom.iterable, esnext, **/*.mts, .next/dev/types/**/*.ts, next-env.d.ts, .next/types/**/*.ts, node_modules (+20 more)

### Community 6 - "En-tete, navigation & marque"
Cohesion: 0.11
Nodes (22): Logo(), LogoMark(), LogoProps, MenuPanel(), MenuPanelProps, SiteHeader(), useScrolled(), Accordion() (+14 more)

### Community 7 - "Configuration shadcn/ui"
Cohesion: 0.11
Nodes (17): aliases, components, hooks, lib, ui, utils, iconLibrary, rsc (+9 more)

### Community 8 - "Enveloppe du site & SEO"
Cohesion: 0.19
Nodes (7): Engagements d'accessibilite, prefers-reduced-motion respecte, Prerendu statique + next/image, metadata, SiteFooter(), site, stats

### Community 9 - "Charte graphique & design system"
Cohesion: 0.29
Nodes (7): Palette de couleurs, Design system (tokens @theme), Polices auto-hebergees (@fontsource), Mapping des tokens shadcn/ui, Stack technique, Typographie de marque, Parti pris visuel

## Ambiguous Edges - Review These
- `clientLogos` → `Logos clients a remplacer (clientNames)`  [AMBIGUOUS]
  README.md · relation: references

## Knowledge Gaps
- **113 isolated node(s):** `$schema`, `style`, `rsc`, `tsx`, `config` (+108 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **3 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **What is the exact relationship between `clientLogos` and `Logos clients a remplacer (clientNames)`?**
  _Edge tagged AMBIGUOUS (relation: references) - confidence is low._
- **Why does `cn()` connect `Formulaires & primitives UI` to `Charte graphique & design system`, `Pages de routes & metadonnees`, `Accueil & contenu editorial`, `En-tete, navigation & marque`?**
  _High betweenness centrality (0.099) - this node is a cross-community bridge._
- **Why does `dependencies` connect `Dependances runtime npm` to `Outillage build & devDependencies`?**
  _High betweenness centrality (0.047) - this node is a cross-community bridge._
- **What connects `$schema`, `style`, `rsc` to the rest of the system?**
  _113 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `Formulaires & primitives UI` be split into smaller, more focused modules?**
  _Cohesion score 0.09292929292929293 - nodes in this community are weakly interconnected._
- **Should `Dependances runtime npm` be split into smaller, more focused modules?**
  _Cohesion score 0.046511627906976744 - nodes in this community are weakly interconnected._
- **Should `Pages de routes & metadonnees` be split into smaller, more focused modules?**
  _Cohesion score 0.11738648947951273 - nodes in this community are weakly interconnected._