import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import "./Auth.css";

export default function SignUp() {
  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const name = formData.get("name");
    const email = formData.get("email");
    const password = formData.get("password");
    const memberSince = new Date().toLocaleDateString("en-US", {
      month: "long",
      year: "numeric",
    });
    const user = { name, email, password, memberSince };
    localStorage.setItem("user", JSON.stringify(user));
    alert(
      `Registered Successfully! Welcome, ${user.name}!\nPlease log in to continue.`,
    );
    navigate("/login");
  }
  return (
    <section className="auth-page">
      <div className="auth-card">
        <h1 className="auth-title">Create an Account</h1>
        <p className="auth-subtitle">Join CineLux and unlock your watchlist.</p>

        <form className="auth-form" onSubmit={handleSubmit}>
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
