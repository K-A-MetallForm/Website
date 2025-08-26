import React from 'react';
import './Footer.css';
import { FaInstagram } from 'react-icons/fa';

const Footer: React.FC = () => {
  return (
    <footer className="footer" id="footer">
      <div className="footer__container">
        {/* Kontakt */}
        <section className="footer__section footer__contact">
          <h2 className="footer__title">Kontakt</h2>
          <address className="footer__address">
            K.A. MetallForm<br />
            Neureuter Straße 5-7<br />
            76185 Karlsruhe<br />
            <a href="tel:+491234567890" className="footer__link">Tel.: +49 (0)170 875 0760</a><br />
            <a href="mailto:info@kam-metallform.de" className="footer__link">info@ka-metallform.de</a>
          </address>
        </section>


        {/* Rechtliches */}
        <section className="footer__section footer__legal">
          <h2 className="footer__title">Rechtliches</h2>
          <ul className="footer__list">
            <li><a href="/impressum" className="footer__link">Impressum</a></li>
            <li><a href="/datenschutz" className="footer__link">Datenschutz</a></li>
            <li><a href="/agb" className="footer__link">AGB</a></li>
          </ul>
          <div className="footer__imprint">
            <p>
              Geschäftsführer: Kasim Avdija<br />
            </p>
          </div>
        </section>

        {/* Social Media */}
        <section className="footer__section footer__social">
          <h2 className="footer__title">Folgen Sie uns</h2>
          <div className="footer__social-icons" aria-label="Social Media">
            <a href="https://www.instagram.com/k.a.metallform/" target="_blank" rel="noopener" title="Instagram" className="footer__social-link">
              <FaInstagram />
            </a>
          </div>
        </section>
      </div>

      <div className="footer__bottom">
        <p>&copy; {new Date().getFullYear()} K.A. MetallForm <br/> Alle Rechte vorbehalten</p>
      </div>
    </footer>
  );
};

export default Footer;
