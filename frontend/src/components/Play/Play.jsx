import { useState, useEffect } from "react";
import { FaClock, FaEye, FaFilm, FaStar, FaHeart } from "react-icons/fa";
import { useParams } from "react-router-dom";
import "./Play.css";
import Header from "../shared/Header/Header";
import API from "../../api.js";

function getStreamUrl(streamUrl) {
  const filename = streamUrl.split(/[\\/]/).pop();
  return new URL(`../../videos/${filename}`, import.meta.url).href;
}
function getPosterUrl(posterUrl) {
  if (typeof posterUrl !== "string" || posterUrl.length === 0) {
    return null;
  }
  const filename = posterUrl.split(/[\\/]/).pop();
  return new URL(`../../assets/thumbnail/${filename}`, import.meta.url).href;
}

export default function Play() {
  const { videoId } = useParams();
  // const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));
  const [activeVideo, setActiveVideo] = useState(null);
  useEffect(() => {
    const fetchVideo = async () => {
      try {
        const response = await API.get(`/media/play/${videoId}`);
        setActiveVideo(response.data);
        if (response.data && !response.data.isFree) {
          const currentUser = JSON.parse(localStorage.getItem("user"));
          if (!currentUser) {
            alert("This title is premium content. Please subscribe to access it.");
          }
        }
      } catch (error) {
        console.error("Error fetching video:", error);
      }
    };
    fetchVideo();
  }, [videoId]);

  // useEffect(() => {
  //   if (!activeVideo?.id) return;
  //   const history =
  //     JSON.parse(localStorage.getItem("watchHistoryVideos")) || [];
  //   const updated = [
  //     activeVideo.id,
  //     ...history.filter((id) => id !== activeVideo.id),
  //   ].slice(0, 12);
  //   localStorage.setItem("watchHistoryVideos", JSON.stringify(updated));
  // }, [activeVideo]);

  // const handleVideoSelect = (media) => {
  //   setActiveVideo(media);
  //   navigate(`/play/${media.id}`, { replace: true });
  // };

  const [favorites, setFavorites] = useState(() => user?.savedTitles || []);
  const hasVideoSource =
    typeof activeVideo?.streamUrl === "string" &&
    activeVideo.streamUrl.length > 0;

  const toggleFavorite = () => {
    const updated = favorites.includes(activeVideo.mediaId)
      ? favorites.filter((id) => id !== activeVideo.mediaId)
      : [...favorites, activeVideo.mediaId];
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
                  key={activeVideo.mediaId}
                  src={getStreamUrl(activeVideo.streamUrl)}
                  poster={getPosterUrl(activeVideo.posterUrl)}
                  className="video-frame"
                  preload="metadata"
                  playsInline
                  controls
                  autoPlay
                />
              ) : (
                <div className="video-frame video-frame--fallback">
                  <img
                    src={getPosterUrl(activeVideo?.posterUrl)}
                    alt={activeVideo?.title}
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
                  className={`content-badge ${activeVideo?.isFree ? "free" : "paid"}`}
                >
                  {activeVideo?.isFree ? "Free" : "Premium"}
                </span>
                <span>
                  <FaFilm /> {activeVideo?.genre}
                </span>
                <span>
                  <FaClock /> {activeVideo?.runtimeMinutes} minutes
                </span>
                <span>
                  <FaEye /> {activeVideo?.totalViews} views
                </span>
              </div>

              <h1>{activeVideo?.title}</h1>

              <div className="video-rating-row">
                <span>
                  <FaStar /> {activeVideo?.averageRating}
                </span>
                <span>Released: {activeVideo?.releaseDate}</span>
                <button
                  className={`favorite-btn ${favorites.includes(activeVideo?.mediaId) ? "favorited" : ""}`}
                  onClick={toggleFavorite}
                  type="button"
                  aria-label="Add to favorites"
                >
                  <FaHeart />
                  {favorites.includes(activeVideo?.mediaId)
                    ? " Favorited"
                    : " Add to Favorites"}
                </button>
              </div>

              <p>{activeVideo?.synopsis}</p>
            </div>
          </div>

          {/* <aside className="related-videos" aria-label="Suggested videos">
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
          </aside> */}
        </div>
      </section>
    </>
  );
}
