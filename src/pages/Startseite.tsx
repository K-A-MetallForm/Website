import React from 'react';
import './Startseite.css';
import { Link } from 'react-router-dom';

// Hero-Komponente
const Hero: React.FC = () => (
  <section className="hero" id="hero">
    <div className="hero-overlay" />
    <img
      src="/image_003.jpg"
      alt="Metallbau Präzision"
      className="hero__img"
    />
    <div className="hero__content container">
      <h1>Präzision in Stahl & Technik</h1>
      <p>Individuelle Metalllösungen von Planung bis Montage.</p>
      <Link to="/beratung" className="btn btn--accent">
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
      <div className='features__intro'>
        <p>Mit 15 Jahren Erfahrung, einem staatlich geprüften Metallbaumeister, vereinen wir traditionelles Handwerk mit zeitgemäßen Fertigungsverfahren. 
           Ihr Projekt schöpft bei uns von der ersten Skizze bis zur finalen Montage das volle Potenzial aus – termingenau, in zertifizierter Qualität und mit höchster Verlässlichkeit.</p>
      </div>
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

// Startseite-Komponente ohne Footer
const Startseite: React.FC = () => (
  <div className="app">
    <header>
      <Hero />
    </header>
    <main>
      <Features />
    </main>
  </div>
);

export default Startseite;
