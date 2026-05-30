import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import "./Auth.css";
import API from "../../api";

export default function Login() {
  const navigate = useNavigate();
  const [Email, setEmail] = useState("");
  const [PasswordHash, setPassword] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    // const user = JSON.parse(localStorage.getItem("user"));
    try {
      const res = await API.post("/user/login", {
        Email: Email,
        PasswordHash: PasswordHash,
      });
      alert(`Login Successful!\nWelcome back!,${res.data.fullName}`);
      const userData = {
        userId: res.data.userId,
        fullName: res.data.fullName,
        email: res.data.email,
        memberSince: res.data.createdAt,
      };
      localStorage.setItem("user", JSON.stringify(userData));
      navigate("/", { replace: true });
    } catch (error) {
      const msg =
        error.response?.data?.message ??
        (typeof error.response?.data === "string"
          ? error.response.data
          : null) ??
        error.message;
      alert(`Login failed: ${msg}`);
    }
    // if (user && email === user.email && password === user.password) {
    //   alert(`Login Successful!\nWelcome back, ${user.name}!`);
    //   localStorage.setItem("isLoggedIn", "true");
    //   navigate("/", { replace: true });
    // } else {
    //   alert("Invalid email or password. Please try again.");
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
              value={Email}
              onChange={(e) => setEmail(e.target.value)}
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
              value={PasswordHash}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button type="submit" className="auth-btn auth-btn-primary">
            Login
          </button>
        </form>

        <p className="auth-footnote">
          New to CineLux? <Link to="/signup">Create an account</Link>
        </p>
      </div>
    </section>
  );
}
