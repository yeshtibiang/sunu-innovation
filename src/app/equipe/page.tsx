import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Mail } from "lucide-react";

import { CtaBand } from "@/components/sections/cta-band";
import { PageHero } from "@/components/shared/page-hero";
import { Reveal } from "@/components/shared/reveal";
import {
  Container,
  Section,
  SectionHeading,
} from "@/components/shared/section";
import { Button } from "@/components/ui/button";
import { contactIntents, team } from "@/data/team";
import { site } from "@/data/site";

export const metadata: Metadata = {
  title: "L'équipe",
  description:
    "Rencontrez l'équipe Sunu Innovation : social media, développement web et design graphique.",
};

export default function TeamPage() {
  return (
    <>
      <PageHero
        eyebrow="L'équipe"
        title="Des visages, pas un standard téléphonique"
        description="Chez nous, chaque projet est une aventure humaine : un accompagnement sur mesure, des échanges sincères et des résultats qui font la différence."
        crumbs={[{ label: "Équipe" }]}
      />

      {/* Membres ----------------------------------------------------------- */}
      <Section className="bg-paper">
        <Container size="wide">
          <ul className="grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-x-8">
            {team.map((member, index) => (
              <li key={member.name}>
                <Reveal
                  delay={index * 90}
                  className="group flex h-full flex-col gap-5"
                >
                  <div className="relative aspect-4/5 overflow-hidden rounded-3xl border border-line bg-mist">
                    <Image
                      src={member.image}
                      alt={`Portrait de ${member.name}`}
                      fill
                      sizes="(min-width: 1024px) 24vw, (min-width: 640px) 46vw, 92vw"
                      className="object-cover object-[center_22%] transition-transform duration-700 group-hover:scale-[1.04]"
                    />
                    <div
                      aria-hidden="true"
                      className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-ink/60 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                    />
                  </div>
                  <div className="flex flex-col gap-2.5">
                    <h2 className="font-display text-lg font-bold text-ink md:text-xl">
                      {member.name}
                    </h2>
                    <span
                      aria-hidden="true"
                      className="h-px w-8 bg-line transition-all duration-500 group-hover:w-14 group-hover:bg-primary"
                    />
                    <p className="font-mono text-[0.6875rem] leading-relaxed tracking-[0.16em] text-primary uppercase">
                      {member.role}
                    </p>
                  </div>
                </Reveal>
              </li>
            ))}
          </ul>
        </Container>
      </Section>

      {/* Recrutement / prise de contact rapide ------------------------------ */}
      <Section className="border-y border-line bg-mist">
        <Container size="wide">
          <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
            <SectionHeading
              eyebrow="Prise de contact"
              title="Dites-nous en une phrase ce dont vous avez besoin"
              description="Choisissez l'intention la plus proche : votre message arrive directement dans la bonne boîte, déjà pré-rempli."
            />

            <ul className="grid gap-px overflow-hidden rounded-3xl border border-line bg-line sm:grid-cols-2">
              {contactIntents.map((intent, index) => (
                <li key={intent.subject} className="bg-paper">
                  <Reveal delay={index * 70} className="h-full">
                    <a
                      href={`mailto:${site.email}?subject=${encodeURIComponent(intent.subject)}`}
                      className="group flex h-full items-start justify-between gap-4 p-7 transition-colors hover:bg-mist"
                    >
                      <span className="font-display text-base font-semibold text-ink transition-colors group-hover:text-primary md:text-lg">
                        {intent.label}
                      </span>
                      <Mail
                        className="mt-0.5 size-5 shrink-0 text-ink-muted transition-colors group-hover:text-primary"
                        aria-hidden="true"
                      />
                    </a>
                  </Reveal>
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-12 flex flex-col items-start gap-4 rounded-3xl border border-line bg-paper p-8 md:flex-row md:items-center md:justify-between md:p-10">
            <div>
              <h3 className="font-display text-xl font-bold text-ink">
                Envie de rejoindre l&apos;aventure&nbsp;?
              </h3>
              <p className="mt-2 text-sm text-ink-soft">
                Nous accueillons régulièrement des profils curieux, en stage comme
                en freelance.
              </p>
            </div>
            <Button asChild variant="secondary" className="shrink-0">
              <Link href="/contact">
                Envoyer une candidature
                <ArrowRight className="size-4" />
              </Link>
            </Button>
          </div>
        </Container>
      </Section>

      <CtaBand
        title="Parlons de votre projet"
        description="Un échange de 30 minutes suffit souvent à clarifier une situation. C'est gratuit et sans engagement."
      />
    </>
  );
}
