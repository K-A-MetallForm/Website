import React, { useState } from 'react';
import './Beratung.css';

export default function BeratungSection() {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess(false);

    const form = e.currentTarget;
    const formData = new FormData(form);

    const payload = {
      name: String(formData.get('name') || '').trim(),
      email: String(formData.get('email') || '').trim(),
      phone: String(formData.get('phone') || '').trim(),
      message: String(formData.get('message') || '').trim(),
    };

    // Optional: super-kurze Client-Validierung
    if (!payload.name || !payload.email || !payload.message) {
      setError('Bitte Name, E-Mail und Nachricht ausfüllen.');
      setLoading(false);
      return;
    }

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      // Robust parsen (falls aus irgendeinem Grund kein valides JSON kommt)
      let data: any = null;
      const ct = res.headers.get('content-type') || '';
      if (ct.includes('application/json')) {
        data = await res.json();
      } else {
        const text = await res.text();
        try { data = JSON.parse(text); } catch { data = { ok: false, error: text || 'Unbekannte Server-Antwort.' }; }
      }

      if (res.ok && data?.ok) {
        setSuccess(true);
        form.reset();
      } else {
        setError(data?.error || `Es ist ein Fehler aufgetreten (Status ${res.status}).`);
      }
    } catch {
      setError('Es konnte keine Verbindung zum Server hergestellt werden.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="beratung-section" id="beratung">
      <div className="form-container">
        <h2>Beratung</h2>
        <p className="form-description">
          Beschreibe kurz dein Vorhaben – wir melden uns zeitnah.
        </p>

        <form className="beratung-form" onSubmit={handleSubmit} noValidate>
          <div className="form-field">
            <label htmlFor="name">Name*</label>
            <input id="name" name="name" type="text" required />
          </div>

          <div className="form-field">
            <label htmlFor="email">E-Mail*</label>
            <input id="email" name="email" type="email" required />
          </div>

          <div className="form-field">
            <label htmlFor="phone">Telefon</label>
            <input id="phone" name="phone" type="tel" />
          </div>

          <div className="form-field">
            <label htmlFor="message">Nachricht*</label>
            <textarea id="message" name="message" rows={4} required />
          </div>

          <button type="submit" className="submit-button" disabled={loading}>
            {loading ? 'Sende…' : 'Absenden'}
          </button>

          {/* Meldungen */}
          <div className="form-status" aria-live="polite">
            {success && <p className="form-success">✅ Nachricht erfolgreich gesendet!</p>}
            {error && <p className="form-error">❌ {error}</p>}
          </div>
        </form>
      </div>
    </section>
  );
}
