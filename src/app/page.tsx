import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, Quote } from "lucide-react";

import { Hero } from "@/components/sections/hero";
import { ServicesGrid } from "@/components/sections/services-grid";
import { ClientMarquee } from "@/components/sections/marquee";
import { Process } from "@/components/sections/process";
import { CtaBand } from "@/components/sections/cta-band";
import { Reveal } from "@/components/shared/reveal";
import {
  Container,
  Eyebrow,
  Section,
  SectionHeading,
} from "@/components/shared/section";
import { Button } from "@/components/ui/button";
import { services } from "@/data/services";
import { team } from "@/data/team";
import { values } from "@/data/about";
import { caseStudies } from "@/data/clients";
import { stats } from "@/data/site";

export default function HomePage() {
  return (
    <>
      <Hero />
      <ClientMarquee />

      {/* ---------------------------------------------------------------- */}
      {/* Services                                                          */}
      {/* ---------------------------------------------------------------- */}
      <Section id="services" className="bg-paper">
        <Container size="wide">
          <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
            <SectionHeading
              eyebrow="Nos services"
              title={
                <>
                  Six expertises,
                  <br className="hidden sm:block" /> une seule équipe
                </>
              }
              description="Chaque mission est construite autour de vos objectifs — pas d'un catalogue. Nous combinons les expertises utiles, rien de plus."
            />
            <Button asChild variant="outline" className="shrink-0">
              <Link href="/services">
                Tous les services
                <ArrowRight className="size-4" />
              </Link>
            </Button>
          </div>

          <ServicesGrid items={services} className="mt-12" />
        </Container>
      </Section>

      {/* ---------------------------------------------------------------- */}
      {/* Agence                                                            */}
      {/* ---------------------------------------------------------------- */}
      <Section className="border-y border-line bg-mist">
        <Container size="wide">
          <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
            <Reveal className="order-2 lg:order-1">
              <div className="relative">
                <div className="grid grid-cols-5 gap-3">
                  <div className="relative col-span-3 aspect-4/5 overflow-hidden rounded-3xl border border-line bg-mist">
                    <Image
                      src={team[0].image}
                      alt={`${team[0].name} — ${team[0].role}`}
                      fill
                      sizes="(min-width: 1024px) 28vw, 55vw"
                      className="object-cover object-[center_22%]"
                    />
                  </div>
                  <div className="col-span-2 flex flex-col gap-3">
                    <div className="relative aspect-square overflow-hidden rounded-2xl border border-line bg-mist">
                      <Image
                        src={team[1].image}
                        alt={`${team[1].name} — ${team[1].role}`}
                        fill
                        sizes="(min-width: 1024px) 18vw, 36vw"
                        className="object-cover object-[center_22%]"
                      />
                    </div>
                    <div className="bg-primary flex flex-1 flex-col justify-between rounded-2xl p-5">
                      <Quote className="size-5 text-white" aria-hidden="true" />
                      <p className="mt-4 font-display text-sm leading-snug font-semibold text-white">
                        « Chaque projet est d&apos;abord une aventure humaine. »
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </Reveal>

            <div className="order-1 flex flex-col gap-8 lg:order-2">
              <SectionHeading
                eyebrow="L'agence"
                title="Un partenaire stratégique, pas un simple prestataire"
                description="Nous accompagnons entreprises, institutions et start-ups de la naissance de l'idée jusqu'à sa concrétisation. Une communication fluide, créative et sur mesure — avec un suivi réel."
              />

              <ul className="grid gap-x-8 gap-y-6 sm:grid-cols-2">
                {values.map((value, index) => (
                  <Reveal key={value.name} delay={index * 70} className="flex flex-col gap-2">
                    <p className="flex items-center gap-2 font-display text-base font-bold text-ink">
                      <span
                        aria-hidden="true"
                        className="inline-block h-4 w-0.5 rounded-full bg-primary"
                      />
                      {value.name}
                    </p>
                    <p className="text-sm leading-relaxed text-ink-soft">
                      {value.description}
                    </p>
                  </Reveal>
                ))}
              </ul>

              <div>
                <Button asChild variant="secondary">
                  <Link href="/a-propos">
                    Découvrir l&apos;agence
                    <ArrowRight className="size-4" />
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* ---------------------------------------------------------------- */}
      {/* Chiffres                                                          */}
      {/* ---------------------------------------------------------------- */}
      <section className="bg-ink py-10 md:py-14">
        <Container size="wide">
          <dl className="grid grid-cols-2 gap-x-8 gap-y-10 lg:grid-cols-3">
            {stats.map((stat, index) => (
              <Reveal key={stat.label} delay={index * 80}>
                <dt className="font-display text-4xl font-extrabold tracking-tight text-white md:text-5xl">
                  {stat.value}
                </dt>
                <dd className="mt-2 text-sm text-white/55">{stat.label}</dd>
              </Reveal>
            ))}
          </dl>
        </Container>
      </section>

      <Process />

      {/* ---------------------------------------------------------------- */}
      {/* Réalisations                                                      */}
      {/* ---------------------------------------------------------------- */}
      <Section className="border-t border-line bg-mist">
        <Container size="wide">
          <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
            <SectionHeading
              eyebrow="Réalisations"
              title="Des marques que nous faisons grandir"
              description="Un aperçu de nos collaborations récentes, du social media à la refonte complète d'identité."
            />
            <Button asChild variant="outline" className="shrink-0">
              <Link href="/clients">
                Voir tous les cas
                <ArrowRight className="size-4" />
              </Link>
            </Button>
          </div>

          <ul className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {caseStudies.slice(0, 3).map((study, index) => (
              <li key={study.slug}>
                <Reveal delay={index * 80} className="h-full">
                  <Link
                    href="/clients"
                    className="group flex h-full flex-col overflow-hidden rounded-2xl border border-line bg-paper transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_28px_60px_-40px_rgba(27,27,26,0.5)]"
                  >
                    <div className="relative aspect-square overflow-hidden bg-mist">
                      <Image
                        src={study.image}
                        alt={`${study.client} — réalisation Sunu Inovation`}
                        fill
                        sizes="(min-width: 1024px) 32vw, (min-width: 640px) 46vw, 92vw"
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    </div>
                    <div className="flex flex-1 flex-col gap-3 p-6">
                      <Eyebrow>{study.sector}</Eyebrow>
                      <h3 className="font-display text-lg font-bold text-ink">
                        {study.client}
                      </h3>
                      <p className="text-sm leading-relaxed text-ink-soft">
                        {study.summary}
                      </p>
                      <span className="mt-auto inline-flex items-center gap-1.5 pt-3 text-[0.8125rem] font-semibold text-ink transition-colors group-hover:text-primary">
                        Voir le cas
                        <ArrowUpRight className="size-4" />
                      </span>
                    </div>
                  </Link>
                </Reveal>
              </li>
            ))}
          </ul>
        </Container>
      </Section>

      <CtaBand />
    </>
  );
}
