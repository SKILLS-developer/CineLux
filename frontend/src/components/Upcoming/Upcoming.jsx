
import Footer from "../shared/Footer/Footer.jsx";
import Header from "../shared/Header/Header.jsx";
import MediaCard from "../shared/MediaCard/MediaCard.jsx";
import API from "../../api.js";
import { useEffect, useState } from "react";

function getPosterUrl(posterUrl) {
  const filename = posterUrl.split(/[\\/]/).pop();
  return new URL(`../../assets/thumbnail/${filename}`, import.meta.url).href;
}

export default function Upcoming() {
  const [upcomingMovies, setUpcomingMovies] = useState([]);
  useEffect(() => {
    const fetchUpcoming = async () => {
      try {
        const response = await API.get("/media/upcoming");
        setUpcomingMovies(response.data);
      } catch (error) {
        console.error("Error fetching upcoming movies:", error);
      }
    };
    fetchUpcoming();
  }, []);

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
              {upcomingMovies.length} titles
            </span>
          </div>
          <div className="media-card-grid">
            {upcomingMovies.map((movie) => (
              <MediaCard
                key={movie.mediaId}
                tagText="Soon"
                imageSrc={getPosterUrl(movie.posterUrl)}
                imageAlt={movie.title}
                title={movie.title}
                rating={movie.averageRating}
                meta={movie.genre}
              />
            ))}
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}
