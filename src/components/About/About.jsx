import { FaBullseye, FaFilm, FaGlobe, FaRocket, FaUsers } from "react-icons/fa";
import { Link } from "react-router-dom";
import Footer from "../shared/Footer/Footer.jsx";
import Header from "../shared/Header/Header.jsx";
import "./About.css";

export default function About() {
  return (
    <>
      <Header />
      <div className="Spacer"></div>

      <section className="about-page">
        <div className="about-shell">
          <header className="about-hero">
            <p className="about-kicker">Who We Are</p>
            <h1>About CineLux</h1>
            <p className="about-lead">
              CineLux is a streaming-first movie platform built for people who
              love discovering great stories. Our goal is simple: make finding
              your next favorite title effortless and exciting.
            </p>
          </header>

          <section className="about-stats" aria-label="CineLux statistics">
            <article className="about-stat-card">
              <h2>2.4M+</h2>
              <p>Monthly Viewers</p>
            </article>
            <article className="about-stat-card">
              <h2>18K+</h2>
              <p>Movies &amp; Shows</p>
            </article>
            <article className="about-stat-card">
              <h2>95+</h2>
              <p>Countries Reached</p>
            </article>
            <article className="about-stat-card">
              <h2>1.2K+</h2>
              <p>Curated Lists</p>
            </article>
          </section>

          <section className="about-section about-mission">
            <div className="section-title">
              <FaBullseye />
              <h2>Mission &amp; Vision</h2>
            </div>
            <p>
              Our mission is to connect audiences to stories they care about
              through thoughtful curation and a premium viewing experience.
            </p>
            <p>
              Our vision is to become the most trusted destination for modern
              entertainment discovery, where every click feels meaningful.
            </p>
          </section>

          <section className="about-section">
            <div className="section-title">
              <FaUsers />
              <h2>What We Value</h2>
            </div>
            <div className="about-values-grid">
              <article className="about-value-card">
                <div className="value-icon">
                  <FaFilm />
                </div>
                <h3>Story First</h3>
                <p>
                  We spotlight titles with strong storytelling, not just loud
                  marketing.
                </p>
              </article>
              <article className="about-value-card">
                <div className="value-icon">
                  <FaUsers />
                </div>
                <h3>Community Driven</h3>
                <p>
                  Fan reactions and audience insights help shape what we
                  recommend.
                </p>
              </article>
              <article className="about-value-card">
                <div className="value-icon">
                  <FaGlobe />
                </div>
                <h3>Global Library</h3>
                <p>
                  From blockbuster franchises to regional gems, we keep
                  discovery diverse.
                </p>
              </article>
              <article className="about-value-card">
                <div className="value-icon">
                  <FaRocket />
                </div>
                <h3>Built For Speed</h3>
                <p>
                  Fast browsing, fluid playback, and smooth UX on desktop and
                  mobile.
                </p>
              </article>
            </div>
          </section>

          <section className="about-cta">
            <h2>Ready To Explore?</h2>
            <p>
              Dive into trending releases, hidden gems, and curated picks built
              for your mood.
            </p>
            <Link to="/shows" className="about-cta-btn">
              Browse Shows
            </Link>
          </section>
        </div>
      </section>

      <Footer />
    </>
  );
}
