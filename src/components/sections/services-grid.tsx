import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import { Reveal } from "@/components/shared/reveal";
import { cn } from "@/lib/utils";
import type { Service } from "@/data/services";

/**
 * Grille « bento » : rythme 2-1 / 1-2 / 1-2 sur trois colonnes, sans trou.
 */
const SPANS = [
  "lg:col-span-2",
  "lg:col-span-1",
  "lg:col-span-1",
  "lg:col-span-2",
  "lg:col-span-1",
  "lg:col-span-2",
];

export function ServicesGrid({
  items,
  className,
}: {
  items: Service[];
  className?: string;
}) {
  return (
    <ul
      className={cn(
        "grid grid-cols-1 gap-px overflow-hidden rounded-3xl border border-line bg-line sm:grid-cols-2 lg:grid-cols-3",
        className,
      )}
    >
      {items.map((service, index) => (
        <li
          key={service.slug}
          className={cn("bg-paper", SPANS[index % SPANS.length])}
        >
          <Reveal delay={index * 70} className="h-full">
            <Link
              href={`/services/${service.slug}`}
              className="group flex h-full flex-col gap-5 p-7 transition-colors duration-300 hover:bg-mist focus-visible:bg-mist md:p-9"
            >
              <div className="flex items-start justify-between gap-4">
                <span className="inline-flex size-12 items-center justify-center rounded-2xl bg-primary-soft text-primary transition-colors duration-300 group-hover:bg-primary group-hover:text-white">
                  <service.icon className="size-5" aria-hidden="true" />
                </span>
                <span className="font-mono text-xs text-ink-muted">
                  {String(index + 1).padStart(2, "0")}
                </span>
              </div>

              <div className="flex flex-col gap-2.5">
                <h3 className="font-display text-xl font-bold tracking-tight text-ink md:text-2xl">
                  {service.title}
                </h3>
                <p className="max-w-md text-[0.9375rem] leading-relaxed text-ink-soft">
                  {service.excerpt}
                </p>
              </div>

              <span className="mt-auto inline-flex items-center gap-1.5 pt-2 text-[0.8125rem] font-semibold text-ink transition-colors group-hover:text-primary">
                En savoir plus
                <ArrowUpRight className="size-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </span>
            </Link>
          </Reveal>
        </li>
      ))}
    </ul>
  );
}
