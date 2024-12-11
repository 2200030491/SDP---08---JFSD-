import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./NavBar.css";
import  config  from './config';
export default function PoliticianLogin({onPoliticianLogin})
 {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [message, setMessage] = useState(""); // State for feedback messages
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate email and password
    if (!formData.email || !/\S+@\S+\.\S+/.test(formData.email)) {
      setMessage("Please enter a valid email.");
      return;
    }
    if (!formData.password) {
      setMessage("Please enter your password.");
      return;
    }

    try {
      // Send POST request to backend
      const response = await axios.post(
        `${config.url}/politician/politicianlogin`, 
        null, 
        {
          params: { email: formData.email, password: formData.password },
        }
      );

      if (response.status === 200) {
        // Save politician data to localStorage
        onPoliticianLogin();
        localStorage.setItem("politician", JSON.stringify(response.data));
        navigate("/politicianhome");
      } else {
        setMessage("Login failed. Please try again.");
      }
    } catch (error) {
      console.error("Login error:", error.response ? error.response.data : error.message);
      setMessage("Invalid email or password. Please try again.");
    }
  };

  return (
    <div className="signin-container">
      <h1>Welcome to Praja Seva</h1>
      <div className="signin-card">
        <h2>Login in as Politician Here</h2>
        {message && <p className="message">{message}</p>} {/* Display feedback messages */}
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              required
            />
          </div>
          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter your password"
              required
            />
          </div>
          <div className="form-options">
            <div>
              <input type="checkbox" id="rememberMe" />
              <label htmlFor="rememberMe">Remember me</label>
            </div>
            <a href="#forgot-password">Forgot password?</a>
          </div>
          <button type="submit" className="signin-btn1">
            Sign in
          </button>
        </form>
        <p className="signup-link">
          Don't have an account?<strong> Please Contact Our Administrator</strong>
        </p>
      </div>
    </div>
  );
};

