import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FaBars, FaTimes } from 'react-icons/fa';
import './NavBar.css';

const NavBar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isOverHero, setIsOverHero] = useState(true);
  const { pathname } = useLocation();

  const toggleMenu = () => setMenuOpen(prev => !prev);
  const closeMenu = () => setMenuOpen(false);

  useEffect(() => {
    if (pathname !== '/') { setIsOverHero(false); return; }
    const hero = document.getElementById('hero');
    if (!hero) return;

    const observer = new IntersectionObserver(
      ([entry]) => setIsOverHero(entry.isIntersecting),
      { threshold: 0.1 }
    );
    observer.observe(hero);
    return () => observer.disconnect();
  }, [pathname]);

  return (
    <nav className={`navbar ${isOverHero ? 'navbar--over-hero' : 'navbar--solid'}`}>
      <div className="navbar__container">
        <Link to="/" className="navbar__logo" onClick={closeMenu}>
          <img src="/Logo-Photoroom.png" alt="Logo" />
        </Link>
        <ul className={`navbar__links ${menuOpen ? 'open' : ''}`}>
          <li><Link to="/" onClick={closeMenu} className="navbar__link">Home</Link></li>
          <li><Link to="/leistungen" onClick={closeMenu} className="navbar__link">Leistungen</Link></li>
          <li><Link to="/beratung" onClick={closeMenu} className="navbar__link">Beratung</Link></li>
          <li><Link to="/metallform" onClick={closeMenu} className="navbar__link">MetallForm</Link></li>
        </ul>
        <div className="navbar__actions">
          <button onClick={toggleMenu} className="navbar__menu-button" aria-label="Menü">
            {menuOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;