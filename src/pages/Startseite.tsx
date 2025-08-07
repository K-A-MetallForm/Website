import React from 'react';
import './Startseite.css';
import { Link } from 'react-router-dom';

// Hero-Komponente
const Hero: React.FC = () => (
  <section className="hero" id="hero">
    <div className="hero-overlay" />
    <img
      src="/image_001.png"
      alt="Metallbau Präzision"
      className="hero__img"
    />
    <div className="hero__content container">
      <h1>Ihr Projekt in Stahl und Metall</h1>
      <p>Wenn Standard nicht ausreicht, entwickeln wir für Ihr Projekt in Stahl und Metall individuelle Konzepte, die solide durchdacht, präzise umgesetzt und auf höchste Qualität ausgerichtet sind. So entstehen Lösungen, die Ihren Ansprüchen dauerhaft standhalten.</p>
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
      img: '/Geländer_1.jpg',
      title: 'Individuelle Bauelemente',
      text: 'Planung und Fertigung von Treppen, Geländern, Balkonen und Überdachungen – passgenau auf Ihre Anforderungen abgestimmt',
    },
    {
      img: '/Treppe_1.jpg',
      title: 'Präzisions-Schweiß- & Blechbearbeitung',
      text: 'Sonderanfertigungen aus Stahl, Edelstahl und Aluminium: effizient geschweißt, exakt zugeschnitten und oberflächenveredelt.',
    },
    {
      img: '/Tor_1.jpg',
      title: 'Montage, Wartung & Reparatur',
      text: 'Fachgerechte Installation, Instandhaltung und punktuelle Reparaturen Ihrer Metallkonstruktionen – für dauerhafte Sicherheit und Funktion.',
    },
  ];

  return (
    <section className="features">
      <h2>Unsere Dienstleistungen</h2>
      <div className="features__intro">
      </div>
      <div className="features__grid">
        {items.map((f, i) => (
          <div key={i} className="feature">
            <img src={f.img} alt={f.title} className="feature__img" />
            <h3>{f.title}</h3>
            <p>{f.text}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

const CTA: React.FC = () => (
  <section className="cta">
    <div className="cta__inner container">
      <div className="cta__text-container">
        <h2 className="cta__text">
          Nimm mit uns Kontakt auf
        </h2>
        <p className='cta_text'>
        Hast du Interesse an einer Zusammenarbeit? Fülle bitte das Formular aus und 
        wir werden uns in Kürze bei dir melden. Wir freuen uns schon darauf, von dir zu hören.
        </p>
        <Link to="/beratung" className="btn btn--accent-cta">
          Kontakt
        </Link>
      </div>
      <div className="cta__image-container">
        <img
          src="/image_001.avif"
          alt="Unsere Leistungen"
          className="cta__image"
        />
      </div>
    </div>
  </section>
);

// Startseite-Komponente ohne Footer
const Startseite: React.FC = () => (
  <div className="startseite">
    <Hero />
    <Features />
    <CTA />
  </div>
);

export default Startseite;
