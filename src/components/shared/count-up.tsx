"use client";

import * as React from "react";
import {
  animate,
  motion,
  useInView,
  useIsomorphicLayoutEffect,
  useMotionValue,
  useReducedMotion,
  useTransform,
} from "motion/react";

type CountUpProps = Omit<React.ComponentProps<"span">, "children"> & {
  /** Valeur telle qu'écrite dans les données, ex. « 6 », « 30+ », « 24h ». */
  value: string;
  /** Durée du décompte, en secondes. */
  duration?: number;
  /** Retard avant le décompte, en secondes. */
  delay?: number;
};

type Parsed = {
  prefix: string;
  suffix: string;
  target: number;
  decimals: number;
  separator: string;
};

/** Isole le nombre de son habillage : « 30+ » → 30 et « + ». */
function parse(value: string): Parsed | null {
  const match = value.match(/-?\d+(?:[.,]\d+)?/);
  if (!match || match.index === undefined) return null;

  const raw = match[0];
  const [, decimals = ""] = raw.split(/[.,]/);

  return {
    prefix: value.slice(0, match.index),
    suffix: value.slice(match.index + raw.length),
    target: Number(raw.replace(",", ".")),
    decimals: decimals.length,
    separator: raw.includes(",") ? "," : ".",
  };
}

function format(latest: number, { prefix, suffix, decimals, separator }: Parsed) {
  return prefix + latest.toFixed(decimals).replace(".", separator) + suffix;
}

/**
 * Fait défiler un chiffre de 0 jusqu'à sa valeur quand il entre dans le viewport.
 * Le rendu serveur affiche déjà la valeur finale (lisible sans JS), et un doublon
 * `sr-only` évite aux lecteurs d'écran d'annoncer un nombre en cours d'animation.
 */
export function CountUp({
  value,
  duration = 1.4,
  delay = 0,
  ...props
}: CountUpProps) {
  const parsed = React.useMemo(() => parse(value), [value]);
  const ref = React.useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.4 });
  const reducedMotion = useReducedMotion();

  const count = useMotionValue(parsed ? parsed.target : 0);
  const text = useTransform(count, (latest) =>
    parsed ? format(latest, parsed) : value,
  );

  // Remise à zéro avant la première peinture : pas de clignotement entre la
  // valeur rendue côté serveur et le début du décompte.
  useIsomorphicLayoutEffect(() => {
    if (!parsed || reducedMotion) return;
    count.set(0);
  }, [count, parsed, reducedMotion]);

  React.useEffect(() => {
    if (!parsed || reducedMotion || !inView) return;

    const controls = animate(count, parsed.target, {
      duration,
      delay,
      ease: [0.16, 1, 0.3, 1],
    });

    return () => controls.stop();
  }, [count, delay, duration, inView, parsed, reducedMotion]);

  if (!parsed) {
    return (
      <span ref={ref} {...props}>
        {value}
      </span>
    );
  }

  return (
    <span ref={ref} {...props}>
      <motion.span aria-hidden="true">{text}</motion.span>
      <span className="sr-only">{value}</span>
    </span>
  );
}
