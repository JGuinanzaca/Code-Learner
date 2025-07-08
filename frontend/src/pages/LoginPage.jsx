import React, { useState } from "react";
import "../globals.css";
import "../login.css";
import { login } from "../Api.jsx";
import { useNavigate } from "react-router-dom";

export default function LoginPage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: "", password: "" });

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    try {
      e.preventDefault();
      alert(`Logging in with: ${formData.email}`);
      login(formData);
      navigate("/Code");
    } catch (error) {
      console.error("Log-in failed:", error);
    }
  };
  return (
    <div className="login-container">
      <div className="login-card">
        <h2 className="login-title">Welcome Back</h2>
        <form className="login-form" onSubmit={handleSubmit}>
          <div className="login-field">
            <label htmlFor="email" className="login-label">
              Email
            </label>
            <input
              type="email"
              name="email"
              id="email"
              className="login-input"
              placeholder="you@example.com"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="login-field">
            <label htmlFor="password" className="login-label">
              Password
            </label>
            <input
              type="password"
              name="password"
              id="password"
              className="login-input"
              placeholder="••••••••"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>

          <button type="submit" className="login-button">
            Log In
          </button>
        </form>
        <p className="login-footer">
          Don't have an account?{" "}
          <a href="/signup" className="login-link">
            Sign up
          </a>
        </p>
      </div>
    </div>
  );
}
