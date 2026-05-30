import { useNavigate } from "react-router-dom";
import "../../Auth/Auth.css";
import API from "../../../api.js";

export default function LoginAdmin() {
  const navigate = useNavigate();
  async function handleSubmit(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const email = formData.get("email");
    const password = formData.get("password");

    try {
      const res = await API.post(`/user/admin`, {
        Email: email,
        PasswordHash: password,
      });
      alert(
        `Login successful! ${res.data.email} Redirecting to dashboard...`,
      );
      localStorage.setItem("admin", JSON.stringify(res.data));
      navigate("/admin/dashboard");
    } catch (error) {
      console.error("Error during admin login:", error);
      alert("An error occurred during login. Please try again.");
      return;
    }

    // if (email === "admin@gmail.com" && password === "admin123") {
    //   localStorage.setItem("isAdmin", "true");
    //   alert("Login successful! Redirecting to dashboard...");
    //   navigate("/admin/dashboard");
    // } else {
    //   alert("Invalid credentials. Please try again.");
    // }
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
