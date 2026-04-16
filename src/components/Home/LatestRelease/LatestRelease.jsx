import { useRef, useState } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import ReleaseList from "../../../data/Data.js";
import { SubscriptionNotification } from "../../shared/Notification/Notification.jsx";
import { useNavigate } from "react-router-dom";
import MediaCard from "../../shared/MediaCard/MediaCard.jsx";
import "./LatestRelease.css";

export default function LatestRelease() {
  const railRef = useRef(null);
  const navigate = useNavigate();
  const [showSubscriptionNotification, setShowSubscriptionNotification] =
    useState(false);

  const scrollRail = (direction) => {
    if (!railRef.current) return;

    const card = railRef.current.querySelector(".rail-card");
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
    <section className="latest-release">
      {showSubscriptionNotification && (
        <SubscriptionNotification
          onClose={() => setShowSubscriptionNotification(false)}
        />
      )}
      <div className="rail-shell">
        <div className="rail-heading">
          <h2>Just Released</h2>
          <div className="rail-controls" aria-label="release navigation">
            <button
              type="button"
              className="rail-nav-btn"
              aria-label="Show previous releases"
              onClick={() => scrollRail(-1)}
            >
              <FaChevronLeft />
            </button>
            <button
              type="button"
              className="rail-nav-btn rail-nav-btn-primary"
              aria-label="Show next releases"
              onClick={() => scrollRail(1)}
            >
              <FaChevronRight />
            </button>
          </div>
        </div>

        <div className="rail-track" ref={railRef}>
          {ReleaseList.map((release) => (
            <MediaCard
              key={release.id}
              className="rail-card"
              tagClassName={`release-type ${release.isFree === true ? "free" : "paid"}`}
              overlayClassName="release-card-overlay"
              metaClassName="release-card-meta"
              ratingClassName="release-rating"
              metaTextClassName="rail-meta-data"
              tagText={release.isFree === true ? "Free" : "Paid"}
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
