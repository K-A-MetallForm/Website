// /api/contact.js  (ESM)
// Hinweis: KEIN "require", KEIN "module.exports"

import nodemailer from 'nodemailer';

export default async function handler(req, res) {
  // Erlaubte Methode
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  try {
    // Body (Vercel/Next Node Runtime)
    const { name = '', email = '', message = '' } = req.body || {};

    // Minimale Validierung
    if (!name || !email || !message) {
      return res.status(400).json({ error: 'Missing fields' });
    }

    // Transporter (nutze deine ENV Variablen in Vercel → Project Settings → Environment Variables)
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT || 587),
      secure: false,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    await transporter.sendMail({
      from: `"Website" <${process.env.MAIL_FROM}>`,
      to: process.env.MAIL_TO,
      subject: `Kontakt: ${name}`,
      text: `${message}\n\nVon: ${name} <${email}>`,
    });

    return res.status(200).json({ ok: true });
  } catch (err) {
    console.error('contact error:', err);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
}
