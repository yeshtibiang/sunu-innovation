import type { Metadata } from "next";

import { CtaBand } from "@/components/sections/cta-band";
import { Process } from "@/components/sections/process";
import { ServicesGrid } from "@/components/sections/services-grid";
import { PageHero } from "@/components/shared/page-hero";
import { Container, Section } from "@/components/shared/section";
import { services } from "@/data/services";

export const metadata: Metadata = {
  title: "Nos services",
  description:
    "Marketing digital, social media, infographie, création de site web, stratégie digitale et formations certifiantes : les six expertises de Sunu Innovation.",
};

export default function ServicesPage() {
  return (
    <>
      <PageHero
        eyebrow="Nos services"
        title="Six expertises, combinées selon votre besoin"
        description="Nous ne vendons pas un catalogue. Nous assemblons les compétences utiles à votre objectif, et nous vous le disons quand une prestation n'est pas nécessaire."
        crumbs={[{ label: "Services" }]}
      />

      <Section className="bg-paper">
        <Container size="wide">
          <ServicesGrid items={services} />
        </Container>
      </Section>

      <Process className="border-y border-line bg-mist" />

      <CtaBand
        title="Un projet en tête ?"
        description="Remplissez le formulaire de devis : quelques questions suffisent pour que nous vous répondions précisément."
      />
    </>
  );
}
