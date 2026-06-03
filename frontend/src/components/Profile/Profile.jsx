import {
  FaUser,
  FaCreditCard,
  FaClock,
  FaHeart,
  FaEdit,
  FaSignOutAlt,
} from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Footer from "../shared/Footer/Footer.jsx";
import Header from "../shared/Header/Header.jsx";
import "./Profile.css";
import API from "../../api.js";

const defaultSubscription = {
  plan: "No active plan",
  status: "Inactive",
  renewalDate: "-",
  price: "-",
};

export default function Profile() {
  const navigate = useNavigate();
  const userloggedIn = JSON.parse(localStorage.getItem("user"));
  // const [favoritedVideos, setFavoritedVideos] = useState([]);
  // const [watchHistory, setWatchHistory] = useState([]);
  const [subscription, setSubscription] = useState(defaultSubscription);
  useEffect(() => {
    if (!userloggedIn) {
      navigate("/login");
    }
  }, [userloggedIn, navigate]);

  useEffect(() => {
    const loadProfileVideoData = async () => {
      if (!userloggedIn?.userId) {
        setSubscription(defaultSubscription);
        return;
      }

      try {
        // const favoriteIds = userloggedIn?.savedTitles || [];
        // const favorites = MovieData.filter((video) =>
        //   favoriteIds.includes(video.id),
        // );
        // setFavoritedVideos(favorites);

        // const historyIds =
        //   JSON.parse(localStorage.getItem("watchHistoryVideos")) || [];
        // const history = historyIds
        //   .map((id) => MovieData.find((video) => video.id === id))
        //   .filter(Boolean);
        // setWatchHistory(history);

        // const parsedSubscription =
        //   JSON.parse(localStorage.getItem("subscription")) || null;
        const res = await API.get(
          `/usersub/user/${encodeURIComponent(userloggedIn.userId)}`,
        );

        if (!res.data) {
          setSubscription(defaultSubscription);
          return;
        }

        setSubscription({
          plan: res.data.planName || `Plan #${res.data.planId}`,
          status:
            (res.data.status || "").toLowerCase() === "active"
              ? "Active"
              : "Inactive",
          renewalDate: res.data.currentPeriodEnd || "-",
          price:
            res.data.priceAmount != null
              ? `${res.data.currencyCode || "USD"} ${res.data.priceAmount}`
              : "-",
        });
      } catch (error) {
        alert(`Error loading profile video data: ${error}`);
      }
    };

    loadProfileVideoData();
    document.title = "Profile - CineLux";

    // Keep profile data updated when localStorage changes.
    // const handleStorageChange = () => loadProfileVideoData();
    // window.addEventListener("storage", handleStorageChange);

    // return () => {
    //   window.removeEventListener("storage", handleStorageChange);
    // };
  }, [userloggedIn]);

  // Mock user data
  const user = {
    avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent("alex.anderson@example.com")}`,
  };

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
                alt={userloggedIn.fullName}
                className="profile-avatar"
              />
              <div className="profile-info">
                <h1>{userloggedIn.fullName}</h1>
                <p className="profile-email">{userloggedIn.email}</p>
                <p className="profile-member">
                  Member since {userloggedIn.memberSince}
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
                <span
                  className={`subscription-value ${subscription.status === "Active" ? "status-active" : "status-inactive"}`}
                >
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
              {subscription.status !== "Active" && (
                <button
                  className="subscription-btn"
                  onClick={() => navigate("/plans")}
                >
                  Subscribe
                </button>
              )}
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
            {/* <div className="history-grid">
              {watchHistory.length > 0 ? (
                watchHistory.map((item) => (
                  <div key={item.id} className="history-item">
                    <img src={item.thumbnail} alt={item.title} />
                    <div className="history-overlay">
                      <h4>{item.title}</h4>
                    </div>
                  </div>
                ))
              ) : (
                <p className="no-favorites">
                  No watch history yet. Start playing videos to see them here.
                </p>
              )}
            </div> */}
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
            {/* <div className="favorites-grid">
              {favoritedVideos.length > 0 ? (
                favoritedVideos.map((item) => (
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
                ))
              ) : (
                <p className="no-favorites">
                  No favorite videos yet. Start adding your favorites on the
                  Play page!
                </p>
              )}
            </div> */}
          </div>

          {/* Account Settings */}
          <div className="profile-section">
            <div className="section-header">
              <h2>
                <FaUser /> Account Settings
              </h2>
            </div>
            <div className="settings-list">
              <button
                className="settings-item danger"
                onClick={() => {
                  localStorage.clear();
                  navigate("/", { replace: true });
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
