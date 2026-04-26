import { useState } from "react";
import trendingList from "../../../data/Data.js";
import { SubscriptionNotification } from "../../shared/Notification/Notification.jsx";
import { Link, useNavigate } from "react-router-dom";
import MediaCard from "../../shared/MediaCard/MediaCard.jsx";

export default function Trending() {
  const navigate = useNavigate();
  const [showSubscriptionNotification, setShowSubscriptionNotification] =
    useState(false);

  function handleClick(trending) {
    if (
      !trending.isFree &&
      (!localStorage.getItem("user") ||
        JSON.parse(localStorage.getItem("user")).isSubscribed === false)
    ) {
      setShowSubscriptionNotification(true);
      return;
    }

    navigate(`/play/${trending.id}`);
  }

  return (
    <section className="rail-section">
      {showSubscriptionNotification && (
        <SubscriptionNotification
          onClose={() => setShowSubscriptionNotification(false)}
        />
      )}
      <div className="rail-shell">
        <div className="rail-heading">
          <h2>Trending Worldwide</h2>
          <Link to="/discover" className="rail-view-all">
            View All
          </Link>
        </div>

        <div className="rail-track">
          {trendingList.slice(5).map((trending) => (
            <MediaCard
              key={trending.id}
              
              tagText={trending.isFree === true ? "free" : "paid"}
              imageSrc={trending.thumbnail}
              imageAlt={trending.title}
              title={trending.title}
              rating={trending.rating}
              meta={trending.meta}
              onClick={() => handleClick(trending)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
