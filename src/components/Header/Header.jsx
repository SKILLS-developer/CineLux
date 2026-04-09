import { useState } from "react";
import Logo from "../../assets/CineLux-Logo.png";
import { FiMenu, FiSearch, FiX } from "react-icons/fi";
import "./Header.css";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen((open) => !open);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <header className={`header ${isMenuOpen ? "menu-open" : ""}`}>
      <a href="/" className="header-logo">
        <img src={Logo} alt="CineLux Logo" />
      </a>

      <button
        type="button"
        className="header-menu-btn"
        aria-label={isMenuOpen ? "Close menu" : "Open menu"}
        aria-expanded={isMenuOpen}
        aria-controls="header-menu-panel"
        onClick={toggleMenu}
      >
        {isMenuOpen ? <FiX /> : <FiMenu />}
      </button>

      <div
        id="header-menu-panel"
        className={`header-menu-panel ${isMenuOpen ? "is-open" : ""}`}
      >
        <nav className="header-nav">
          <a href="/" className="active" onClick={closeMenu}>
            Home
          </a>
          <a href="/discover" onClick={closeMenu}>
            Discover
          </a>
          <a href="/movies" onClick={closeMenu}>
            Movie Release
          </a>
          <a href="/forum" onClick={closeMenu}>
            Forum
          </a>
          <a href="/about" onClick={closeMenu}>
            About
          </a>
        </nav>

        <div className="header-actions">
          <button className="icon-btn" aria-label="Search">
            <FiSearch />
          </button>
          <button className="btn-signup">Sign up</button>
          <button className="btn-login">Login</button>
        </div>
      </div>
    </header>
  );
}
