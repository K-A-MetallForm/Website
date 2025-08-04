import './Beratung.css';

const steps = [
  'Anfrage',
  'Vor-Ort-Termin',
  '3D-Planung & Angebot',
  'Fertigung & Montage',
];

const Timeline = () => (
  <ol className="timeline">
    {steps.map((step, index) => (
      <li key={step}>
        <span>{step}</span>
        {index < steps.length - 1 && <span className="arrow">→</span>}
      </li>
    ))}
  </ol>
);

export default function BeratungSection() {
  return (
    <section className="beratung-section" id="beratung">
      <h2>Beratung</h2>
      <Timeline />
      <form className="beratung-form">
        <div className="form-field">
          <label htmlFor="name">Name</label>
          <input id="name" type="text" />
        </div>
        <div className="form-field">
          <label htmlFor="email">E-Mail</label>
          <input id="email" type="email" />
        </div>
        <div className="form-field">
          <label htmlFor="phone">Telefon</label>
          <input id="phone" type="tel" />
        </div>
        <div className="form-field">
          <label htmlFor="service">Leistung</label>
          <select id="service">
            <option>Stahlkonstruktionen</option>
            <option>Schweißarbeiten</option>
            <option>Treppen & Geländer</option>
            <option>Fahrzeugbau</option>
          </select>
        </div>
        <div className="form-field">
          <label htmlFor="message">Freitext</label>
          <textarea id="message" rows={4} />
        </div>
        <button type="submit" className="submit-button">Absenden</button>
      </form>
    </section>
  );
}

