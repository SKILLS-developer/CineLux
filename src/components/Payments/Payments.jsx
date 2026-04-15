import { Link, useLocation } from "react-router-dom";
import Header from "../shared/Header/Header.jsx";
import Footer from "../shared/Footer/Footer.jsx";
import "./Payments.css";

export default function Payments() {
  const location = useLocation();
  const planType = location.state?.planType ?? "Standard";
  const billingCycle = location.state?.billingCycle ?? "monthly";
  const totalPrice =
    planType === "Basic"
      ? billingCycle === "yearly"
        ? "89.99"
        : "9.99"
      : planType === "Premium"
        ? billingCycle === "yearly"
          ? "249.99"
          : "29.99"
        : billingCycle === "yearly"
          ? "169.99"
          : "19.99";

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
              You selected the {planType} plan billed {billingCycle}.
            </p>
          </div>

          <div className="payments-summary" role="status" aria-live="polite">
            <span>{planType}</span>
            <strong>
              ${totalPrice}/{billingCycle}
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
              >
                Pay ${totalPrice}
              </button>
            </div>
          </form>
        </section>
      </main>
      <Footer />
    </>
  );
}
