import { Link, useNavigate, useParams } from "react-router-dom";
import Header from "../shared/Header/Header.jsx";
import Footer from "../shared/Footer/Footer.jsx";
import "./Payments.css";
import { useEffect, useState } from "react";
import API from "../../api.js";

export default function Payments() {
  const { planCode = "basic_monthly", planId = "" } = useParams();
  const [planDetails, setPlanDetails] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPlan = async () => {
      try {
        const res = await API.get(
          `/sub/plansDetails/${encodeURIComponent(planCode)}`,
        );
        setPlanDetails(res.data);
      } catch (error) {
        alert(`Error fetching plan details: ${error}`);
      }
    };
    fetchPlan();
    document.title = "Payments - CineLux";
  }, [planCode]);

  const handleFinishPayment = async () => {
    const user = JSON.parse(localStorage.getItem("user") || "null");
    if (!user?.userId) {
      navigate("/login");
      return;
    }

    try {
      setIsSubmitting(true);
      await API.post("/payment/create-payment", {
        userId: user.userId,
        planId: Number(planId),
        paymentMethod: "card",
      });

      alert("Payment successful! Your subscription is now active.");
      navigate("/profile");
    } catch (error) {
      alert(`Error completing payment: ${error}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Header />

      <div className="Spacer"></div>
      <main className="payments-page">
        <section className="payments-card" aria-labelledby="payments-title">
          <div className="payments-top">
            <p className="payments-kicker">Secure Checkout</p>
            <h1 id="payments-title">Complete Your Payment</h1>
            <p className="payments-subtitle">
              You selected the {planDetails?.planName || "selected"} plan billed{" "}
              {planDetails?.billingInterval || "monthly"}.
            </p>
          </div>

          <div className="payments-summary" role="status" aria-live="polite">
            <span>{planDetails?.planName || "Plan"}</span>
            <strong>
              ${planDetails?.priceAmount ?? "-"}/
              {planDetails?.billingInterval || "-"}
            </strong>
          </div>

          <form className="payments-form">
            <label className="payment-field">
              Cardholder Name
              <input
                type="text"
                name="cardholderName"
                placeholder="Alex Morgan"
                autoComplete="cc-name"
              />
            </label>

            <label className="payment-field">
              Card Number
              <input
                type="text"
                name="cardNumber"
                placeholder="1234 5678 9012 3456"
                autoComplete="cc-number"
                inputMode="numeric"
              />
            </label>

            <div className="payment-row">
              <label className="payment-field">
                Expiry Date
                <input
                  type="text"
                  name="expiry"
                  placeholder="MM/YY"
                  autoComplete="cc-exp"
                  inputMode="numeric"
                />
              </label>

              <label className="payment-field">
                CVV
                <input
                  type="password"
                  name="cvv"
                  placeholder="123"
                  autoComplete="cc-csc"
                  inputMode="numeric"
                />
              </label>
            </div>

            <div className="payment-row">
              <label className="payment-field">
                Country
                <input
                  type="text"
                  name="country"
                  placeholder="United States"
                  autoComplete="country-name"
                />
              </label>

              <label className="payment-field">
                ZIP / Postal Code
                <input
                  type="text"
                  name="postalCode"
                  placeholder="10001"
                  autoComplete="postal-code"
                />
              </label>
            </div>

            <div className="payments-actions">
              <Link to="/plans" className="payments-btn payments-btn-secondary">
                Back to Plans
              </Link>
              <button
                type="button"
                className="payments-btn payments-btn-primary"
                onClick={handleFinishPayment}
                disabled={isSubmitting}
              >
                {isSubmitting
                  ? "Processing..."
                  : `Pay $${planDetails?.priceAmount ?? "-"}`}
              </button>
            </div>
          </form>
        </section>
      </main>
      <Footer />
    </>
  );
}
