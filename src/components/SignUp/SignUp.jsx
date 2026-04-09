import { useState } from "react";
import "./SignUp.css";

export default function SignUp() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [data, setData] = useState([]);

  function mahdiForm(e) {
    e.preventDefault();

    const newMessage = {
      id: Date.now(),
      name: name.trim(),
      email: email.trim(),
      password,
    };

    if (!newMessage.name || !newMessage.email || !newMessage.password) {
      return;
    }

    setData((prev) => [...prev, newMessage]);
    setName("");
    setEmail("");
    setPassword("");
  }

  return (
    <section className="signup-section">
      <h2 className="signup-title">Create an Account</h2>

      <form className="signup-form" onSubmit={mahdiForm}>
        <label htmlFor="name">Name</label>
        <input
          type="text"
          name="name"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter your name"
        />

        <label htmlFor="email">Email</label>
        <input
          type="email"
          name="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
        />

        <label htmlFor="password">Password</label>
        <input
          type="password"
          name="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter your password"
        />

        <button type="submit">Submit</button>
      </form>

      {data.length > 0 && (
        <div className="signup-list-wrap">
          <h3>Submitted Users</h3>
          <ul className="signup-list">
            {data.map((user) => (
              <li key={user.id}>
                <span>{user.name}</span>
                <span>{user.email}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </section>
  );
}
