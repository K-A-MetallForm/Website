import NavBar from './NavBar';
import './Startsite.css';

/**
 * Startseite mit vollem Hintergrundbild und CTA
 */
const Startsite = () => {
  return (
    <div className="startseite">
      <NavBar />
      <div className="hero">
        <div className="overlay">
          <h1 className="hero-title">Ihr Metallbau Unternehmen</h1>
          <p className="hero-subtitle">
            Ihr Spezialist wenn es um Metall geht
          </p>
          <a href="#angebot" className="hero-button">
            Jetzt Angebot einholen
          </a>
        </div>
      </div>
    </div>
  );
};

export default Startsite;