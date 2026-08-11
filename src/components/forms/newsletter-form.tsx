"use client";

import * as React from "react";
import { ArrowRight, Check } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function NewsletterForm() {
  const [email, setEmail] = React.useState("");
  const [state, setState] = React.useState<"idle" | "done" | "error">("idle");

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const valid = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email);
    if (!valid) {
      setState("error");
      return;
    }
    // TODO: brancher un service d'emailing (Brevo, Mailchimp, Resend…).
    setState("done");
    setEmail("");
  };

  if (state === "done") {
    return (
      <p className="inline-flex items-center gap-2 rounded-xl border border-primary/40 bg-primary/10 px-4 py-3 text-sm text-white">
        <Check className="size-4 text-primary" />
        Merci ! Votre inscription est enregistrée.
      </p>
    );
  }

  return (
    <form onSubmit={onSubmit} className="flex w-full max-w-md flex-col gap-2">
      <div className="flex flex-col gap-2 sm:flex-row">
        <label htmlFor="newsletter-email" className="sr-only">
          Votre adresse e-mail
        </label>
        <Input
          id="newsletter-email"
          type="email"
          name="email"
          autoComplete="email"
          placeholder="vous@entreprise.com"
          value={email}
          aria-invalid={state === "error"}
          onChange={(event) => {
            setEmail(event.target.value);
            if (state === "error") setState("idle");
          }}
          className="border-white/15 bg-white/5 text-white placeholder:text-white/35 hover:border-white/30 focus-visible:border-primary"
        />
        <Button type="submit" variant="onDark" className="shrink-0">
          S&apos;abonner
          <ArrowRight className="size-4" />
        </Button>
      </div>
      {state === "error" && (
        <p className="text-xs text-secondary">
          Merci de saisir une adresse e-mail valide.
        </p>
      )}
    </form>
  );
}
