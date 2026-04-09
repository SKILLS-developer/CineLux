import { useRef } from "react";
import { FaChevronLeft, FaChevronRight, FaStar } from "react-icons/fa";
import MoviePoster from "../../assets/Hero.png";

import "./LatestRelease.css";

const releases = [
  {
    title: "Enola Holmes 2",
    rating: 4.8,
    meta: "Action ",
    image: MoviePoster,
    type: "Movie",
    tone: "gold",
  },
  {
    title: "Satan's Slaves",
    rating: 4.6,
    meta: "Horror ",
    image: MoviePoster,
    type: "Movie",
    tone: "gold",
  },
  {
    title: "The Flash",
    rating: 4.6,
    meta: "Mystery ",
    image: MoviePoster,
    type: "Movie",
    tone: "gold",
  },
  {
    title: "Weak Hero",
    rating: 4.6,
    meta: "Action • Drama",
    image: MoviePoster,
    type: "Serie",
    tone: "gold",
  },
  {
    title: "Wonder Woman",
    rating: 4.6,
    meta: "Action ",
    image: MoviePoster,
    type: "Movie",
    tone: "gold",
  },
];

export default function LatestRelease() {
  const railRef = useRef(null);

  const scrollRail = (direction) => {
    if (!railRef.current) return;

    const card = railRef.current.querySelector(".release-card");
    const scrollAmount = card
      ? card.getBoundingClientRect().width + 24
      : railRef.current.clientWidth * 0.8;

    railRef.current.scrollBy({
      left: direction * scrollAmount,
      behavior: "smooth",
    });
  };

  return (
    <section className="latest-release">
      <div className="latest-release-shell">
        <div className="latest-release-heading">
          <h2>Just Release</h2>
          <div
            className="latest-release-controls"
            aria-label="release navigation"
          >
            <button
              type="button"
              className="release-nav-btn"
              aria-label="Show previous releases"
              onClick={() => scrollRail(-1)}
            >
              <FaChevronLeft />
            </button>
            <button
              type="button"
              className="release-nav-btn release-nav-btn-primary"
              aria-label="Show next releases"
              onClick={() => scrollRail(1)}
            >
              <FaChevronRight />
            </button>
          </div>
        </div>

        <div className="latest-release-rail" ref={railRef}>
          {releases.map((release) => (
            <article
              className={`release-card release-card-${release.tone}`}
              key={release.title}
            >
              <span className="release-type">
                {release.type === "movie" ? "Movie" : "Series"}
              </span>

              <img
                src={release.image}
                alt={release.title}
                loading="lazy"
                decoding="async"
              />

              <div className="release-card-overlay">
                <h3>{release.title}</h3>
                <div className="release-card-meta">
                  <span className="release-rating">
                    <FaStar />
                    {release.rating}
                  </span>
                  <span>{release.meta}</span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
