import { useEffect, useMemo, useState, useRef } from 'react';
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
    images: ['/Tor_3.jpg', '/Tor_2.jpg', '/Tor_1.jpg', '/Tor_4.jpg'],
  },
  {
    id: 'gelaender',
    title: 'Geländer',
    texts: [
      'Stabile, langlebige Geländer für Treppen, Balkone und Terrassen – innen wie außen.',
      'Wir kombinieren Metall mit Holz, Glas oder Lochblech und liefern normgerechte Lösungen inklusive statischer Auslegung.',
      'Oberflächen: roh, geschliffen, verzinkt, pulverbeschichtet – ganz nach Einsatzort und Optik.',
    ],
    images: ['/Geländer_3.jpg', '/Geländer_2.jpg', '/Geländer_1.jpg', '/Geländer_4.jpg'],
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

/* ───────── Utils ───────── */
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
const normalizeSrc = (s: string) => (s.startsWith('/') ? s : `/${s}`);

/* ───────── Lightbox ───────── */
type LightboxProps = {
  images: string[];
  index: number;
  title: string;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
};

function Lightbox({ images, index, title, onClose, onPrev, onNext }: LightboxProps) {
  const startX = useRef<number | null>(null);

  // ESC, ← →
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') onPrev();
      if (e.key === 'ArrowRight') onNext();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onClose, onPrev, onNext]);

  // Body scroll lock
  useEffect(() => {
    const { body } = document;
    const prev = body.style.overflow;
    body.style.overflow = 'hidden';
    return () => { body.style.overflow = prev; };
  }, []);

  const onTouchStart: React.TouchEventHandler = (e) => {
    startX.current = e.touches[0].clientX;
  };
  const onTouchEnd: React.TouchEventHandler = (e) => {
    if (startX.current == null) return;
    const dx = e.changedTouches[0].clientX - startX.current;
    if (dx > 40) onPrev();
    if (dx < -40) onNext();
    startX.current = null;
  };

  return (
    <div className="lb" onClick={onClose} onTouchStart={onTouchStart} onTouchEnd={onTouchEnd} role="dialog" aria-modal="true" aria-label={`${title} – Bild ${index + 1} von ${images.length}`}>
      <button className="lb__close" aria-label="Schließen" onClick={onClose}>×</button>
      <button className="lb__nav lb__prev" aria-label="Vorheriges Bild" onClick={(e)=>{e.stopPropagation(); onPrev();}}>‹</button>
      <div className="lb__stage" onClick={(e)=>e.stopPropagation()}>
        <img
          src={images[index]}
          alt={`${title} – Bild ${index + 1} / ${images.length}`}
          className="lb__img"
          draggable={false}
        />
        <div className="lb__caption">
          {title} — Bild {index + 1} / {images.length}
        </div>
      </div>
      <button className="lb__nav lb__next" aria-label="Nächstes Bild" onClick={(e)=>{e.stopPropagation(); onNext();}}>›</button>
    </div>
  );
}

/* ───────── Kategorien-Block ───────── */
type CategoryBlockProps = Category & {
  showInlineFooter?: boolean;
  onOpenLightbox: (images: string[], startIndex: number, title: string) => void;
};

const CategoryBlock = ({ id, title, texts, images, showInlineFooter, onOpenLightbox }: CategoryBlockProps) => (
  <section
    id={id}
    className={`service-section fullpage-slide ${showInlineFooter ? 'fullpage-slide--with-footer' : ''}`}
    aria-labelledby={`${id}-heading`}
  >
    <div className="service-inner">
      <div className="service-main">
        {images[0] && (
          <img
            className="main-image img-clickable"
            src={normalizeSrc(images[0])}
            alt={`${title} Bild 1`}
            loading="lazy"
            draggable={false}
            onClick={() => onOpenLightbox(images.map(normalizeSrc), 0, title)}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && onOpenLightbox(images.map(normalizeSrc), 0, title)}
          />
        )}

        <div className="service-text">
          <h3 id={`${id}-heading`}>{title}</h3>
          {texts.map((t, i) => <p key={i}>{t}</p>)}
        </div>
      </div>

      <div className="thumbnail-row">
        {images.slice(1, 5).map((src, i) => (
          <img
            key={src}
            src={normalizeSrc(src)}
            alt={`${title} Bild ${i + 2}`}
            loading="lazy"
            draggable={false}
            className="img-clickable"
            onClick={() => onOpenLightbox(images.map(normalizeSrc), i + 1, title)}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && onOpenLightbox(images.map(normalizeSrc), i + 1, title)}
          />
        ))}
      </div>
    </div>

    {showInlineFooter && (
      <div className="footer-inline">
        <Footer />
      </div>
    )}
  </section>
);

