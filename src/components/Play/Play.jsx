import { useEffect, useMemo, useRef, useState } from "react";
import {
  FaClock,
  FaCompress,
  FaExpand,
  FaEye,
  FaFilm,
  FaPause,
  FaPlay,
  FaStar,
  FaVolumeMute,
  FaVolumeUp,
} from "react-icons/fa";
import { ReleaseList } from "../../data/Release";
import batmanTrailer from "../../videos/THE BATMAN – Trailer.mp4";
import "./Play.css";
import Header from "../shared/Header/Header";

const FALLBACK_DESCRIPTION =
  "Bruce Wayne uncovers a city-wide conspiracy while tracking a ruthless killer who leaves cryptic clues across Gotham.";

function formatTime(timeInSeconds) {
  if (!Number.isFinite(timeInSeconds) || timeInSeconds < 0) {
    return "0:00";
  }

  const totalSeconds = Math.floor(timeInSeconds);
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  if (hours > 0) {
    return `${hours}:${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
  }

  return `${minutes}:${String(seconds).padStart(2, "0")}`;
}

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
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(0.85);
  const [isMuted, setIsMuted] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const videoRef = useRef(null);
  const playerRef = useRef(null);
  const previousVolumeRef = useRef(0.85);

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(document.fullscreenElement === playerRef.current);
    };

    document.addEventListener("fullscreenchange", handleFullscreenChange);

    return () => {
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
    };
  }, []);

  useEffect(() => {
    const video = videoRef.current;

    if (!video) {
      return;
    }

    video.currentTime = 0;
    video.volume = volume;
    video.muted = isMuted;
  }, [activeVideo, isMuted, volume]);

  const progressPercent = duration > 0 ? (currentTime / duration) * 100 : 0;
  const volumePercent = volume * 100;

  const togglePlayback = async () => {
    const video = videoRef.current;

    if (!video) {
      return;
    }

    if (video.paused) {
      try {
        await video.play();
      } catch {
        setIsPlaying(false);
      }
      return;
    }

    video.pause();
  };

  const handleLoadedMetadata = () => {
    const video = videoRef.current;

    if (!video) {
      return;
    }

    setDuration(video.duration || 0);
    setCurrentTime(video.currentTime || 0);
    setVolume(video.volume);
    setIsMuted(video.muted);
  };

  const handleTimeUpdate = () => {
    const video = videoRef.current;

    if (!video) {
      return;
    }

    setCurrentTime(video.currentTime);
  };

  const handleSeek = (event) => {
    const video = videoRef.current;
    const nextTime = Number(event.target.value);

    if (!video) {
      return;
    }

    video.currentTime = nextTime;
    setCurrentTime(nextTime);
  };

  const syncVolumeState = () => {
    const video = videoRef.current;

    if (!video) {
      return;
    }

    setVolume(video.volume);
    setIsMuted(video.muted || video.volume === 0);

    if (video.volume > 0) {
      previousVolumeRef.current = video.volume;
    }
  };

  const handleVolumeChange = (event) => {
    const video = videoRef.current;
    const nextVolume = Number(event.target.value);

    if (!video) {
      return;
    }

    video.volume = nextVolume;
    video.muted = nextVolume === 0;
    setVolume(nextVolume);
    setIsMuted(nextVolume === 0);

    if (nextVolume > 0) {
      previousVolumeRef.current = nextVolume;
    }
  };

  const toggleMute = () => {
    const video = videoRef.current;

    if (!video) {
      return;
    }

    if (video.muted || video.volume === 0) {
      const restoredVolume = previousVolumeRef.current || 0.85;
      video.muted = false;
      video.volume = restoredVolume;
      setVolume(restoredVolume);
      setIsMuted(false);
      return;
    }

    previousVolumeRef.current = video.volume;
    video.muted = true;
    setIsMuted(true);
  };

  const toggleFullscreen = async () => {
    const player = playerRef.current;

    if (!player) {
      return;
    }

    if (document.fullscreenElement === player) {
      await document.exitFullscreen();
      return;
    }

    await player.requestFullscreen();
  };

  const handleVideoSelect = (item) => {
    setIsPlaying(false);
    setCurrentTime(0);
    setDuration(0);
    setActiveVideo(item);
  };

  return (
    <>
      <Header />
      <div className="Spacer"></div>
      <section className="play-page">
        <div className="play-shell">
          <div className="play-main">
            <div className="video-wrap" ref={playerRef}>
              <video
                ref={videoRef}
                key={activeVideo.id}
                src={activeVideo.video}
                poster={activeVideo.thumbnail}
                className="video-frame"
                preload="metadata"
                playsInline
                onClick={togglePlayback}
                onLoadedMetadata={handleLoadedMetadata}
                onTimeUpdate={handleTimeUpdate}
                onPlay={() => setIsPlaying(true)}
                onPause={() => setIsPlaying(false)}
                onVolumeChange={syncVolumeState}
                onEnded={() => setIsPlaying(false)}
                onDoubleClick={toggleFullscreen}
              />

              <div className="video-overlay" aria-hidden="true" />

              <div className="video-controls">
                <div className="progress-row">
                  <span className="time-label">{formatTime(currentTime)}</span>
                  <input
                    type="range"
                    min="0"
                    max={duration || 0}
                    step="0.1"
                    value={duration ? currentTime : 0}
                    onChange={handleSeek}
                    className="progress-slider"
                    aria-label="Seek through video"
                    style={{ "--range-fill": `${progressPercent}%` }}
                  />
                  <span className="time-label">{formatTime(duration)}</span>
                </div>

                <div className="controls-row">
                  <div className="controls-group controls-primary">
                    <button
                      type="button"
                      className="control-button primary"
                      onClick={togglePlayback}
                      aria-label={isPlaying ? "Pause video" : "Play video"}
                    >
                      {isPlaying ? <FaPause /> : <FaPlay />}
                    </button>
                  </div>

                  <div className="controls-group controls-secondary">
                    <button
                      type="button"
                      className="control-button"
                      onClick={toggleMute}
                      aria-label={
                        isMuted || volume === 0 ? "Unmute video" : "Mute video"
                      }
                    >
                      {isMuted || volume === 0 ? (
                        <FaVolumeMute />
                      ) : (
                        <FaVolumeUp />
                      )}
                    </button>

                    <input
                      type="range"
                      min="0"
                      max="1"
                      step="0.05"
                      value={isMuted ? 0 : volume}
                      onChange={handleVolumeChange}
                      className="volume-slider"
                      aria-label="Adjust volume"
                      style={{
                        "--range-fill": `${isMuted ? 0 : volumePercent}%`,
                      }}
                    />

                    <button
                      type="button"
                      className="control-button"
                      onClick={toggleFullscreen}
                      aria-label={
                        isFullscreen ? "Exit fullscreen" : "Enter fullscreen"
                      }
                    >
                      {isFullscreen ? <FaCompress /> : <FaExpand />}
                    </button>
                  </div>
                </div>
              </div>
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
