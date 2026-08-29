import { cn } from "@/lib/utils";

type LogoProps = {
  className?: string;
  variant?: "default" | "light";
  showWordmark?: boolean;
};

/**
 * Marque Sunu Innovation — un « S » stylisé formé de deux arcs qui
 * s'imbriquent, dans le dégradé signature (orange → jaune).
 */
export function LogoMark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 40 40"
      role="img"
      aria-hidden="true"
      className={cn("size-9", className)}
    >
      <defs>
        <linearGradient id="sunu-mark" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#ed6f1c" />
          <stop offset="60%" stopColor="#f39a3a" />
          <stop offset="100%" stopColor="#f9cf5d" />
        </linearGradient>
      </defs>
      <rect width="40" height="40" rx="12" fill="url(#sunu-mark)" />
      <path
        d="M26.5 14.2c-1.6-1.6-4-2.3-6.3-1.9-2.6.4-4.4 2.1-4.4 4.2 0 2 1.6 3.2 4.8 3.9 3.9.8 5.6 2 5.6 4.4 0 2.6-2.4 4.6-5.8 4.6-2.5 0-4.7-.9-6.2-2.5"
        fill="none"
        stroke="#fff"
        strokeWidth="2.6"
        strokeLinecap="round"
      />
      <circle cx="27.4" cy="27.6" r="2.1" fill="#fff" />
    </svg>
  );
}

export function Logo({
  className,
  variant = "default",
  showWordmark = true,
}: LogoProps) {
  return (
    <span className={cn("inline-flex items-center gap-2.5", className)}>
      <LogoMark />
      {showWordmark && (
        <span
          className={cn(
            "font-display text-[1.0625rem] leading-none font-extrabold tracking-tight",
            variant === "light" ? "text-white" : "text-ink",
          )}
        >
          Sunu
          <span
            className={cn(
              "font-semibold",
              variant === "light" ? "text-white/70" : "text-ink-soft",
            )}
          >
            {" "}
            Innovation
          </span>
          <span className="text-primary">.</span>
        </span>
      )}
    </span>
  );
}
