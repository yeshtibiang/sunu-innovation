import { z } from "zod";

/**
 * Schémas partagés entre les formulaires client et la route `/api/contact`.
 * Une seule source de vérité : la validation serveur ne peut pas diverger de
 * celle affichée au visiteur.
 */

/** Champ piège : invisible pour un humain, rempli par les bots. */
const honeypot = z.string().optional();

const optionalPhone = z
  .string()
  .trim()
  .optional()
  .refine(
    (value) => !value || /^\d{6,15}$/.test(value.replace(/[\s\-().+]/g, "")),
    "Numéro invalide (6 à 15 chiffres).",
  );

export const contactSchema = z.object({
  civility: z.enum(["M.", "Mme"], {
    message: "Veuillez choisir une civilité.",
  }),
  firstName: z.string().trim().min(2, "Au moins 2 caractères."),
  lastName: z.string().trim().min(2, "Au moins 2 caractères."),
  email: z.string().trim().email("Adresse e-mail invalide."),
  phone: optionalPhone,
  company: z.string().trim().optional(),
  message: z
    .string()
    .trim()
    .min(20, "Décrivez votre besoin en 20 caractères minimum."),
  website: honeypot,
});

export type ContactValues = z.infer<typeof contactSchema>;

export const quoteSchema = z.object({
  services: z.array(z.string()).min(1, "Sélectionnez au moins un service."),
  budget: z.string().min(1, "Choisissez une fourchette de budget."),
  deadline: z.string().min(1, "Indiquez une échéance."),
  project: z
    .string()
    .trim()
    .min(30, "Quelques phrases de plus nous aideront (30 caractères minimum)."),
  existing: z.string().trim().optional(),
  company: z.string().trim().min(2, "Indiquez le nom de votre structure."),
  fullName: z.string().trim().min(2, "Indiquez votre nom."),
  email: z.string().trim().email("Adresse e-mail invalide."),
  phone: z.string().trim().optional(),
  consent: z.literal(true, {
    message: "Merci d'accepter le traitement de vos données.",
  }),
  website: honeypot,
});

export type QuoteValues = z.infer<typeof quoteSchema>;

/** Corps accepté par `POST /api/contact`. */
export const payloadSchema = z.discriminatedUnion("kind", [
  contactSchema.extend({ kind: z.literal("contact") }),
  quoteSchema.extend({ kind: z.literal("quote") }),
]);

export type Payload = z.infer<typeof payloadSchema>;
