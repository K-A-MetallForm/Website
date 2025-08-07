import './Leistungen.css';

interface Category {
  title: string;
  description: string;
  images: string[];
}

const categories: Category[] = [
  {
    title: 'Tore',
    description: 'Individuelle Tore aus langlebigem Metall.',
    images: ['/Tor_1.jpg', '/Tor_2.jpg', '/Tor_3.jpg'],
  },
  {
    title: 'Geländer',
    description: 'Stabile Geländer für Innen- und Außenbereiche.',
    images: ['/Geländer_1.jpg', '/Geländer_2.jpg', '/Geländer_3.jpg'],
  },
  {
    title: 'Treppen',
    description: 'Maßgeschneiderte Metalltreppen für jeden Bedarf.',
    images: ['/Treppe_1.jpg', '/Treppe_2.jpg'],
  },
  {
    title: 'Vitrinen',
    description: 'Elegante Vitrinen zur Präsentation besonderer Stücke.',
    images: ['/Vitrinen_1.jpg', '/Vitrinen_2.jpg', '/Vitrinen_3.jpg'],
  },
  {
    title: 'Sonstiges',
    description: 'Weitere individuelle Metallarbeiten auf Anfrage.',
    images: [
      '/IMG-20250802-WA0009.jpg',
      '/IMG-20250802-WA0014.jpg',
      '/IMG-20250802-WA0016.jpg',
    ],
  },
];

interface CategoryBlockProps extends Category {
  variant: 'gray' | 'white';
}

const CategoryBlock = ({ title, description, images, variant }: CategoryBlockProps) => (
  <div className={`service-area ${variant}`}>
    <div className="service-inner">
      <div className="service-main">
        {images[0] && (
          <img
            className="main-image"
            src={images[0]}
            alt={`${title} Bild 1`}
          />
        )}
        <div className="service-text">
          <h3>{title}</h3>
          <p>{description}</p>
        </div>
      </div>



      <div className="thumbnail-row">
        {images.slice(1, 5).map((src, index) => (
          <img
            key={src}
            src={src}
            alt={`${title} Bild ${index + 2}`}
          />
        ))}
      </div>
    </div>
  </div>
);

export default function LeistungenSection() {
  return (
    <section
      className="leistungen-section"
      id="leistungen"
    >
      {categories.map((category, index) => (
        <CategoryBlock
          key={category.title}
          {...category}
          variant={index % 2 === 0 ? 'gray' : 'white'}
        />
      ))}
    </section>
  );
}

