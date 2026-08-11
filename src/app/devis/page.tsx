import type { Metadata } from "next";
import { Check } from "lucide-react";

import { QuoteForm } from "@/components/forms/quote-form";
import { PageHero } from "@/components/shared/page-hero";
import { Container, Section } from "@/components/shared/section";
import { site } from "@/data/site";

export const metadata: Metadata = {
  title: "Demander un devis",
  description:
    "Décrivez votre projet en trois étapes : Sunu Inovation vous répond sous 48 heures avec une proposition chiffrée.",
};

const guarantees = [
  "Réponse sous 48 heures ouvrées",
  "Devis détaillé, sans engagement",
  "Un interlocuteur unique pour votre projet",
  "Nous vous disons franchement si votre besoin ne relève pas de nous",
];

export default function QuotePage() {
  return (
    <>
      <PageHero
        eyebrow="Devis"
        title="Trois étapes, cinq minutes"
        description="Plus votre description est précise, plus notre proposition sera juste. Aucun champ inutile."
        crumbs={[{ label: "Devis" }]}
      />

      <Section className="bg-mist">
        <Container size="wide">
          <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
            <aside className="flex flex-col gap-8 lg:sticky lg:top-28 lg:self-start">
              <div>
                <p className="font-mono text-[0.6875rem] tracking-[0.2em] text-ink-muted uppercase">
                  Nos engagements
                </p>
                <ul className="mt-5 flex flex-col gap-4">
                  {guarantees.map((item) => (
                    <li key={item} className="flex items-start gap-3">
                      <span className="mt-0.5 inline-flex size-5 shrink-0 items-center justify-center rounded-full bg-primary text-white">
                        <Check className="size-3" strokeWidth={3} />
                      </span>
                      <span className="text-[0.9375rem] leading-relaxed text-ink-soft">
                        {item}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="rounded-2xl border border-line bg-paper p-6">
                <p className="font-display text-base font-bold text-ink">
                  Vous préférez en parler&nbsp;?
                </p>
                <p className="mt-2 text-sm leading-relaxed text-ink-soft">
                  Appelez-nous au{" "}
                  <a
                    href={`tel:${site.phoneHref}`}
                    className="font-medium text-primary hover:underline"
                  >
                    {site.phone}
                  </a>{" "}
                  ou écrivez à{" "}
                  <a
                    href={`mailto:${site.email}`}
                    className="font-medium text-primary hover:underline"
                  >
                    {site.email}
                  </a>
                  .
                </p>
              </div>
            </aside>

            <QuoteForm />
          </div>
        </Container>
      </Section>
    </>
  );
}
