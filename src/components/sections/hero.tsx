import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Container } from "@/components/shared/section";
import { services } from "@/data/services";

export function Hero() {
  return (
    <section className="relative overflow-hidden border-b border-line bg-paper">
      {/* Fonds décoratifs */}
      {/* <div
        aria-hidden="true"
        className="animate-glow pointer-events-none absolute -top-40 -right-24 size-[34rem] rounded-full bg-secondary/35 blur-[130px]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-48 -left-32 size-[30rem] rounded-full bg-primary/12 blur-[130px]"
      /> */}

      <Container size="wide" className="relative">
        <div className="grid items-center gap-14 py-6 md:py-8 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16 lg:py-10">
          {/* --- Colonne texte -------------------------------------------- */}
          <div className="flex flex-col items-start">
            {/* Pas encore présents dans ces pays.
            <span className="animate-rise inline-flex items-center gap-2 rounded-full border border-line bg-paper/80 py-1.5 pr-4 pl-1.5 font-mono text-[0.6875rem] tracking-[0.16em] text-ink-soft uppercase backdrop-blur">
              <span className="inline-flex size-5 items-center justify-center rounded-full bg-primary-soft">
                <Sparkles className="size-3 text-primary" aria-hidden="true" />
              </span>
              Dakar · Brazzaville · N&apos;Djaména · Abidjan
            </span>
            */}

            <h1
              className="animate-rise text-balance-title mt-7 font-display text-[2.5rem] leading-[1.02] font-extrabold tracking-[-0.02em] text-ink sm:text-6xl lg:text-[4.25rem]"
              style={{ animationDelay: "80ms" }}
            >
              L&apos;intelligence digitale,
              <br />
              <span className="relative inline-block">
                <span className="relative z-10">collective</span>
                <span
                  aria-hidden="true"
                  className="absolute inset-x-0 bottom-1 z-0 h-2.5 rounded-sm bg-secondary/65 sm:bottom-2 sm:h-3.5"
                />
              </span>{" "}
              par nature.
            </h1>

            <p
              className="animate-rise mt-7 max-w-xl text-lg leading-relaxed text-ink-soft"
              style={{ animationDelay: "160ms" }}
            >
              Sunu Inovation est une agence de marketing et de communication
              digitale 360°. Nous transformons vos idées en dispositifs concrets, stratégie, contenus, design, web et formation.
            </p>

            <div
              className="animate-rise mt-9 flex flex-col gap-3 sm:flex-row sm:items-center"
              style={{ animationDelay: "240ms" }}
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

            <dl
              className="animate-rise mt-12 grid w-full grid-cols-2 gap-x-8 gap-y-6 border-t border-line pt-8 sm:grid-cols-2"
              style={{ animationDelay: "320ms" }}
            >
              {[
                { value: "6", label: "expertises intégrées" },
                // { value: "4", label: "pays de présence" }, // pas encore présents dans ces pays
                { value: "48h", label: "pour votre devis" },
              ].map((item) => (
                <div key={item.label}>
                  <dt className="font-display text-3xl font-extrabold text-ink">
                    {item.value}
                  </dt>
                  <dd className="mt-1 text-sm text-ink-muted">{item.label}</dd>
                </div>
              ))}
            </dl>
          </div>

          {/* --- Colonne visuelle ------------------------------------------ */}
          <div
            className="animate-rise relative"
            style={{ animationDelay: "200ms" }}
          >
            <div className="relative overflow-hidden rounded-3xl border border-line bg-mist">
              <Image
                src="/images/hero.png"
                alt="Illustration de l'accompagnement digital par Sunu Inovation"
                width={900}
                height={760}
                priority
                sizes="(min-width: 1024px) 46vw, 92vw"
                className="relative h-auto w-full object-contain p-6 sm:p-10"
              />
            </div>

            {/* Carte flottante : expertises */}
            <div className="mt-4 grid grid-cols-2 gap-3 sm:absolute sm:-bottom-8 sm:-left-6 sm:mt-0 sm:w-64 sm:grid-cols-1 sm:gap-0 sm:rounded-2xl sm:border sm:border-line sm:bg-paper sm:p-4 sm:shadow-[0_24px_50px_-30px_rgba(27,27,26,0.45)]">
              <p className="col-span-2 font-mono text-[0.625rem] tracking-[0.2em] text-ink-muted uppercase sm:col-span-1">
                Nos expertises
              </p>
              <ul className="col-span-2 mt-0 flex flex-col gap-2 sm:mt-3">
                {services.slice(0, 3).map((service) => (
                  <li
                    key={service.slug}
                    className="flex items-center gap-2.5 text-[0.8125rem] font-medium text-ink"
                  >
                    <service.icon
                      className="size-4 shrink-0 text-primary"
                      aria-hidden="true"
                    />
                    {service.shortTitle}
                  </li>
                ))}
                <li className="text-[0.8125rem] text-ink-muted">
                  + 3 autres expertises
                </li>
              </ul>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
