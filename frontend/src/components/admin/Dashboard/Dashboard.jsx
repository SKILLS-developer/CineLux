import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import {
  FiFilm,
  FiUsers,
  FiSettings,
  FiHome,
  FiLogOut,
  FiEye,
  FiLock,
  FiUnlock,
} from "react-icons/fi";

import AllContent from "../AllContent/AllContent.jsx";
import logo from "../../../assets/CineLux-Logo.png";
import "./Dashboard.css";
import API from "../../../api.js";

const NAV_ITEMS = [
  { key: "dashboard", label: "Dashboard", icon: <FiHome /> },
  { key: "content", label: "Content", icon: <FiFilm /> },
  { key: "users", label: "Users", icon: <FiUsers /> },
  { key: "settings", label: "Settings", icon: <FiSettings /> },
];

function formatViews(v) {
  if (v >= 1_000_000) return (v / 1_000_000).toFixed(1) + "M";
  if (v >= 1_000) return (v / 1_000).toFixed(1) + "K";
  return String(v || 0);
}

export default function AdminDashboard() {
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState("dashboard");
  const [mediaList, setMediaList] = useState([]);
  useEffect(() => {
    if (!localStorage.getItem("admin")) {
      alert("Access denied. Please log in as admin.");
      navigate("/admin/login");
    }
    const fetchMedia = async () => {
      try {
        const res = await API.get("/media/all");
        setMediaList(res.data);
      } catch (error) {
        alert("Error fetching media list. Please try again later.", error);
      }
    };
    fetchMedia();
  }, []);
  const total = mediaList.length;
  const freeCount = mediaList.filter((m) => m.isFree).length;
  const premiumCount = total - freeCount;
  const totalViews = mediaList.reduce((s, m) => s + (m.totalViews || 0), 0);

  return (
    <div className="adm-layout">
      {/* ── Sidebar ── */}
      <aside className="adm-sidebar">
        <div className="adm-sidebar__logo">
          <img src={logo} alt="CineLux" className="adm-logo-img" />
          <span className="adm-sidebar__badge">Admin</span>
        </div>

        <nav className="adm-nav">
          {NAV_ITEMS.map((item) => (
            <button
              key={item.key}
              className={`adm-nav__item ${activeSection === item.key ? "adm-nav__item--active" : ""}`}
              onClick={() => setActiveSection(item.key)}
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
          <div className="adm-topbar__title">
            {NAV_ITEMS.find((n) => n.key === activeSection)?.label}
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
                    <div className="adm-stat-card__value">{total}</div>
                    <div className="adm-stat-card__label">Total Titles</div>
                  </div>
                </div>
                <div className="adm-stat-card adm-stat-card--blue">
                  <div className="adm-stat-card__icon">
                    <FiEye />
                  </div>
                  <div>
                    <div className="adm-stat-card__value">
                      {formatViews(totalViews)}
                    </div>
                    <div className="adm-stat-card__label">Total Views</div>
                  </div>
                </div>
                <div className="adm-stat-card adm-stat-card--orange">
                  <div className="adm-stat-card__icon">
                    <FiUnlock />
                  </div>
                  <div>
                    <div className="adm-stat-card__value">{freeCount}</div>
                    <div className="adm-stat-card__label">Free Titles</div>
                  </div>
                </div>
                <div className="adm-stat-card adm-stat-card--purple">
                  <div className="adm-stat-card__icon">
                    <FiLock />
                  </div>
                  <div>
                    <div className="adm-stat-card__value">{premiumCount}</div>
                    <div className="adm-stat-card__label">Premium Titles</div>
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
