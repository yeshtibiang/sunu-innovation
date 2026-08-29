import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";

import { CtaBand } from "@/components/sections/cta-band";
import { PageHero } from "@/components/shared/page-hero";
import { Reveal } from "@/components/shared/reveal";
import {
  Container,
  Eyebrow,
  Section,
  SectionHeading,
} from "@/components/shared/section";
import { Button } from "@/components/ui/button";
import { aboutSections, values } from "@/data/about";
import { site } from "@/data/site";

export const metadata: Metadata = {
  title: "L'agence",
  description:
    "Sunu Innovation : qui sommes-nous, notre vision, nos valeurs et notre mission. Une agence digitale 360° basée à Dakar.",
};

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="L'agence"
        title="Nous bâtissons des projets, pas seulement des campagnes"
        description={site.description}
        crumbs={[{ label: "L'agence" }]}
      >
        <nav
          aria-label="Sections de la page"
          className="mt-4 flex flex-wrap gap-2"
        >
          {[
            { id: "presentation", label: "Qui sommes-nous ?" },
            { id: "vision", label: "Notre vision" },
            { id: "valeurs", label: "Nos valeurs" },
            { id: "mission", label: "Notre mission" },
          ].map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              className="rounded-xl border border-line bg-paper px-4 py-2 text-sm font-medium text-ink-soft transition-colors hover:border-primary/40 hover:text-primary"
            >
              {item.label}
            </a>
          ))}
        </nav>
      </PageHero>

      {/* Présentation + vision -------------------------------------------- */}
      {aboutSections.slice(0, 2).map((section, index) => (
        <Section
          key={section.id}
          id={section.id}
          className={index % 2 === 1 ? "border-y border-line bg-mist" : "bg-paper"}
        >
          <Container size="wide">
            <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
              <div className="lg:sticky lg:top-28 lg:self-start">
                <Eyebrow>{section.eyebrow}</Eyebrow>
                <h2 className="text-balance-title mt-4 font-display text-3xl leading-tight font-extrabold tracking-tight text-ink sm:text-4xl">
                  {section.title}
                </h2>
                <div className="mt-6 h-px w-16 bg-primary" />
              </div>

              <Reveal className="prose-ink flex flex-col">
                {section.paragraphs.map((paragraph) => (
                  <p key={paragraph.slice(0, 24)}>{paragraph}</p>
                ))}
              </Reveal>
            </div>
          </Container>
        </Section>
      ))}

      {/* Valeurs ----------------------------------------------------------- */}
      <Section id="valeurs" className="bg-paper">
        <Container size="wide">
          <SectionHeading
            eyebrow="04 — Valeurs"
            title="Quatre repères qui guident chaque décision"
            description="Ils ne sont pas décoratifs : ils déterminent la façon dont nous choisissons nos projets et travaillons avec vous."
          />

          <ul className="mt-12 grid gap-px overflow-hidden rounded-3xl border border-line bg-line sm:grid-cols-2">
            {values.map((value, index) => (
              <li key={value.name} className="bg-paper">
                <Reveal delay={index * 80} className="flex h-full flex-col gap-4 p-8 md:p-10">
                  <span className="font-mono text-xs text-primary">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <h3 className="font-display text-xl font-bold text-ink md:text-2xl">
                    {value.name}
                  </h3>
                  <p className="text-[0.9375rem] leading-relaxed text-ink-soft">
                    {value.description}
                  </p>
                </Reveal>
              </li>
            ))}
          </ul>
        </Container>
      </Section>

      {/* Mission ----------------------------------------------------------- */}
      <Section id="mission" className="border-y border-line bg-mist">
        <Container size="wide">
          <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
            <div className="flex flex-col gap-6">
              <Eyebrow>{aboutSections[2].eyebrow}</Eyebrow>
              <h2 className="text-balance-title font-display text-3xl leading-tight font-extrabold tracking-tight text-ink sm:text-4xl">
                {aboutSections[2].title}
              </h2>
              <div className="prose-ink">
                {aboutSections[2].paragraphs.map((paragraph) => (
                  <p key={paragraph.slice(0, 24)}>{paragraph}</p>
                ))}
              </div>
              <ul className="flex flex-col gap-3">
                {aboutSections[2].commitments?.map((commitment) => (
                  <li key={commitment} className="flex items-start gap-3">
                    <span className="mt-0.5 inline-flex size-5 shrink-0 items-center justify-center rounded-full bg-primary text-white">
                      <Check className="size-3" strokeWidth={3} />
                    </span>
                    <span className="text-[0.9375rem] text-ink-soft">
                      {commitment}
                    </span>
                  </li>
                ))}
              </ul>
              <div className="flex flex-col gap-3 pt-2 sm:flex-row">
                <Button asChild>
                  <Link href="/services">
                    Nos services
                    <ArrowRight className="size-4" />
                  </Link>
                </Button>
                <Button asChild variant="outline">
                  <Link href="/equipe">Rencontrer l&apos;équipe</Link>
                </Button>
              </div>
            </div>

            <Reveal>
              <div className="bg-primary relative overflow-hidden rounded-3xl p-8 md:p-12">
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute -top-20 -right-16 size-72 rounded-full bg-white/20 blur-3xl"
                />
                <div className="relative flex flex-col gap-8">
                  <p className="font-mono text-[0.6875rem] tracking-[0.22em] text-white/70 uppercase">
                    En pratique
                  </p>
                  <p className="font-display text-2xl leading-snug font-extrabold text-white sm:text-3xl">
                    « Nous ne sommes pas des exécutants : nous construisons avec
                    vous, et nous assumons les résultats. »
                  </p>
                  <dl className="grid grid-cols-2 gap-6 border-t border-white/25 pt-8">
                    {[
                      { value: "24h", label: "délai de réponse" },
                      { value: "6", label: "expertises internes" },
                      // { value: "4", label: "pays couverts" }, // pas encore présents dans ces pays
                      { value: "1", label: "interlocuteur dédié" },
                    ].map((item) => (
                      <div key={item.label}>
                        <dt className="font-display text-3xl font-extrabold text-white">
                          {item.value}
                        </dt>
                        <dd className="mt-1 text-sm text-white/80">
                          {item.label}
                        </dd>
                      </div>
                    ))}
                  </dl>
                </div>
              </div>
            </Reveal>
          </div>
        </Container>
      </Section>

      <CtaBand
        title="Travaillons ensemble"
        description="Dites-nous où vous en êtes : nous vous répondons avec un premier avis honnête, même si ce n'est pas nous qu'il vous faut."
      />
    </>
  );
}
