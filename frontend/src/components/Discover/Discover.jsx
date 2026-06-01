import { useEffect, useState } from "react";
import { FaSearch, FaStar, FaTimes } from "react-icons/fa";
// import AllMovies from "../../data/Data.js";
import Footer from "../shared/Footer/Footer.jsx";
import Header from "../shared/Header/Header.jsx";
import "./Discover.css";
import API from "../../api.js";
import { useNavigate } from "react-router-dom";

// function filterMovies(movies, query) {
//   const q = query.trim().toLowerCase();
//   let result = q
//     ? movies.filter(
//         (m) =>
//           m.title.toLowerCase().includes(q) ||
//           (m.genre ?? "").toLowerCase().includes(q) ||
//           m.mediaType.toLowerCase().includes(q),
//       )
//     : [...movies];

//   return result;
// }
function getPosterUrl(posterUrl) {
  const filename = posterUrl.split(/[\\/]/).pop();
  return new URL(`../../assets/thumbnail/${filename}`, import.meta.url).href;
}

export default function Discover() {
  const quickTags = ["action", "drama", "horror", "mystery", "series", "movie"];
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await API.get(`/media/all`);
        setResults(response.data);
      } catch (error) {
        console.error("Error fetching all media:", error);
      }
    };
    fetchData();
  }, []);

  function Update(q) {
    setQuery(q);
    const fetchData = async () => {
      try {
        const url = q.trim() ? `/media/search/${encodeURIComponent(q.trim())}` : `/media/all`;
        const response = await API.get(url);
        setResults(response.data);
      } catch (error) {
        console.error("Error fetching search results:", error);
      }
    };
    fetchData();
  }
  // setResults(filterMovies(results, q));

  return (
    <>
      <Header />
      <div className="Spacer"></div>
      <section className="discover-page">
        <div className="discover-shell">
          <header className="discover-header">
            <p className="discover-kicker">Search & Discover</p>
            <h1>Discover What To Watch Next</h1>
            <p>
              Search by title or genre, refine with filters, and instantly
              browse matching movies and shows.
            </p>
          </header>

          <section className="discover-search-panel">
            <div className="discover-searchbar-wrap">
              <FaSearch className="search-icon" aria-hidden="true" />
              <input
                type="search"
                value={query}
                onChange={(e) => Update(e.target.value)}
                className="discover-searchbar"
                placeholder="Search by title, genre, or keyword..."
                aria-label="Search content"
                focusable="true"
              />
              {query && (
                <button
                  type="button"
                  className="clear-search-btn"
                  onClick={() => Update("")}
                  aria-label="Clear search"
                >
                  <FaTimes />
                </button>
              )}
            </div>

            <div className="discover-quick-tags" aria-label="Quick search tags">
              {quickTags.map((tag) => (
                <button
                  key={tag}
                  type="button"
                  className="quick-tag-btn"
                  onClick={() => Update(tag)}
                >
                  {tag}
                </button>
              ))}
            </div>
          </section>

          <section className="discover-results-section">
            <div className="discover-results-header">
              <h2>Results</h2>
            </div>

            {results.length === 0 ? (
              <div className="discover-empty-state">
                <h3>No titles found</h3>
                <p>
                  Try a different keyword or reset your filters to explore more
                  options.
                </p>
              </div>
            ) : (
              <div className="discover-results-grid">
                {results.map((item, index) => (
                  <article
                    className="discover-result-card"
                    key={`${item.title}-${index}`}
                    onClick={() => navigate(`/play/${item.mediaId}`)}
                  >
                    <span
                      className={`result-badge ${item.isFree ? "free" : "premium"}`}
                    >
                      {item.isFree ? "Free" : "Premium"}
                    </span>
                    <img
                      src={getPosterUrl(item.posterUrl)}
                      alt={item.title}
                      loading="lazy"
                    />
                    <div className="result-overlay">
                      <h3>{item.title}</h3>
                      <div className="result-meta">
                        <span>
                          <FaStar /> {item.averageRating}
                        </span>
                        <span>{item.genre}</span>
                        <span>{item.mediaType}</span>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            )}
          </section>
        </div>
      </section>
      <Footer />
    </>
  );
}
