import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Container } from "@/components/shared/section";

/**
 * Séquence d'apparition, en millisecondes. Le titre arrive ligne par ligne,
 * puis le trait de surlignage se trace sous « collective » : c'est le dernier
 * temps de la séquence, donc le point d'attention.
 */
const BEAT = {
  line1: 0,
  visual: 220,
  line2: 90,
  paragraph: 340,
  actions: 480,
  caption: 600,
  swipe: 700,
} as const;

export function Hero() {
  return (
    <section className="relative overflow-hidden border-b border-line bg-paper">
      <Container size="wide" className="relative">
        <div className="grid items-center gap-12 py-8 md:py-12 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16 lg:py-16">
          {/* --- Colonne texte -------------------------------------------- */}
          <div className="flex flex-col items-start">
            {/*
              Le titre est composé en chasse resserrée (82 %), sauf « collective »
              qui reprend la chasse pleine : le mot qui dit le collectif est
              littéralement le plus large de la phrase.
            */}
            <h1 className="font-display text-4xl leading-[1.04] font-extrabold tracking-[-0.03em] text-ink font-stretch-82% sm:text-6xl lg:text-[4.5rem]">
              <span className="line-clip">
                <span
                  className="animate-line-rise block"
                  style={{ animationDelay: `${BEAT.line1}ms` }}
                >
                  L&apos;intelligence digitale,
                </span>
              </span>
              <span className="line-clip">
                <span
                  className="animate-line-rise block"
                  style={{ animationDelay: `${BEAT.line2}ms` }}
                >
                  <span className="relative inline-block font-stretch-100%">
                    <span className="relative z-10">collective</span>
                    <span
                      aria-hidden="true"
                      className="animate-swipe absolute inset-x-0 bottom-[0.08em] z-0 h-[0.13em] origin-left rounded-full bg-secondary"
                      style={{ animationDelay: `${BEAT.swipe}ms` }}
                    />
                  </span>{" "}
                  par nature.
                </span>
              </span>
            </h1>

            <p
              className="animate-rise mt-7 max-w-xl text-lg leading-relaxed text-ink-soft"
              style={{ animationDelay: `${BEAT.paragraph}ms` }}
            >
              Agence de marketing et de communication digitale 360°, basée à
              Dakar. Stratégie, contenus, design, sites web et formation&nbsp;:
              une seule équipe pour tout votre digital.
            </p>

            <div
              className="animate-rise mt-9 flex flex-col gap-3 sm:flex-row sm:items-center"
              style={{ animationDelay: `${BEAT.actions}ms` }}
            >
              <Button asChild size="lg">
                <Link href="/devis">
                  Demander un devis
                  <ArrowRight className="size-4" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline">
                <Link href="/services">Découvrir nos services</Link>
              </Button>
            </div>

            <p
              className="animate-rise mt-5 font-mono text-[0.6875rem] tracking-[0.14em] text-ink-muted uppercase"
              style={{ animationDelay: `${BEAT.caption}ms` }}
            >
              Devis détaillé sous 48&nbsp;h · sans engagement
            </p>
          </div>

          {/* --- Colonne visuelle ------------------------------------------ */}
          {/*
            L'illustration est posée sur un fond crème de marque, avec une
            lueur jaune derrière la figure : elle fait ressortir les jaunes déjà
            présents dans le dessin plutôt que de les laisser flotter sur blanc.
          */}
          <div
            className="animate-rise relative"
            style={{ animationDelay: `${BEAT.visual}ms` }}
          >
            <div className="relative overflow-hidden rounded-[2.5rem] border border-primary/10 bg-primary-soft">
              <div
                aria-hidden="true"
                className="pointer-events-none absolute top-1/2 left-1/2 size-[80%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-secondary/35 blur-[90px]"
              />
              <Image
                src="/images/hero.png"
                alt="Illustration de l'accompagnement digital par Sunu Innovation"
                width={900}
                height={760}
                priority
                sizes="(min-width: 1024px) 44vw, 92vw"
                className="relative h-auto w-full object-contain p-6 sm:p-8"
              />
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
