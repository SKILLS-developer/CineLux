import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import {
  FiFilm,
  FiUsers,
  FiSettings,
  FiHome,
  FiLogOut,
  FiMenu,
  FiEye,
  FiLock,
  FiUnlock,
  FiTrendingUp,
  FiBarChart2,
} from "react-icons/fi";
import Data from "../../../data/Data.js";
import AllContent from "../AllContent/AllContent.jsx";
import "./Dashboard.css";

export default function AdminDashboard() {
  const [activeSection, setActiveSection] = useState("dashboard");
  const [mediaList, setMediaList] = useState(Data);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const stats = useMemo(() => {
    const total = mediaList.length;
    const totalViews = mediaList.reduce((s, m) => s + (m.views || 0), 0);
    const freeCount = mediaList.filter((m) => m.isFree).length;
    const premiumCount = total - freeCount;
    const movieCount = mediaList.filter((m) => m.type === "movie").length;
    const seriesCount = mediaList.filter((m) => m.type === "series").length;
    return {
      total,
      totalViews,
      freeCount,
      premiumCount,
      movieCount,
      seriesCount,
    };
  }, [mediaList]);

  const topByViews = useMemo(
    () =>
      [...mediaList]
        .sort((a, b) => (b.views || 0) - (a.views || 0))
        .slice(0, 6),
    [mediaList],
  );
  const maxViews = topByViews[0]?.views || 1;

  const formatViews = (v) => {
    if (v >= 1_000_000) return (v / 1_000_000).toFixed(1) + "M";
    if (v >= 1_000) return (v / 1_000).toFixed(1) + "K";
    return v?.toString() ?? "0";
  };

  const navItems = [
    { key: "dashboard", label: "Dashboard", icon: <FiHome /> },
    { key: "content", label: "Content", icon: <FiFilm /> },
    { key: "users", label: "Users", icon: <FiUsers /> },
    { key: "settings", label: "Settings", icon: <FiSettings /> },
  ];

  return (
    <div className="adm-layout">
      {sidebarOpen && (
        <div className="adm-overlay" onClick={() => setSidebarOpen(false)} />
      )}

      {/* ── Sidebar ── */}
      <aside
        className={`adm-sidebar ${sidebarOpen ? "adm-sidebar--open" : ""}`}
      >
        <div className="adm-sidebar__logo">
          <span className="adm-logo-text">
            Cine<span>Lux</span>
          </span>
          <span className="adm-sidebar__badge">Admin</span>
        </div>

        <nav className="adm-nav">
          {navItems.map((item) => (
            <button
              key={item.key}
              className={`adm-nav__item ${activeSection === item.key ? "adm-nav__item--active" : ""}`}
              onClick={() => {
                setActiveSection(item.key);
                setSidebarOpen(false);
              }}
            >
              <span className="adm-nav__icon">{item.icon}</span>
              <span>{item.label}</span>
            </button>
          ))}
        </nav>

        <div className="adm-sidebar__footer">
          <Link to="/" className="adm-nav__item adm-nav__item--logout">
            <span className="adm-nav__icon">
              <FiLogOut />
            </span>
            <span>Back to Site</span>
          </Link>
        </div>
      </aside>

      {/* ── Main ── */}
      <main className="adm-main">
        {/* Top bar */}
        <div className="adm-topbar">
          <button
            className="adm-topbar__menu"
            onClick={() => setSidebarOpen((o) => !o)}
            aria-label="Toggle sidebar"
          >
            <FiMenu />
          </button>
          <div className="adm-topbar__title">
            {navItems.find((n) => n.key === activeSection)?.label}
          </div>
          <div className="adm-topbar__admin">
            <div className="adm-avatar">A</div>
            <span>Admin</span>
          </div>
        </div>

        <div className="adm-content">
          {/* ══ DASHBOARD ══ */}
          {activeSection === "dashboard" && (
            <>
              {/* Stats cards */}
              <div className="adm-stats-grid">
                <div className="adm-stat-card adm-stat-card--green">
                  <div className="adm-stat-card__icon">
                    <FiFilm />
                  </div>
                  <div>
                    <div className="adm-stat-card__value">{stats.total}</div>
                    <div className="adm-stat-card__label">Total Titles</div>
                  </div>
                </div>
                <div className="adm-stat-card adm-stat-card--blue">
                  <div className="adm-stat-card__icon">
                    <FiEye />
                  </div>
                  <div>
                    <div className="adm-stat-card__value">
                      {formatViews(stats.totalViews)}
                    </div>
                    <div className="adm-stat-card__label">Total Views</div>
                  </div>
                </div>
                <div className="adm-stat-card adm-stat-card--orange">
                  <div className="adm-stat-card__icon">
                    <FiUnlock />
                  </div>
                  <div>
                    <div className="adm-stat-card__value">
                      {stats.freeCount}
                    </div>
                    <div className="adm-stat-card__label">Free Titles</div>
                  </div>
                </div>
                <div className="adm-stat-card adm-stat-card--purple">
                  <div className="adm-stat-card__icon">
                    <FiLock />
                  </div>
                  <div>
                    <div className="adm-stat-card__value">
                      {stats.premiumCount}
                    </div>
                    <div className="adm-stat-card__label">Premium Titles</div>
                  </div>
                </div>
              </div>

              {/* Charts */}
              <div className="adm-charts-row">
                <div className="adm-chart-card">
                  <div className="adm-chart-card__header">
                    <FiBarChart2 />
                    <span>Top Titles by Views</span>
                  </div>
                  <div className="adm-bar-chart">
                    {topByViews.map((item) => (
                      <div className="adm-bar-row" key={item.id}>
                        <div className="adm-bar-row__label">{item.title}</div>
                        <div className="adm-bar-row__track">
                          <div
                            className="adm-bar-row__fill"
                            style={{
                              width: `${(item.views / maxViews) * 100}%`,
                            }}
                          />
                        </div>
                        <div className="adm-bar-row__value">
                          {formatViews(item.views)}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="adm-chart-card">
                  <div className="adm-chart-card__header">
                    <FiTrendingUp />
                    <span>Content Breakdown</span>
                  </div>
                  <div className="adm-breakdown">
                    {[
                      {
                        label: "Movies",
                        count: stats.movieCount,
                        mod: "green",
                      },
                      {
                        label: "Series",
                        count: stats.seriesCount,
                        mod: "orange",
                      },
                      { label: "Free", count: stats.freeCount, mod: "blue" },
                      {
                        label: "Premium",
                        count: stats.premiumCount,
                        mod: "purple",
                      },
                    ].map(({ label, count, mod }) => (
                      <div className="adm-breakdown__item" key={label}>
                        <div className="adm-breakdown__top">
                          <span>{label}</span>
                          <span>{count}</span>
                        </div>
                        <div className="adm-breakdown__track">
                          <div
                            className={`adm-breakdown__fill adm-breakdown__fill--${mod}`}
                            style={{
                              width: stats.total
                                ? `${(count / stats.total) * 100}%`
                                : "0%",
                            }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </>
          )}

          {/* ══ CONTENT ══ */}
          {activeSection === "content" && (
            <AllContent mediaList={mediaList} setMediaList={setMediaList} />
          )}

          {/* ══ USERS ══ */}
          {activeSection === "users" && (
            <div className="adm-placeholder-section">
              <div className="adm-placeholder-section__icon">
                <FiUsers />
              </div>
              <h2>Users Management</h2>
              <p>
                User accounts, subscriptions, and activity will be managed here.
              </p>
            </div>
          )}

          {/* ══ SETTINGS ══ */}
          {activeSection === "settings" && (
            <div className="adm-placeholder-section">
              <div className="adm-placeholder-section__icon">
                <FiSettings />
              </div>
              <h2>Settings</h2>
              <p>
                Platform configuration, branding, and preferences will be
                managed here.
              </p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
