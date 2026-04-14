import UpcomingMovies  from "../../data/Data.js";
import Footer from "../shared/Footer/Footer.jsx";
import Header from "../shared/Header/Header.jsx";
import MediaCard from "../shared/MediaCard/MediaCard.jsx";
import "./Upcoming.css";

export default function Upcoming() {
  return (
    <>
      <Header />
      <div className="Spacer"></div>
      <section className="upcoming-page">
        <div className="upcoming-shell">
          <div className="upcoming-heading">
            <div>
              <p className="upcoming-kicker">Coming soon</p>
              <h1>Upcoming Movies</h1>
            </div>
            <span className="upcoming-count">{UpcomingMovies.length} titles</span>
          </div>

          <div className="upcoming-grid media-card-grid">
            {UpcomingMovies.map((movie) => (
              <MediaCard
                key={movie.id}
                className="upcoming-card"
                tagClassName="upcoming-type soon"
                overlayClassName="upcoming-card-overlay"
                metaClassName="upcoming-card-meta"
                ratingClassName="upcoming-rating"
                metaTextClassName="upcoming-meta-data"
                tagText="Soon"
                imageSrc={movie.thumbnail}
                imageAlt={movie.title}
                title={movie.title}
                rating={movie.rating}
                meta={movie.meta}
              />
            ))}
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}
