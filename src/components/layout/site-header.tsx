"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowRight, ChevronDown, Menu } from "lucide-react";

import { Logo } from "@/components/brand/logo";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Container } from "@/components/shared/section";
import { aboutLinks, serviceLinks } from "@/data/navigation";
import { site } from "@/data/site";
import { cn } from "@/lib/utils";

/* -------------------------------------------------------------------------- */

function useScrolled(threshold = 12) {
  const [scrolled, setScrolled] = React.useState(false);

  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > threshold);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [threshold]);

  return scrolled;
}

/* -------------------------------------------------------------------------- */

type MenuPanelProps = {
  label: string;
  active: boolean;
  children: React.ReactNode;
  panelClassName?: string;
};

function MenuPanel({ label, active, children, panelClassName }: MenuPanelProps) {
  return (
    <div className="group relative">
      <button
        type="button"
        aria-haspopup="true"
        className={cn(
          "flex h-10 items-center gap-1.5 rounded-lg px-3 text-sm font-medium transition-colors",
          "text-ink-soft hover:text-ink group-focus-within:text-ink",
          active && "text-ink",
        )}
      >
        {label}
        <ChevronDown
          className="size-3.5 transition-transform duration-300 group-hover:rotate-180 group-focus-within:rotate-180"
          aria-hidden="true"
        />
        {active && (
          <span
            aria-hidden="true"
            className="absolute inset-x-3 -bottom-px h-0.5 rounded-full bg-primary"
          />
        )}
      </button>

      <div
        className={cn(
          "invisible absolute top-full left-1/2 z-40 -translate-x-1/2 translate-y-1 pt-3 opacity-0 transition-all duration-200",
          "group-hover:visible group-hover:translate-y-0 group-hover:opacity-100",
          "group-focus-within:visible group-focus-within:translate-y-0 group-focus-within:opacity-100",
        )}
      >
        <div
          className={cn(
            "rounded-2xl border border-line bg-paper p-2 shadow-[0_28px_60px_-32px_rgba(27,27,26,0.4)]",
            panelClassName,
          )}
        >
          {children}
        </div>
      </div>
    </div>
  );
}

function PanelLink({
  href,
  label,
  description,
}: {
  href: string;
  label: string;
  description?: string;
}) {
  return (
    <Link
      href={href}
      className="group/link flex flex-col gap-1 rounded-xl p-3.5 transition-colors hover:bg-mist"
    >
      <span className="flex items-center gap-1.5 font-display text-[0.9375rem] font-semibold text-ink">
        {label}
        <ArrowRight className="size-3.5 -translate-x-1 text-primary opacity-0 transition-all duration-200 group-hover/link:translate-x-0 group-hover/link:opacity-100" />
      </span>
      {description && (
        <span className="line-clamp-2 text-[0.8125rem] leading-relaxed text-ink-muted">
          {description}
        </span>
      )}
    </Link>
  );
}

/* -------------------------------------------------------------------------- */

