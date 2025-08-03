import './Footer.css';
import { FaFacebookF, FaInstagram, FaLinkedinIn } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="p-8" id="footer">
      <div className="flex flex-col items-center gap-4">
        <address className="not-italic text-center">
          Musterstraße 1<br />12345 Musterstadt<br />
          <a href="#anfahrt">Anfahrt</a>
        </address>
        <div className="flex gap-4">
          <a href="#">
            <FaFacebookF />
          </a>
          <a href="#">
            <FaInstagram />
          </a>
          <a href="#">
            <FaLinkedinIn />
          </a>
        </div>
        <nav className="flex gap-4">
          <a href="#impressum">Impressum</a>
          <a href="#datenschutz">Datenschutz</a>
        </nav>
      </div>
    </footer>
  );
};

export default Footer;

