import Header from "../shared/Header/Header.jsx";
import Footer from "../shared/Footer/Footer.jsx";
import "./Plans.css";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { LoginNotification } from "../shared/Notification/Notification.jsx";
import API from "../../api.js";
import PlanCard from "../shared/PlanCard/PlanCard.jsx";

export default function Plans() {
  const [billingIntervals, setBillingIntervals] = useState([]);
  const [selectedInterval, setSelectedInterval] = useState("monthly");
  const [plans, setPlans] = useState([]);
  const [showLoginNotification, setShowLoginNotification] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchIntervals = async () => {
      try {
        const res = await API.get("/sub/billing-intervals");

        setBillingIntervals(res.data);
      } catch (error) {
        alert(`Error fetching Intervals: ${error}`);
      }
    };
    fetchIntervals();
  }, []);
  useEffect(() => {
    const fetchPlans = async () => {
      try {
        const response = await API.get(
          `/sub/plans/${encodeURIComponent(selectedInterval)}`,
        );
        setPlans(response.data);
      } catch (error) {
        alert(`Error fetching plans: ${error}`);
      }
    };
    fetchPlans();
    document.title = "Plans - CineLux";
  }, [selectedInterval]);

  function handlePlan(planCode, planId) {
    const user = localStorage.getItem("user") ? true : false;
    if (!user) {
      setShowLoginNotification(true);
      return;
    }

    navigate(`/payments/${planCode}/${planId}`);
  }

  return (
    <>
      <Header />
      <div className="Spacer"></div>
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
          {billingIntervals.map((interval, i) => (
            <button
              key={i}
              type="button"
              className={`plan-option ${selectedInterval === interval ? "active" : ""}`}
              onClick={() => setSelectedInterval(interval)}
            >
              {interval}
              {interval.includes("yearly") && (
                <span className="plan-option-badge">Save 15%</span>
              )}
            </button>
          ))}
        </div>
        <div className="plan-cards">
          {plans.map((plan, index) => (
            <PlanCard
              key={index}
              selectedInterval={selectedInterval}
              handlePlan={() => handlePlan(plan.planCode, plan.planId)}
              planName={plan.planName}
              price={plan.priceAmount}
              planCode={plan.planCode}
              videoQuality={plan.videoQuality}
              maxStreams={plan.maxStreams}
            />
          ))}
        </div>
      </div>
      <Footer />
    </>
  );
}
