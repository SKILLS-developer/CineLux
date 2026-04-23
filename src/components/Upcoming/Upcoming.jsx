import UpcomingMovies from "../../data/Data.js";
import Footer from "../shared/Footer/Footer.jsx";
import Header from "../shared/Header/Header.jsx";
import MediaCard from "../shared/MediaCard/MediaCard.jsx";

export default function Upcoming() {
  return (
    <>
      <Header />
      <div className="Spacer"></div>
      <section className="catalog-page upcoming-page">
        <div className="catalog-shell">
          <div className="catalog-heading">
            <div>
              <p className="catalog-kicker" style={{ color: "#f97316" }}>
                Coming soon
              </p>
              <h1>Upcoming Movies</h1>
            </div>
            <span className="catalog-count">
              {UpcomingMovies.length} titles
            </span>
          </div>
          <div className="media-card-grid">
            {UpcomingMovies.map((movie) => (
              <MediaCard
                key={movie.id}
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
