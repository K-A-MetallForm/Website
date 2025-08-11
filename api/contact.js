// /api/contact.js  (Vercel Functions, ESM)
import { Resend } from 'resend';

const RESEND_API_KEY = process.env.RESEND_API_KEY;
const MAIL_FROM       = process.env.MAIL_FROM;
const MAIL_TO         = process.env.MAIL_TO;
const MAIL_SUBJECT    = process.env.MAIL_SUBJECT || 'Neue Anfrage über die Website';
const MAIL_CONFIRM_SUBJECT = process.env.MAIL_CONFIRM_SUBJECT || 'Wir haben deine Nachricht erhalten';

// Hilfsfunktion: immer JSON + CORS Header senden
function json(body, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: {
      'content-type': 'application/json; charset=utf-8',
      'access-control-allow-origin': '*',
      'access-control-allow-methods': 'POST,OPTIONS',
      'access-control-allow-headers': 'content-type',
    },
  });
}

export async function OPTIONS() {
  // Preflight für Sicherheit
  return json({ ok: true });
}

export default async function handler(req) {
  try {
    if (req.method === 'OPTIONS') return OPTIONS();

    if (req.method !== 'POST') {
      return json({ ok: false, error: 'Method not allowed' }, 405);
    }

    if (!RESEND_API_KEY || !MAIL_FROM || !MAIL_TO) {
      return json({ ok: false, error: 'Server misconfigured' }, 500);
    }

    const { name, email, phone, message } = await req.json().catch(() => ({}));
    if (!name || !email || !message) {
      return json({ ok: false, error: 'Bitte Name, E-Mail und Nachricht angeben.' }, 400);
    }

    const resend = new Resend(RESEND_API_KEY);

    // 1) Mail an dich/euch
    await resend.emails.send({
      from: MAIL_FROM,
      to: MAIL_TO.split(',').map(s => s.trim()).filter(Boolean),
      subject: MAIL_SUBJECT,
      text:
`Neue Anfrage über das Formular:
Name: ${name}
E-Mail: ${email}
Telefon: ${phone || '-'}
--------------------------------
${message}`,
      reply_to: email,
    });

    // 2) Bestätigung an Absender (optional)
    if (email) {
      await resend.emails.send({
        from: MAIL_FROM,
        to: email,
        subject: MAIL_CONFIRM_SUBJECT,
        text:
          `Hallo ${name},

          vielen Dank für deine Nachricht. Wir melden uns zeitnah bei dir.

          Deine Angaben:
          Telefon: ${phone || '-'}
          --------------------------------
          ${message}

          Freundliche Grüße
          K.A. MetallForm`,
      });
    }

    // WICHTIG: Immer JSON zurückgeben
    return json({ ok: true });

  } catch (err) {
    console.error('contact error:', err);
    // Fehler als JSON zurückgeben
    return json({ ok: false, error: 'Serverfehler beim Versenden.' }, 500);
  }
}
