import './Beratung.css';

const steps = [
  'Anfrage',
  'Vor-Ort-Termin',
  '3D-Planung & Angebot',
  'Fertigung & Montage',
];

const Timeline = () => (
  <ol className="flex flex-wrap gap-4 justify-between">
    {steps.map((step, index) => (
      <li key={step} className="flex items-center gap-2">
        <span>{step}</span>
        {index < steps.length - 1 && <span>→</span>}
      </li>
    ))}
  </ol>
);

export default function BeratungSection() {
  return (
    <section className="p-8" id="beratung">
      <h2 className="text-2xl mb-4">Beratung</h2>
      <Timeline />
      <form className="grid gap-4 mt-8">
        <div className="grid gap-2">
          <label htmlFor="name">Name</label>
          <input id="name" type="text" className="p-2" />
        </div>
        <div className="grid gap-2">
          <label htmlFor="email">E-Mail</label>
          <input id="email" type="email" className="p-2" />
        </div>
        <div className="grid gap-2">
          <label htmlFor="phone">Telefon</label>
          <input id="phone" type="tel" className="p-2" />
        </div>
        <div className="grid gap-2">
          <label htmlFor="service">Leistung</label>
          <select id="service" className="p-2">
            <option>Stahlkonstruktionen</option>
            <option>Schweißarbeiten</option>
            <option>Treppen & Geländer</option>
            <option>Fahrzeugbau</option>
          </select>
        </div>
        <div className="grid gap-2">
          <label htmlFor="message">Freitext</label>
          <textarea id="message" rows={4} className="p-2" />
        </div>
        <button type="submit" className="p-2">Absenden</button>
      </form>
    </section>
  );
}

