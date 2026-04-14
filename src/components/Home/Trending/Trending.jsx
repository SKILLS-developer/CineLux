import { useRef, useState } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import trendingList from "../../../data/Data.js";
import { SubscriptionNotification } from "../../shared/Notification/Notification.jsx";
import { useNavigate } from "react-router-dom";
import MediaCard from "../../shared/MediaCard/MediaCard.jsx";
import "./Trending.css";

export default function Trending() {
  const railRef = useRef(null);
  const navigate = useNavigate();
  const [showSubscriptionNotification, setShowSubscriptionNotification] =
    useState(false);

  const scrollRail = (direction) => {
    if (!railRef.current) return;

    const card = railRef.current.querySelector(".trending-card");
    const scrollAmount = card
      ? card.getBoundingClientRect().width + 24
      : railRef.current.clientWidth * 0.8;

    railRef.current.scrollBy({
      left: direction * scrollAmount,
      behavior: "smooth",
    });
  };

  function handleClick(release) {
    if (!release.isFree) {
      setShowSubscriptionNotification(true);
      return;
    }

    navigate(`/play/${release.id}`);
  }

  return (
    <section className="trending">
      {showSubscriptionNotification && (
        <SubscriptionNotification
          onClose={() => setShowSubscriptionNotification(false)}
        />
      )}
      <div className="trending-shell">
        <div className="trending-heading">
          <h2>Trending Worldwide</h2>
          <div className="trending-controls" aria-label="trending navigation">
            <button
              type="button"
              className="trending-nav-btn"
              aria-label="Show previous trending titles"
              onClick={() => scrollRail(-1)}
            >
              <FaChevronLeft />
            </button>
            <button
              type="button"
              className="trending-nav-btn trending-nav-btn-primary"
              aria-label="Show next trending titles"
              onClick={() => scrollRail(1)}
            >
              <FaChevronRight />
            </button>
          </div>
        </div>

        <div className="trending-rail" ref={railRef}>
          {trendingList.slice(5).map((release) => (
            <MediaCard
              key={release.id}
              className="trending-card"
              tagClassName={`trending-type ${release.isFree === true ? "free" : "paid"}`}
              overlayClassName="trending-card-overlay"
              metaClassName="trending-card-meta"
              ratingClassName="trending-rating"
              metaTextClassName="trending-meta-data"
              tagText={release.isFree === true ? "free" : "paid"}
              imageSrc={release.thumbnail}
              imageAlt={release.title}
              title={release.title}
              rating={release.rating}
              meta={release.meta}
              onClick={() => {
                handleClick(release);
              }}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
