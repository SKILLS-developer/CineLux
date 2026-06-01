import { useEffect, useState } from "react";
import Footer from "../shared/Footer/Footer.jsx";
import Header from "../shared/Header/Header.jsx";
import MediaCard from "../shared/MediaCard/MediaCard.jsx";
import { useNavigate } from "react-router-dom";
import API from "../../api.js";

function getPosterUrl(posterUrl) {
  const filename = posterUrl.split(/[\\/]/).pop();
  return new URL(`../../assets/thumbnail/${filename}`, import.meta.url).href;
}
export default function Shows() {
  const navigate = useNavigate();
  const [shows, setShows] = useState([]);
  // const [showSubscriptionNotification, setShowSubscriptionNotification] =
  //   useState(false);
  // const shows = ShowsTV.filter((item) => item.type === "series");
  useEffect(() => {
    const fetchShows = async () => {
      try {
        const response = await API.get("/media/shows");
        setShows(response.data);
      } catch (error) {
        console.error("Error fetching shows:", error);
      }
    };
    fetchShows();
  }, []);
  // function handleClick(vid) {
  //   // if (
  //   //   !show.isFree &&
  //   //   (!localStorage.getItem("user") ||
  //   //     JSON.parse(localStorage.getItem("user")).isSubscribed === false)
  //   // ) {
  //   //   setShowSubscriptionNotification(true);
  //   //   return;
  //   // }
  //   navigate(`/play/${vid}`);
  // }

  return (
    <>
      <Header />
      <div className="Spacer"></div>
      {/* {showSubscriptionNotification && (
        <SubscriptionNotification
          onClose={() => setShowSubscriptionNotification(false)}
        />
      )} */}
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
                key={show.mediaId}
                tagText={show.mediaType}
                imageSrc={getPosterUrl(show.posterUrl)}
                imageAlt={show.title}
                title={show.title}
                rating={show.averageRating}
                meta={show.genre}
                onClick={() => navigate(`/play/${show.mediaId}`)}
              />
            ))}
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}
