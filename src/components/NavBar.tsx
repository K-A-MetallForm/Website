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
      <div className="navbar-container">
        <Link to="/" className="logo">
          <img src="/Logo-Photoroom.png" alt="Logo" />
        </Link>
        <ul className={`nav-links ${menuOpen ? 'open' : ''}`}>
          <li><Link to="/" onClick={closeMenu} className="nav-link">Home</Link></li>
          <li><Link to="/leistungen" onClick={closeMenu} className="nav-link">Leistungen</Link></li>
          <li><Link to="/beratung" onClick={closeMenu} className="nav-link">Beratung</Link></li>
          <li><Link to="/metallform" onClick={closeMenu} className="nav-link">MetallForm</Link></li>
        </ul>
        <div className="actions">
          <button onClick={toggleMenu} className="menu-button">
            {menuOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;