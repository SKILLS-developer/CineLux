import { useNavigate } from "react-router-dom";
import "../../Auth/Auth.css";

export default function LoginAdmin() {
  const navigate = useNavigate();
  function handleSubmit(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const email = formData.get("email");
    const password = formData.get("password");
    if (email === "admin@gmail.com" && password === "admin123") {
      localStorage.setItem("isAdmin", "true");
      alert("Login successful! Redirecting to dashboard...");
      navigate("/admin/dashboard");
    } else {
      alert("Invalid credentials. Please try again.");
    }
  }

  return (
    <section className="auth-page">
      <div className="auth-card">
        <h1 className="auth-title">Welcome Back</h1>
        <p className="auth-subtitle">
          Sign in to continue watching on CineLux.
        </p>

        <form className="auth-form" onSubmit={handleSubmit}>
          <div className="auth-field">
            <label className="auth-label" htmlFor="login-email">
              Email
            </label>
            <input
              className="auth-input"
              type="email"
              id="login-email"
              name="email"
              placeholder="Enter your email"
              required
            />
          </div>

          <div className="auth-field">
            <label className="auth-label" htmlFor="login-password">
              Password
            </label>
            <input
              className="auth-input"
              type="password"
              id="login-password"
              name="password"
              placeholder="Enter your password"
              required
            />
          </div>

          <button type="submit" className="auth-btn auth-btn-primary">
            Login
          </button>
        </form>
      </div>
    </section>
  );
}
