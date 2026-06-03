import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import "./Auth.css";
import API from "../../api";
import { useEffect } from "react";

export default function Register() {
  const navigate = useNavigate();
  useEffect(() => {
    document.title = "Register - CineLux";
  }, []);

  async function handleSubmit(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const name = formData.get("name");
    const email = formData.get("email");
    const password = formData.get("password");
    const user = { fullName: name, email, passwordHash: password };
    try {
      const response = await API.post("/user/register", user);
      alert(
        `Registration successful: ${response.data.fullName}! Please log in to continue.`,
      );
      navigate("/login");
    } catch (error) {
      alert(`Registration failed: ${error?.response?.data || error.message}`);
    }
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
