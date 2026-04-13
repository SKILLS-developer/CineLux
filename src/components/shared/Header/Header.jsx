import { useState } from "react";
import { FiMenu, FiSearch, FiX } from "react-icons/fi";
import "./Header.css";
import { Link } from "react-router-dom";
import logo from "../../../assets/CineLux-Logo.png";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const isLoggedIn =
    typeof window !== "undefined" &&
    Boolean(window.localStorage.getItem("user")) &&
    window.localStorage.getItem("isLoggedIn") === "true";
  //const isLoggedIn = false; // Placeholder for authentication state
  const user =
    typeof window !== "undefined"
      ? JSON.parse(window.localStorage.getItem("user"))
      : null;
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen((open) => !open);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const toggleSearch = () => {
    setIsSearchOpen((open) => !open);
  };

  return (
    <header className={`header ${isMenuOpen ? "menu-open" : ""}`}>
      <div className="container-fluid px-3 px-lg-4 d-flex align-items-center position-relative">
        <Link to="/" className="header-logo flex-shrink-0 me-3 me-xl-4">
          <img src={logo} alt="CineLux" />
        </Link>

        <nav
          className="header-nav-desktop d-none d-lg-flex flex-wrap align-items-center gap-3 gap-xl-4"
          aria-label="Primary"
        >
          <Link to="/upcoming">Upcoming</Link>
          <Link to="/shows">Shows</Link>
          <Link to="/discover">Discover</Link>
          <Link to="/plans">Plans</Link>
          <Link to="/about">About</Link>
          {isLoggedIn && <Link to="/profile">Profile</Link>}
        </nav>
        <div className="header-actions-desktop d-none d-lg-flex align-items-center gap-2 gap-lg-3 ms-auto">
          <div className="header-search-wrapper">
            <input
              type="search"
              className={`header-search-input${isSearchOpen ? " is-open" : ""}`}
              placeholder="Search movies, shows…"
              aria-label="Search"
            />
            <button
              type="button"
              className="icon-btn"
              aria-label={isSearchOpen ? "Close search" : "Open search"}
              onClick={toggleSearch}
            >
              {isSearchOpen ? <FiX /> : <FiSearch />}
            </button>
          </div>
          {!isLoggedIn ? (
            <>
              <Link to="/signup">
                <button
                  type="button"
                  className="btn header-btn-signup ms-2 ms-lg-3"
                >
                  Sign Up
                </button>
              </Link>
              <Link to="/login">
                <button
                  type="button"
                  className="btn header-btn ms-2 ms-lg-3"
                  // Placeholder for login action
                >
                  Login
                </button>
              </Link>
            </>
          ) : (
            <span className="Username">Welcome back, {user.name}!</span>
          )}
        </div>

        {/* Mobile Menu View */}

        <button
          type="button"
          className="header-menu-btn ms-auto d-inline-flex d-lg-none "
          onClick={toggleMenu}
        >
          {isMenuOpen ? <FiX /> : <FiMenu />}
        </button>
        <div
          id="header-menu-panel"
          className={`header-menu-panel d-lg-none ${isMenuOpen ? "is-open" : ""}`}
        >
          <nav className="header-nav d-flex flex-column" aria-label="Mobile">
            <Link to="/upcoming" onClick={closeMenu}>
              Upcoming
            </Link>
            <Link to="/shows" onClick={closeMenu}>
              Shows
            </Link>
            <Link to="/discover" onClick={closeMenu}>
              Discover
            </Link>
            <Link to="/plans" onClick={closeMenu}>
              Plans
            </Link>
            <Link to="/about" onClick={closeMenu}>
              About
            </Link>
            {isLoggedIn && (
              <Link to="/profile" onClick={closeMenu}>
                Profile
              </Link>
            )}
          </nav>

          <div className="header-actions d-flex justify-content-start">
            <div className="header-search-wrapper">
              <input
                type="search"
                className={`header-search-input header-search-mobile${isSearchOpen ? " is-open" : ""}`}
                placeholder="Search movies, shows…"
                aria-label="Search"
              />
              <button
                className="icon-btn"
                aria-label={isSearchOpen ? "Close search" : "Open search"}
                onClick={toggleSearch}
              >
                {isSearchOpen ? <FiX /> : <FiSearch />}
              </button>
            </div>
            {!isLoggedIn && (
              <div>
                <Link to="/signup">
                  <button
                    type="button"
                    className="btn header-btn-signup ms-2 ms-lg-3"
                  >
                    Sign Up
                  </button>
                </Link>
                <Link to="/login">
                  <button type="button" className="btn header-btn ms-2 ms-lg-3">
                    Login
                  </button>
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
