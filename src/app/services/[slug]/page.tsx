import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, ArrowUpRight, Check, Target } from "lucide-react";

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
import { getService, services } from "@/data/services";

type PageProps = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return services.map((service) => ({ slug: service.slug }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const service = getService(slug);

  if (!service) return { title: "Service introuvable" };

  return {
    title: service.title,
    description: service.excerpt,
    openGraph: { title: service.title, description: service.excerpt },
  };
}

export default async function ServiceDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const service = getService(slug);

  if (!service) notFound();

  const others = services.filter((item) => item.slug !== service.slug).slice(0, 3);
  const index = services.findIndex((item) => item.slug === service.slug);

  return (
    <>
      <PageHero
        eyebrow={`Service ${String(index + 1).padStart(2, "0")}`}
        title={service.title}
        description={service.excerpt}
        crumbs={[
          { label: "Services", href: "/services" },
          { label: service.shortTitle },
        ]}
      >
        <div className="mt-4 flex flex-col gap-3 sm:flex-row">
          <Button asChild>
            <Link href="/devis">
              Demander un devis
              <ArrowRight className="size-4" />
            </Link>
          </Button>
          <Button asChild variant="outline">
            <Link href="/contact">Poser une question</Link>
          </Button>
        </div>
      </PageHero>

      {/* Présentation ------------------------------------------------------ */}
      <Section className="bg-paper">
        <Container size="wide">
          <div className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:gap-20">
            <div className="flex flex-col gap-8">
              <div className="flex items-center gap-4">
                <span className="inline-flex size-14 items-center justify-center rounded-2xl bg-primary-soft text-primary">
                  <service.icon className="size-6" aria-hidden="true" />
                </span>
                <Eyebrow>Ce que nous faisons</Eyebrow>
              </div>

              <div className="prose-ink">
                {service.intro.map((paragraph) => (
                  <p key={paragraph.slice(0, 24)}>{paragraph}</p>
                ))}
              </div>

              <div className="grid gap-8 border-t border-line pt-8 sm:grid-cols-2">
                <div>
                  <p className="font-mono text-[0.6875rem] tracking-[0.2em] text-ink-muted uppercase">
                    Livrables
                  </p>
                  <ul className="mt-4 flex flex-col gap-3">
                    {service.deliverables.map((item) => (
                      <li key={item} className="flex items-start gap-3">
                        <span className="mt-0.5 inline-flex size-5 shrink-0 items-center justify-center rounded-full bg-primary text-white">
                          <Check className="size-3" strokeWidth={3} />
                        </span>
                        <span className="text-[0.9375rem] text-ink-soft">
                          {item}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <p className="font-mono text-[0.6875rem] tracking-[0.2em] text-ink-muted uppercase">
                    Résultats attendus
                  </p>
                  <ul className="mt-4 flex flex-col gap-3">
                    {service.outcomes.map((item) => (
                      <li key={item} className="flex items-start gap-3">
                        <Target
                          className="mt-0.5 size-5 shrink-0 text-secondary"
                          aria-hidden="true"
                        />
                        <span className="text-[0.9375rem] text-ink-soft">
                          {item}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            <Reveal className="lg:sticky lg:top-28 lg:self-start">
              <div className="relative flex items-center justify-center overflow-hidden rounded-3xl border border-line bg-mist p-8">
                <Image
                  src={service.image}
                  alt={service.title}
                  width={640}
                  height={520}
                  sizes="(min-width: 1024px) 40vw, 92vw"
                  className="relative h-auto w-full max-w-sm object-contain"
                />
              </div>
              <div className="mt-4 rounded-2xl border border-line bg-paper p-6">
                <p className="font-display text-base font-bold text-ink">
                  Besoin d&apos;un chiffrage&nbsp;?
                </p>
                <p className="mt-2 text-sm leading-relaxed text-ink-soft">
                  Décrivez votre contexte en 5 minutes, nous revenons vers vous
                  sous 24&nbsp;heures.
                </p>
                <Button asChild className="mt-4 w-full">
                  <Link href="/devis">
                    Demander un devis
                    <ArrowRight className="size-4" />
                  </Link>
                </Button>
              </div>
            </Reveal>
          </div>
        </Container>
      </Section>

      {/* Autres services --------------------------------------------------- */}
      <Section className="border-y border-line bg-mist">
        <Container size="wide">
          <SectionHeading
            eyebrow="Aller plus loin"
            title="Ces expertises se combinent bien"
          />
          <ul className="mt-10 grid gap-6 md:grid-cols-3">
            {others.map((item, itemIndex) => (
              <li key={item.slug}>
                <Reveal delay={itemIndex * 80} className="h-full">
                  <Link
                    href={`/services/${item.slug}`}
                    className="group flex h-full flex-col gap-4 rounded-2xl border border-line bg-paper p-7 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_24px_50px_-36px_rgba(27,27,26,0.5)]"
                  >
                    <span className="inline-flex size-11 items-center justify-center rounded-xl bg-primary-soft text-primary transition-colors group-hover:bg-primary group-hover:text-white">
                      <item.icon className="size-5" aria-hidden="true" />
                    </span>
                    <h3 className="font-display text-lg font-bold text-ink">
                      {item.title}
                    </h3>
                    <p className="text-sm leading-relaxed text-ink-soft">
                      {item.excerpt}
                    </p>
                    <span className="mt-auto inline-flex items-center gap-1.5 pt-2 text-[0.8125rem] font-semibold text-ink transition-colors group-hover:text-primary">
                      Découvrir
                      <ArrowUpRight className="size-4" />
                    </span>
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
