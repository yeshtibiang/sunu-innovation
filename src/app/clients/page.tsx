import type { Metadata } from "next";
import Image from "next/image";

import { CtaBand } from "@/components/sections/cta-band";
import { ClientMarquee } from "@/components/sections/marquee";
import { PageHero } from "@/components/shared/page-hero";
import { Reveal } from "@/components/shared/reveal";
import { Container, Eyebrow, Section } from "@/components/shared/section";
import { caseStudies } from "@/data/clients";

export const metadata: Metadata = {
  title: "Nos clients",
  description:
    "Découvrez les réalisations de Sunu Inovation : campagnes, identités visuelles et dispositifs digitaux pour des marques d'Afrique de l'Ouest et centrale.",
};

export default function ClientsPage() {
  return (
    <>
      <PageHero
        eyebrow="Réalisations"
        title="Les marques qui nous font confiance"
        description="Restauration, agro-industrie, formation, santé, édition : nos dispositifs s'adaptent au secteur, jamais l'inverse."
        crumbs={[{ label: "Clients" }]}
      />

      <ClientMarquee />

      <Section className="bg-paper">
        <Container size="wide">
          <ul className="flex flex-col gap-16 md:gap-24">
            {caseStudies.map((study, index) => (
              <li key={study.slug}>
                <Reveal
                  className={`grid items-center gap-8 lg:grid-cols-2 lg:gap-16 ${
                    index % 2 === 1 ? "lg:[&>*:first-child]:order-2" : ""
                  }`}
                >
                  <div className="relative aspect-square overflow-hidden rounded-3xl border border-line bg-mist">
                    <Image
                      src={study.image}
                      alt={`${study.client} — réalisation Sunu Inovation`}
                      fill
                      sizes="(min-width: 1024px) 48vw, 92vw"
                      className="object-cover"
                    />
                  </div>

                  <div className="flex flex-col gap-5">
                    <div className="flex items-center gap-4">
                      <span className="font-mono text-xs text-primary">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      <Eyebrow>{study.sector}</Eyebrow>
                    </div>
                    <h2 className="text-balance-title font-display text-2xl leading-tight font-extrabold tracking-tight text-ink sm:text-3xl">
                      {study.title}
                    </h2>
                    <p className="text-base leading-relaxed text-ink-soft">
                      {study.summary}
                    </p>
                    <div className="flex flex-wrap gap-2 pt-1">
                      {study.services.map((service) => (
                        <span
                          key={service}
                          className="rounded-lg border border-line bg-mist px-3 py-1.5 text-xs font-medium text-ink-soft"
                        >
                          {service}
                        </span>
                      ))}
                    </div>
                    <p className="pt-2 font-display text-lg font-bold text-ink">
                      {study.client}
                    </p>
                  </div>
                </Reveal>
              </li>
            ))}
          </ul>
        </Container>
      </Section>

      <CtaBand
        title="Votre marque, la prochaine ?"
        description="Nous prenons le temps de comprendre votre marché avant de proposer quoi que ce soit."
      />
    </>
  );
}
