import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Clock, Mail, MapPin, Phone } from "lucide-react";

import { ContactForm } from "@/components/forms/contact-form";
import { PageHero } from "@/components/shared/page-hero";
import { Container, Eyebrow, Section } from "@/components/shared/section";
import { site } from "@/data/site";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Contactez Sunu Inovation : e-mail, téléphone et formulaire. Réponse sous 48 heures.",
};

const infos = [
  { icon: Mail, label: "E-mail", value: site.email, href: `mailto:${site.email}` },
  { icon: Phone, label: "Téléphone", value: site.phone, href: `tel:${site.phoneHref}` },
  { icon: MapPin, label: "Bureau", value: site.address },
  { icon: Clock, label: "Délai de réponse", value: "48 heures ouvrées" },
];

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Contact"
        title="Écrivez-nous, nous lisons tout"
        description="Un projet, une question, une candidature : ce formulaire arrive directement chez la bonne personne."
        crumbs={[{ label: "Contact" }]}
      />

      <Section className="bg-paper">
        <Container size="wide">
          <div className="grid gap-12 lg:grid-cols-[1.15fr_0.85fr] lg:gap-20">
            <div className="rounded-3xl border border-line bg-paper p-6 md:p-10">
              <Eyebrow>Formulaire</Eyebrow>
              <h2 className="mt-4 mb-8 font-display text-2xl font-extrabold tracking-tight text-ink sm:text-3xl">
                Parlez-nous de votre besoin
              </h2>
              <ContactForm />
            </div>

            <aside className="flex flex-col gap-8">
              <ul className="flex flex-col gap-px overflow-hidden rounded-3xl border border-line bg-line">
                {infos.map((info) => (
                  <li key={info.label} className="bg-paper">
                    <div className="flex items-start gap-4 p-6">
                      <span className="inline-flex size-10 shrink-0 items-center justify-center rounded-xl bg-primary-soft text-primary">
                        <info.icon className="size-4" aria-hidden="true" />
                      </span>
                      <div>
                        <p className="font-mono text-[0.625rem] tracking-[0.2em] text-ink-muted uppercase">
                          {info.label}
                        </p>
                        {info.href ? (
                          <a
                            href={info.href}
                            className="mt-1 block font-medium text-ink transition-colors hover:text-primary"
                          >
                            {info.value}
                          </a>
                        ) : (
                          <p className="mt-1 font-medium text-ink">{info.value}</p>
                        )}
                      </div>
                    </div>
                  </li>
                ))}
              </ul>

              <div className="rounded-3xl border border-line bg-mist p-8">
                <h3 className="font-display text-lg font-bold text-ink">
                  Vous connaissez déjà votre besoin&nbsp;?
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-soft">
                  Passez directement par le formulaire de devis : trois étapes,
                  cinq minutes, et une réponse chiffrée sous 48&nbsp;heures.
                </p>
                <Link
                  href="/devis"
                  className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:underline"
                >
                  Demander un devis
                  <ArrowRight className="size-4" />
                </Link>
              </div>

              {/* Pas encore présents dans ces pays.
              <div className="rounded-3xl border border-line p-8">
                <p className="font-mono text-[0.625rem] tracking-[0.2em] text-ink-muted uppercase">
                  Pays de présence
                </p>
                <ul className="mt-4 flex flex-wrap gap-2">
                  {site.countries.map((country) => (
                    <li
                      key={country}
                      className="rounded-lg bg-mist px-3 py-1.5 text-sm text-ink-soft"
                    >
                      {country}
                    </li>
                  ))}
                </ul>
              </div>
              */}
            </aside>
          </div>
        </Container>
      </Section>
    </>
  );
}
