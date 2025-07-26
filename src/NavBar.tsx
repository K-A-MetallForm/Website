import { useState } from 'react';
import { FaPhoneAlt, FaBars, FaTimes } from 'react-icons/fa';
import './NavBar.css';

/**
 * NavBar-Komponente
 */
const NavBar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const toggleMenu = () => setMenuOpen(prev => !prev);
  const closeMenu = () => setMenuOpen(false);

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="logo">
          <p>
            LOGO
          </p>
        </div>

        <ul className="nav-links">
          <li><a href="#leistungen" className="nav-link">Leistungen</a></li>
          <li><a href="#vorteile" className="nav-link">Vorteile</a></li>
          <li><a href="#beratung" className="nav-link">Beratung</a></li>
          <li><a href="#metallform" className="nav-link">MetallForm</a></li>
        </ul>

        <div className="actions">
          <a href="#angebot" className="cta-button">Zum Angebot</a>
          <a href="tel:0721*******" className="phone-link">
            <FaPhoneAlt />0721 *******
          </a>
          <button onClick={toggleMenu} className="menu-button" aria-label="Menü öffnen">
            {menuOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>
      </div>

      {menuOpen && (
        <div className="mobile-menu">
          <ul>
            <li><a href="#leistungen" onClick={closeMenu} className="mobile-link">Leistungen</a></li>
            <li><a href="#vorteile" onClick={closeMenu} className="mobile-link">Vorteile</a></li>
            <li><a href="#beratung" onClick={closeMenu} className="mobile-link">Beratung</a></li>
            <li><a href="#metallform" onClick={closeMenu} className="mobile-link">MetallForm</a></li>
            <li><a href="#angebot" onClick={closeMenu} className="mobile-cta">Zum Angebot</a></li>
            <li><a href="tel:0721*******" onClick={closeMenu} className="mobile-link">
              <FaPhoneAlt />0721*******
            </a></li>
          </ul>
        </div>
      )}
    </nav>
  );
};

export default NavBar;