/* ───────── Seite ───────── */
export default function Leistungen() {
  const isDesktop = useMediaQuery('(min-width: 1024px)');
  const reduced   = useMediaQuery('(prefers-reduced-motion: reduce)');
  const isFullpage = isDesktop && !reduced;

  const [index, setIndex] = useState(0);
  const [isAnimating, setAnimating] = useState(false);

  /* Lightbox State */
  const [lbOpen, setLbOpen] = useState(false);
  const [lbImages, setLbImages] = useState<string[]>([]);
  const [lbIndex, setLbIndex] = useState(0);
  const [lbTitle, setLbTitle] = useState('');

  const openLightbox = (images: string[], startIndex: number, title: string) => {
    setLbImages(images);
    setLbIndex(startIndex);
    setLbTitle(title);
    setLbOpen(true);
  };
  const closeLightbox = () => setLbOpen(false);
  const lbPrev = () => setLbIndex(i => (i - 1 + lbImages.length) % lbImages.length);
  const lbNext = () => setLbIndex(i => (i + 1) % lbImages.length);

  /* Body-Klasse für globalen Footer (ausblenden bei Fullpage) */
  useEffect(() => {
    const root = document.documentElement;
    if (isFullpage) root.classList.add('leistungen-fullpage');
    else root.classList.remove('leistungen-fullpage');
    return () => root.classList.remove('leistungen-fullpage');
  }, [isFullpage]);

  /* Page-by-page (nur Desktop) */
  useEffect(() => {
    if (!isFullpage) return;
    const totalSlides = categories.length;

    const goTo = (next: number) => {
      const max = totalSlides - 1;
      const clamped = Math.max(0, Math.min(max, next));
      if (clamped === index) return;
      setAnimating(true);
      setIndex(clamped);
      window.setTimeout(() => setAnimating(false), 700);
    };

    const onWheel = (e: WheelEvent) => {
      if (!isFullpage || isAnimating || lbOpen) return;  // Lightbox blockiert
      if (Math.abs(e.deltaY) < 10) return;
      e.preventDefault();
      goTo(index + (e.deltaY > 0 ? 1 : -1));
    };

    const onKey = (e: KeyboardEvent) => {
      if (!isFullpage || isAnimating || lbOpen) return;
      if (['ArrowDown','PageDown',' '].includes(e.key)) { e.preventDefault(); goTo(index + 1); }
      if (['ArrowUp','PageUp'].includes(e.key))        { e.preventDefault(); goTo(index - 1); }
    };

    window.addEventListener('wheel', onWheel, { passive: false });
    window.addEventListener('keydown', onKey);
    return () => {
      window.removeEventListener('wheel', onWheel);
      window.removeEventListener('keydown', onKey);
    };
  }, [isFullpage, index, isAnimating, lbOpen]);

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

      <div className="slides">
        <div
          className="slides__inner"
          style={isFullpage && index > 0 ? { transform: `translateY(calc(-${index} * var(--slide-h)))` } : undefined}
        >
          {categories.map((c, i) => (
            <CategoryBlock
              key={c.id}
              {...c}
              showInlineFooter={isFullpage && i === categories.length - 1}
              onOpenLightbox={openLightbox}
            />
          ))}
        </div>
      </div>

      {lbOpen && (
        <Lightbox
          images={lbImages}
          index={lbIndex}
          title={lbTitle}
          onClose={closeLightbox}
          onPrev={lbPrev}
          onNext={lbNext}
        />
      )}
    </div>
  );
}
