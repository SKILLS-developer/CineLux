import Logo from "../../assets/CineLux-Logo.png";
import { FiFacebook, FiInstagram, FiTwitter } from "react-icons/fi";
import "./Footer.css";

const footerGroups = [
  {
    title: "Company",
    links: ["About Us", "Careers", "Press", "Investors"],
  },
  {
    title: "Help & Support",
    links: ["Help Center", "FAQs", "Support", "Account & Billing"],
  },
  {
    title: "Legal",
    links: [
      "Terms of Service",
      "Privacy Policy",
      "Cookie Preferences",
      "Accessibility",
    ],
  },
];

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-shell">
        <div className="footer-grid">
          <div className="footer-brand">
            <a href="/" className="footer-logo">
              <img src={Logo} alt="CineLux Logo" />
            </a>

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

          {footerGroups.map((group) => (
            <div className="footer-column" key={group.title}>
              <h3>{group.title}</h3>
              <div className="footer-links">
                {group.links.map((link) => (
                  <a href="/" key={link}>
                    {link}
                  </a>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="footer-bottom">
          <p>All rights reserved. 2026 CineLux Movies.</p>
          <span>Built for movie lovers everywhere.</span>
        </div>
      </div>
    </footer>
  );
}
