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
          K.A. MetallForm, Inhaber: Kasim Avdija, Neureuter Straße 5-7, 76185 Karlsruhe, Deutschland<br />
          Tel.: <a href="tel:+491708750760">+49 (0)170 875 0760</a>, E-Mail: <a href="mailto:info@ka-metallform.de">info@ka-metallform.de</a>
        </p>

        <h2>2. Hosting &amp; Auftragsverarbeitung (Art. 28 DSGVO)</h2>
        <p>
          Unsere Website wird bei folgendem Anbieter gehostet: <strong>Vercel</strong>.<br />
          Mit dem Anbieter wurde ein Vertrag über Auftragsverarbeitung gemäß Art. 28 DSGVO geschlossen.
          Die Verarbeitung erfolgt innerhalb der EU/des EWR. Eine Drittlandsübermittlung ist nicht beabsichtigt.
        </p>

        <h2>3. Server-Logfiles</h2>
        <p>
          Beim Aufruf unserer Seiten werden durch den Hoster automatisch Zugriffsdaten in sogenannten Server-Logfiles
          gespeichert (IP-Adresse, Datum/Uhrzeit, aufgerufene URL, Referrer, HTTP-Status, übertragene Datenmenge,
          User-Agent/Betriebssystem). Rechtsgrundlage ist Art. 6 Abs. 1 lit. f DSGVO (Betrieb, Sicherheit).
          Die Logfiles dienen ausschließlich der technischen Bereitstellung und zur Abwehr/Störungsanalyse und werden
          in der Regel nach <strong>7–14 Tagen</strong> gelöscht.
        </p>

        <h2>4. Externe Inhalte / Einbindungen</h2>
        <ul>
          <strong>Fonts:</strong> Es werden keine externen Schriftarten (z.&nbsp;B. Google Fonts via CDN) geladen; Google Fonts sind lokal eingebunden.<br />
          <strong>Embeds:</strong> Es werden keine externen Widgets/Embeds nachgeladen.<br />
          <strong>Instagram:</strong> Es wird lediglich per normalem Link auf unser Profil verwiesen; es ist kein eingebettetes Instagram-Widget im Einsatz.<br />
        </ul>

        <h2>5. Cookies / Tracking</h2>
        <p>
          Es werden <strong>keine</strong> Tracking- oder Marketing-Tools eingesetzt. Technisch notwendige
          Cookies bzw. lokale Speicherungen können für den Betrieb der Seite verwendet werden (Art. 6 Abs. 1 lit. f DSGVO).
          Ein Cookie-Banner ist daher nicht erforderlich, solange ausschließlich technisch Notwendiges eingesetzt wird.
        </p>

        <h2>6. Kontakt (Formular / E-Mail)</h2>
        <p>
          Übermittelte Angaben (Name, E-Mail, optional Telefon, Nachricht) verwenden wir ausschließlich zur
          Bearbeitung Ihrer Anfrage. Rechtsgrundlage: Art. 6 Abs. 1 lit. b DSGVO (vorvertragliche/vertragliche Kommunikation)
          bzw. lit. f DSGVO (allgemeine Anfragen). Speicherfrist: nur solange erforderlich; gesetzliche Aufbewahrungspflichten bleiben unberührt.
        </p>

        <h2>7. Ihre Rechte</h2>
        <p>
          Sie haben Rechte nach Art. 15–21 DSGVO (Auskunft, Berichtigung, Löschung, Einschränkung,
          Datenübertragbarkeit, Widerspruch). Kontakt: <a href="mailto:info@ka-metallform.de">info@ka-metallform.de</a>.
          Außerdem haben Sie das Recht auf Beschwerde bei einer Datenschutzaufsichtsbehörde.
        </p>

        <p className="legal-stand">Stand: {stand}</p>
      </section>

      <Footer />
    </main>
  );
};

export default Datenschutz;
