import { useEffect, useMemo, useState } from 'react';
import './Leistungen.css';
import Footer from '../components/Footer'; // ggf. Pfad anpassen

interface Category {
  id: string;
  title: string;
  texts: string[];
  images: string[];
}

const categories: Category[] = [
  {
    id: 'tore',
    title: 'Tore',
    texts: [
      'Wir planen und fertigen Gartentore, Hoftore und Industrietore aus Stahl oder Edelstahl – passgenau nach Maß und passend zur Architektur.',
      'Oberflächen erhalten auf Wunsch eine Feuerverzinkung und/oder Pulverbeschichtung. Integration von Schließsystemen, Briefkästen und Klingel-/Sprechanlagen ist möglich.',
      'Von der Vor-Ort-Maßaufnahme über die Konstruktion bis zur Montage kommt alles aus einer Hand.',
    ],
    images: ['/Tor_1.jpg', '/Tor_2.jpg', '/Tor_3.jpg'],
  },
  {
    id: 'gelaender',
    title: 'Geländer',
    texts: [
      'Stabile, langlebige Geländer für Treppen, Balkone und Terrassen – innen wie außen.',
      'Wir kombinieren Metall mit Holz, Glas oder Lochblech und liefern normgerechte Lösungen inklusive statischer Auslegung.',
      'Oberflächen: roh, geschliffen, verzinkt, pulverbeschichtet – ganz nach Einsatzort und Optik.',
    ],
    images: ['/Geländer_1.jpg', '/Geländer_2.jpg', '/Geländer_3.jpg'],
  },
  {
    id: 'treppen',
    title: 'Treppen',
    texts: [
      'Maßgeschneiderte Metalltreppen: gerade, gewendelt oder als Faltwerktreppe – für Wohn- und Gewerbebauten.',
      'Stufen aus Holz, Gitterrost, Blech mit Rutschhemmung oder Glas. Auf Wunsch inkl. Planung der Unterkonstruktion und Montage.',
    ],
    images: ['/Treppe_1.jpg', '/Treppe_2.jpg'],
  },
  {
    id: 'vitrinen',
    title: 'Vitrinen',
    texts: [
      'Elegante Vitrinen und Schaukästen aus Metall – mit klaren Fugenbildern und hochwertigen Beschlägen.',
      'Beleuchtung, Glasvarianten und Schloss-Systeme stimmen wir mit Ihnen ab.',
    ],
    images: ['/Vitrinen_1.jpg', '/Vitrinen_2.jpg', '/Vitrinen_3.jpg'],
  },
  {
    id: 'sonstiges',
    title: 'Sonderlösungen',
    texts: [
      'Individuelle Metallarbeiten, Reparaturen und Sonderlösungen.',
      'Fragen Sie uns auch für Möbelgestelle, Sichtschutzrahmen, Abdeckungen, Konsolen oder kleine Serien an.',
    ],
    images: ['/IMG-20250802-WA0009.jpg', '/IMG-20250802-WA0014.jpg', '/IMG-20250802-WA0016.jpg'],
  },
];