export function SiteHeader() {
  const pathname = usePathname();
  const scrolled = useScrolled();
  const [open, setOpen] = React.useState(false);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <header
      data-scrolled={scrolled}
      className={cn(
        "sticky top-0 z-50 w-full border-b transition-colors duration-300",
        scrolled
          ? "border-line bg-paper/85 backdrop-blur-xl"
          : "border-transparent bg-paper",
      )}
    >
      <Container size="wide" className="flex h-16 items-center gap-6 md:h-20">
        <Link
          href="/"
          aria-label={`${site.name} — accueil`}
          className="shrink-0 rounded-lg"
        >
          <Logo />
        </Link>

        {/* --- Navigation desktop ------------------------------------------ */}
        <nav
          aria-label="Navigation principale"
          className="ml-auto hidden items-center gap-0.5 lg:flex"
        >
          <Link
            href="/"
            className={cn(
              "relative flex h-10 items-center rounded-lg px-3 text-sm font-medium transition-colors hover:text-ink",
              isActive("/") ? "text-ink" : "text-ink-soft",
            )}
          >
            Accueil
            {isActive("/") && (
              <span
                aria-hidden="true"
                className="absolute inset-x-3 -bottom-px h-0.5 rounded-full bg-primary"
              />
            )}
          </Link>

          <MenuPanel
            label="Agence"
            active={isActive("/a-propos")}
            panelClassName="w-[30rem]"
          >
            <div className="grid grid-cols-2 gap-1">
              {aboutLinks.map((link) => (
                <PanelLink key={link.href} {...link} />
              ))}
            </div>
          </MenuPanel>

          <MenuPanel
            label="Services"
            active={isActive("/services")}
            panelClassName="w-[44rem]"
          >
            <div className="grid grid-cols-2 gap-1">
              {serviceLinks.map((link) => (
                <PanelLink key={link.href} {...link} />
              ))}
            </div>
            <div className="mt-1 flex items-center justify-between gap-4 rounded-xl bg-mist px-4 py-3">
              <p className="text-[0.8125rem] text-ink-soft">
                Un besoin qui mêle plusieurs expertises ?
              </p>
              <Link
                href="/services"
                className="inline-flex items-center gap-1.5 text-[0.8125rem] font-semibold text-primary hover:underline"
              >
                Voir tous les services
                <ArrowRight className="size-3.5" />
              </Link>
            </div>
          </MenuPanel>

          {[
            { label: "Équipe", href: "/equipe" },
            { label: "Clients", href: "/clients" },
            { label: "Contact", href: "/contact" },
          ].map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "relative flex h-10 items-center rounded-lg px-3 text-sm font-medium transition-colors hover:text-ink",
                isActive(link.href) ? "text-ink" : "text-ink-soft",
              )}
            >
              {link.label}
              {isActive(link.href) && (
                <span
                  aria-hidden="true"
                  className="absolute inset-x-3 -bottom-px h-0.5 rounded-full bg-primary"
                />
              )}
            </Link>
          ))}
        </nav>

        <div className="ml-auto hidden shrink-0 lg:ml-2 lg:block">
          <Button asChild size="sm" className="h-10 px-4">
            <Link href="/devis">
              Demander un devis
              <ArrowRight className="size-4" />
            </Link>
          </Button>
        </div>

        {/* --- Navigation mobile ------------------------------------------- */}
        <div className="ml-auto flex items-center gap-2 lg:hidden">
          <Button asChild size="sm" variant="outline" className="hidden sm:flex">
            <Link href="/devis">Devis</Link>
          </Button>
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" aria-label="Ouvrir le menu">
                <Menu className="size-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-full max-w-sm">
              <SheetTitle className="sr-only">Menu de navigation</SheetTitle>
              <div className="flex h-16 items-center border-b border-line px-5">
                <Logo />
              </div>

              <div className="flex-1 overflow-y-auto px-5 py-4">
                <SheetClose asChild>
                  <Link
                    href="/"
                    className="flex h-12 items-center font-display text-lg font-semibold text-ink"
                  >
                    Accueil
                  </Link>
                </SheetClose>

                <Accordion type="single" collapsible className="w-full">
                  <AccordionItem value="agence">
                    <AccordionTrigger className="py-4">Agence</AccordionTrigger>
                    <AccordionContent className="pb-4">
                      <div className="flex flex-col gap-1">
                        {aboutLinks.map((link) => (
                          <SheetClose asChild key={link.href}>
                            <Link
                              href={link.href}
                              className="rounded-lg py-2.5 text-[0.9375rem] text-ink-soft transition-colors hover:text-primary"
                            >
                              {link.label}
                            </Link>
                          </SheetClose>
                        ))}
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="services">
                    <AccordionTrigger className="py-4">Services</AccordionTrigger>
                    <AccordionContent className="pb-4">
                      <div className="flex flex-col gap-1">
                        <SheetClose asChild>
                          <Link
                            href="/services"
                            className="rounded-lg py-2.5 text-[0.9375rem] font-medium text-primary"
                          >
                            Tous les services
                          </Link>
                        </SheetClose>
                        {serviceLinks.map((link) => (
                          <SheetClose asChild key={link.href}>
                            <Link
                              href={link.href}
                              className="rounded-lg py-2.5 text-[0.9375rem] text-ink-soft transition-colors hover:text-primary"
                            >
                              {link.label}
                            </Link>
                          </SheetClose>
                        ))}
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>

                <div className="flex flex-col divide-y divide-line border-t border-line">
                  {[
                    { label: "Équipe", href: "/equipe" },
                    { label: "Clients", href: "/clients" },
                    { label: "Contact", href: "/contact" },
                  ].map((link) => (
                    <SheetClose asChild key={link.href}>
                      <Link
                        href={link.href}
                        className="flex h-14 items-center font-display text-lg font-semibold text-ink"
                      >
                        {link.label}
                      </Link>
                    </SheetClose>
                  ))}
                </div>
              </div>

              <div className="border-t border-line p-5">
                <SheetClose asChild>
                  <Button asChild size="lg" className="w-full">
                    <Link href="/devis">
                      Demander un devis
                      <ArrowRight className="size-4" />
                    </Link>
                  </Button>
                </SheetClose>
                <p className="mt-4 text-center font-mono text-xs tracking-wider text-ink-muted">
                  {site.phone}
                </p>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </Container>
    </header>
  );
}
