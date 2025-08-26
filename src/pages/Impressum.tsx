import React from 'react';
import './Impressum.css';
import Footer from '../components/Footer';

const Impressum: React.FC = () => {
  const stand = new Date().toLocaleDateString('de-DE');

  return (
    <main className="legal-page">
      <section id="impressum" className="legal-content container" aria-label="Impressum">
        <h1>Angaben gemäß § 5 DDG</h1>

        <address className="legal-address" itemScope itemType="https://schema.org/Organization">
          <strong itemProp="name">K.A. MetallForm</strong><br />
          Inhaber: <strong itemProp="founder">Kasim Avdija</strong><br />
          <span itemProp="address" itemScope itemType="https://schema.org/PostalAddress">
            <span itemProp="streetAddress">Neureuter Straße 5-7</span><br />
            <span itemProp="postalCode">76185</span> <span itemProp="addressLocality">Karlsruhe</span>, Deutschland
          </span>
        </address>

        <div className="legal-block">
          <h2>Kontakt</h2>
          <p>
            Tel.: <a href="tel:+491708750760" itemProp="telephone">+49 (0)170 875 0760</a><br />
            E-Mail: <a href="mailto:info@ka-metallform.de" itemProp="email">info@ka-metallform.de</a>
          </p>
        </div>

        <div className="legal-block">
          <h2>Berufsbezeichnung / Kammer</h2>
          <p>
            Berufsbezeichnung: Metallbauermeister (verliehen in Deutschland)<br />
            Mitglied der Handwerkskammer: {/* Optional sauber, falls gewünscht */}
            {/* Trage hier die zuständige HWK ein, z. B.: */}
            Handwerkskammer Karlsruhe
          </p>
        </div>
        {/*
        <div className="legal-block">
          <h2>Umsatzsteuer-ID</h2>
          <p>
            {/* Falls vorhanden, bitte USt-IdNr. eintragen; wenn nicht vorhanden, den Absatz entfernen
            USt-IdNr.: DE&nbsp;XXXXXXXXX
          </p>
        </div>
        */}

        <div className="legal-block">
          <h2>Schlichtung</h2>
          <p>
            Wir sind nicht bereit und nicht verpflichtet, an Streitbeilegungsverfahren vor einer
            Verbraucherschlichtungsstelle teilzunehmen.
          </p>
        </div>

        <p className="legal-stand">Stand: {stand}</p>
      </section>

      <Footer />
    </main>
  );
};

export default Impressum;
