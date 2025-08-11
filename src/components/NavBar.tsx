import { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FaBars, FaTimes } from 'react-icons/fa';
import './NavBar.css';

const NavBar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isOverHero, setIsOverHero] = useState(true);
  const { pathname } = useLocation();
  const navRef = useRef<HTMLElement | null>(null);

  const toggleMenu = () => setMenuOpen((prev) => !prev);
  const closeMenu = () => setMenuOpen(false);

  // Hero-Overlay (Transparente Navbar auf Home, sonst solide)
  useEffect(() => {
    if (pathname !== '/') {
      setIsOverHero(false);
      return;
    }
    const hero = document.getElementById('hero');
    if (!hero) return;

    const observer = new IntersectionObserver(
      ([entry]) => setIsOverHero(entry.isIntersecting),
      { threshold: 0.1 }
    );
    observer.observe(hero);
    return () => observer.disconnect();
  }, [pathname]);

  // ESC schließt das Menü
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeMenu();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  // Klick außerhalb der offenen Navigation schließt das Menü (robuster)
  useEffect(() => {
    if (!menuOpen) return;
    const onClickOutside = (e: MouseEvent) => {
      const nav = navRef.current;
      if (!nav) return;
      const target = e.target as Node | null;
      if (target && nav.contains(target)) return; // Klick IN der Nav -> nichts tun
      closeMenu();
    };
    document.addEventListener('click', onClickOutside);
    return () => document.removeEventListener('click', onClickOutside);
  }, [menuOpen]);

  // Body-Scroll sperren, wenn Mobile-Menü offen
  useEffect(() => {
    const original = document.body.style.overflow;
    document.body.style.overflow = menuOpen ? 'hidden' : original || '';
    return () => {
      document.body.style.overflow = original || '';
    };
  }, [menuOpen]);

  return (
    <nav
      ref={navRef as any}
      className={`navbar ${isOverHero ? 'navbar--over-hero' : 'navbar--solid'} ${menuOpen ? 'navbar--open' : ''}`}
    >
      <div className="navbar__container">
        <Link to="/" className="navbar__logo" onClick={closeMenu}>
          <img src="/Logo-Photoroom.png" alt="Logo" />
        </Link>

        {/* Desktop-Links / Mobile-Dropdown */}
        <ul
          id="mobile-menu"
          className={`navbar__links ${menuOpen ? 'open' : ''}`}
        >
          <li><Link to="/" onClick={closeMenu} className="navbar__link">Home</Link></li>
          <li><Link to="/leistungen" onClick={closeMenu} className="navbar__link">Leistungen</Link></li>
          <li><Link to="/beratung" onClick={closeMenu} className="navbar__link">Beratung</Link></li>
          <li><Link to="/metallform" onClick={closeMenu} className="navbar__link">MetallForm</Link></li>
        </ul>

        <div className="navbar__actions">
          <button
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

      {/* Backdrop für Mobile-Menü */}
      <div
        className={`navbar__backdrop ${menuOpen ? 'open' : ''}`}
        onClick={closeMenu}
        aria-hidden="true"
      />
    </nav>
  );
};

export default NavBar;
