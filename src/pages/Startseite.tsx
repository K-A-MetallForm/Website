import './Startseite.css';

/**
 * Startseite mit vollem Hintergrundbild und CTA
 */
const Startseite = () => {
  return (
    <div className="homepage">
      <section id="home" className="hero">
        <div className="hero-overlay" />
        <div className="container hero-content">
          <h2>Präzision in Stahl</h2>
          <p>Ihr Partner fürs Metallhandwerk – von der Idee bis zur Montage.</p>
          <a href="#beratung" className="cta-button hero-cta">Jetzt Angebot anfragen</a>
        </div>
      </section>

      <section className="intro-section">
        <div className="container intro-grid">
          <div className="intro-item">
            <div className="intro-icon">🔧</div>
            <h3>Erfahrung</h3>
            <p>Über 20 Jahre Expertise im Metallbau.</p>
          </div>
          <div className="intro-item">
            <div className="intro-icon">⚙️</div>
            <h3>Qualität</h3>
            <p>Zertifizierte Schweißverfahren und präzise Verarbeitung.</p>
          </div>
          <div className="intro-item">
            <div className="intro-icon">⏱️</div>
            <h3>Zuverlässigkeit</h3>
            <p>Wir halten Termine und Absprachen stets ein.</p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="container footer-inner">
          <p>© 2025 MetallForm GmbH. Alle Rechte vorbehalten.</p>
          <p><a href="#impressum">Impressum</a> | <a href="#datenschutz">Datenschutz</a></p>
        </div>
      </footer>
    </div>
  );
};

export default Startseite;