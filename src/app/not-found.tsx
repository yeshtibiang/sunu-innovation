import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Container } from "@/components/shared/section";

export default function NotFound() {
  return (
    <section className="relative overflow-hidden py-14 md:py-20">
      <Container size="content" className="relative flex flex-col items-start gap-6">
        <p className="font-mono text-[0.6875rem] tracking-[0.22em] text-primary uppercase">
          Erreur 404
        </p>
        <h1 className="font-display text-4xl leading-tight font-extrabold tracking-tight text-ink sm:text-5xl">
          Cette page n&apos;existe pas (ou plus)
        </h1>
        <p className="max-w-xl text-lg text-ink-soft">
          Le lien est peut-être ancien. Reprenons depuis l&apos;accueil, ou allons
          directement voir ce que nous savons faire.
        </p>
        <div className="flex flex-col gap-3 sm:flex-row">
          <Button asChild size="lg">
            <Link href="/">
              <ArrowLeft className="size-4" />
              Retour à l&apos;accueil
            </Link>
          </Button>
          <Button asChild size="lg" variant="outline">
            <Link href="/services">
              Voir les services
              <ArrowRight className="size-4" />
            </Link>
          </Button>
        </div>
      </Container>
    </section>
  );
}
