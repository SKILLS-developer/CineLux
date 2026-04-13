import { useState } from "react";
import { FaStar } from "react-icons/fa";
import { ReleaseList } from "../../data/Release.js";
import Footer from "../shared/Footer/Footer.jsx";
import Header from "../shared/Header/Header.jsx";
import { useNavigate } from "react-router-dom";
import { SubscriptionNotification } from "../shared/Notification/Notification.jsx";
import "./Shows.css";

export default function Shows() {
  const shows = ReleaseList.filter((item) => item.type === "series");
  const navigate = useNavigate();
  const [showSubscriptionNotification, setShowSubscriptionNotification] =
    useState(false);

  function handleClick(release) {
    if (!release.isFree) {
      setShowSubscriptionNotification(true);
      return;
    }
    navigate(`/play/${release.id}`);
  }

  return (
    <>
      <Header />
      <div className="Spacer"></div>
      {showSubscriptionNotification && (
        <SubscriptionNotification
          onClose={() => setShowSubscriptionNotification(false)}
        />
      )}
      <section className="shows-page">
        <div className="shows-shell">
          <div className="shows-heading">
            <div>
              <p className="shows-kicker">TV Series</p>
              <h1>Shows</h1>
            </div>
            <span className="shows-count">{shows.length} titles</span>
          </div>

          <div className="shows-grid">
            {shows.map((release) => (
              <article
                className="shows-card"
                key={release.id}
                onClick={() => handleClick(release)}
                style={{ cursor: "pointer" }}
              >
                <span className="shows-type series">{release.type}</span>

                <img
                  src={release.thumbnail}
                  alt={release.title}
                  loading="lazy"
                  decoding="async"
                />

                <div className="shows-card-overlay">
                  <h3>{release.title}</h3>
                  <div className="shows-card-meta">
                    <span className="shows-rating">
                      <FaStar className="rating-star" />
                      {release.rating}
                    </span>
                    <span className="shows-meta-data">{release.meta}</span>
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
