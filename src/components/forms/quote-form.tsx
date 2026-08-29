"use client";

import * as React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  AlertCircle,
  ArrowLeft,
  ArrowRight,
  Check,
  CheckCircle2,
  Loader2,
  Send,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { services } from "@/data/services";
import { site } from "@/data/site";
import { quoteSchema, type QuoteValues } from "@/lib/schemas/forms";
import { cn } from "@/lib/utils";

const BUDGETS = [
  "Moins de 500 000 FCFA",
  "500 000 – 1 500 000 FCFA",
  "1 500 000 – 5 000 000 FCFA",
  "Plus de 5 000 000 FCFA",
  "À définir ensemble",
];

const DEADLINES = [
  "Dès que possible",
  "Sous 1 mois",
  "Sous 3 mois",
  "Pas encore de date",
];

const STEPS = [
  { title: "Votre besoin", fields: ["services", "budget", "deadline"] },
  { title: "Votre projet", fields: ["project", "existing"] },
  { title: "Vos coordonnées", fields: ["company", "fullName", "email", "phone", "consent"] },
] as const;

function FieldError({ message }: { message?: string }) {
  if (!message) return null;
  return <p className="text-xs text-destructive">{message}</p>;
}

export function QuoteForm() {
  const [step, setStep] = React.useState(0);
  const [sent, setSent] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    trigger,
    formState: { errors, isSubmitting },
  } = useForm<QuoteValues>({
    resolver: zodResolver(quoteSchema),
    mode: "onTouched",
    defaultValues: {
      services: [],
      budget: "",
      deadline: "",
      project: "",
      existing: "",
      company: "",
      fullName: "",
      email: "",
      phone: "",
      website: "",
    },
  });

  const selectedServices = watch("services") ?? [];
  const budget = watch("budget");
  const deadline = watch("deadline");
  const consent = watch("consent");

  const toggleService = (title: string) => {
    const next = selectedServices.includes(title)
      ? selectedServices.filter((item) => item !== title)
      : [...selectedServices, title];
    setValue("services", next, { shouldValidate: true });
  };

  const goNext = async () => {
    const valid = await trigger(
      STEPS[step].fields as unknown as (keyof QuoteValues)[],
    );
    if (valid) setStep((current) => Math.min(current + 1, STEPS.length - 1));
  };

  const onSubmit = async (values: QuoteValues) => {
    setError(null);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...values, kind: "quote" }),
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
          Demande envoyée
        </h2>
        <p className="max-w-md text-[0.9375rem] leading-relaxed text-ink-soft">
          Merci, nous avons bien reçu votre demande de devis. Vous recevrez une
          réponse chiffrée sous 24&nbsp;heures ouvrées. Besoin d&apos;ajouter une
          pièce jointe&nbsp;? Écrivez-nous à{" "}
          <a
            href={`mailto:${site.email}`}
            className="font-medium text-primary hover:underline"
          >
            {site.email}
          </a>
          .
        </p>
        <Button
          variant="outline"
          onClick={() => {
            setSent(false);
            setStep(0);
          }}
        >
          Nouvelle demande
        </Button>
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-3xl border border-line bg-paper">
      {/* Progression ------------------------------------------------------- */}
      <div className="flex flex-col gap-4 border-b border-line bg-mist px-6 py-5 md:px-10">
        <div className="flex items-center justify-between">
          <p className="font-mono text-[0.6875rem] tracking-[0.2em] text-ink-muted uppercase">
            Étape {step + 1} / {STEPS.length}
          </p>
          <p className="font-display text-sm font-semibold text-ink">
            {STEPS[step].title}
          </p>
        </div>
        <div className="flex gap-1.5">
          {STEPS.map((item, index) => (
            <span
              key={item.title}
              className={cn(
                "h-1 flex-1 rounded-full transition-colors duration-300",
                index <= step ? "bg-primary" : "bg-line",
              )}
            />
          ))}
        </div>
      </div>

      <form
        onSubmit={handleSubmit(onSubmit)}
        noValidate
        className="flex flex-col gap-8 p-6 md:p-10"
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
        {/* Étape 1 --------------------------------------------------------- */}
        {step === 0 && (
          <div className="flex flex-col gap-8">
            <div className="flex flex-col gap-3">
              <Label>Quels services vous intéressent ? *</Label>
              <div className="grid gap-2.5 sm:grid-cols-2">
                {services.map((service) => {
                  const checked = selectedServices.includes(service.title);
                  return (
                    <button
                      type="button"
                      key={service.slug}
                      onClick={() => toggleService(service.title)}
                      aria-pressed={checked}
                      className={cn(
                        "flex items-center gap-3 rounded-xl border p-4 text-left transition-colors",
                        checked
                          ? "border-primary bg-primary-soft"
                          : "border-line bg-paper hover:border-ink/25",
                      )}
                    >
                      <span
                        aria-hidden="true"
                        className={cn(
                          "flex size-5 shrink-0 items-center justify-center rounded-[0.3125rem] border transition-colors",
                          checked
                            ? "border-primary bg-primary text-white"
                            : "border-input bg-paper",
                        )}
                      >
                        {checked && <Check className="size-3.5" strokeWidth={3} />}
                      </span>
                      <span className="text-sm font-medium text-ink">
                        {service.shortTitle}
                      </span>
                    </button>
                  );
                })}
              </div>
              <FieldError message={errors.services?.message} />
            </div>

            <div className="grid gap-6 sm:grid-cols-2">
              <div className="flex flex-col gap-2">
                <Label htmlFor="budget">Budget envisagé *</Label>
                <Select
                  value={budget}
                  onValueChange={(value) =>
                    setValue("budget", value, { shouldValidate: true })
                  }
                >
                  <SelectTrigger id="budget" aria-invalid={!!errors.budget}>
                    <SelectValue placeholder="Choisir une fourchette" />
                  </SelectTrigger>
                  <SelectContent>
                    {BUDGETS.map((item) => (
                      <SelectItem key={item} value={item}>
                        {item}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FieldError message={errors.budget?.message} />
              </div>

              <div className="flex flex-col gap-2">
                <Label htmlFor="deadline">Échéance souhaitée *</Label>
                <Select
                  value={deadline}
                  onValueChange={(value) =>
                    setValue("deadline", value, { shouldValidate: true })
                  }
                >
                  <SelectTrigger id="deadline" aria-invalid={!!errors.deadline}>
                    <SelectValue placeholder="Choisir une échéance" />
                  </SelectTrigger>
                  <SelectContent>
                    {DEADLINES.map((item) => (
                      <SelectItem key={item} value={item}>
                        {item}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FieldError message={errors.deadline?.message} />
              </div>
            </div>
          </div>
        )}

        {/* Étape 2 --------------------------------------------------------- */}
        {step === 1 && (
          <div className="flex flex-col gap-6">
            <div className="flex flex-col gap-2">
              <Label htmlFor="project">Décrivez votre projet *</Label>
              <Textarea
                id="project"
                rows={7}
                placeholder="Contexte, objectifs, cibles, ce qui a déjà été tenté…"
                aria-invalid={!!errors.project}
                {...register("project")}
              />
              <FieldError message={errors.project?.message} />
            </div>
            <div className="flex flex-col gap-2">
              <Label htmlFor="existing">Liens utiles (site, réseaux, brief)</Label>
              <Input
                id="existing"
                placeholder="https://…"
                {...register("existing")}
              />
              <p className="text-xs text-ink-muted">
                Vous pourrez nous transmettre vos documents par e-mail après
                l&apos;envoi.
              </p>
            </div>
          </div>
        )}

        {/* Étape 3 --------------------------------------------------------- */}
        {step === 2 && (
          <div className="flex flex-col gap-6">
            <div className="grid gap-6 sm:grid-cols-2">
              <div className="flex flex-col gap-2">
                <Label htmlFor="company">Structure *</Label>
                <Input
                  id="company"
                  autoComplete="organization"
                  placeholder="Nom de l'entreprise"
                  aria-invalid={!!errors.company}
                  {...register("company")}
                />
                <FieldError message={errors.company?.message} />
              </div>
              <div className="flex flex-col gap-2">
                <Label htmlFor="fullName">Nom et prénom *</Label>
                <Input
                  id="fullName"
                  autoComplete="name"
                  placeholder="Awa Diop"
                  aria-invalid={!!errors.fullName}
                  {...register("fullName")}
                />
                <FieldError message={errors.fullName?.message} />
              </div>
              <div className="flex flex-col gap-2">
                <Label htmlFor="quote-email">E-mail *</Label>
                <Input
                  id="quote-email"
                  type="email"
                  autoComplete="email"
                  placeholder="vous@entreprise.com"
                  aria-invalid={!!errors.email}
                  {...register("email")}
                />
                <FieldError message={errors.email?.message} />
              </div>
              <div className="flex flex-col gap-2">
                <Label htmlFor="quote-phone">Téléphone</Label>
                <Input
                  id="quote-phone"
                  type="tel"
                  autoComplete="tel"
                  placeholder="+221 77 000 00 00"
                  {...register("phone")}
                />
              </div>
            </div>

            <div className="flex flex-col gap-2 rounded-xl border border-line bg-mist p-4">
              <div className="flex items-start gap-3">
                <Checkbox
                  id="consent"
                  checked={consent === true}
                  onCheckedChange={(value) =>
                    setValue("consent", value === true ? true : (false as never), {
                      shouldValidate: true,
                    })
                  }
                />
                <Label htmlFor="consent" className="text-sm leading-relaxed font-normal">
                  J&apos;accepte que ces informations soient utilisées pour me
                  recontacter au sujet de ma demande.
                </Label>
              </div>
              <FieldError message={errors.consent?.message} />
            </div>
          </div>
        )}

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

        {/* Navigation ------------------------------------------------------ */}
        <div className="flex items-center justify-between gap-4 border-t border-line pt-6">
          <Button
            type="button"
            variant="ghost"
            onClick={() => setStep((current) => Math.max(current - 1, 0))}
            disabled={step === 0 || isSubmitting}
            className={step === 0 ? "invisible" : ""}
          >
            <ArrowLeft className="size-4" />
            Retour
          </Button>

          {step < STEPS.length - 1 ? (
            <Button type="button" onClick={goNext} size="lg">
              Continuer
              <ArrowRight className="size-4" />
            </Button>
          ) : (
            <Button type="submit" size="lg" disabled={isSubmitting}>
              {isSubmitting ? (
                <Loader2 className="size-4 animate-spin" />
              ) : (
                <>
                  Envoyer ma demande
                  <Send className="size-4" />
                </>
              )}
            </Button>
          )}
        </div>
      </form>
    </div>
  );
}
