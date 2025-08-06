import React from 'react';
import './Footer.css';
import { FaFacebookF, FaInstagram, FaLinkedinIn } from 'react-icons/fa';

const Footer: React.FC = () => {
  return (
    <footer className="footer" id="footer">
      <div className="footer__container">
        {/* Kontakt */}
        <section className="footer__section footer__contact">
          <h2 className="footer__title">Kontakt</h2>
          <address className="footer__address">
            KAM MetallForm GmbH<br />
            Musterstraße 1<br />
            12345 Musterstadt<br />
            <a href="tel:+491234567890" className="footer__link">Tel.: +49 (0)123 456 7890</a><br />
            <a href="mailto:info@kam-metallform.de" className="footer__link">info@kam-metallform.de</a>
          </address>
        </section>

        {/* Navigation */}
        <nav className="footer__section footer__nav" aria-label="Footer Navigation">
          <h2 className="footer__title">Sitemap</h2>
          <ul className="footer__list">
            <li><a href="#leistungen" className="footer__link">Leistungen</a></li>
            <li><a href="#projekte" className="footer__link">Projekte</a></li>
            <li><a href="#unternehmen" className="footer__link">Unternehmen</a></li>
            <li><a href="#kontakt" className="footer__link">Kontakt</a></li>
          </ul>
        </nav>

        {/* Rechtliches */}
        <section className="footer__section footer__legal">
          <h2 className="footer__title">Rechtliches</h2>
          <ul className="footer__list">
            <li><a href="#impressum" className="footer__link">Impressum</a></li>
            <li><a href="#datenschutz" className="footer__link">Datenschutz</a></li>
            <li><a href="#agb" className="footer__link">AGB</a></li>
          </ul>
          <div className="footer__imprint">
            <p>
              Geschäftsführer: Max Mustermann<br />
              Handelsregister: AG Musterstadt, HRB 012345<br />
              USt-ID: DE 123456789
            </p>
          </div>
        </section>

        {/* Social Media */}
        <section className="footer__section footer__social">
          <h2 className="footer__title">Folgen Sie uns</h2>
          <div className="footer__social-icons" aria-label="Social Media">
            <a href="https://facebook.com" target="_blank" rel="noopener" title="Facebook" className="footer__social-link">
              <FaFacebookF />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener" title="Instagram" className="footer__social-link">
              <FaInstagram />
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noopener" title="LinkedIn" className="footer__social-link">
              <FaLinkedinIn />
            </a>
          </div>
        </section>
      </div>

      <div className="footer__bottom">
        <p>&copy; {new Date().getFullYear()} KAM MetallForm GmbH. Alle Rechte vorbehalten.</p>
      </div>
    </footer>
  );
};

export default Footer;
