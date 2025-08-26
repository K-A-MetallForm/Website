// src/pages/AGB.tsx
import React from 'react';
import Footer from '../components/Footer';
import './Agb.css';

const AGB: React.FC = () => {
  // Lege die PDF ins public/… Verzeichnis, z. B. public/docs/widerrufsbelehrung.pdf
  const WIDERRUF_PDF = '/Widerrufsbelehrung.pdf';
  const stand = new Date().toLocaleDateString('de-DE');

  return (
    <main className="legal-page">
      <section className="legal-container" aria-label="Allgemeine Geschäftsbedingungen">
        <h1>Allgemeine Geschäftsbedingungen (AGB)</h1>

        <address className="legal-address">
          <strong>K.A. MetallForm</strong><br />
          Inhaber: <strong>Kasim Avdija</strong><br />
          Neureuter Straße 5–7, 76185 Karlsruhe, Deutschland<br />
          Tel.: <a href="tel:+491708750760">+49 (0)170&nbsp;875&nbsp;0760</a> ·{' '}
          E-Mail: <a href="mailto:info@ka-metallform.de">info@ka-metallform.de</a>
        </address>

        <h2>1. Geltung / Begriffe</h2>
        <p>
          (1) Diese AGB gelten für Verträge mit Verbrauchern (§ 13 BGB) über die Lieferung/Fertigung
          und ggf. Montage von Metallbauteilen (z. B. Geländer, Tore, Treppen, Konstruktionen).
          (2) Abweichende Bedingungen des Kunden gelten nicht.
        </p>

        <h2>2. Vertragsgrundlagen / Angebot / Bindefrist</h2>
        <p>
          (1) Vertragsbestandteile: unser Angebot (inkl. Zeichnungen/Skizzen), Auftragsbestätigung,
          diese AGB sowie ggf. Nachtragsangebote. (2) Angebote sind 2 Wochen ab Datum gültig.
          Änderungen/Nebenabreden nur in Textform.
        </p>

        <h2>3. Leistungsumfang / Mitwirkung des Kunden</h2>
        <p>
          (1) Ausführung gemäß Angebot/Zeichnung. Nicht enthalten, sofern nicht ausdrücklich
          angegeben: Elektro-, Maurer-, Maler-, Abdicht- und Entsorgungsarbeiten, behördliche
          Genehmigungen, Statik-Nachweise. (2) Der Kunde stellt rechtzeitig Zugang/Baufreiheit,
          Strom 230 V, genehmigte Pläne/Genehmigungen (falls erforderlich) und ein sicheres
          Arbeitsumfeld. (3) Wartezeiten/Behinderungen durch fehlende Mitwirkung werden nach den
          vereinbarten Verrechnungssätzen berechnet.
        </p>

        <h2>4. Preise / Nebenkosten (PAngV)</h2>
        <p>
          (1) Alle Preise sind Bruttopreise inkl. gesetzlicher MwSt. (2) Nebenkosten (z. B. Anfahrt,
          Baustelleneinrichtung, Hebe-/Sondergerät, Entsorgung) nur, wenn im Angebot ausgewiesen
          oder in einer Preisliste vereinbart.
        </p>

        <h2>5. Änderungen / Nachträge</h2>
        <p>
          Änderungswünsche nach Vertragsschluss gelten als Nachtrag und werden nur nach schriftlicher
          Freigabe ausgeführt; Abrechnung per Nachtragsangebot bzw. zu den vereinbarten
          Verrechnungssätzen.
        </p>

        <h2>6. Termine / Fristen</h2>
        <p>
          (1) Termine sind Ausführungsfristen, keine Fixtermine, sofern nicht ausdrücklich fix
          bestätigt. (2) Fristbeginn erst nach Aufmaß-/Zeichnungsfreigabe, ggf. Anzahlung und
          Vorliegen aller Mitwirkungen/Genehmigungen. (3) Bei höherer Gewalt, Lieferengpässen ohne
          unser Verschulden, Witterung oder fehlender Mitwirkung verschieben sich Fristen
          angemessen.
        </p>

        <h2>7. Zahlung / Abschläge / Verzug</h2>
        <p>
          (1) Sofern nicht anders vereinbart: 50 % Anzahlung bei Auftrag, 30 % bei Montagebeginn,
          20 % nach Abnahme. (2) Verzug: gesetzliche Verzugszinsen; Mahnkosten 5 € je Mahnung
          (Nachweis höherer/niedrigerer Kosten möglich). (3) Aufrechnung/Zurückbehalt nur mit
          unbestrittenen oder rechtskräftig festgestellten Forderungen.
        </p>

        <h2>8. Abnahme</h2>
        <p>
          (1) Nach Fertigstellung zeigen wir die Abnahme an; sie erfolgt förmlich mit
          Abnahmeprotokoll. (2) Die Leistung gilt als abgenommen, wenn der Kunde binnen 7 Tagen nach
          Anzeige keine wesentlichen Mängel rügt oder die Leistung in Gebrauch nimmt. (3) Teilabnahmen
          für in sich abgeschlossene Teilleistungen sind zulässig.
        </p>

        <h2>9. Gefahrübergang / Eigentumsvorbehalt</h2>
        <p>
          (1) Mit Abnahme geht die Gefahr auf den Kunden über. (2) An beweglichen, selbständig
          demontierbaren Lieferteilen behalten wir uns das Eigentum bis zur vollständigen Zahlung vor.
        </p>

        <h2>10. Gewährleistung (Mängelrechte)</h2>
        <p>
          (1) Es gelten die gesetzlichen Rechte. Vorrangig leisten wir Nacherfüllung
          (Nachbesserung/Nachlieferung). (2) Schlägt die Nacherfüllung fehl oder ist unzumutbar,
          kann der Kunde mindern oder – bei wesentlichem Mangel – zurücktreten. (3) Verjährung:
          5 Jahre für Arbeiten an Bauwerken, sonst 2 Jahre, jeweils ab Abnahme.
        </p>

        <h2>11. Widerrufsrecht für Verbraucher; Widerrufsbelehrung</h2>
        <p>
          Ist der Kunde Verbraucher im Sinne des § 13 BGB, steht ihm ein Widerrufsrecht{' '}
          <a
            href={WIDERRUF_PDF}
            target="_blank"
            rel="noopener noreferrer"
            className="text-link"
            aria-label="Widerrufsbelehrung als PDF in neuem Tab öffnen"
          >
            gemäß der beigefügten Widerrufsbelehrung
          </a>{' '}
          zu.
        </p>

        <h2>12. Haftung</h2>
        <p>
          (1) Unbeschränkt bei Vorsatz, grober Fahrlässigkeit, Verletzung von Leben, Körper,
          Gesundheit sowie nach Produkthaftungsgesetz. (2) Bei einfacher Fahrlässigkeit haften wir
          nur bei Verletzung wesentlicher Vertragspflichten (Kardinalpflichten) und auf den
          vorhersehbaren, typischen Schaden.
        </p>

        <h2>13. Urheber-/Nutzungsrechte</h2>
        <p>
          An unseren Plänen/Zeichnungen verbleiben die Rechte bei uns. Der Kunde erhält die zur
          Nutzung des Werks erforderlichen einfachen Nutzungsrechte nach vollständiger Zahlung.
        </p>

        <h2>14. Verbraucherschlichtung (VSBG)</h2>
        <p>
          Wir sind nicht bereit und nicht verpflichtet, an Streitbeilegungsverfahren vor einer
          Verbraucherschlichtungsstelle teilzunehmen.
        </p>

        <h2>15. Schlussbestimmungen</h2>
        <p>
          (1) Es gilt deutsches Recht; zwingende Verbraucherschutzvorschriften bleiben unberührt.
          (2) Änderungen/Ergänzungen dieser AGB bedürfen der Textform. (3) Salvatorisch: Ist eine
          Regelung unwirksam, bleibt der Rest wirksam; an ihre Stelle tritt die gesetzliche Regel.
        </p>

        <p className="legal-meta">Stand: {stand}</p>
      </section>

      <Footer />
    </main>
  );
};

export default AGB;