// api/contact.mjs
import { Resend } from 'resend';

// ---------- kleine Helfer ----------
function escapeHtml(s = '') {
  return String(s)
    .replace(/&/g, '&amp;').replace(/</g, '&lt;')
    .replace(/>/g, '&gt;').replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

function readBody(req) {
  return new Promise((resolve, reject) => {
    let data = '';
    req.on('data', (c) => (data += c));
    req.on('end', () => resolve(data));
    req.on('error', reject);
  });
}

function json(res, status, obj, extraHeaders = {}) {
  res.statusCode = status;
  res.setHeader('Content-Type', 'application/json; charset=utf-8');
  res.setHeader('Cache-Control', 'no-store');
  Object.entries(extraHeaders).forEach(([k, v]) => res.setHeader(k, v));
  res.end(JSON.stringify(obj));
}

function allowCors(req, res) {
  const origin = process.env.ALLOW_ORIGIN || '*';
  res.setHeader('Access-Control-Allow-Origin', origin);
  res.setHeader('Vary', 'Origin');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
}

// ---------- Handler ----------
export default async function handler(req, res) {
  allowCors(req, res);

  if (req.method === 'OPTIONS') {
    // Preflight
    res.statusCode = 204;
    return res.end();
  }

  if (req.method !== 'POST') {
    return json(res, 405, { ok: false, error: 'Method not allowed' });
  }

  // Body lesen & parsen
  let body = {};
  try {
    const raw = await readBody(req);
    body = raw ? JSON.parse(raw) : {};
  } catch {
    return json(res, 400, { ok: false, error: 'Ungültiger JSON-Body' });
  }

  const name = String(body.name || '').trim();
  const email = String(body.email || '').trim();
  const phone = String(body.phone || '').trim();
  const message = String(body.message || '').trim();

  if (!name || !email || !message) {
    return json(res, 400, { ok: false, error: 'Name, E-Mail und Nachricht sind Pflichtfelder.' });
  }

  const RESEND_API_KEY = process.env.RESEND_API_KEY;
  if (!RESEND_API_KEY) {
    return json(res, 500, { ok: false, error: 'RESEND_API_KEY fehlt auf dem Server.' });
  }

  const resend = new Resend(RESEND_API_KEY);

  const FROM = process.env.MAIL_FROM || 'Website <no-reply@example.com>';
  const TO = (process.env.MAIL_TO || '').split(',').map(s => s.trim()).filter(Boolean);
  const SUBJECT = process.env.MAIL_SUBJECT || 'Neue Anfrage über die Website';
  const CONFIRM_SUBJECT = process.env.MAIL_CONFIRM_SUBJECT || 'Wir haben deine Nachricht erhalten';

  if (TO.length === 0) {
    return json(res, 500, { ok: false, error: 'MAIL_TO ist nicht konfiguriert.' });
  }

  // Inhalte (escaped)
  const safe = {
    name: escapeHtml(name),
    email: escapeHtml(email),
    phone: escapeHtml(phone),
    message: escapeHtml(message).replace(/\n/g, '<br>'),
  };

  const ownerHtml = `
    <h2>Neue Anfrage über das Kontaktformular</h2>
    <p><strong>Name:</strong> ${safe.name}</p>
    <p><strong>E-Mail:</strong> ${safe.email}</p>
    ${phone ? `<p><strong>Telefon:</strong> ${safe.phone}</p>` : ''}
    <p><strong>Nachricht:</strong><br>${safe.message}</p>
  `;

  const confirmHtml = `
    <h2>Danke für deine Nachricht</h2>
    <p>Hallo ${safe.name}, wir haben deine Nachricht erhalten und melden uns zeitnah.</p>
    <hr>
    <p><strong>Deine Nachricht:</strong><br>${safe.message}</p>
  `;

  try {
    // 1) Mail an dich/euch
    await resend.emails.send({
      from: FROM,
      to: TO,
      reply_to: email,          // direkt auf den Absender antworten können
      subject: SUBJECT,
      html: ownerHtml,
      text: `Neue Anfrage\n\nName: ${name}\nE-Mail: ${email}\nTelefon: ${phone}\n\nNachricht:\n${message}`,
    });

    // 2) Bestätigung an den Absender (best effort)
    try {
      await resend.emails.send({
        from: FROM,
        to: [email],
        subject: CONFIRM_SUBJECT,
        html: confirmHtml,
        text: `Hallo ${name},\n\nwir haben deine Nachricht erhalten und melden uns zeitnah.\n\n---\n${message}`,
      });
    } catch (e) {
      // Kein harter Fehler – die Hauptmail ist raus.
      if (process.env.DEBUG) console.error('confirm mail failed:', e);
    }

    return json(res, 200, { ok: true });
  } catch (e) {
    if (process.env.DEBUG) console.error('contact error:', e);
    return json(res, 500, { ok: false, error: 'Versand fehlgeschlagen. Bitte später erneut versuchen.' });
  }
}
