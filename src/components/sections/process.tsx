import { Reveal } from "@/components/shared/reveal";
import {
  Container,
  Section,
  SectionHeading,
} from "@/components/shared/section";
import { processSteps } from "@/data/services";

export function Process({ className = "bg-paper" }: { className?: string }) {
  return (
    <Section className={className}>
      <Container size="wide">
        <div className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20">
          <SectionHeading
            eyebrow="Méthode"
            title={
              <>
                Une façon de travailler
                <br className="hidden sm:block" /> simple et transparente
              </>
            }
            description="Quatre étapes, des points d'avancement réguliers, aucun jargon inutile. Vous savez toujours où en est votre projet."
          />

          <ol className="relative flex flex-col">
            {processSteps.map((step, index) => (
              <Reveal
                key={step.step}
                delay={index * 90}
                className="relative border-t border-line py-7 last:border-b"
              >
                <div className="flex gap-6 md:gap-10">
                  <span className="font-mono text-sm text-primary">
                    {step.step}
                  </span>
                  <div className="flex flex-col gap-2">
                    <h3 className="font-display text-lg font-bold text-ink md:text-xl">
                      {step.title}
                    </h3>
                    <p className="max-w-xl text-[0.9375rem] leading-relaxed text-ink-soft">
                      {step.description}
                    </p>
                  </div>
                </div>
              </Reveal>
            ))}
          </ol>
        </div>
      </Container>
    </Section>
  );
}
