"use client";

import * as React from "react";
import { usePathname } from "next/navigation";

/**
 * Ramène la fenêtre en haut à chaque changement de route.
 *
 * Sans cela, le visiteur atterrit parfois au milieu d'une page : le navigateur
 * et l'App Router restaurent tous deux la position de défilement précédente
 * (rechargement, bouton Retour), et l'App Router renonce même à remonter quand
 * le haut de la nouvelle page se trouve déjà dans le viewport.
 *
 * Ne rend rien.
 */
export function ScrollToTop() {
  const pathname = usePathname();

  // Coupe la restauration du navigateur au rechargement : elle est asynchrone
  // et gagnerait sinon la course contre l'effet ci-dessous.
  React.useEffect(() => {
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }
  }, []);

  React.useEffect(() => {
    // Une URL avec ancre (/a-propos#vision) est laissée à Next.js, qui doit
    // défiler jusqu'à la cible plutôt qu'en haut.
    if (window.location.hash) return;

    // `behavior: "instant"` est indispensable : `globals.css` applique
    // `scroll-behavior: smooth` sur `html`, donc sans ce paramètre le retour en
    // haut serait animé — donc interruptible par une molette ou un re-rendu, ce
    // qui laisse justement le visiteur bloqué au milieu d'une section.
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  }, [pathname]);

  return null;
}
