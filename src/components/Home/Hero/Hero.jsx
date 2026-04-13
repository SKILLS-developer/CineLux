import { useState } from "react";
import { FiBookmark, FiPlay, FiPlayCircle } from "react-icons/fi";
import Header from "../../shared/Header/Header";
import "./Hero.css";
import { HeroSlides } from "../../../data/HeroSlides";
import { useNavigate } from "react-router-dom";
export default function Hero() {
  const navigate = useNavigate();
  const [activeSlide, setActiveSlide] = useState(0);
  const [isTrailerHover, setIsTrailerHover] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);
  const slide = HeroSlides[activeSlide];
  const hasMp4Trailer =
    typeof slide.trailer === "string" &&
    slide.trailer.toLowerCase().endsWith(".mp4");
  function handleClick(slide) {
    navigate(`/play/${slide.id}`);
  }
  return (
    <section
      className="hero position-relative overflow-hidden min-vh-100"
      aria-label="Featured movie hero"
      onMouseEnter={() => hasMp4Trailer && setIsTrailerHover(true)}
      onMouseLeave={() => setIsTrailerHover(false)}
    >
      <Header />

      <div
        className="hero-backdrop position-absolute top-0 start-0 w-100 h-100"
        aria-hidden="true"
      >
        <img
          key={slide.id}
          src={slide.thumbnail}
          alt={slide.title}
          className={`hero-image ${isTrailerHover ? "is-hidden" : ""}`}
          fetchPriority="high"
          decoding="async"
        />
        {hasMp4Trailer && (
          <video
            className={`hero-video ${isTrailerHover ? "is-visible" : ""}`}
            src={slide.trailer}
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
          />
        )}
      </div>

      <div className="container-fluid hero-content-shell position-relative z-2 d-flex flex-column justify-content-end min-vh-100 px-3 px-md-4 px-xl-5">
        <div className="row">
          <div
            key={slide.id}
            className="col-12 col-xl-8 col-xxl-7 hero-copy-shell"
          >
            <p className="hero-year">{slide.year}</p>
            <h1 className="hero-title">{slide.title}</h1>
            <p className="hero-meta">{slide.meta}</p>
            <p className="hero-description">{slide.description}</p>

            <div className="hero-cta-row d-flex flex-wrap gap-2 gap-md-3 mt-3 mt-md-4">
              <button
                type="button"
                onClick={() => handleClick(slide)}
                className="btn hero-btn hero-btn-primary"
              >
                <FiPlay />
                Play Now
              </button>
              <button
                type="button"
                onClick={() => handleClick(slide)}
                className="btn hero-btn hero-btn-ghost"
              >
                <FiPlayCircle />
                Watch Trailer
              </button>
              <button
                type="button"
                className={`btn hero-btn hero-btn-ghost `}
                onClick={() => setIsFavorite(!isFavorite)}
                aria-pressed={isFavorite}
              >
                <FiBookmark
                  color={isFavorite ? "#facc15" : "currentColor"}
                  stroke={isFavorite ? "#facc15" : "currentColor"}
                  fill={isFavorite ? "#facc15" : "none"}
                />
                Add to Wishlist
              </button>
            </div>
          </div>
        </div>
      </div>

      <div
        className="hero-dots position-absolute z-2 d-flex align-items-center gap-2 gap-md-3"
        aria-label="Featured slide controls"
      >
        {HeroSlides.map((item, index) => (
          <button
            key={`${item.id}`}
            type="button"
            className={`hero-dot ${index === activeSlide ? "is-active" : ""}`}
            onClick={() => setActiveSlide(index)}
            aria-label={`Show ${item.title}`}
            aria-current={index === activeSlide}
          />
        ))}
      </div>
    </section>
  );
}
