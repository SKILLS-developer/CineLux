import { useState, useEffect } from "react";
import { FaClock, FaEye, FaFilm, FaStar, FaHeart } from "react-icons/fa";
import MovieData from "../../data/Data.js";
import { useNavigate, useParams } from "react-router-dom";
import "./Play.css";
import Header from "../shared/Header/Header";

const getStoredArray = (key) => {
  try {
    const value = localStorage.getItem(key);
    const parsed = value ? JSON.parse(value) : [];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
};

const suggestions = MovieData.map((item) => ({
  id: item.id,
  title: item.title,
  meta: item.meta?.replace(/•/g, "-")?.trim() || "Action - Thriller",
  rating: item.rating,
  views: item.views || 0,
  releaseDate: item.releaseDate,
  thumbnail: item.thumbnail,
  isFree: item.isFree,
  description: item.description || "No description available.",
  duration: item.duration || "N/A",
  videoUrl: item.videoUrl,
}));

export default function Play() {
  const { videoId } = useParams();
  const navigate = useNavigate();

  const [activeVideo, setActiveVideo] = useState(
    MovieData.find((item) => item.id === videoId) || suggestions[0],
  );
  const [favorites, setFavorites] = useState(() => {
    return new Set(getStoredArray("favoritedVideos"));
  });

  useEffect(() => {
    localStorage.setItem(
      "favoritedVideos",
      JSON.stringify(Array.from(favorites)),
    );
  }, [favorites]);

  useEffect(() => {
    if (!activeVideo?.id) return;

    const existingHistory = getStoredArray("watchHistoryVideos");
    const dedupedHistory = [
      activeVideo.id,
      ...existingHistory.filter((id) => id !== activeVideo.id),
    ].slice(0, 12);

    localStorage.setItem("watchHistoryVideos", JSON.stringify(dedupedHistory));
  }, [activeVideo]);

  const handleVideoSelect = (item) => {
    setActiveVideo(item);
    navigate(`/play/${item.id}`, { replace: true });
  };

  const toggleFavorite = (e) => {
    e.stopPropagation();
    const newFavorites = new Set(favorites);
    if (newFavorites.has(activeVideo.id)) {
      newFavorites.delete(activeVideo.id);
    } else {
      newFavorites.add(activeVideo.id);
    }
    setFavorites(newFavorites);
  };

  return (
    <>
      <Header />
      <div className="Spacer"></div>
      {!activeVideo ? (
        <section className="play-page">
          <div className="play-shell">
            <p>No videos available right now.</p>
          </div>
        </section>
      ) : (
        <section className="play-page">
          <div className="play-shell">
            <div className="play-main">
              <div className="video-wrap">
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
                    className={`favorite-btn ${favorites.has(activeVideo.id) ? "favorited" : ""}`}
                    onClick={toggleFavorite}
                    type="button"
                    aria-label="Add to favorites"
                  >
                    <FaHeart />{" "}
                    {favorites.has(activeVideo.id)
                      ? "Favorited"
                      : "Add to Favorites"}
                  </button>
                </div>

                <p>{activeVideo.description}</p>
              </div>
            </div>

            <aside className="related-videos" aria-label="Suggested videos">
              <div className="related-header">
                <h2>Suggested Videos</h2>
                <span>{suggestions.length} titles</span>
              </div>

              <div className="suggested-list">
                {suggestions.map((item) => (
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
      )}
    </>
  );
}
