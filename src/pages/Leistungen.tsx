import { useEffect } from 'react';
import './Leistungen.css';

interface Category {
  id: string;
  title: string;
  texts: string[];      // mehrere Absätze Text
  images: string[];
}

const categories: Category[] = [
  {
    id: 'tore',
    title: 'Tore',
    texts: [
      'Wir planen und fertigen Gartentore, Hoftore und Industrietore aus Stahl oder Edelstahl – passgenau nach Maß und passend zur Architektur.',
      'Oberflächen erhalten auf Wunsch eine Feuerverzinkung und/oder Pulverbeschichtung. Integration von Schließsystemen, Briefkästen und Klingel-/Sprechanlagen ist möglich.',
      'Von der Vor-Ort-Maßaufnahme über die Konstruktion bis zur Montage kommt alles aus einer Hand.'
    ],
    images: ['/Tor_1.jpg', '/Tor_2.jpg', '/Tor_3.jpg'],
  },
  {
    id: 'gelaender',
    title: 'Geländer',
    texts: [
      'Stabile, langlebige Geländer für Treppen, Balkone und Terrassen – innen wie außen.',
      'Wir kombinieren Metall mit Holz, Glas oder Lochblech und liefern normgerechte Lösungen inklusive statischer Auslegung.',
      'Oberflächen: roh, geschliffen, verzinkt, pulverbeschichtet – ganz nach Einsatzort und Optik.'
    ],
    images: ['/Geländer_1.jpg', '/Geländer_2.jpg', '/Geländer_3.jpg'],
  },
  {
    id: 'treppen',
    title: 'Treppen',
    texts: [
      'Maßgeschneiderte Metalltreppen: gerade, gewendelt oder als Faltwerktreppe – für Wohn- und Gewerbebauten.',
      'Stufen aus Holz, Gitterrost, Blech mit Rutschhemmung oder Glas. Auf Wunsch inkl. Planung der Unterkonstruktion und Montage.'
    ],
    images: ['/Treppe_1.jpg', '/Treppe_2.jpg'],
  },
  {
    id: 'vitrinen',
    title: 'Vitrinen',
    texts: [
      'Elegante Vitrinen und Schaukästen aus Metall – mit klaren Fugenbildern und hochwertigen Beschlägen.',
      'Beleuchtung, Glasvarianten und Schloss-Systeme stimmen wir mit Ihnen ab.'
    ],
    images: ['/Vitrinen_1.jpg', '/Vitrinen_2.jpg', '/Vitrinen_3.jpg'],
  },
  {
    id: 'sonstiges',
    title: 'Sonderlösungen',
    texts: [
      'Individuelle Metallarbeiten, Reparaturen und Sonderlösungen.',
      'Fragen Sie uns auch für Möbelgestelle, Sichtschutzrahmen, Abdeckungen, Konsolen oder kleine Serien an.'
    ],
    images: ['/IMG-20250802-WA0009.jpg', '/IMG-20250802-WA0014.jpg', '/IMG-20250802-WA0016.jpg'],
  },
];

const CategoryBlock = ({ id, title, texts, images }: Category) => (
  <section id={id} className="service-section reveal" aria-labelledby={`${id}-heading`}>
    <div className="service-inner">
      <div className="service-main">
        {images[0] && (
          <img className="main-image" src={images[0]} alt={`${title} Bild 1`} loading="lazy" />
        )}
        <div className="service-text">
          <h3 id={`${id}-heading`}>{title}</h3>
          {texts.map((t, i) => <p key={i}>{t}</p>)}
        </div>
      </div>

      <div className="thumbnail-row">
        {images.slice(1, 5).map((src, i) => (
          <img key={src} src={src} alt={`${title} Bild ${i + 2}`} loading="lazy" />
        ))}
      </div>
    </div>
  </section>
);

export default function Leistungen() {
  useEffect(() => {
    // Respektiere reduzierte Bewegung
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Fallback: ohne IntersectionObserver sofort alles sichtbar
    if (prefersReduced || typeof IntersectionObserver === 'undefined') {
      document.querySelectorAll('.reveal').forEach(el => el.classList.add('visible'));
      return;
    }

    // Reveal, sobald ~20% sichtbar sind
    const obs = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.2, rootMargin: '0px 0px -5% 0px' });

    document.querySelectorAll('.reveal').forEach(el => obs.observe(el));

    return () => obs.disconnect();
  }, []);

  return (
    <div className="leistungen-page">
      {categories.map(c => <CategoryBlock key={c.id} {...c} />)}
    </div>
  );
}