import * as React from "react";

import { cn } from "@/lib/utils";

/* -------------------------------------------------------------------------- */
/*  Container                                                                  */
/* -------------------------------------------------------------------------- */

const CONTAINER_SIZES = {
  narrow: "max-w-3xl",
  content: "max-w-5xl",
  default: "max-w-6xl",
  wide: "max-w-7xl",
} as const;

export function Container({
  size = "default",
  className,
  children,
}: {
  size?: keyof typeof CONTAINER_SIZES;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div
      className={cn(
        "mx-auto w-full px-5 sm:px-8 lg:px-10",
        CONTAINER_SIZES[size],
        className,
      )}
    >
      {children}
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*  Section                                                                    */
/* -------------------------------------------------------------------------- */

export function Section({
  className,
  children,
  id,
}: {
  className?: string;
  children: React.ReactNode;
  id?: string;
}) {
  return (
    <section
      id={id}
      className={cn("scroll-mt-28 py-10 md:py-14 lg:py-18", className)}
    >
      {children}
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/*  Eyebrow                                                                    */
/* -------------------------------------------------------------------------- */

export function Eyebrow({
  children,
  className,
  tone = "default",
}: {
  children: React.ReactNode;
  className?: string;
  tone?: "default" | "light";
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2.5 font-mono text-[0.6875rem] tracking-[0.22em] uppercase",
        tone === "light" ? "text-white/60" : "text-ink-muted",
        className,
      )}
    >
      <span
        aria-hidden="true"
        className="inline-block size-1.5 rounded-full bg-primary"
      />
      {children}
    </span>
  );
}

/* -------------------------------------------------------------------------- */
/*  SectionHeading                                                             */
/* -------------------------------------------------------------------------- */

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  tone = "default",
  className,
  children,
}: {
  eyebrow?: string;
  title: React.ReactNode;
  description?: React.ReactNode;
  align?: "left" | "center";
  tone?: "default" | "light";
  className?: string;
  children?: React.ReactNode;
}) {
  return (
    <div
      className={cn(
        "flex flex-col gap-4",
        align === "center" ? "items-center text-center" : "items-start",
        className,
      )}
    >
      {eyebrow && <Eyebrow tone={tone}>{eyebrow}</Eyebrow>}
      <h2
        className={cn(
          "text-balance-title font-display text-3xl leading-[1.08] font-extrabold tracking-tight sm:text-4xl lg:text-[2.75rem]",
          tone === "light" ? "text-white" : "text-ink",
        )}
      >
        {title}
      </h2>
      {description && (
        <p
          className={cn(
            "max-w-2xl text-base leading-relaxed md:text-lg",
            tone === "light" ? "text-white/70" : "text-ink-soft",
          )}
        >
          {description}
        </p>
      )}
      {children}
    </div>
  );
}
