import { useRef, useState } from "react";
import { FaChevronLeft, FaChevronRight, FaStar } from "react-icons/fa";
import { ReleaseList } from "../../../data/Release.js";
import { SubscriptionNotification } from "../../shared/Notification/Notification.jsx";
import "./LatestRelease.css";

export default function LatestRelease() {
  const railRef = useRef(null);
  const [showSubscriptionNotification, setShowSubscriptionNotification] =
    useState(false);

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
  function handleClick(isFree) {
    if (!isFree) {
      setShowSubscriptionNotification(true);
      return;
    }
  }

  return (
    <section className="latest-release">
      {showSubscriptionNotification && (
        <SubscriptionNotification
          onClose={() => setShowSubscriptionNotification(false)}
        />
      )}
      <div className="latest-release-shell">
        <div className="latest-release-heading">
          <h2>Just Released</h2>
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
          {ReleaseList.map((release, index) => (
            <article
              className={`release-card `}
              key={`${index}-${release.title}`}
              onClick={() => {
                handleClick(release.free);
              }}
            >
              <span
                className={`release-type ${release.free === true ? "free" : "paid"}`}
              >
                {release.free === true ? "Free" : "Paid"}
              </span>

              <img
                src={release.thumbnail}
                alt={release.title}
                loading="lazy"
                decoding="async"
              />

              <div className="release-card-overlay">
                <h3>{release.title}</h3>
                <div className="release-card-meta">
                  <span className="release-rating">
                    <FaStar className="rating-star" />
                    {release.rating}
                  </span>
                  <span className="release-meta-data">{release.meta}</span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
