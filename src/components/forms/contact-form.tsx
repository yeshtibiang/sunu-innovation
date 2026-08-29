"use client";

import * as React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { AlertCircle, ArrowRight, CheckCircle2, Loader2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Textarea } from "@/components/ui/textarea";
import { site } from "@/data/site";
import { contactSchema, type ContactValues } from "@/lib/schemas/forms";

function FieldError({ message }: { message?: string }) {
  if (!message) return null;
  return <p className="text-xs text-destructive">{message}</p>;
}

export function ContactForm() {
  const [sent, setSent] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<ContactValues>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      company: "",
      message: "",
      website: "",
    },
  });

  const civility = watch("civility");

  const onSubmit = async (values: ContactValues) => {
    setError(null);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...values, kind: "contact" }),
      });

      if (!response.ok) {
        const data = await response.json().catch(() => null);
        setError(data?.error ?? "L'envoi a échoué. Réessayez dans un instant.");
        return;
      }

      setSent(true);
    } catch {
      setError(
        "Impossible de joindre le serveur. Vérifiez votre connexion et réessayez.",
      );
    }
  };

  if (sent) {
    return (
      <div className="flex flex-col items-start gap-4 rounded-3xl border border-line bg-mist p-8 md:p-12">
        <CheckCircle2 className="size-8 text-primary" />
        <h2 className="font-display text-2xl font-bold text-ink">
          Message envoyé
        </h2>
        <p className="max-w-md text-[0.9375rem] leading-relaxed text-ink-soft">
          Merci, nous avons bien reçu votre demande et vous répondons sous
          24&nbsp;heures ouvrées. Une précision à ajouter&nbsp;? Écrivez-nous à{" "}
          <a
            href={`mailto:${site.email}`}
            className="font-medium text-primary hover:underline"
          >
            {site.email}
          </a>
          .
        </p>
        <Button variant="outline" onClick={() => setSent(false)}>
          Écrire un autre message
        </Button>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      noValidate
      className="flex flex-col gap-8"
    >
      {/* Champ piège anti-bots : invisible et hors du parcours clavier. */}
      <input
        {...register("website")}
        type="text"
        tabIndex={-1}
        autoComplete="off"
        className="hidden"
        aria-hidden="true"
      />

      <div className="flex flex-col gap-2.5">
        <Label>Civilité *</Label>
        <RadioGroup
          value={civility}
          onValueChange={(value) =>
            setValue("civility", value as ContactValues["civility"], {
              shouldValidate: true,
            })
          }
          className="flex gap-6"
        >
          {(["M.", "Mme"] as const).map((option) => (
            <div key={option} className="flex items-center gap-2.5">
              <RadioGroupItem value={option} id={`civility-${option}`} />
              <Label htmlFor={`civility-${option}`} className="font-normal">
                {option}
              </Label>
            </div>
          ))}
        </RadioGroup>
        <FieldError message={errors.civility?.message} />
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        <div className="flex flex-col gap-2">
          <Label htmlFor="firstName">Prénom *</Label>
          <Input
            id="firstName"
            autoComplete="given-name"
            placeholder="Awa"
            aria-invalid={!!errors.firstName}
            {...register("firstName")}
          />
          <FieldError message={errors.firstName?.message} />
        </div>
        <div className="flex flex-col gap-2">
          <Label htmlFor="lastName">Nom *</Label>
          <Input
            id="lastName"
            autoComplete="family-name"
            placeholder="Diop"
            aria-invalid={!!errors.lastName}
            {...register("lastName")}
          />
          <FieldError message={errors.lastName?.message} />
        </div>
        <div className="flex flex-col gap-2">
          <Label htmlFor="email">E-mail *</Label>
          <Input
            id="email"
            type="email"
            autoComplete="email"
            placeholder="vous@entreprise.com"
            aria-invalid={!!errors.email}
            {...register("email")}
          />
          <FieldError message={errors.email?.message} />
        </div>
        <div className="flex flex-col gap-2">
          <Label htmlFor="phone">Téléphone</Label>
          <Input
            id="phone"
            type="tel"
            autoComplete="tel"
            placeholder="+221 77 000 00 00"
            aria-invalid={!!errors.phone}
            {...register("phone")}
          />
          <FieldError message={errors.phone?.message} />
        </div>
        <div className="flex flex-col gap-2 sm:col-span-2">
          <Label htmlFor="company">Société / organisation</Label>
          <Input
            id="company"
            autoComplete="organization"
            placeholder="Nom de votre structure"
            {...register("company")}
          />
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <Label htmlFor="message">Votre demande *</Label>
        <Textarea
          id="message"
          rows={7}
          placeholder="Parlez-nous de votre projet, de vos objectifs et de vos délais…"
          aria-invalid={!!errors.message}
          {...register("message")}
        />
        <FieldError message={errors.message?.message} />
      </div>

      {error && (
        <div
          role="alert"
          className="flex items-start gap-3 rounded-2xl border border-destructive/30 bg-destructive/5 p-4"
        >
          <AlertCircle className="mt-0.5 size-4 shrink-0 text-destructive" />
          <p className="text-sm leading-relaxed text-ink-soft">
            {error} Vous pouvez aussi nous écrire à{" "}
            <a
              href={`mailto:${site.email}`}
              className="font-medium text-primary hover:underline"
            >
              {site.email}
            </a>
            .
          </p>
        </div>
      )}

      <div className="flex flex-col gap-4 border-t border-line pt-6 sm:flex-row sm:items-center sm:justify-between">
        <p className="max-w-sm text-xs leading-relaxed text-ink-muted">
          Vos données ne sont utilisées que pour répondre à votre demande.
        </p>
        <Button type="submit" size="lg" disabled={isSubmitting}>
          {isSubmitting ? (
            <Loader2 className="size-4 animate-spin" />
          ) : (
            <>
              Envoyer ma demande
              <ArrowRight className="size-4" />
            </>
          )}
        </Button>
      </div>
    </form>
  );
}
