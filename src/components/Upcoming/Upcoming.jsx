import { FaStar } from "react-icons/fa";
import { ReleaseList } from "../../data/Release.js";
import Footer from "../shared/Footer/Footer.jsx";
import Header from "../shared/Header/Header.jsx";
import "./Upcoming.css";

export default function Upcoming() {
  return (
    <>
      <Header />
      <div className="Spacer"></div>
      <section className="upcoming-page">
        <div className="upcoming-shell">
          <div className="upcoming-heading">
            <div>
              <p className="upcoming-kicker">Coming soon</p>
              <h1>Upcoming Movies</h1>
            </div>
            <span className="upcoming-count">{ReleaseList.length} titles</span>
          </div>

          <div className="upcoming-grid">
            {ReleaseList.map((release, index) => (
              <article className="upcoming-card" key={`${index}-${release.title}`}>
                <span className="upcoming-type soon">Soon</span>

                <img
                  src={release.thumbnail}
                  alt={release.title}
                  loading="lazy"
                  decoding="async"
                />

                <div className="upcoming-card-overlay">
                  <h3>{release.title}</h3>
                  <div className="upcoming-card-meta">
                    <span className="upcoming-rating">
                      <FaStar className="rating-star" />
                      {release.rating}
                    </span>
                    <span className="upcoming-meta-data">{release.meta}</span>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}
