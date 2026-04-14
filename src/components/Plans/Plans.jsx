import Header from "../shared/Header/Header.jsx";
import Footer from "../shared/Footer/Footer.jsx";
import "./Plans.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { LoginNotification } from "../shared/Notification/Notification.jsx";
export default function Plans() {
  const [selectedPlan, setSelectedPlan] = useState("monthly");
  const [showLoginNotification, setShowLoginNotification] = useState(false);
  const navigate = useNavigate();
  const isLoggedIn =
    typeof window !== "undefined" &&
    Boolean(window.localStorage.getItem("user")) &&
    window.localStorage.getItem("isLoggedIn") === "true";
  //const isLoggedIn = false; // Placeholder for authentication state
  function handlePlan(type) {
    if (!isLoggedIn) {
      setShowLoginNotification(true);
      return;
    }

    navigate("/payments", {
      state: {
        planType: type,
        billingCycle: selectedPlan,
      },
    });
  }

  return (
    <>
      <Header />
      <div className="Space"></div>
      {showLoginNotification && (
        <LoginNotification onClose={() => setShowLoginNotification(false)} />
      )}
      <div className="plans">
        <h1>Choose Your Plan</h1>
        <p>
          Select the plan that best suits your needs and enjoy our premium
          features.
        </p>
        <div className="plan-options">
          <button
            type="button"
            className={`plan-option ${selectedPlan === "monthly" ? "active" : ""}`}
            onClick={() => setSelectedPlan("monthly")}
          >
            Monthly
          </button>
          <button
            type="button"
            className={`plan-option ${selectedPlan === "yearly" ? "active" : ""}`}
            onClick={() => setSelectedPlan("yearly")}
          >
            Yearly
            <span className="plan-option-badge">Save 10%</span>
          </button>
        </div>
        <div className="plan-cards">
          <div
            className={`plan-card ${selectedPlan === "yearly" ? "yearly" : ""}`}
          >
            <h2>Basic</h2>

            <p>
              ${selectedPlan === "monthly" ? "9.99" : "89.99"}/{selectedPlan}
            </p>
            <ul>
              <li>Access to basic features</li>
              <li>Limited support</li>
              <li>Single user</li>
            </ul>
            <button onClick={() => handlePlan("Basic")}>Get Started</button>
          </div>
          <div
            className={`plan-card most-popular ${selectedPlan === "yearly" ? "yearly" : ""}`}
          >
            <h2>Standard</h2>

            <p>
              ${selectedPlan === "monthly" ? "19.99" : "169.99"}/{selectedPlan}
            </p>
            <ul>
              <li>Access to all features</li>
              <li>Priority support</li>
              <li>Up to 5 users</li>
            </ul>
            <button onClick={() => handlePlan("Standard")}>Get Started</button>
          </div>
          <div
            className={`plan-card ${selectedPlan === "yearly" ? "yearly" : ""}`}
          >
            <h2>Premium</h2>

            <p>
              ${selectedPlan === "monthly" ? "29.99" : "249.99"}/{selectedPlan}
            </p>
            <ul>
              <li>Custom features</li>
              <li>Dedicated support</li>
              <li>Unlimited users</li>
            </ul>
            <button onClick={() => handlePlan("Premium")}>Get Started</button>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
