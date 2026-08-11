"use client";

import * as React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { ArrowRight, CheckCircle2, Loader2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Textarea } from "@/components/ui/textarea";
import { site } from "@/data/site";

const schema = z.object({
  civility: z.enum(["M.", "Mme"], {
    message: "Veuillez choisir une civilité.",
  }),
  firstName: z.string().trim().min(2, "Au moins 2 caractères."),
  lastName: z.string().trim().min(2, "Au moins 2 caractères."),
  email: z.string().trim().email("Adresse e-mail invalide."),
  phone: z
    .string()
    .trim()
    .optional()
    .refine(
      (value) =>
        !value || /^\d{6,15}$/.test(value.replace(/[\s\-().+]/g, "")),
      "Numéro invalide (6 à 15 chiffres).",
    ),
  company: z.string().trim().optional(),
  message: z.string().trim().min(20, "Décrivez votre besoin en 20 caractères minimum."),
});

type ContactValues = z.infer<typeof schema>;

function FieldError({ message }: { message?: string }) {
  if (!message) return null;
  return <p className="text-xs text-destructive">{message}</p>;
}

export function ContactForm() {
  const [sent, setSent] = React.useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<ContactValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      company: "",
      message: "",
    },
  });

  const civility = watch("civility");

  const onSubmit = async (values: ContactValues) => {
    // TODO: remplacer par un appel API (route handler, Resend, Formspree…).
    const body = [
      `${values.civility} ${values.firstName} ${values.lastName}`,
      values.company ? `Société : ${values.company}` : null,
      `E-mail : ${values.email}`,
      values.phone ? `Téléphone : ${values.phone}` : null,
      "",
      values.message,
    ]
      .filter(Boolean)
      .join("\n");

    window.location.href = `mailto:${site.email}?subject=${encodeURIComponent(
      `Demande de contact — ${values.firstName} ${values.lastName}`,
    )}&body=${encodeURIComponent(body)}`;

    setSent(true);
  };

  if (sent) {
    return (
      <div className="flex flex-col items-start gap-4 rounded-3xl border border-line bg-mist p-8 md:p-12">
        <CheckCircle2 className="size-8 text-primary" />
        <h2 className="font-display text-2xl font-bold text-ink">
          Message prêt à partir
        </h2>
        <p className="max-w-md text-[0.9375rem] leading-relaxed text-ink-soft">
          Votre logiciel de messagerie s&apos;est ouvert avec le message
          pré-rempli. Si rien ne s&apos;est passé, écrivez-nous directement à{" "}
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
