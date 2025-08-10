// api/contact.ts – Vercel Serverless Function mit Resend
import type { VercelRequest, VercelResponse } from '@vercel/node';
import { Resend } from 'resend';

// Resend initialisieren
const resend = new Resend(process.env.RESEND_API_KEY as string);

// Empfänger (z. B. du + Kunde)
const OWNERS = (process.env.MAIL_TO || '').split(',').map(s => s.trim()).filter(Boolean);

// Absender-Adresse muss bei Resend verifiziert sein!
const FROM = process.env.MAIL_FROM || 'Website Kontakt <info@ka-metallform.de>';

// Betreffzeilen
const OWNER_SUBJECT = process.env.MAIL_SUBJECT || 'Neue Anfrage über die Website';
const CONFIRM_SUBJECT = process.env.MAIL_CONFIRM_SUBJECT || 'Wir haben deine Nachricht erhalten';

// Hilfsfunktionen
const esc = (s = '') =>
  String(s).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;', "'": '&#39;'}[c] as string));

const isEmail = (e = '') => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e);

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { name, email, phone, message } = (req.body || {}) as {
    name?: string; email?: string; phone?: string; message?: string;
  };

  // Eingaben prüfen
  if (!name || !email || !message || !isEmail(email)) {
    return res.status(400).json({ error: 'Bitte Name, gültige E-Mail und Nachricht ausfüllen.' });
  }

  // HTML für interne Mail
  const ownerHtml = `
    <h2>Neue Kontaktanfrage</h2>
    <p><strong>Name:</strong> ${esc(name)}</p>
    <p><strong>E-Mail:</strong> ${esc(email)}</p>
    <p><strong>Telefon:</strong> ${esc(phone || '')}</p>
    <p><strong>Nachricht:</strong></p>
    <pre style="white-space:pre-wrap;font-family:inherit">${esc(message)}</pre>
  `;

  // HTML für Bestätigung an den Absender
  const confirmHtml = `
    <h2>Danke, ${esc(name)}!</h2>
    <p>Wir haben deine Nachricht erhalten und melden uns so schnell wie möglich zurück.</p>
    <hr />
    <p><strong>Deine Nachricht:</strong></p>
    <pre style="white-space:pre-wrap;font-family:inherit">${esc(message)}</pre>
    <p style="margin-top:16px;font-size:12px;color:#666">
      Diese automatische Bestätigung wurde gesendet von ${esc(FROM)}.
      Falls du das nicht warst, antworte bitte auf diese E-Mail.
    </p>
  `;

  try {
    // 1) Mail an euch (Owner)
    const { error: ownerError } = await resend.emails.send({
      from: FROM,
      to: OWNERS.length ? OWNERS : ['info@ka-metallform.de'],
      subject: OWNER_SUBJECT,
      html: ownerHtml,
      replyTo: email, // Antworten gehen direkt an den Absender
    });
    if (ownerError) throw ownerError;

    // 2) Bestätigung an den Absender
    const { error: confirmError } = await resend.emails.send({
      from: FROM,
      to: [email],
      subject: CONFIRM_SUBJECT,
      html: confirmHtml,
      replyTo: FROM,
    });
    if (confirmError) {
      console.error('Confirm mail failed:', confirmError);
    }

    return res.status(200).json({ ok: true });
  } catch (e) {
    console.error('Resend error:', e);
    return res.status(500).json({ error: 'Mailversand fehlgeschlagen.' });
  }
}
