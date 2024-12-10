import React, { useState } from "react";
import axios from "axios";
import "./NavBar.css";
import { useNavigate } from "react-router-dom";

export default function AdminLogin({ onAdminLogin }) {
  const [formData, setFormData] = useState({
    username: "",
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

    // Validate username and password
    if (!formData.username) {
      setMessage("Please enter your username.");
      return;
    }
    if (!formData.password) {
      setMessage("Please enter your password.");
      return;
    }

    try {
      // Send POST request to backend
      const response = await axios.post(
        "http://localhost:2020/admin/adminlogin",
        null,
        {
          params: {
            username: formData.username,
            password: formData.password,
          },
        }
      );

      if (response.status === 200) {
        onAdminLogin();
        localStorage.setItem("admin", JSON.stringify(response.data));
        navigate("/adminhome");
      } else {
        setMessage("Login failed. Please try again.");
      }
    } catch (error) {
      console.error("Login error:", error.response ? error.response.data : error.message);
      setMessage("Invalid username or password. Please try again.");
    }
  };

  return (
    <div className="admin-signin-container">
      <h1>Admin Panel</h1>
      <div className="admin-signin-card">
        <h2>Login as Admin</h2>
        {message && <p className="admin-message">{message}</p>} {/* Display feedback messages */}
        <form onSubmit={handleSubmit}>
          <div className="admin-form-group">
            <label>Username</label>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              placeholder="Enter your username"
              required
            />
          </div>
          <div className="admin-form-group">
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
          <button type="submit" className="admin-signin-btn">
            Sign in
          </button>
        </form>
      </div>
    </div>
  );
}
