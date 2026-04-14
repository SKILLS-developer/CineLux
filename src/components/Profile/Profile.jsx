import {
  FaUser,
  FaCreditCard,
  FaClock,
  FaHeart,
  FaEdit,
  FaSignOutAlt,
} from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import  MovieData  from "../../data/Data.js";
import Footer from "../shared/Footer/Footer.jsx";
import Header from "../shared/Header/Header.jsx";
import "./Profile.css";

export default function Profile() {
  const navigate = useNavigate();
  const userloggedIn = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    if (!userloggedIn) {
      navigate("/login");
    }
  }, [userloggedIn, navigate]);

  // Mock user data
  const user = {
    name: "Alex Anderson",
    email: "alex.anderson@example.com",
    memberSince: "January 2023",
    avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(userloggedIn.email)}`,
  };

  const subscription = {
    plan: "Premium",
    status: "Active",
    renewalDate: "April 28, 2026",
    price: "$29.99/month",
  };

  // Mock watch history (last 6 items)
  const watchHistory = MovieData.slice(0, 6);

  // Mock saved titles (favorited items)
  const savedTitles = MovieData.filter((_, i) => i % 2 === 0).slice(0, 4);

  if (!userloggedIn) return null;

  return (
    <>
      <Header />
      <div className="Spacer"></div>
      <section className="profile-page">
        <div className="profile-shell">
          {/* Profile Header */}
          <div className="profile-header">
            <div className="profile-header-content">
              <img
                src={user.avatar}
                alt={userloggedIn.name || user.name}
                className="profile-avatar"
              />
              <div className="profile-info">
                <h1>{userloggedIn.name || user.name}</h1>
                <p className="profile-email">
                  {userloggedIn.email || user.email}
                </p>
                <p className="profile-member">
                  Member since {userloggedIn.memberSince || user.memberSince}
                </p>
              </div>
            </div>
            <button className="profile-edit-btn">
              <FaEdit /> Edit Profile
            </button>
          </div>

          {/* Subscription Card */}
          <div className="profile-section">
            <div className="section-header">
              <h2>
                <FaCreditCard /> Subscription
              </h2>
            </div>
            <div className="subscription-card">
              <div className="subscription-item">
                <span className="subscription-label">Current Plan</span>
                <span className="subscription-value">{subscription.plan}</span>
              </div>
              <div className="subscription-item">
                <span className="subscription-label">Status</span>
                <span className="subscription-value status-active">
                  {subscription.status}
                </span>
              </div>
              <div className="subscription-item">
                <span className="subscription-label">Price</span>
                <span className="subscription-value">{subscription.price}</span>
              </div>
              <div className="subscription-item">
                <span className="subscription-label">Renewal Date</span>
                <span className="subscription-value">
                  {subscription.renewalDate}
                </span>
              </div>
              <button className="subscription-btn">Manage Subscription</button>
            </div>
          </div>

          {/* Watch History */}
          <div className="profile-section">
            <div className="section-header">
              <h2>
                <FaClock /> Continue Watching
              </h2>
              <Link to="/discover" className="section-link">
                View All
              </Link>
            </div>
            <div className="history-grid">
              {watchHistory.map((item) => (
                <div key={item.id} className="history-item">
                  <img src={item.thumbnail} alt={item.title} />
                  <div className="history-overlay">
                    <h4>{item.title}</h4>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Saved Titles */}
          <div className="profile-section">
            <div className="section-header">
              <h2>
                <FaHeart /> My Favorites
              </h2>
              <Link to="/shows" className="section-link">
                View All
              </Link>
            </div>
            <div className="favorites-grid">
              {savedTitles.map((item) => (
                <div key={item.id} className="favorite-card">
                  <img src={item.thumbnail} alt={item.title} />
                  <div className="favorite-info">
                    <h4>{item.title}</h4>
                    <div className="favorite-meta">
                      <span>{item.rating} ⭐</span>
                      <span>{item.type}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Account Settings */}
          <div className="profile-section">
            <div className="section-header">
              <h2>
                <FaUser /> Account Settings
              </h2>
            </div>
            <div className="settings-list">
              <button className="settings-item">
                <span>Change Password</span>
                <span>→</span>
              </button>
              <button className="settings-item">
                <span>Notification Preferences</span>
                <span>→</span>
              </button>
              <button className="settings-item">
                <span>Privacy Settings</span>
                <span>→</span>
              </button>
              <button
                className="settings-item danger"
                onClick={() => {
                  localStorage.removeItem("isLoggedIn");
                  localStorage.removeItem("user");
                  window.location.href = "/";
                }}
              >
                <FaSignOutAlt />
                <span>Logout</span>
              </button>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}
