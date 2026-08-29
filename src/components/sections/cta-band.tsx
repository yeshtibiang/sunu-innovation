import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Container } from "@/components/shared/section";
import { site } from "@/data/site";

export function CtaBand({
  title = "Prêt à passer à l'action ?",
  description = "Décrivez-nous votre projet en quelques lignes. Nous revenons vers vous sous 24 heures avec une proposition claire et chiffrée.",
}: {
  title?: string;
  description?: string;
}) {
  return (
    <section className="py-8 md:py-12">
      <Container size="wide">
        <div className="bg-primary relative overflow-hidden rounded-3xl px-7 py-8 md:px-14 md:py-10">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -top-24 -right-10 size-72 rounded-full bg-white/20 blur-3xl"
          />
          <div className="relative flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
            <div className="max-w-2xl">
              <h2 className="text-balance-title font-display text-3xl leading-tight font-extrabold tracking-tight text-white sm:text-4xl">
                {title}
              </h2>
              <p className="mt-4 text-base leading-relaxed text-white/85 md:text-lg">
                {description}
              </p>
            </div>
            <div className="flex shrink-0 flex-col gap-3 sm:flex-row lg:flex-col xl:flex-row">
              <Button asChild size="lg" variant="onDark">
                <Link href="/devis">
                  Demander un devis
                  <ArrowRight className="size-4" />
                </Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="ghost"
                className="border border-white/40 text-white hover:bg-white/15 hover:text-white"
              >
                <a href={`mailto:${site.email}`}>Écrire un e-mail</a>
              </Button>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
