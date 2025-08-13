import React from 'react';
import './Datenschutz.css';
import Footer from '../components/Footer';

const Datenschutz: React.FC = () => {
  const stand = new Date().toLocaleDateString('de-DE');

  return (
    <main className="legal-page">
      <section id="datenschutz" className="legal-content container" aria-label="Datenschutzerklärung">
        <h1>Datenschutzerklärung</h1>

        <h2>1. Verantwortlicher</h2>
        <p>
          K.A. MetallForm, Inhaber: Kasim Avdija, Neureuter Straße 5–7, 76185 Karlsruhe, Deutschland<br />
          Tel.: <a href="tel:+491708750760">+49 (0)170 875 0760</a>, E-Mail: <a href="mailto:info@ka-metallform.de">info@ka-metallform.de</a>
        </p>

        <h2>2. Server-Logdaten</h2>
        <p>
          Beim Aufruf unserer Seiten werden technisch notwendige Daten verarbeitet (IP-Adresse, Datum/Uhrzeit,
          aufgerufene URL, Referrer, HTTP-Status, übertragene Datenmenge, Browser/OS).
          Rechtsgrundlage: Art. 6 Abs. 1 lit. f DSGVO (Betrieb, Sicherheit). Löschung durch den Hoster nach
          kurzer, zweckgebundener Frist.
        </p>

        <h2>3. Kontakt (Formular / E-Mail)</h2>
        <p>
          Übermittelte Angaben (Name, E-Mail, optional Telefon, Nachricht) verwenden wir ausschließlich zur
          Bearbeitung Ihrer Anfrage. Rechtsgrundlage: Art. 6 Abs. 1 lit. b DSGVO (vorvertragliche/vertragliche
          Kommunikation) bzw. lit. f DSGVO. Speicherung nur solange erforderlich; gesetzliche
          Aufbewahrungsfristen bleiben unberührt.
        </p>

        <h2>4. Cookies / Tracking</h2>
        <p>
          Es werden keine Tracking- oder Marketing-Cookies und keine externen Analysetools eingesetzt.
          Technisch notwendige lokale Speicherungen können für den Betrieb der Seite genutzt werden
          (Art. 6 Abs. 1 lit. f DSGVO).
        </p>

        <h2>5. Ihre Rechte</h2>
        <p>
          Sie haben Rechte nach Art. 15–21 DSGVO (Auskunft, Berichtigung, Löschung, Einschränkung,
          Datenübertragbarkeit, Widerspruch). Kontakt: <a href="mailto:info@ka-metallform.de">info@ka-metallform.de</a>.
          Außerdem haben Sie das Recht auf Beschwerde bei einer Datenschutzaufsichtsbehörde.
        </p>

        <p className="legal-stand">Stand: {stand}</p>
      </section>

      {/* Footer immer unten */}
      <Footer />
    </main>
  );
};

export default Datenschutz;
