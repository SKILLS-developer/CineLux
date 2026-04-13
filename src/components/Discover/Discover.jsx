import { useMemo, useState } from "react";
import { FaSearch, FaStar, FaTimes } from "react-icons/fa";
import { ReleaseList } from "../../data/Release.js";
import Footer from "../shared/Footer/Footer.jsx";
import Header from "../shared/Header/Header.jsx";
import "./Discover.css";

const quickTags = ["action", "drama", "horror", "mystery", "series"];

export default function Discover() {
  const [query, setQuery] = useState("");
  const [contentType, setContentType] = useState("all");
  const [accessType, setAccessType] = useState("all");
  const [sortBy, setSortBy] = useState("relevance");

  const normalizedQuery = query.trim().toLowerCase();

  const results = useMemo(() => {
    let filtered = [...ReleaseList];

    if (normalizedQuery) {
      filtered = filtered.filter((item) => {
        const title = item.title.toLowerCase();
        const meta = item.meta.toLowerCase();
        return (
          title.includes(normalizedQuery) || meta.includes(normalizedQuery)
        );
      });
    }

    if (contentType !== "all") {
      filtered = filtered.filter((item) => item.type === contentType);
    }

    if (accessType !== "all") {
      filtered = filtered.filter((item) =>
        accessType === "free" ? item.isFree : !item.isFree,
      );
    }

    if (sortBy === "rating") {
      filtered.sort((a, b) => b.rating - a.rating);
    } else if (sortBy === "title") {
      filtered.sort((a, b) => a.title.localeCompare(b.title));
    } else if (sortBy === "newest") {
      filtered.sort(
        (a, b) =>
          new Date(b.releaseDate).getTime() - new Date(a.releaseDate).getTime(),
      );
    } else {
      filtered.sort((a, b) => b.views - a.views);
    }

    return filtered;
  }, [accessType, contentType, normalizedQuery, sortBy]);

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
                onChange={(event) => setQuery(event.target.value)}
                className="discover-searchbar"
                placeholder="Search by title, genre, or keyword..."
                aria-label="Search content"
              />
              {query && (
                <button
                  type="button"
                  className="clear-search-btn"
                  onClick={() => setQuery("")}
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
                  onClick={() => setQuery(tag)}
                >
                  {tag}
                </button>
              ))}
            </div>

            <div className="discover-filters">
              <label className="filter-control">
                <span>Type</span>
                <select
                  value={contentType}
                  onChange={(event) => setContentType(event.target.value)}
                >
                  <option value="all">All</option>
                  <option value="movie">Movies</option>
                  <option value="series">Series</option>
                </select>
              </label>

              <label className="filter-control">
                <span>Access</span>
                <select
                  value={accessType}
                  onChange={(event) => setAccessType(event.target.value)}
                >
                  <option value="all">All</option>
                  <option value="free">Free</option>
                  <option value="premium">Premium</option>
                </select>
              </label>

              <label className="filter-control">
                <span>Sort</span>
                <select
                  value={sortBy}
                  onChange={(event) => setSortBy(event.target.value)}
                >
                  <option value="relevance">Most Viewed</option>
                  <option value="rating">Top Rated</option>
                  <option value="newest">Newest</option>
                  <option value="title">A-Z</option>
                </select>
              </label>
            </div>
          </section>

          <section className="discover-results-section">
            <div className="discover-results-header">
              <h2>Results</h2>
              <p>
                {results.length} result{results.length === 1 ? "" : "s"}
                {normalizedQuery ? ` for "${query}"` : ""}
              </p>
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
                  >
                    <span
                      className={`result-badge ${item.isFree ? "free" : "premium"}`}
                    >
                      {item.isFree ? "Free" : "Premium"}
                    </span>
                    <img src={item.thumbnail} alt={item.title} loading="lazy" />
                    <div className="result-overlay">
                      <h3>{item.title}</h3>
                      <div className="result-meta">
                        <span>
                          <FaStar /> {item.rating}
                        </span>
                        <span>{item.meta}</span>
                        <span>{item.type}</span>
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
