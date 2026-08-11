import Link from "next/link";
import { ChevronRight } from "lucide-react";

import { Container, Eyebrow } from "@/components/shared/section";
import { cn } from "@/lib/utils";

type Crumb = { label: string; href?: string };

export function PageHero({
  eyebrow,
  title,
  description,
  crumbs = [],
  children,
  className,
}: {
  eyebrow?: string;
  title: React.ReactNode;
  description?: React.ReactNode;
  crumbs?: Crumb[];
  children?: React.ReactNode;
  className?: string;
}) {
  return (
    <section
      className={cn(
        "relative overflow-hidden border-b border-line bg-paper",
        className,
      )}
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-32 right-0 size-[26rem] rounded-full bg-secondary/25 blur-[120px]"
      />

      <Container size="wide" className="relative">
        <div className="flex flex-col gap-6 py-8 md:py-12 lg:py-14">
          <nav aria-label="Fil d'Ariane">
            <ol className="flex flex-wrap items-center gap-1.5 font-mono text-[0.6875rem] tracking-[0.14em] text-ink-muted uppercase">
              <li>
                <Link href="/" className="transition-colors hover:text-primary">
                  Accueil
                </Link>
              </li>
              {crumbs.map((crumb) => (
                <li key={crumb.label} className="flex items-center gap-1.5">
                  <ChevronRight className="size-3" aria-hidden="true" />
                  {crumb.href ? (
                    <Link
                      href={crumb.href}
                      className="transition-colors hover:text-primary"
                    >
                      {crumb.label}
                    </Link>
                  ) : (
                    <span className="text-ink">{crumb.label}</span>
                  )}
                </li>
              ))}
            </ol>
          </nav>

          <div className="flex max-w-3xl flex-col gap-5">
            {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
            <h1 className="text-balance-title font-display text-4xl leading-[1.04] font-extrabold tracking-[-0.02em] text-ink sm:text-5xl lg:text-6xl">
              {title}
            </h1>
            {description && (
              <p className="text-lg leading-relaxed text-ink-soft">
                {description}
              </p>
            )}
          </div>

          {children}
        </div>
      </Container>
    </section>
  );
}
