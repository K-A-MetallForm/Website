import './Leistungen.css';

interface Category {
  id: string;
  title: string;
  description: string;
  images: string[];
}

const categories: Category[] = [
  { id: 'tore',      title: 'Tore',      description: 'Individuelle Tore aus langlebigem Metall.', images: ['/Tor_1.jpg', '/Tor_2.jpg', '/Tor_3.jpg'] },
  { id: 'gelaender', title: 'Geländer',  description: 'Stabile Geländer für Innen- und Außenbereiche.', images: ['/Geländer_1.jpg', '/Geländer_2.jpg', '/Geländer_3.jpg'] },
  { id: 'treppen',   title: 'Treppen',   description: 'Maßgeschneiderte Metalltreppen für jeden Bedarf.', images: ['/Treppe_1.jpg', '/Treppe_2.jpg'] },
  { id: 'vitrinen',  title: 'Vitrinen',  description: 'Elegante Vitrinen zur Präsentation besonderer Stücke.', images: ['/Vitrinen_1.jpg', '/Vitrinen_2.jpg', '/Vitrinen_3.jpg'] },
  { id: 'sonstiges', title: 'Sonstiges', description: 'Weitere individuelle Metallarbeiten auf Anfrage.', images: ['/IMG-20250802-WA0009.jpg','/IMG-20250802-WA0014.jpg','/IMG-20250802-WA0016.jpg'] },
];

const CategoryBlock = ({ id, title, description, images }: Category) => (
  <section id={id} className="service-section" aria-labelledby={`${id}-heading`}>
    <div className="service-inner">
      <div className="service-main">
        {images[0] && (
          <img className="main-image" src={images[0]} alt={`${title} Bild 1`} loading="lazy" />
        )}
        <div className="service-text">
          <h3 id={`${id}-heading`}>{title}</h3>
          <p>{description}</p>
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
  return (
    <div className="leistungen-page">
      {categories.map(c => <CategoryBlock key={c.id} {...c} />)}
    </div>
  );
}
