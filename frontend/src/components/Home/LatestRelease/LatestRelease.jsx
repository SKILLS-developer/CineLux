import { useEffect, useState } from "react";
import { SubscriptionNotification } from "../../shared/Notification/Notification.jsx";
import { Link, useNavigate } from "react-router-dom";
import MediaCard from "../../shared/MediaCard/MediaCard.jsx";
import API from "../../../api.js";

function getPosterUrl(posterUrl) {
  const filename = posterUrl.split(/[\\/]/).pop();
  return `${import.meta.env.BASE_URL}thumbnail/${filename}`;
}

export default function LatestRelease() {
  const navigate = useNavigate();
  const [showSubscriptionNotification, setShowSubscriptionNotification] =
    useState(false);
  const [releases, setReleases] = useState([]);
  useEffect(() => {
    const fetchReleases = async () => {
      try {
        const response = await API.get("/media/latest-release");
        setReleases(response.data);
      } catch (error) {
        console.error(`Error fetching latest releases: ${error}`);
      }
    };
    fetchReleases();
  }, []);
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
              onClick={() =>navigate(`/play/${release.mediaId}`)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
