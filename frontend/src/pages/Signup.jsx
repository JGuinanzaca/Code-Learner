import { useState } from "react";
import "../login.css";
import { register } from "../Api.jsx";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { saveId } from "../redux/authSlice";
import { saveUserDetails } from "../redux/userSlice.js";

export default function SignupPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  // when register endpoint is invoked and it returns a valid id, we save the userId, name and email
  // to the redux store, so that it can be maintained across the app to be used in all components (persistence guarenteed)
  const handleSubmit = (e) => {
    try {
      e.preventDefault();
      if (formData.password !== formData.confirmPassword) {
        alert("Passwords do not match!");
        return;
      }
      alert(`Signing up: ${formData.name} | ${formData.email}`);
      register({
        email: formData.email,
        password: formData.password,
        name: formData.name,
      }).then((response) => {
        if(response.message ===  "Error registering user") {
          alert(`${response.message} into the database: try again later`);
          return;
        }
        else if(response.message ===  "Email already in use") {
          alert(`${response.message}: use another email that is not registered`);
          return;
        }
        dispatch(saveId(response));
        dispatch(saveUserDetails({ name: formData.name, email: formData.email }));
        navigate("/Code");
      });
    } catch (error) {
      console.error("Register failed:", error);
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h2 className="login-title">Create an Account</h2>
        <form className="login-form" onSubmit={handleSubmit}>
          <div className="login-field">
            <label htmlFor="name" className="login-label">
              Full Name
            </label>
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
            <label htmlFor="email" className="login-label">
              Email
            </label>
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

          <div className="login-field">
            <label htmlFor="confirmPassword" className="login-label">
              Confirm Password
            </label>
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

          <button type="submit" className="login-button">
            Sign Up
          </button>
        </form>
        <p className="login-footer">
          Already have an account?{" "}
          <a href="/login" className="login-link">
            Log in
          </a>
        </p>
      </div>
    </div>
  );
}
