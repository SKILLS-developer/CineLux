import { useMemo, useState } from "react";
import {
  FaClock,
  FaEye,
  FaFilm,
  FaStar,
} from "react-icons/fa";
import { ReleaseList } from "../../data/Release";
import batmanTrailer from "../../videos/THE BATMAN – Trailer.mp4";
import "./Play.css";
import Header from "../shared/Header/Header";

const FALLBACK_DESCRIPTION =
  "Bruce Wayne uncovers a city-wide conspiracy while tracking a ruthless killer who leaves cryptic clues across Gotham.";

export default function Play() {
  const suggestions = useMemo(() => {
    return ReleaseList.slice(0, 6).map((item, index) => ({
      id: `${item.title}-${index}`,
      title: item.title,
      category: item.meta?.replace("â€¢", "-")?.trim() || "Action - Thriller",
      rating: item.rating,
      views: item.views,
      releaseDate: item.releaseDate,
      thumbnail: item.thumbnail,
      isFree: item.free,
      description: FALLBACK_DESCRIPTION,
      duration: index % 2 === 0 ? "2h 56m" : "1h 58m",
      video: batmanTrailer,
    }));
  }, []);

  const [activeVideo, setActiveVideo] = useState(suggestions[0]);

  const handleVideoSelect = (item) => {
    setActiveVideo(item);
  };

  return (
    <>
      <Header />
      <div className="Spacer"></div>
      <section className="play-page">
        <div className="play-shell">
          <div className="play-main">
            <div className="video-wrap">
              <video
                key={activeVideo.id}
                src={activeVideo.video}
                poster={activeVideo.thumbnail}
                className="video-frame"
                preload="metadata"
                playsInline
                controls
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
                  <FaFilm /> {activeVideo.category}
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
                    <p>{item.category}</p>
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
