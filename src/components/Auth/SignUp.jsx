import { Link } from "react-router-dom";
import "./Auth.css";

export default function SignUp() {
  return (
    <section className="auth-page">
      <div className="auth-card">
        <h1 className="auth-title">Create an Account</h1>
        <p className="auth-subtitle">Join CineLux and unlock your watchlist.</p>

        <form className="auth-form">
          <div className="auth-field">
            <label className="auth-label" htmlFor="signup-name">
              Name
            </label>
            <input
              className="auth-input"
              type="text"
              name="name"
              id="signup-name"
              placeholder="Enter your name"
              required
            />
          </div>

          <div className="auth-field">
            <label className="auth-label" htmlFor="signup-email">
              Email
            </label>
            <input
              className="auth-input"
              type="email"
              name="email"
              id="signup-email"
              placeholder="Enter your email"
              required
            />
          </div>

          <div className="auth-field">
            <label className="auth-label" htmlFor="signup-password">
              Password
            </label>
            <input
              className="auth-input"
              type="password"
              name="password"
              id="signup-password"
              placeholder="Create a password"
              required
            />
          </div>

          <button type="submit" className="auth-btn auth-btn-primary">
            Sign Up
          </button>
        </form>

        <p className="auth-footnote">
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </div>
    </section>
  );
}
