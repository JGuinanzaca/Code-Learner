import React, { useState } from "react";
import "../globals.css";
import "../login.css";
import { login } from "../Api.jsx";
import { fetchUsers } from "../Api.jsx";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { saveId } from "../redux/authSlice";
import { saveUserDetails } from "../redux/userSlice.js";

export default function LoginPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({ email: "", password: "" });

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  // when login endpoint is invoked and it returns a valid id, we save the userId to the redux store, so that it can be
  // maintained across the app to be used in all components (persistence guarenteed)
  // then we store the user's information in the store as well for later users
  const handleSubmit = (e) => {
    try {
      e.preventDefault();
      alert(`Logging in with: ${formData.email}`);
      login(formData).then((response) => {
        console.log(response); // Debug: checking if promise was fufilled (returns id of user in database or error message)
        if(response.message === "Invalid password") {
          alert(`${response.message}: try again`);
          return;
        }
        dispatch(saveId(response));

        fetchUsers(response).then((res) => {
          console.log(res[0]); // Debug: should return object containing name, email and image url
          dispatch(saveUserDetails(res[0]));
        });
        navigate("/Code");
      });
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
