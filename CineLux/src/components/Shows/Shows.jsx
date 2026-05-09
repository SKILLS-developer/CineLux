import { useState } from "react";
import ShowsTV from "../../data/Data.js";
import Footer from "../shared/Footer/Footer.jsx";
import Header from "../shared/Header/Header.jsx";
import MediaCard from "../shared/MediaCard/MediaCard.jsx";
import { useNavigate } from "react-router-dom";
import { SubscriptionNotification } from "../shared/Notification/Notification.jsx";


export default function Shows() {
  const navigate = useNavigate();
  const [showSubscriptionNotification, setShowSubscriptionNotification] = useState(false);
  const shows = ShowsTV.filter((item) => item.type === "series");

  function handleClick(show) {
    if (
      !show.isFree &&
      (!localStorage.getItem("user") ||
        JSON.parse(localStorage.getItem("user")).isSubscribed === false)
    ) {
      setShowSubscriptionNotification(true);
      return;
    }
    navigate(`/play/${show.id}`);
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
      <section className="catalog-page shows-page">
        <div className="catalog-shell">
          <div className="catalog-heading">
            <div>
              <p className="catalog-kicker" style={{ color: "#06b6d4" }}>
                TV Series
              </p>
              <h1>Shows</h1>
            </div>
            <span className="catalog-count">{shows.length} titles</span>
          </div>

          <div className="media-card-grid">
            {shows.map((show) => (
              <MediaCard
                key={show.id}
                tagText={show.type}
                imageSrc={show.thumbnail}
                imageAlt={show.title}
                title={show.title}
                rating={show.rating}
                meta={show.meta}
                onClick={() => handleClick(show)}
              />
            ))}
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}
