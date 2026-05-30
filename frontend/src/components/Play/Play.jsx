import { useState, useEffect } from "react";
import { FaClock, FaEye, FaFilm, FaStar, FaHeart } from "react-icons/fa";
import MovieData from "../../data/Data.js";
import { useNavigate, useParams } from "react-router-dom";
import "./Play.css";
import Header from "../shared/Header/Header";

export default function Play() {
  const { videoId } = useParams();
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  const [activeVideo, setActiveVideo] = useState(
    MovieData.find((item) => item.id === videoId) || MovieData[0],
  );

  useEffect(() => {
    if (!activeVideo?.id) return;
    const history =
      JSON.parse(localStorage.getItem("watchHistoryVideos")) || [];
    const updated = [
      activeVideo.id,
      ...history.filter((id) => id !== activeVideo.id),
    ].slice(0, 12);
    localStorage.setItem("watchHistoryVideos", JSON.stringify(updated));
  }, [activeVideo]);

  const handleVideoSelect = (item) => {
    setActiveVideo(item);
    navigate(`/play/${item.id}`, { replace: true });
  };

  const [favorites, setFavorites] = useState(() => user?.savedTitles || []);
  const hasVideoSource =
    typeof activeVideo?.videoUrl === "string" &&
    activeVideo.videoUrl.length > 0;

  const toggleFavorite = () => {
    const updated = favorites.includes(activeVideo.id)
      ? favorites.filter((id) => id !== activeVideo.id)
      : [...favorites, activeVideo.id];
    setFavorites(updated);
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      user.savedTitles = updated;
      localStorage.setItem("user", JSON.stringify(user));
    }
  };

  return (
    <>
      <Header />
      <div className="Spacer"></div>
      <section className="play-page">
        <div className="play-shell">
          <div className="play-main">
            <div className="video-wrap">
              {hasVideoSource ? (
                <video
                  key={activeVideo.id}
                  src={activeVideo.videoUrl}
                  poster={activeVideo.thumbnail}
                  className="video-frame"
                  preload="metadata"
                  playsInline
                  controls
                  autoPlay
                />
              ) : (
                <div className="video-frame video-frame--fallback">
                  <img
                    src={activeVideo.thumbnail}
                    alt={activeVideo.title}
                    className="video-frame__poster"
                  />
                  <div className="video-frame__overlay">
                    <h2>Video unavailable</h2>
                    <p>
                      This title can still be browsed, but no local video file
                      was found.
                    </p>
                  </div>
                </div>
              )}
            </div>

            <div className="video-description">
              <div className="video-top-meta">
                <span
                  className={`content-badge ${activeVideo.isFree ? "free" : "paid"}`}
                >
                  {activeVideo.isFree ? "Free" : "Premium"}
                </span>
                <span>
                  <FaFilm /> {activeVideo.meta}
                </span>
                <span>
                  <FaClock /> {activeVideo.duration}
                </span>
                <span>
                  <FaEye /> {activeVideo.views.toLocaleString()} views
                </span>
              </div>

              <h1>{activeVideo.title}</h1>

              <div className="video-rating-row">
                <span>
                  <FaStar /> {activeVideo.rating}
                </span>
                <span>Released: {activeVideo.releaseDate}</span>
                <button
                  className={`favorite-btn ${favorites.includes(activeVideo.id) ? "favorited" : ""}`}
                  onClick={toggleFavorite}
                  type="button"
                  aria-label="Add to favorites"
                >
                  <FaHeart />
                  {favorites.includes(activeVideo.id)
                    ? " Favorited"
                    : " Add to Favorites"}
                </button>
              </div>

              <p>{activeVideo.description}</p>
            </div>
          </div>

          <aside className="related-videos" aria-label="Suggested videos">
            <div className="related-header">
              <h2>Suggested Videos</h2>
              <span>{MovieData.length} titles</span>
            </div>

            <div className="suggested-list">
              {MovieData.map((item) => (
                <button
                  key={item.id}
                  className={`suggested-card ${activeVideo.id === item.id ? "active" : ""}`}
                  onClick={() => handleVideoSelect(item)}
                  type="button"
                >
                  <img src={item.thumbnail} alt={item.title} loading="lazy" />
                  <div className="suggested-details">
                    <h3>{item.title}</h3>
                    <p>{item.meta}</p>
                    <div className="suggested-meta">
                      <span>
                        <FaStar /> {item.rating}
                      </span>
                      <span>{item.duration}</span>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </aside>
        </div>
      </section>
    </>
  );
}
