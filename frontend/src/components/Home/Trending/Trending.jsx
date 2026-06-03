import { useState, useEffect } from "react";
import { SubscriptionNotification } from "../../shared/Notification/Notification.jsx";
import { Link, useNavigate } from "react-router-dom";
import MediaCard from "../../shared/MediaCard/MediaCard.jsx";
import API from "../../../api.js";
function getPosterUrl(posterUrl) {
  const filename = posterUrl.split(/[\\/]/).pop();
  return `${import.meta.env.BASE_URL}thumbnail/${filename}`;
}
export default function Trending() {
  const navigate = useNavigate();
  const [showSubscriptionNotification, setShowSubscriptionNotification] =
    useState(false);
  const [trending, setTrending] = useState([]);
  useEffect(() => {
    const fetchTrending = async () => {
      try {
        const response = await API.get("/media/trending");
        setTrending(response.data);
      } catch (error) {
        console.error(`Error fetching trending media: ${error}`);
      }
    };
    fetchTrending();
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
          <h2>Trending Worldwide</h2>
          <Link to="/discover" className="rail-view-all">
            View All
          </Link>
        </div>

        <div className="rail-track">
          {trending.map((trending) => (
            <MediaCard
              key={trending.mediaId}
              tagText={trending.isFree === true ? "free" : "paid"}
              imageSrc={getPosterUrl(trending.posterUrl)}
              imageAlt={trending.title}
              title={trending.title}
              rating={trending.averageRating}
              meta={trending.genre}
              onClick={() =>navigate(`/play/${trending.mediaId}`)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
