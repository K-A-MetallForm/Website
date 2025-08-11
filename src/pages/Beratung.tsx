import './Beratung.css';
import { useRef, useState } from 'react';

type Status = 'idle' | 'ok' | 'error';

export default function BeratungSection() {
  const inFlight = useRef(false);
  const [status, setStatus] = useState<Status>('idle');
  const [errorMsg, setErrorMsg] = useState('');

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    // Hard-Guard gegen Doppel-Submit (auch bei sehr schnellem Doppelklick)
    if (inFlight.current) return;
    inFlight.current = true;

    setStatus('idle');
    setErrorMsg('');

    const formData = new FormData(e.currentTarget);
    const payload = {
      name: String(formData.get('name') || ''),
      email: String(formData.get('email') || ''),
      phone: String(formData.get('phone') || ''),
      message: String(formData.get('message') || ''),
    };

    // Optional: Timeout/Abort (10s)
    const ctrl = new AbortController();
    const t = setTimeout(() => ctrl.abort(), 10000);

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      // defensive parse
      let data: any = {};
      try { data = await res.json(); } catch {}

      if (res.ok && data?.ok) {
        setStatus('ok');
        e.currentTarget.reset();
      } else {
        setStatus('error');
        setErrorMsg(data?.error || 'Es ist ein Fehler aufgetreten.');
      }
    } catch (err: any) {
      setStatus('error');
      setErrorMsg(
        err?.name === 'AbortError'
          ? 'Zeitüberschreitung – bitte erneut versuchen.'
          : 'Es konnte keine Verbindung zum Server hergestellt werden.'
      );
    } finally {
      clearTimeout(t);
      inFlight.current = false;
    }
  }

  const loading = inFlight.current;

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
            <input id="name" name="name" type="text" required disabled={loading} />
          </div>
          <div className="form-field">
            <label htmlFor="email">E-Mail*</label>
            <input id="email" name="email" type="email" required disabled={loading} />
          </div>
          <div className="form-field">
            <label htmlFor="phone">Telefon</label>
            <input id="phone" name="phone" type="tel" disabled={loading} />
          </div>
          <div className="form-field">
            <label htmlFor="message">Nachricht*</label>
            <textarea id="message" name="message" rows={4} required disabled={loading} />
          </div>

          <button type="submit" className="submit-button" disabled={loading}>
            {loading ? 'Sende...' : 'Absenden'}
          </button>

          {status === 'ok' && (
            <p className="form-success">✅ Nachricht erfolgreich gesendet!</p>
          )}
          {status === 'error' && (
            <p className="form-error">❌ {errorMsg}</p>
          )}
        </form>
      </div>
    </section>
  );
}
