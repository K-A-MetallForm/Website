import { useEffect, useMemo, useState } from 'react';
import './Startseite.css';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer';

const Hero: React.FC = () => (
  <section
    className="hero fullpage-slide fullpage-slide--start-hero"
    id="hero"
    aria-label="Hero"
  >
    <div className="hero-overlay" />
    <img
      src="/image_001.png"
      alt="Metallbau Präzision"
      className="hero__img"
      fetchPriority="high"
      draggable={false}
    />
    <div className="hero__content container">
      <h1>Ihr Projekt in Stahl und Metall</h1>
      <p>
        Wenn Standard nicht ausreicht, entwickeln wir für Ihr Projekt in Stahl und Metall
        individuelle Konzepte, die solide durchdacht, präzise umgesetzt und auf höchste Qualität
        ausgerichtet sind. So entstehen Lösungen, die Ihren Ansprüchen dauerhaft standhalten.
      </p>
      <Link to="/beratung" className="btn btn--accent">Jetzt Angebot anfordern</Link>
    </div>
  </section>
);

const Features: React.FC = () => {
  const items = [
    {
      img: '/Geländer_1.jpg',
      title: 'Individuelle Bauelemente',
      text: 'Planung und Fertigung von Treppen, Geländern, Balkonen und Überdachungen – passgenau auf Ihre Anforderungen abgestimmt',
    },
    {
      img: '/Treppe_1.jpg',
      title: 'Präzisions-Schweiß- & Blechbearbeitung',
      text: 'Sonderanfertigungen aus Stahl, Edelstahl und Aluminium: effizient geschweißt, exakt zugeschnitten und oberflächenveredelt.',
    },
    {
      img: '/Tor_1.jpg',
      title: 'Montage, Wartung & Reparatur',
      text: 'Fachgerechte Installation, Instandhaltung und punktuelle Reparaturen Ihrer Metallkonstruktionen – für dauerhafte Sicherheit und Funktion.',
    },
  ];

  return (
    <section
      className="features fullpage-slide fullpage-slide--features"
      id="features"
      aria-label="Unsere Dienstleistungen"
    >
      <h2>Unsere Dienstleistungen</h2>

      <div className="features__grid">
        {items.map((f, i) => (
          <article
            key={i}
            className={`feature feature--${i + 1}`}
            aria-label={f.title}
          >
            <img
              src={f.img}
              alt={f.title}
              className="feature__img"
              loading="lazy"
              draggable={false}
            />
            <h3>{f.title}</h3>
            <p>{f.text}</p>
          </article>
        ))}
      </div>
    </section>
  );
};

const CTA: React.FC = () => (
  <section className="cta fullpage-slide" id="cta" aria-label="Kontakt">
    <div className="cta__inner container">
      <div className="cta__text-container">
        <h2 className="cta__text">Nimm mit uns Kontakt auf</h2>
        <p className="cta_text">
          Hast du Interesse an einer Zusammenarbeit? Fülle bitte das Formular aus und
          wir werden uns in Kürze bei dir melden. Wir freuen uns schon darauf, von dir zu hören.
        </p>
        <Link to="/beratung" className="btn btn--accent-cta">Kontakt</Link>
      </div>
      <div className="cta__image-container">
        <img
          src="/image_001.avif"
          alt="Unsere Leistungen"
          className="cta__image"
          loading="lazy"
          draggable={false}
        />
      </div>
    </div>

    <div className="footer-inline">
      <Footer />
    </div>
  </section>
);

function useMediaQuery(q: string) {
  const mq = useMemo(() => window.matchMedia(q), [q]);
  const [matches, setMatches] = useState(mq.matches);
  useEffect(() => {
    const h = () => setMatches(mq.matches);
    mq.addEventListener?.('change', h);
    return () => mq.removeEventListener?.('change', h);
  }, [mq]);
  return matches;
}

export default function Startseite() {
  const isDesktop = useMediaQuery('(min-width: 1024px)');
  const reduced   = useMediaQuery('(prefers-reduced-motion: reduce)');
  const isFullpage = isDesktop && !reduced;

  const [index, setIndex] = useState(0);
  const [isAnimating, setAnimating] = useState(false);

  useEffect(() => {
    const nav = document.querySelector('.navbar') as HTMLElement | null;
    const update = () => {
      if (nav) {
        document.documentElement.style.setProperty('--nav-h', `${nav.getBoundingClientRect().height}px`);
      }
    };
    update();
    window.addEventListener('resize', update);

    if (nav) {
      if (index === 0) nav.classList.add('navbar--transparent');
      else nav.classList.remove('navbar--transparent');
    }
    return () => window.removeEventListener('resize', update);
  }, [index]);

  useEffect(() => {
    const root = document.documentElement;
    if (isFullpage) root.classList.add('start-fullpage');
    else root.classList.remove('start-fullpage');
    return () => root.classList.remove('start-fullpage');
  }, [isFullpage]);

  const slides = ['hero', 'features', 'cta'];
  const dotSlides = slides;

  useEffect(() => {
    if (!isFullpage) return;
    const total = slides.length;

    const onWheel = (e: WheelEvent) => {
      if (!isFullpage || isAnimating) return;
      if (Math.abs(e.deltaY) < 10) return;
      e.preventDefault();
      setAnimating(true);
      setIndex(prev => Math.max(0, Math.min(total - 1, prev + (e.deltaY > 0 ? 1 : -1))));
      window.setTimeout(() => setAnimating(false), 700);
    };

    const onKey = (e: KeyboardEvent) => {
      if (!isFullpage || isAnimating) return;
      if (['ArrowDown','PageDown',' '].includes(e.key)) { e.preventDefault(); setIndex(i => Math.min(total - 1, i + 1)); setAnimating(true); window.setTimeout(()=>setAnimating(false),700); }
      if (['ArrowUp','PageUp'].includes(e.key))        { e.preventDefault(); setIndex(i => Math.max(0, i - 1));       setAnimating(true); window.setTimeout(()=>setAnimating(false),700); }
    };

    window.addEventListener('wheel', onWheel, { passive: false });
    window.addEventListener('keydown', onKey);
    return () => {
      window.removeEventListener('wheel', onWheel);
      window.removeEventListener('keydown', onKey);
    };
  }, [isFullpage, isAnimating]);

  const handleDotClick = (i: number) => (e: React.MouseEvent) => {
    e.preventDefault();
    if (!isFullpage) {
      document.getElementById(dotSlides[i])?.scrollIntoView({ behavior: 'smooth' });
      return;
    }
    setIndex(i);
  };

  return (
    <div className={`startseite ${isFullpage ? 'fullpage' : ''}`}>
      {isFullpage && (
        <nav className="dots" aria-label="Sektionen">
          {dotSlides.map((id, i) => (
            <a
              key={id}
              href={`#${id}`}
              onClick={handleDotClick(i)}
              className={i === index ? 'active' : ''}
              aria-label={id}
            />
          ))}
        </nav>
      )}

      <div
        className="slides"
        style={isFullpage ? { transform: `translateY(calc(-${index} * var(--slide-h)))` } : undefined}
      >
        <Hero />
        <Features />
        <CTA />
      </div>
    </div>
  );
}
