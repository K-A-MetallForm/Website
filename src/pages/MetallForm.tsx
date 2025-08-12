import Footer from "../components/Footer";
import "./MetallForm.css"

export default function MetallForm() {
  return (
    <main className="about">
      {/* Hero */}
      <section className="about__hero" aria-label="Unternehmensvorstellung">
        <div className="about__container about__hero-grid">
          <div className="about__hero-text">
            <h1>K.A. MetallForm in Karlsruhe</h1>
            <p className="about__lead">
              Frisches Handwerk mit viel Herz: Wir sind ein junges Metallbau-Unternehmen und
              verbinden präzise Verarbeitung mit modernen Ideen – für Treppen, Geländer,
              Konstruktionen und individuelle Sonderanfertigungen.
            </p>
            <ul className="about__highlights" aria-label="Unsere Stärken">
              <li>Individuelle Beratung ab der ersten Skizze</li>
              <li>Saubere Ausführung & termintreue Montage</li>
              <li>Direkter Draht zum Werkstatt-Team</li>
            </ul>
          </div>
          <div className="about__hero-media">
            <figure className="about__frame">
              <img
                src="./image_002.jpg"
                alt="Metallbau-Werkstatt mit Funkenflug beim Schweißen"
                loading="lazy"
                draggable={false}
              />
            </figure>
          </div>
        </div>
      </section>

      {/* Mission & Werte */}
      <section className="about__section" id="mission" aria-labelledby="mission-title">
        <div className="about__container">
          <h2 id="mission-title">Wofür wir stehen</h2>
          <div className="about__values">
            <article className="about__card">
              <h3>Qualität</h3>
              <p>
                Langlebige Lösungen aus Stahl und Edelstahl - mit Liebe zum Detail,
                präzisen Schweißnähten und sauberer Oberfläche.
              </p>
            </article>
            <article className="about__card">
              <h3>Beratung</h3>
              <p>
                Persönlich, ehrlich und auf Augenhöhe. Wir denken mit, planen voraus und
                halten die Kommunikation transparent.
              </p>
            </article>
            <article className="about__card">
              <h3>Flexibilität</h3>
              <p>
                Als junges Team reagieren wir schnell: kurze Wege, klare Entscheidungen,
                zuverlässige Termine.
              </p>
            </article>
          </div>
        </div>
      </section>

      {/* Zahlen/Trust (für neue Firma: Personenerfahrung statt Firmenjahre) */}
      <section className="about__section about__section--alt" aria-label="Eckdaten">
        <div className="about__container about__stats">
          <div className="about__stat">
            <strong>15+ Jahre</strong>
            <span>gesammelte Berufserfahrung im Team</span>
          </div>
          <div className="about__stat">
            <strong>100%</strong>
            <span>Fokus auf saubere, sichere Ausführung</span>
          </div>
          <div className="about__stat">
            <strong>1 Ansprechpartner</strong>
            <span>von der Planung bis zur Montage</span>
          </div>
        </div>
      </section>

      <section>
        <Footer/>
      </section>
    </main>
  );
}