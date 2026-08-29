import Link from "next/link";
import { ArrowUpRight, Mail, MapPin, Phone } from "lucide-react";

import { Logo } from "@/components/brand/logo";
import { Container } from "@/components/shared/section";
import { NewsletterForm } from "@/components/forms/newsletter-form";
import { footerNav } from "@/data/navigation";
import { site } from "@/data/site";

export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative overflow-hidden bg-ink text-white">
      <Container size="wide" className="relative">
        {/* --- Bandeau haut ------------------------------------------------- */}
        <div className="flex flex-col gap-8 border-b border-white/10 py-14 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-xl">
            <p className="font-mono text-[0.6875rem] tracking-[0.22em] text-primary uppercase">
              Parlons de votre projet
            </p>
            <h2 className="mt-4 font-display text-3xl leading-tight font-extrabold tracking-tight sm:text-4xl">
              Une idée, un besoin, une urgence&nbsp;?
            </h2>
            <p className="mt-4 text-white/60">
              Écrivez-nous, nous revenons vers vous sous 48&nbsp;heures avec une
              première lecture de votre projet.
            </p>
          </div>

          <div className="flex flex-col gap-3 text-sm">
            <a
              href={`mailto:${site.email}`}
              className="group inline-flex items-center gap-3 text-white/80 transition-colors hover:text-primary"
            >
              <Mail className="size-4 shrink-0 text-primary" />
              {site.email}
              <ArrowUpRight className="size-3.5 opacity-0 transition-opacity group-hover:opacity-100" />
            </a>
            <a
              href={`tel:${site.phoneHref}`}
              className="group inline-flex items-center gap-3 text-white/80 transition-colors hover:text-primary"
            >
              <Phone className="size-4 shrink-0 text-primary" />
              {site.phone}
            </a>
            <p className="inline-flex items-center gap-3 text-white/80">
              <MapPin className="size-4 shrink-0 text-primary" />
              {site.address}
            </p>
          </div>
        </div>

        {/* --- Colonnes ----------------------------------------------------- */}
        <div className="grid grid-cols-2 gap-x-8 gap-y-12 py-14 lg:grid-cols-5">
          <div className="col-span-2 flex flex-col gap-5 lg:col-span-2">
            <Logo variant="light" />
            <p className="max-w-xs text-sm leading-relaxed text-white/55">
              {site.tagline}.
            </p>
            {/* Pas encore présents dans ces pays.
            <div>
              <p className="font-mono text-[0.6875rem] tracking-[0.22em] text-white/40 uppercase">
                Pays de présence
              </p>
              <ul className="mt-3 flex flex-wrap gap-2">
                {site.countries.map((country) => (
                  <li
                    key={country}
                    className="rounded-lg border border-white/12 px-2.5 py-1 text-xs text-white/70"
                  >
                    {country}
                  </li>
                ))}
              </ul>
            </div>
            */}
          </div>

          {footerNav.map((column) => (
            <nav key={column.title} aria-label={column.title}>
              <p className="font-mono text-[0.6875rem] tracking-[0.22em] text-white/40 uppercase">
                {column.title}
              </p>
              <ul className="mt-4 flex flex-col gap-2.5">
                {column.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-white/65 transition-colors hover:text-primary"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        {/* --- Newsletter --------------------------------------------------- */}
        <div className="flex flex-col gap-6 border-t border-white/10 py-10 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="font-display text-lg font-semibold">
              La newsletter Sunu Innovation
            </p>
            <p className="mt-1 text-sm text-white/55">
              Une fois par mois : nos analyses et retours d&apos;expérience. Sans
              spam.
            </p>
          </div>
          <NewsletterForm />
        </div>

        {/* --- Mentions ----------------------------------------------------- */}
        <div className="flex flex-col gap-4 border-t border-white/10 py-8 text-xs text-white/45 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {site.legalName}. Tous droits réservés.
          </p>
          <ul className="flex flex-wrap items-center gap-5">
            {site.socials.map((social) => (
              <li key={social.label}>
                <a
                  href={social.href}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="transition-colors hover:text-primary"
                >
                  {social.label}
                </a>
              </li>
            ))}
            <li>
              <Link href="/devis" className="transition-colors hover:text-primary">
                Demander un devis
              </Link>
            </li>
          </ul>
        </div>
      </Container>
    </footer>
  );
}
