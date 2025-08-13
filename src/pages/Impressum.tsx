import React from 'react';
import './Impressum.css';
import Footer from '../components/Footer';

const Impressum: React.FC = () => {
  const stand = new Date().toLocaleDateString('de-DE');

  return (
    <main className="legal-page">
      <section id="impressum" className="legal-content container" aria-label="Impressum">
        <h1>Impressum</h1>

        <address className="legal-address">
          <strong>K.A. MetallForm</strong><br />
          Inhaber: <strong>Kasim Avdija</strong><br />
          Neureuter Straße 5–7<br />
          76185 Karlsruhe, Deutschland
        </address>

        <div className="legal-block">
          <h2>Kontakt</h2>
          <p>
            Tel.: <a href="tel:+491708750760">+49 (0)170 875 0760</a><br />
            E-Mail: <a href="mailto:info@ka-metallform.de">info@ka-metallform.de</a>
          </p>
        </div>

        <div className="legal-block">
          <h2>Haftung für Inhalte</h2>
          <p>
            Als Diensteanbieter sind wir gemäß §&nbsp;7 Abs.&nbsp;1 TMG für eigene Inhalte auf diesen
            Seiten nach den allgemeinen Gesetzen verantwortlich. Nach §§&nbsp;8 bis&nbsp;10 TMG sind
            wir als Diensteanbieter jedoch nicht verpflichtet, übermittelte oder gespeicherte fremde
            Informationen zu überwachen oder nach Umständen zu forschen, die auf eine rechtswidrige
            Tätigkeit hinweisen. Verpflichtungen zur Entfernung oder Sperrung der Nutzung von
            Informationen nach den allgemeinen Gesetzen bleiben hiervon unberührt. Eine
            diesbezügliche Haftung ist jedoch erst ab dem Zeitpunkt der Kenntnis einer konkreten
            Rechtsverletzung möglich. Bei Bekanntwerden von entsprechenden Rechtsverletzungen
            entfernen wir diese Inhalte umgehend.
          </p>
        </div>

        <div className="legal-block">
          <h2>Haftung für Links</h2>
          <p>
            Unser Angebot enthält Links zu externen Websites Dritter, auf deren Inhalte wir keinen
            Einfluss haben. Deshalb können wir für diese fremden Inhalte auch keine Gewähr
            übernehmen. Für die Inhalte der verlinkten Seiten ist stets der jeweilige Anbieter oder
            Betreiber der Seiten verantwortlich. Rechtswidrige Inhalte waren zum Zeitpunkt der
            Verlinkung nicht erkennbar. Eine permanente inhaltliche Kontrolle der verlinkten Seiten
            ist jedoch ohne konkrete Anhaltspunkte einer Rechtsverletzung nicht zumutbar. Bei
            Bekanntwerden von Rechtsverletzungen werden wir derartige Links umgehend entfernen.
          </p>
        </div>

        <p className="legal-stand">Stand: {stand}</p>
      </section>

      {/* Footer immer unten */}
      <Footer />
    </main>
  );
};

export default Impressum;