const CategoryBlock = ({ id, title, texts, images }: Category) => (
  <section id={id} className="service-section reveal fullpage-slide" aria-labelledby={`${id}-heading`}>
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

function useMediaQuery(q: string) {
  const mq = useMemo(() => window.matchMedia(q), [q]);
  const [matches, setMatches] = useState(mq.matches);
  useEffect(() => {
    const handler = () => setMatches(mq.matches);
    mq.addEventListener?.('change', handler);
    return () => mq.removeEventListener?.('change', handler);
  }, [mq]);
  return matches;
}

export default function Leistungen() {
  const isDesktop = useMediaQuery('(min-width: 1024px)');
  const reduced   = useMediaQuery('(prefers-reduced-motion: reduce)');

  const [index, setIndex] = useState(0);
  const [isAnimating, setAnimating] = useState(false);

  // Nav-Höhe messen → CSS-Variable --nav-h setzen
  useEffect(() => {
    const update = () => {
      const nav = document.querySelector('.navbar') as HTMLElement | null;
      if (nav) document.documentElement.style.setProperty('--nav-h', `${nav.getBoundingClientRect().height}px`);
    };
    update();
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, []);

  // Globalen Footer im Fullpage-Modus ausblenden (wir zeigen Footer als Slide)
  useEffect(() => {
    const root = document.documentElement;
    if (isDesktop && !reduced) root.classList.add('leistungen-fullpage');
    else root.classList.remove('leistungen-fullpage');
    return () => root.classList.remove('leistungen-fullpage');
  }, [isDesktop, reduced]);

  // Reveal (Mobile / allg.)
  useEffect(() => {
    if (reduced || typeof IntersectionObserver === 'undefined') {
      document.querySelectorAll('.reveal').forEach(el => el.classList.add('visible'));
      return;
    }
    const obs = new IntersectionObserver((entries, o) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          (e.target as HTMLElement).classList.add('visible');
          o.unobserve(e.target);
        }
      });
    }, { threshold: 0.2 });
    document.querySelectorAll('.reveal').forEach(el => obs.observe(el));
    return () => obs.disconnect();
  }, [reduced]);

  // Page-by-Page auf Desktop
  useEffect(() => {
    if (!isDesktop || reduced) return;
    const totalSlides = categories.length + 1; // +1 = Footer-Slide

    const onWheel = (e: WheelEvent) => {
      if (isAnimating) return;
      if (Math.abs(e.deltaY) < 10) return;
      e.preventDefault();
      goTo(index + (e.deltaY > 0 ? 1 : -1), totalSlides);
    };

    const onKey = (e: KeyboardEvent) => {
      if (isAnimating) return;
      if (['ArrowDown','PageDown',' '].includes(e.key)) { e.preventDefault(); goTo(index + 1, totalSlides); }
      if (['ArrowUp','PageUp'].includes(e.key))        { e.preventDefault(); goTo(index - 1, totalSlides); }
    };

    window.addEventListener('wheel', onWheel, { passive: false });
    window.addEventListener('keydown', onKey);
    return () => {
      window.removeEventListener('wheel', onWheel as any);
      window.removeEventListener('keydown', onKey);
    };
  }, [isDesktop, reduced, index, isAnimating]);

  const goTo = (next: number, totalSlides: number) => {
    const max = totalSlides - 1;
    const clamped = Math.max(0, Math.min(max, next));
    if (clamped === index) return;
    setAnimating(true);
    setIndex(clamped);
    window.setTimeout(() => setAnimating(false), 700); // match CSS transition
  };

  const isFullpage = isDesktop && !reduced;
  const dotCount   = isFullpage ? categories.length + 1 : 0;

  const handleDotClick = (i: number) => (e: React.MouseEvent) => {
    e.preventDefault();
    if (!isFullpage) {
      const id = i === categories.length ? 'footer' : categories[i].id;
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
      return;
    }
    goTo(i, categories.length + 1);
  };

  return (
    <div className={`leistungen-page ${isFullpage ? 'fullpage' : ''}`}>
      {/* Dots inkl. Footer-Spot */}
      {isFullpage && (
        <nav className="dots" aria-label="Sektionen">
          {Array.from({ length: dotCount }).map((_, i) => (
            <a
              key={i}
              href={i === categories.length ? '#footer' : `#${categories[i].id}`}
              onClick={handleDotClick(i)}
              className={i === index ? 'active' : ''}
              aria-label={i === categories.length ? 'Footer' : categories[i].title}
            />
          ))}
        </nav>
      )}

      {/* Slides-Wrapper (verschiebt sich um --slide-h) */}
      <div className="slides" style={isFullpage ? { transform: `translateY(calc(-${index} * var(--slide-h)))` } : undefined}>
        {categories.map(c => <CategoryBlock key={c.id} {...c} />)}

        {/* Footer als eigene Slide (Desktop) */}
        {isFullpage && (
          <section id="footer" className="fullpage-slide footer-slide" aria-label="Footer">
            <div className="footer-slide__inner">
              <Footer />
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
