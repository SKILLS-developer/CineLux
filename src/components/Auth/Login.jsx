import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import "./Auth.css";

export default function Login() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));
  function handleSubmit(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const email = formData.get("email");
    const password = formData.get("password");
    if (user && email === user.email && password === user.password) {
      alert(`Login Successful!\nWelcome back, ${user.name}!`);
      localStorage.setItem("isLoggedIn", "true");
      navigate("/", { replace: true });
    } else {
      alert("Invalid email or password. Please try again.");
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

        <p className="auth-footnote">
          New to CineLux? <Link to="/signup">Create an account</Link>
        </p>
      </div>
    </section>
  );
}
