import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FaBars, FaTimes } from 'react-icons/fa';
import './NavBar.css';

const NavBar = () => {
  const { pathname } = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);
  const [isHeroVisible, setHeroVisible] = useState(pathname === '/');

  const toggleMenu = () => setMenuOpen(prev => !prev);
  const closeMenu = () => setMenuOpen(false);

  // Route-Klasse auf <html>
  useEffect(() => {
    const root = document.documentElement;
    const isHome = pathname === '/';
    root.classList.toggle('route-home', isHome);
    root.classList.toggle('is-hero', isHome);
  }, [pathname]);

  // IntersectionObserver auf Hero -> Transparenz & Padding steuern
  useEffect(() => {
    if (pathname !== '/') {
      setHeroVisible(false);
      document.documentElement.classList.remove('is-hero');
      return;
    }
    const hero = document.getElementById('hero');
    if (!hero) return;

    const obs = new IntersectionObserver(([entry]) => {
      const visible = entry.intersectionRatio >= 0.3;
      setHeroVisible(visible);
      document.documentElement.classList.toggle('is-hero', visible);
    }, { threshold: 0.3 });
    obs.observe(hero);
    return () => obs.disconnect();
  }, [pathname]);

  // --nav-h dynamisch setzen
  useEffect(() => {
    const update = () => {
      const nav = document.querySelector('.navbar') as HTMLElement | null;
      if (nav) {
        document.documentElement.style.setProperty('--nav-h', `${nav.getBoundingClientRect().height}px`);
      }
    };
    update();
    window.addEventListener('resize', update);
    window.addEventListener('orientationchange', update);
    document.fonts?.ready.then(update);
    return () => {
      window.removeEventListener('resize', update);
      window.removeEventListener('orientationchange', update);
    };
  }, []);

  // Menü schließen bei Routenwechsel
  useEffect(() => {
    closeMenu();
  }, [pathname]);

  // ESC schließt Menü
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeMenu();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  // Ab 768px aufwärts Menü schließen (Layoutwechsel)
  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth >= 768) closeMenu();
    };
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  // Body-Scroll sperren, wenn Mobile-Menü offen
  useEffect(() => {
    const { body } = document;
    if (menuOpen) {
      body.style.overflow = 'hidden';
    } else {
      body.style.overflow = '';
    }
    return () => {
      body.style.overflow = '';
    };
  }, [menuOpen]);

  return (
    <nav
      className={[
        'navbar',
        isHeroVisible ? 'navbar--transparent' : 'navbar--solid',
        menuOpen ? 'navbar--open' : ''
      ].join(' ')}
    >
      <div className="navbar__container">
      <Link to="/" className="navbar__logo" onClick={closeMenu} aria-label="Startseite">
          <img src="/Logo-Photoroom.png" alt="Logo" />
        </Link>

        {/* Navigation-Links */}
        <ul
          id="mobile-menu"
          className={`navbar__links ${menuOpen ? 'open' : ''}`}
          role="menu"
          aria-label="Hauptnavigation"
        >
          <li role="none"><Link role="menuitem" to="/" onClick={closeMenu} className="navbar__link">Home</Link></li>
          <li role="none"><Link role="menuitem" to="/leistungen" onClick={closeMenu} className="navbar__link">Leistungen</Link></li>
          <li role="none"><Link role="menuitem" to="/beratung" onClick={closeMenu} className="navbar__link">Beratung</Link></li>
          <li role="none"><Link role="menuitem" to="/metallform" onClick={closeMenu} className="navbar__link">MetallForm</Link></li>
        </ul>

        {/* Menü-Button */}
        <div className="navbar__actions">
          <button
            type="button"
            onClick={toggleMenu}
            className="navbar__menu-button"
            aria-label={menuOpen ? 'Menü schließen' : 'Menü öffnen'}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
          >
            {menuOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
