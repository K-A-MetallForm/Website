import './Startseite.css';

/**
 * Startseite mit vollem Hintergrundbild und CTA
 */
const Startseite = () => {
  return (
    <div className="startseite">
      <div className="hero">
        <div className="overlay">
          <h1 className="hero-title">Ihr Metallbau Unternehmen</h1>
          <h1 className="hero-subtitle">
            Diese Website befindet sich in Arbeit
          </h1>
          {/* <a href="#angebot" className="hero-button">
            Jetzt Angebot einholen
          </a> */}
        </div>
      </div>
    </div>
  );
};

export default Startseite;