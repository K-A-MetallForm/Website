import './Beratung.css';
import { useState } from 'react';

export default function BeratungSection() {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess(false);

    const formData = new FormData(e.currentTarget);
    const payload = {
      name: formData.get('name'),
      email: formData.get('email'),
      phone: formData.get('phone'),
      message: formData.get('message'),
    };

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (res.ok && data.ok) {
        setSuccess(true);
        e.currentTarget.reset();
      } else {
        setError(data.error || 'Es ist ein Fehler aufgetreten.');
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
        <form className="beratung-form" onSubmit={handleSubmit}>
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
            {loading ? 'Sende...' : 'Absenden'}
          </button>
          {success && <p className="form-success">✅ Nachricht erfolgreich gesendet!</p>}
          {error && <p className="form-error">❌ {error}</p>}
        </form>
      </div>
    </section>
  );
}
