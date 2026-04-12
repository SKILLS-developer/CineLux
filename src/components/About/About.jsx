import { FaBullseye, FaFilm, FaGlobe, FaRocket, FaUsers } from "react-icons/fa";
import { Link } from "react-router-dom";
import Footer from "../shared/Footer/Footer.jsx";
import Header from "../shared/Header/Header.jsx";
import "./About.css";

const stats = [
  { label: "Monthly Viewers", value: "2.4M+" },
  { label: "Movies & Shows", value: "18K+" },
  { label: "Countries Reached", value: "95+" },
  { label: "Curated Lists", value: "1.2K+" },
];

const values = [
  {
    icon: <FaFilm />,
    title: "Story First",
    text: "We spotlight titles with strong storytelling, not just loud marketing.",
  },
  {
    icon: <FaUsers />,
    title: "Community Driven",
    text: "Fan reactions and audience insights help shape what we recommend.",
  },
  {
    icon: <FaGlobe />,
    title: "Global Library",
    text: "From blockbuster franchises to regional gems, we keep discovery diverse.",
  },
  {
    icon: <FaRocket />,
    title: "Built For Speed",
    text: "Fast browsing, fluid playback, and smooth UX on desktop and mobile.",
  },
];

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
            {stats.map((item) => (
              <article key={item.label} className="about-stat-card">
                <h2>{item.value}</h2>
                <p>{item.label}</p>
              </article>
            ))}
          </section>

          <section className="about-section about-mission">
            <div className="section-title">
              <FaBullseye />
              <h2>Mission & Vision</h2>
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
              {values.map((value) => (
                <article key={value.title} className="about-value-card">
                  <div className="value-icon">{value.icon}</div>
                  <h3>{value.title}</h3>
                  <p>{value.text}</p>
                </article>
              ))}
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
