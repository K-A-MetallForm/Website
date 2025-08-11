// api/contact.mjs
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

const MAIL_FROM = process.env.MAIL_FROM; // z.B. "Website Kontakt <info@ka-metallform.de>"
const MAIL_TO   = process.env.MAIL_TO;   // z.B. "info@...,fatlindz@..."
const MAIL_SUBJECT = process.env.MAIL_SUBJECT || 'Neue Anfrage über die Website';
const MAIL_CONFIRM_SUBJECT = process.env.MAIL_CONFIRM_SUBJECT || 'Wir haben deine Nachricht erhalten';

const esc = (s = '') =>
  String(s)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;');

export default async function handler(req, res) {
  // Nur POST erlauben
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ ok: false, error: 'METHOD_NOT_ALLOWED' });
  }

  try {
    const body = await readJsonBody(req);
    const { name = '', email = '', phone = '', message = '' } = body || {};

    // Minimale Validierung
    if (!name || !email || !message) {
      return res.status(400).json({ ok: false, error: 'Bitte Name, E-Mail und Nachricht ausfüllen.' });
    }
    if (!MAIL_FROM || !MAIL_TO) {
      console.error('MAIL_FROM/MAIL_TO nicht gesetzt.');
      return res.status(500).json({ ok: false, error: 'Server nicht konfiguriert.' });
    }

    // 1) Mail an euch (interne Benachrichtigung)
    const toList = MAIL_TO.split(',').map(s => s.trim()).filter(Boolean);

    const adminHtml = `
      <h2>Neue Anfrage über das Kontaktformular</h2>
      <p><strong>Name:</strong> ${esc(name)}</p>
      <p><strong>E-Mail:</strong> ${esc(email)}</p>
      ${phone ? `<p><strong>Telefon:</strong> ${esc(phone)}</p>` : ''}
      <p><strong>Nachricht:</strong></p>
      <p style="white-space:pre-wrap">${esc(message)}</p>
    `;
    const adminText =
      `Neue Anfrage:\n` +
      `Name: ${name}\n` +
      `E-Mail: ${email}\n` +
      (phone ? `Telefon: ${phone}\n` : '') +
      `\n${message}`;

    const { error: sendErr1 } = await resend.emails.send({
      from: MAIL_FROM,     // muss bei Resend erlaubt/verifiziert sein
      to: toList,
      reply_to: email,     // direkt antworten können
      subject: MAIL_SUBJECT,
      html: adminHtml,
      text: adminText,
    });

    if (sendErr1) {
      console.error('Resend-Admin-Mail Fehler:', sendErr1);
      return res.status(500).json({ ok: false, error: 'MAIL_SEND_FAILED' });
    }

    // 2) (Optional) Bestätigung an Absender
    const confirmHtml = `
      <p>Hallo ${esc(name)},</p>
      <p>vielen Dank für deine Nachricht! Wir haben sie erhalten und melden uns zeitnah bei dir.</p>
      <hr />
      <p><strong>Deine Nachricht:</strong></p>
      <p style="white-space:pre-wrap">${esc(message)}</p>
      ${phone ? `<p><strong>Telefon:</strong> ${esc(phone)}</p>` : ''}
      <p>Viele Grüße<br/>KA Metallform</p>
    `;
    const confirmText =
      `Hallo ${name},\n\n` +
      `vielen Dank für deine Nachricht! Wir haben sie erhalten und melden uns zeitnah bei dir.\n\n` +
      `---\nDeine Nachricht:\n${message}\n` +
      (phone ? `Telefon: ${phone}\n` : '') +
      `\nViele Grüße\nKA Metallform`;

    // Fehler hier nicht hart brechen lassen – ist „nice to have“
    const { error: sendErr2 } = await resend.emails.send({
      from: MAIL_FROM,              // Absender bleibt eure verifizierte Adresse
      to: [email],                  // an den User
      subject: MAIL_CONFIRM_SUBJECT,
      html: confirmHtml,
      text: confirmText,
    });

    if (sendErr2) {
      console.warn('Resend-Confirm-Mail Warnung:', sendErr2);
      // wir antworten trotzdem 200, weil die Admin-Mail schon raus ist
    }

    return res.status(200).json({ ok: true });
  } catch (err) {
    console.error('contact error:', err);
    return res.status(500).json({ ok: false, error: 'INTERNAL_ERROR' });
  }
}

/** Body sicher lesen (funktioniert mit/ohne req.body) */
async function readJsonBody(req) {
  if (req.body && typeof req.body === 'object') return req.body; // Vercel/Next liefert oft schon geparst
  const chunks = [];
  for await (const chunk of req) chunks.push(chunk);
  const raw = Buffer.concat(chunks).toString('utf8');
  if (!raw) return {};
  try {
    return JSON.parse(raw);
  } catch {
    throw new Error('Ungültiges JSON im Request-Body');
  }
}
