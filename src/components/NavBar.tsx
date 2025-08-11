import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FaBars, FaTimes } from 'react-icons/fa';
import './NavBar.css';

const NavBar = () => {
  const { pathname } = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);
  const [isOverHero, setIsOverHero] = useState(true);

  const toggleMenu = () => setMenuOpen(prev => !prev);
  const closeMenu = () => setMenuOpen(false);

  // Beobachte, ob wir über der Hero-Sektion sind (nur auf der Startseite)
  useEffect(() => {
    if (pathname !== '/') {
      setIsOverHero(false);
      return;
    }
    const hero = document.getElementById('hero');
    if (!hero) return;

    const obs = new IntersectionObserver(
      ([entry]) => setIsOverHero(entry.isIntersecting),
      { threshold: 0.1 }
    );
    obs.observe(hero);
    return () => obs.disconnect();
  }, [pathname]);

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
        isOverHero ? 'navbar--over-hero' : 'navbar--solid',
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

      {/* Backdrop */}
      <div
        className={`navbar__backdrop ${menuOpen ? 'open' : ''}`}
        aria-hidden="true"
        onClick={closeMenu}
      />
    </nav>
  );
};

export default NavBar;
