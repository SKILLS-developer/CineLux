import { FiFacebook, FiInstagram, FiTwitter } from "react-icons/fi";
import "./Footer.css";
import { Link } from "react-router-dom";
import logo from "/og-image.png";

export default function Footer() {
  return (
    <footer className="footer py-5 pb-4">
      <div className="container footer-shell">
        <div className="row footer-grid gy-4 pb-4">
          <div className="col-12 col-lg-5 footer-brand">
            <Link to="/" className="footer-logo">
              <img src={logo} alt="CineLux" />
            </Link>
            <p>
              CineLux is your destination for bold movie nights, trending
              series, and a cinematic streaming experience built for discovery.
            </p>

            <div className="footer-socials">
              <a
                href="https://www.facebook.com/cinelux"
                aria-label="CineLux Facebook"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FiFacebook />
              </a>
              <a
                href="https://www.twitter.com/cinelux"
                aria-label="CineLux Twitter"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FiTwitter />
              </a>
              <a
                href="https://www.instagram.com/cinelux"
                aria-label="CineLux Instagram"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FiInstagram />
              </a>
            </div>
          </div>

          <div className="col-12 col-lg-7">
            <div className="row g-4">
              <div className="col-12 col-sm-6 col-md-4 footer-column">
                <h3>Company</h3>
                <div className="footer-links">
                  <Link to="/about">About Us</Link>
                  <Link to="#">Careers</Link>
                  <Link to="#">Press</Link>
                  <Link to="#">Investors</Link>
                </div>
              </div>

              <div className="col-12 col-sm-6 col-md-4 footer-column">
                <h3>Help &amp; Support</h3>
                <div className="footer-links">
                  <Link to="#">Help Center</Link>
                  <Link to="#">FAQs</Link>
                  <Link to="#">Support</Link>
                  <Link to="/plans">Account &amp; Billing</Link>
                </div>
              </div>

              <div className="col-12 col-sm-6 col-md-4 footer-column">
                <h3>Legal</h3>
                <div className="footer-links">
                  <Link to="#">Terms of Service</Link>
                  <Link to="#">Privacy Policy</Link>
                  <Link to="#">Cookie Preferences</Link>
                  <Link to="#">Accessibility</Link>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="row footer-bottom pt-4 gy-2">
          <div className="col-12 col-md-6">
            <p className="mb-0">All rights reserved. 2026 CineLux Movies.</p>
          </div>
          <div className="col-12 col-md-6 text-md-end">
            <span>Built for movie lovers everywhere.</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
