import { useState } from "react";
import  ShowsTV  from "../../data/Data.js";
import Footer from "../shared/Footer/Footer.jsx";
import Header from "../shared/Header/Header.jsx";
import MediaCard from "../shared/MediaCard/MediaCard.jsx";
import { useNavigate } from "react-router-dom";
import { SubscriptionNotification } from "../shared/Notification/Notification.jsx";
import "./Shows.css";

export default function Shows() {
  const shows = ShowsTV.filter((item) => item.type === "series");
  const navigate = useNavigate();
  const [showSubscriptionNotification, setShowSubscriptionNotification] =
    useState(false);

  function handleClick(show) {
    if (!show.isFree) {
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
      <section className="shows-page">
        <div className="shows-shell">
          <div className="shows-heading">
            <div>
              <p className="shows-kicker">TV Series</p>
              <h1>Shows</h1>
            </div>
            <span className="shows-count">{shows.length} titles</span>
          </div>

          <div className="shows-grid media-card-grid">
            {shows.map((show) => (
              <MediaCard
                key={show.id}
                className="shows-card"
                tagClassName="shows-type series"
                overlayClassName="shows-card-overlay"
                metaClassName="shows-card-meta"
                ratingClassName="shows-rating"
                metaTextClassName="shows-meta-data"
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
