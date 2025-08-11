// api/contact.js
import { Resend } from 'resend';

/**
 * Vercel Serverless Function (Node.js)
 * - Erwartet POST mit JSON: { name, email, phone?, message }
 * - Verschickt E-Mail via Resend
 * - Antwortet bei Erfolg IMMER mit { ok: true }
 */
export default async function handler(req, res) {
  // Nur POST zulassen
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    res.setHeader('Content-Type', 'application/json');
    return res.status(405).json({ ok: false, error: 'Method not allowed' });
  }

  try {
    // Body sicher parsen (Vercel liefert i.d.R. schon geparst)
    const body = typeof req.body === 'string' ? JSON.parse(req.body || '{}') : (req.body || {});
    const { name, email, phone, message } = body;

    // Validierung
    if (!name || !email || !message) {
      res.setHeader('Content-Type', 'application/json');
      return res.status(400).json({
        ok: false,
        error: 'Name, E-Mail und Nachricht sind erforderlich.',
      });
    }

    // Env-Variablen prüfen
    if (!process.env.RESEND_API_KEY) {
      console.error('contact error: RESEND_API_KEY fehlt');
      res.setHeader('Content-Type', 'application/json');
      return res.status(500).json({ ok: false, error: 'Mail-Konfiguration fehlt (RESEND_API_KEY).' });
    }

    const from = process.env.MAIL_FROM || 'Kontakt <noreply@example.com>';
    const toList = String(process.env.MAIL_TO || '')
      .split(',')
      .map(s => s.trim())
      .filter(Boolean);

    if (!toList.length) {
      console.error('contact error: MAIL_TO ist leer');
      res.setHeader('Content-Type', 'application/json');
      return res.status(500).json({ ok: false, error: 'Mail-Konfiguration fehlt (MAIL_TO).' });
    }

    const subject = process.env.MAIL_SUBJECT || 'Neue Anfrage über die Website';

    // Resend initialisieren
    const resend = new Resend(process.env.RESEND_API_KEY);

    // Nachrichtentext
    const text = [
      'Neue Nachricht über das Kontaktformular',
      '',
      `Name:   ${name}`,
      `E-Mail: ${email}`,
      `Telefon:${phone || '-'}`,
      '',
      'Nachricht:',
      message,
      '',
      '---',
      'Dieses E-Mail wurde automatisch über die Website gesendet.',
    ].join('\n');

    // Versand an dich/euch
    await resend.emails.send({
      from,
      to: toList,
      subject,
      reply_to: email, // Direktes Antworten geht an den Absender
      text,
    });

    // Optional: Bestätigung an den Absender schicken (falls gewünscht)
    if (process.env.MAIL_CONFIRM_SUBJECT) {
      const confirmSubject = process.env.MAIL_CONFIRM_SUBJECT;
      const confirmText = [
        `Hallo ${name},`,
        '',
        'vielen Dank für deine Nachricht! Wir haben sie erhalten und melden uns zeitnah.',
        '',
        'Deine Angaben:',
        `E-Mail:  ${email}`,
        `Telefon: ${phone || '-'}`,
        '',
        'Nachricht:',
        message,
        '',
        'Freundliche Grüße',
        'K.A. MetallForm',
      ].join('\n');

      try {
        await resend.emails.send({
          from,
          to: [email],
          subject: confirmSubject,
          text: confirmText,
        });
      } catch (e) {
        // Bestätigung fehlgeschlagen ist nicht kritisch -> loggen, aber Erfolg zurückgeben
        console.warn('confirm mail failed:', e?.message || e);
      }
    }

    // Erfolg – wichtig: ok:true zurückgeben
    res.setHeader('Content-Type', 'application/json');
    return res.status(200).json({ ok: true });
  } catch (err) {
    console.error('contact error:', err);
    res.setHeader('Content-Type', 'application/json');
    return res.status(500).json({ ok: false, error: 'Mail service error' });
  }
}
