"use client";

import * as React from "react";

import { cn } from "@/lib/utils";

type RevealProps = React.ComponentProps<"div"> & {
  delay?: number;
};

/**
 * Révèle son contenu au scroll (opacité + léger translate).
 * Respecte prefers-reduced-motion et reste visible sans JS.
 */
export function Reveal({
  className,
  delay = 0,
  children,
  ...props
}: RevealProps) {
  const ref = React.useRef<HTMLDivElement>(null);
  const [visible, setVisible] = React.useState(false);

  React.useEffect(() => {
    const node = ref.current;
    if (!node) return;

    // Le respect de prefers-reduced-motion est géré en CSS (globals.css) :
    // la transition est neutralisée, le contenu apparaît immédiatement.
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -6% 0px" },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      data-visible={visible}
      style={{ transitionDelay: `${delay}ms` }}
      className={cn(
        "translate-y-4 opacity-0 transition-[opacity,transform] duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] motion-reduce:translate-y-0 motion-reduce:opacity-100",
        "data-[visible=true]:translate-y-0 data-[visible=true]:opacity-100",
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
}
