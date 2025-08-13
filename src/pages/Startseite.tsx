import { useEffect, useMemo, useState } from 'react';
import './Startseite.css';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer';

const featureItems = [
  {
    img: '/Geländer_3.jpg',
    title: 'Individuelle Bauelemente',
    text: 'Planung und Fertigung von Treppen, Geländern, Balkonen und Überdachungen – passgenau auf Ihre Anforderungen abgestimmt',
  },
  {
    img: '/Treppe_1.jpg',
    title: 'Präzisions-Schweiß- & Blechbearbeitung',
    text: 'Sonderanfertigungen aus Stahl, Edelstahl und Aluminium: effizient geschweißt, exakt zugeschnitten und oberflächenveredelt.',
  },
  {
    img: '/Tor_3.jpg',
    title: 'Montage & Reparatur',
    text: 'Fachgerechte Installation, Reparaturen Ihrer Metallkonstruktionen – für dauerhafte Sicherheit und Funktion.',
  },
];

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

/* Desktop-Features (Grid) */
const FeaturesDesktop: React.FC = () => (
  <section
    className="features fullpage-slide fullpage-slide--features"
    id="features"
    aria-label="Unsere Dienstleistungen"
  >
    <h2>Unsere Dienstleistungen</h2>

    <div className="features__grid">
      {featureItems.map((f, i) => (
        <article key={i} className={`feature feature--${i + 1}`} aria-label={f.title}>
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

/* Mobile-Features: je Dienstleistung eine Snap-Slide mit Rand und zentriertem Inhalt */
const FeaturesMobile: React.FC = () => (
  <>
    {featureItems.map((f, i) => (
      <section key={i} className="snap-slide" aria-label={f.title}>
        <div className="snap-card">
          <div className="snap__bg" style={{ backgroundImage: `url(${f.img})` }} aria-hidden="true" />
          <div className="snap__overlay" aria-hidden="true" />
          <div className="snap__content snap-anim">
            <h3>{f.title}</h3>
            <p>{f.text}</p>
          </div>
        </div>
      </section>
    ))}
  </>
);

const CTA: React.FC = () => (
  <section className="cta fullpage-slide fullpage-slide--cta" id="cta" aria-label="Kontakt">
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

/* Mobile-CTA im Snap-Stil + Footer */
const CTAMobile: React.FC = () => (
  <section className="snap-slide" id="cta-mobile" aria-label="Kontakt">
    <div className="snap-card">
      <div className="snap__bg" style={{ backgroundImage: `url(/image_001.avif)` }} aria-hidden="true" />
      <div className="snap__overlay" aria-hidden="true" />
      <div className="snap__content snap-anim">
        <h2 className="cta__text">Nimm mit uns Kontakt auf</h2>
        <p className="cta_text">
          Hast du Interesse an einer Zusammenarbeit? Fülle bitte das Formular aus und
          wir werden uns in Kürze bei dir melden. Wir freuen uns schon darauf, von dir zu hören.
        </p>
        <Link to="/beratung" className="btn btn--accent-cta">Kontakt</Link>
      </div>
    </div>

    {/* Footer unter der Karte */}
    <div className="footer-inline footer-inline--mobile">
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
  const isDesktop   = useMediaQuery('(min-width: 1024px)');
  const reduced     = useMediaQuery('(prefers-reduced-motion: reduce)');
  const isFullpage  = isDesktop && !reduced;
  const isMobileSnap = !isDesktop;

  const [index, setIndex] = useState(0);
  const [isAnimating, setAnimating] = useState(false);

  // Desktop Fullpage Klasse
  useEffect(() => {
    const root = document.documentElement;
    if (isFullpage) root.classList.add('start-fullpage');
    else root.classList.remove('start-fullpage');
    return () => root.classList.remove('start-fullpage');
  }, [isFullpage]);

  // Mobile: Inview-Animationen
  useEffect(() => {
    if (isFullpage || reduced) return;
    const slides = Array.from(document.querySelectorAll<HTMLElement>('.snap-slide'));
    const obs = new IntersectionObserver((entries) => {
      entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('is-inview'); });
    }, { threshold: 0.6 });
    slides.forEach(s => obs.observe(s));
    return () => obs.disconnect();
  }, [isFullpage, reduced]);

  // Desktop: Fullpage Wheel/Key
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
  }, [isFullpage, isAnimating, slides.length]);

  const handleDotClick = (i: number) => (e: React.MouseEvent) => {
    e.preventDefault();
    if (!isFullpage) {
      document.getElementById(dotSlides[i])?.scrollIntoView({ behavior: 'smooth' });
      return;
    }
    setIndex(i);
  };

  /* MOBILE: Snap-Layout */
  if (!isFullpage && isMobileSnap) {
    return (
      <div className="startseite mobile">
        <Hero />
        <FeaturesMobile />
        <CTAMobile />
      </div>
    );
  }

  /* DESKTOP: Fullpage-Layout */
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

      <div className="slides">
        <div
          className="slides__inner"
          style={
            isFullpage && index > 0
              ? { transform: `translateY(calc(-${index} * var(--slide-h)))` } // kein Abzug der Navbar-Höhe
              : undefined
          }
        >
          <Hero />
          <FeaturesDesktop />
          <CTA />
        </div>
      </div>
    </div>
  );
}
