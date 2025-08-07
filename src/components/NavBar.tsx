import { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaBars, FaTimes } from 'react-icons/fa';
import './NavBar.css';

const NavBar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const toggleMenu = () => setMenuOpen(prev => !prev);
  const closeMenu = () => setMenuOpen(false);

  return (
    <nav className="navbar">
      <div className="navbar__container">
        <Link to="/" className="navbar__logo">
          <img src="/Logo-Photoroom.png" alt="Logo" />
        </Link>
        <ul className={`navbar__links ${menuOpen ? 'open' : ''}`}>
          <li><Link to="/" onClick={closeMenu} className="navbar__link">Home</Link></li>
          <li><Link to="/leistungen" onClick={closeMenu} className="navbar__link">Leistungen</Link></li>
          <li><Link to="/beratung" onClick={closeMenu} className="navbar__link">Beratung</Link></li>
          <li><Link to="/metallform" onClick={closeMenu} className="navbar__link">MetallForm</Link></li>
        </ul>
        <div className="navbar__actions">
          <button onClick={toggleMenu} className="navbar__menu-button">
            {menuOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;