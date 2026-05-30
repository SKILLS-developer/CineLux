import { useEffect, useState } from "react";
import { SubscriptionNotification } from "../../shared/Notification/Notification.jsx";
import { Link, useNavigate } from "react-router-dom";
import MediaCard from "../../shared/MediaCard/MediaCard.jsx";

import API from "../../../api.js";

function getPosterUrl(posterUrl) {
  const filename = posterUrl.split(/[\\/]/).pop();
  return new URL(`../../../assets/thumbnail/${filename}`, import.meta.url).href;
}

export default function LatestRelease() {
  const navigate = useNavigate();
  const [showSubscriptionNotification, setShowSubscriptionNotification] =
    useState(false);
  const [releases, setReleases] = useState([]);
  useEffect(() => {
    try {
      const fetchReleases = async () => {
        const response = await API.get("/media/latest-release");
        setReleases(response.data);
      };
      fetchReleases();
    } catch (error) {
      console.error("Error fetching latest releases:", error);
    }
  }, []);

  function handleClick(release) {
    if (
      !release.isFree &&
      (!localStorage.getItem("user") ||
        JSON.parse(localStorage.getItem("user")).isSubscribed === false)
    ) {
      setShowSubscriptionNotification(true);
      return;
    }

    navigate(`/play/${release.mediaId}`);
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
          {releases.map((release) => (
            <MediaCard
              key={release.mediaId}
              tagText={release.isFree === true ? "Free" : "Paid"}
              imageSrc={getPosterUrl(release.posterUrl)}
              imageAlt={release.title}
              title={release.title}
              rating={release.averageRating}
              meta={release.genre}
              onClick={() => handleClick(release)}
            />
          ))}
        </div>
      </div>
      {/* <ToastContainer /> */}
    </section>
  );
}
