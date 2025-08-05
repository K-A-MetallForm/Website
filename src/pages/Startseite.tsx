import React from 'react';
import './Startseite.css';
import { Link } from 'react-router-dom';

// Hero-Komponente
const Hero: React.FC = () => (
  <section className="hero" id="hero">
    <div className="hero-overlay" />
    <img
      src="/image_002.jpg"
      alt="Metallbau Präzision"
      className="hero__img"
    />
    <div className="hero__content container">
      <h1>Präzision in Stahl & Technik</h1>
      <p>Individuelle Metalllösungen von Planung bis Montage.</p>
      <Link to="/angebot" className="btn btn--accent">
        Jetzt Angebot anfordern
      </Link>
    </div>
  </section>
);

// Features-Komponente
const Features: React.FC = () => {
  const items = [
    {
      icon: '🔧',
      title: 'Langjährige Erfahrung',
      text: 'Über 20 Jahre im Metallbau für höchste Zuverlässigkeit.',
    },
    {
      icon: '⚙️',
      title: 'Zertifizierte Qualität',
      text: 'ISO-zertifizierte Verfahren und präzise Schweißtechnik.',
    },
    {
      icon: '⏱️',
      title: 'Termintreue',
      text: 'Pünktliche Lieferung und transparente Kommunikation.',
    },
  ];

  return (
    <section className="features container">
      <h2>Unsere Stärken</h2>
      <div className="features__grid">
        {items.map((f, i) => (
          <div key={i} className="feature">
            <div className="feature__icon">{f.icon}</div>
            <h3>{f.title}</h3>
            <p>{f.text}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

// References-Komponente
const References: React.FC = () => {
  const logos = [
    '/logos/kunde1.png',
    '/logos/kunde2.png',
    '/logos/kunde3.png',
    '/logos/kunde4.png',
  ];

  return (
    <section className="references container">
      <h2>Vertrauen der Branche</h2>
      <div className="references__logos">
        {logos.map((src, i) => (
          <img key={i} src={src} alt={`Kundenlogo ${i + 1}`} />
        ))}
      </div>
      <div className="certificates">
        <img src="/certs/iso9001.svg" alt="ISO 9001 Zertifikat" />
        <img src="/certs/qr-code.svg" alt="Qualitätssiegel" />
      </div>
    </section>
  );
};

// Startseite-Komponente ohne Footer
const Startseite: React.FC = () => (
  <div className="app">
    <header>
      <Hero />
    </header>
    <main>
      <Features />
      <References />
    </main>
  </div>
);

export default Startseite;
