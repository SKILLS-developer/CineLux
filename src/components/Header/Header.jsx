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
      <div className="container-fluid px-3 px-lg-4 d-flex align-items-center position-relative">
        <a href="/" className="header-logo flex-shrink-0 me-3 me-xl-4">
          <img src={Logo} alt="CineLux Logo" />
        </a>

        <nav
          className="header-nav-desktop d-none d-lg-flex flex-wrap align-items-center gap-3 gap-xl-4"
          aria-label="Primary"
        >
          <a href="/upcoming">Upcoming</a>
          <a href="/shows">Shows</a>
          <a href="/fanart">Fanart</a>
          <a href="/plans">Plans</a>
          <a href="/community">Community</a>
          <a href="/account">Account</a>
        </nav>

        <button
          type="button"
          className="icon-btn ms-auto d-none d-lg-inline-flex"
          aria-label="Search"
        >
          <FiSearch />
        </button>

        {/* Mobile Menu View */}
        <button
          type="button"
          className="header-menu-btn ms-auto d-inline-flex d-lg-none"
          onClick={toggleMenu}
        >
          {isMenuOpen ? <FiX /> : <FiMenu />}
        </button>
        <div
          id="header-menu-panel"
          className={`header-menu-panel d-lg-none ${isMenuOpen ? "is-open" : ""}`}
        >
          <nav className="header-nav d-flex flex-column" aria-label="Mobile">
            <a href="/upcoming" onClick={closeMenu}>
              Upcoming
            </a>
            <a href="/shows" onClick={closeMenu}>
              Shows
            </a>
            <a href="/fanart" onClick={closeMenu}>
              Fanart
            </a>
            <a href="/plans" onClick={closeMenu}>
              Plans
            </a>
            <a href="/community" onClick={closeMenu}>
              Community
            </a>
            <a href="/account" onClick={closeMenu}>
              Account
            </a>
          </nav>

          <div className="header-actions d-flex justify-content-start">
            <button className="icon-btn" aria-label="Search">
              <FiSearch />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
