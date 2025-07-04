import React, { useState } from "react";
import "../globals.css"; 
import "../login.css"; 

export default function SignupPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }
    alert(`Signing up: ${formData.name} | ${formData.email}`);
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h2 className="login-title">Create an Account</h2>
        <form className="login-form" onSubmit={handleSubmit}>
          <div className="login-field">
            <label htmlFor="name" className="login-label">Full Name</label>
            <input
              type="text"
              name="name"
              id="name"
              className="login-input"
              placeholder="Jane Doe"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="login-field">
            <label htmlFor="email" className="login-label">Email</label>
            <input
              type="email"
              name="email"
              id="email"
              className="login-input"
              placeholder="jane@example.com"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="login-field">
            <label htmlFor="password" className="login-label">Password</label>
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

          <div className="login-field">
            <label htmlFor="confirmPassword" className="login-label">Confirm Password</label>
            <input
              type="password"
              name="confirmPassword"
              id="confirmPassword"
              className="login-input"
              placeholder="••••••••"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
            />
          </div>

          <button type="submit" className="login-button">Sign Up</button>
        </form>
        <p className="login-footer">
          Already have an account? <a href="/login" className="login-link">Log in</a>
        </p>
      </div>
    </div>
  );
}
