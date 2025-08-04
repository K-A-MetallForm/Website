import './Leistungen.css';

interface Category {
  title: string;
  images: string[];
}

const categories: Category[] = [
  {
    title: 'Tore',
    images: ['/Tor_1.jpg', '/Tor_2.jpg', '/Tor_3.jpg'],
  },
  {
    title: 'Geländer',
    images: ['/Geländer_1.jpg', '/Geländer_2.jpg', '/Geländer_3.jpg'],
  },
  {
    title: 'Treppen',
    images: ['/Treppe_1.jpg', '/Treppe_2.jpg'],
  },
  {
    title: 'Vitrinen',
    images: ['/Vitrinen_1.jpg', '/Vitrinen_2.jpg', '/Vitrinen_3.jpg'],
  },
  {
    title: 'Sonstiges',
    images: [
      '/IMG-20250802-WA0009.jpg',
      '/IMG-20250802-WA0014.jpg',
      '/IMG-20250802-WA0016.jpg',
    ],
  },
];

const CategoryBlock = ({ title, images }: Category) => (
  <div className="category">
    <h3>{title}</h3>
    {images.map((src, index) => (
      <div key={src} className="image-row">
        <img src={src} alt={`${title} Bild ${index + 1}`} />
        <p>{`${title} Bild ${index + 1}`}</p>
      </div>
    ))}
  </div>
);

export default function LeistungenSection() {
  return (
    <section className="leistungen-section" id="leistungen">
      <h2>Leistungen</h2>
      {categories.map((category) => (
        <CategoryBlock key={category.title} {...category} />
      ))}
    </section>
  );
}

