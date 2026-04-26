import { useState } from "react";
import ReleaseList from "../../../data/Data.js";
import { SubscriptionNotification } from "../../shared/Notification/Notification.jsx";
import { Link, useNavigate } from "react-router-dom";
import MediaCard from "../../shared/MediaCard/MediaCard.jsx";

export default function LatestRelease() {
  const navigate = useNavigate();
  const [showSubscriptionNotification, setShowSubscriptionNotification] =
    useState(false);

  function handleClick(release) {
    if (
      !release.isFree &&
      (!localStorage.getItem("user") ||
        JSON.parse(localStorage.getItem("user")).isSubscribed === false)
    ) {
      setShowSubscriptionNotification(true);
      return;
    }

    navigate(`/play/${release.id}`);
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
          <h2>Just Released</h2>
          <Link to="/discover" className="rail-view-all">
            View All
          </Link>
        </div>

        <div className="rail-track">
          {ReleaseList.slice(0, 5).map((release) => (
            <MediaCard
              key={release.id}
             
              tagText={release.isFree === true ? "Free" : "Paid"}
              imageSrc={release.thumbnail}
              imageAlt={release.title}
              title={release.title}
              rating={release.rating}
              meta={release.meta}
              onClick={() => handleClick(release)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
