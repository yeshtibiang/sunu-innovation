import { NextResponse } from "next/server";

import { sendMail } from "@/lib/mail";
import { checkRateLimit, getClientIp } from "@/lib/rate-limit";
import { payloadSchema, type Payload } from "@/lib/schemas/forms";

// Nodemailer a besoin des API Node : ni Edge, ni pré-rendu.
export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type MailContent = {
  subject: string;
  /** Paires libellé / valeur affichées dans le corps du message. */
  rows: [string, string][];
  /** Bloc de texte long placé en fin de message. */
  body: { label: string; value: string };
  replyTo: string;
};

function buildContent(payload: Payload): MailContent {
  if (payload.kind === "contact") {
    const rows: [string, string][] = [
      ["Nom", `${payload.civility} ${payload.firstName} ${payload.lastName}`],
      ["E-mail", payload.email],
    ];
    if (payload.phone) rows.push(["Téléphone", payload.phone]);
    if (payload.company) rows.push(["Société", payload.company]);

    return {
      subject: `Demande de contact — ${payload.firstName} ${payload.lastName}`,
      rows,
      body: { label: "Message", value: payload.message },
      replyTo: payload.email,
    };
  }

  const rows: [string, string][] = [
    ["Services", payload.services.join(", ")],
    ["Budget", payload.budget],
    ["Échéance", payload.deadline],
    ["Structure", payload.company],
    ["Contact", payload.fullName],
    ["E-mail", payload.email],
  ];
  if (payload.phone) rows.push(["Téléphone", payload.phone]);
  if (payload.existing) rows.push(["Existant / liens", payload.existing]);

  return {
    subject: `Demande de devis — ${payload.company}`,
    rows,
    body: { label: "Projet", value: payload.project },
    replyTo: payload.email,
  };
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function toText({ rows, body }: MailContent): string {
  return [
    ...rows.map(([label, value]) => `${label} : ${value}`),
    "",
    `${body.label} :`,
    body.value,
  ].join("\n");
}

function toHtml({ rows, body }: MailContent): string {
  const cells = rows
    .map(
      ([label, value]) =>
        `<tr><td style="padding:4px 16px 4px 0;color:#666;white-space:nowrap;">${escapeHtml(
          label,
        )}</td><td style="padding:4px 0;color:#111;">${escapeHtml(value)}</td></tr>`,
    )
    .join("");

  return [
    `<div style="font-family:system-ui,-apple-system,sans-serif;font-size:14px;line-height:1.6;">`,
    `<table style="border-collapse:collapse;">${cells}</table>`,
    `<p style="margin:24px 0 4px;color:#666;">${escapeHtml(body.label)} :</p>`,
    `<p style="margin:0;color:#111;white-space:pre-wrap;">${escapeHtml(body.value)}</p>`,
    `</div>`,
  ].join("");
}

export async function POST(request: Request) {
  let raw: unknown;
  try {
    raw = await request.json();
  } catch {
    return NextResponse.json(
      { ok: false, error: "Requête invalide." },
      { status: 400 },
    );
  }

  const parsed = payloadSchema.safeParse(raw);
  if (!parsed.success) {
    return NextResponse.json(
      { ok: false, error: "Formulaire incomplet ou invalide." },
      { status: 400 },
    );
  }

  const payload = parsed.data;

  // Honeypot : on répond OK sans rien envoyer, pour que le bot n'apprenne pas
  // qu'il a été repéré.
  if (payload.website) {
    return NextResponse.json({ ok: true });
  }

  if (!checkRateLimit(getClientIp(request))) {
    return NextResponse.json(
      {
        ok: false,
        error: "Trop de demandes envoyées. Réessayez dans quelques minutes.",
      },
      { status: 429 },
    );
  }

  const content = buildContent(payload);

  try {
    await sendMail({
      subject: content.subject,
      text: toText(content),
      html: toHtml(content),
      replyTo: content.replyTo,
    });
  } catch (error) {
    // Le détail contient l'hôte et le compte SMTP : il reste côté serveur.
    console.error("[api/contact] échec de l'envoi SMTP", error);
    return NextResponse.json(
      {
        ok: false,
        error: "L'envoi a échoué. Réessayez ou écrivez-nous directement.",
      },
      { status: 500 },
    );
  }

  return NextResponse.json({ ok: true });
}
