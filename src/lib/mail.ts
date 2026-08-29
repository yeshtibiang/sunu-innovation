import nodemailer, { type Transporter } from "nodemailer";

/**
 * Transport SMTP. Seul fichier à remplacer si l'hébergeur bloque les ports
 * sortants 587/465 et qu'il faut basculer sur un relais HTTP (Resend, Brevo…).
 */

function required(name: string): string {
  const value = process.env[name];
  if (!value) {
    throw new Error(
      `Variable d'environnement manquante : ${name}. Renseignez-la dans .env.local (voir .env.example).`,
    );
  }
  return value;
}

// Le HMR de `next dev` réévalue ce module à chaque rechargement : sans ce cache
// global, chaque édition ouvrirait un nouveau pool de connexions SMTP.
const globalForMail = globalThis as typeof globalThis & {
  __sunuMailTransporter?: Transporter;
};

function getTransporter(): Transporter {
  if (!globalForMail.__sunuMailTransporter) {
    const port = Number(process.env.SMTP_PORT ?? 587);
    const tlsServername = process.env.SMTP_TLS_SERVERNAME;

    globalForMail.__sunuMailTransporter = nodemailer.createTransport({
      host: required("SMTP_HOST"),
      port,
      // SSL implicite sur le port 465, STARTTLS ailleurs.
      secure: process.env.SMTP_SECURE === "true" || port === 465,
      auth: {
        user: required("SMTP_USER"),
        pass: required("SMTP_PASSWORD"),
      },
      // Certains hébergements mutualisés (ex. LWS) présentent un certificat
      // partagé qui ne couvre pas le nom de domaine du client. SMTP_TLS_SERVERNAME
      // vérifie le certificat contre le nom qu'il porte réellement, sans
      // désactiver la validation de la chaîne de confiance.
      ...(tlsServername ? { tls: { servername: tlsServername } } : {}),
    });
  }

  return globalForMail.__sunuMailTransporter;
}

/** Écarte l'injection d'en-têtes : aucune valeur d'en-tête ne peut contenir de saut de ligne. */
function singleLine(value: string): string {
  return value.replace(/[\r\n]+/g, " ").trim();
}

type SendMailInput = {
  subject: string;
  text: string;
  html: string;
  /** Adresse du visiteur : permet de répondre directement depuis la boîte contact@. */
  replyTo: string;
};

export async function sendMail({ subject, text, html, replyTo }: SendMailInput) {
  // `from` doit rester la boîte authentifiée SMTP, jamais l'adresse du visiteur :
  // sinon SPF/DMARC échoue et la plupart des serveurs rejettent l'envoi.
  await getTransporter().sendMail({
    from: required("CONTACT_FROM"),
    to: required("CONTACT_TO"),
    replyTo: singleLine(replyTo),
    subject: singleLine(subject),
    text,
    html,
  });
}
