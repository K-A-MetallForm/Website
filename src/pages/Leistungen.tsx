import { useEffect, useMemo, useRef, useState } from 'react';
import './Leistungen.css';
import Footer from '../components/Footer';

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
    images: ['/Tor_1.jpg', '/Tor_2.jpg', '/Tor_3.jpg', '/Tor_4.jpg'],
  },
  {
    id: 'gelaender',
    title: 'Geländer',
    texts: [
      'Stabile, langlebige Geländer für Treppen, Balkone und Terrassen – innen wie außen.',
      'Wir kombinieren Metall mit Holz, Glas oder Lochblech und liefern normgerechte Lösungen inklusive statischer Auslegung.',
      'Oberflächen: roh, geschliffen, verzinkt, pulverbeschichtet – ganz nach Einsatzort und Optik.',
    ],
    images: ['/Geländer_1.jpg', '/Geländer_2.jpg', '/Geländer_3.jpg', '/Geländer_4.jpg'],
  },
  {
    id: 'treppen',
    title: 'Treppen',
    texts: [
      'Maßgeschneiderte Metalltreppen: gerade, gewendelt oder als Faltwerktreppe – für Wohn- und Gewerbebauten.',
      'Stufen aus Holz, Gitterrost, Blech mit Rutschhemmung oder Glas. Auf Wunsch inkl. Planung der Unterkonstruktion und Montage.',
    ],
    images: ['/Treppe_1.jpg', '/Treppe_2.jpg', '/Treppe_3.jpg'],
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
    images: ['Sonderlösung_1.jpg', 'Sonderlösung_2.jpg', 'Sonderlösung_3.jpg', 'Sonderlösung_4.jpg', 'Sonderlösung_5.jpg', 'Sonderlösung_6.jpg'],
  },
];

type CategoryBlockProps = Category & { showInlineFooter?: boolean };

const CategoryBlock = ({ id, title, texts, images, showInlineFooter }: CategoryBlockProps) => {
  const sectionRef = useRef<HTMLElement | null>(null);
  const footerRef = useRef<HTMLDivElement | null>(null);

  // Miss die Footer-Höhe und reserviere Platz in der Slide
  useEffect(() => {
    if (!showInlineFooter) return;
    const sec = sectionRef.current;
    const foot = footerRef.current;
    if (!sec || !foot) return;

    const setH = () => {
      const h = Math.ceil(foot.getBoundingClientRect().height) + 1; // +1px gegen Rundungsprobleme
      sec.style.setProperty('--footer-h', `${Math.max(200, h)}px`);
    };

    setH();
    const ro = new ResizeObserver(setH);
    ro.observe(foot);
    window.addEventListener('resize', setH);
    return () => {
      ro.disconnect();
      window.removeEventListener('resize', setH);
    };
  }, [showInlineFooter]);

  return (
    <section
      ref={sectionRef as any}
      id={id}
      className={`service-section reveal fullpage-slide ${showInlineFooter ? 'fullpage-slide--with-footer' : ''}`}
      aria-labelledby={`${id}-heading`}
    >
      <div className="service-inner">
        <div className="service-main">
          {images[0] && <img className="main-image" src={images[0]} alt={`${title} Bild 1`} loading="lazy" />}
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

      {showInlineFooter && (
        <div ref={footerRef} className="footer-inline">
          {/* <Footer /> */}
        </div>
      )}
    </section>
  );
};

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
  const isFullpage = isDesktop && !reduced;

  const [index, setIndex] = useState(0);
  const [isAnimating, setAnimating] = useState(false);

  // Nav-Höhe → --nav-h
  useEffect(() => {
    const update = () => {
      const nav = document.querySelector('.navbar') as HTMLElement | null;
      if (nav) document.documentElement.style.setProperty('--nav-h', `${nav.getBoundingClientRect().height}px`);
    };
    update();
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, []);

  // globalen Footer verstecken, wenn Fullpage an ist (wir zeigen ihn inline)
  useEffect(() => {
    const root = document.documentElement;
    if (isFullpage) root.classList.add('leistungen-fullpage');
    else root.classList.remove('leistungen-fullpage');
    return () => root.classList.remove('leistungen-fullpage');
  }, [isFullpage]);

  // Reveal (Mobile & generell)
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

  // Page-by-page (nur Desktop)
  useEffect(() => {
    if (!isFullpage) return;
    const totalSlides = categories.length; // Footer ist inline

    const goTo = (next: number) => {
      const max = totalSlides - 1;
      const clamped = Math.max(0, Math.min(max, next));
      if (clamped === index) return;
      setAnimating(true);
      setIndex(clamped);
      window.setTimeout(() => setAnimating(false), 700);
    };

    const onWheel = (e: WheelEvent) => {
      if (isAnimating) return;
      if (Math.abs(e.deltaY) < 10) return;
      e.preventDefault();
      goTo(index + (e.deltaY > 0 ? 1 : -1));
    };

    const onKey = (e: KeyboardEvent) => {
      if (isAnimating) return;
      if (['ArrowDown','PageDown',' '].includes(e.key)) { e.preventDefault(); goTo(index + 1); }
      if (['ArrowUp','PageUp'].includes(e.key))        { e.preventDefault(); goTo(index - 1); }
    };

    window.addEventListener('wheel', onWheel, { passive: false });
    window.addEventListener('keydown', onKey);
    return () => {
      window.removeEventListener('wheel', onWheel as any);
      window.removeEventListener('keydown', onKey);
    };
  }, [isFullpage, index, isAnimating]);

  const handleDotClick = (i: number) => (e: React.MouseEvent) => {
    e.preventDefault();
    if (!isFullpage) {
      document.getElementById(categories[i].id)?.scrollIntoView({ behavior: 'smooth' });
      return;
    }
    setIndex(i);
  };

  return (
    <div className={`leistungen-page ${isFullpage ? 'fullpage' : ''}`}>
      {isFullpage && (
        <nav className="dots" aria-label="Sektionen">
          {categories.map((c, i) => (
            <a
              key={c.id}
              href={`#${c.id}`}
              onClick={handleDotClick(i)}
              className={i === index ? 'active' : ''}
              aria-label={c.title}
            />
          ))}
        </nav>
      )}

      <div
        className="slides"
        style={isFullpage ? { transform: `translateY(calc(-${index} * var(--slide-h)))` } : undefined}
      >
        {categories.map((c, i) => (
          <CategoryBlock
            key={c.id}
            {...c}
            showInlineFooter={isFullpage && i === categories.length - 1}
          />
        ))}
      </div>
    </div>
  );
}
