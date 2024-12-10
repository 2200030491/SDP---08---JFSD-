import React, { useState } from "react";
import axios from "axios";
import "./Admin.css";

const AddPolitician = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    gender: "",
    dateofbirth: "",
    password: "",
    position: "",
    party: "",
    contact: "",
    state: "",
  });

  const [message, setMessage] = useState(""); // For feedback messages

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic form validation
    if (!formData.email || !/\S+@\S+\.\S+/.test(formData.email)) {
      setMessage("Please enter a valid email.");
      return;
    }
    if (formData.password.length < 6) {
      setMessage("Password must be at least 6 characters long.");
      return;
    }
    if (!/^\d{10}$/.test(formData.contact)) {
      setMessage("Contact number must be exactly 10 digits.");
      return;
    }

    try {
      const response = await axios.post("http://localhost:2020/admin/addpolitician", formData);

      if (response.status === 200) {
        setMessage("Politician added successfully!");
        setFormData({
          name: "",
          email: "",
          gender: "",
          dateofbirth: "",
          password: "",
          position: "",
          party: "",
          contact: "",
          state: "",
        });
      } else {
        setMessage("Failed to add politician. Please try again.");
      }
    } catch (error) {
      console.error("Error adding politician:", error.response ? error.response.data : error.message);
      setMessage("An error occurred. Please try again.");
    }
  };

  return (
    <div className="add-politician-container">
      <h1>Add Politician</h1>
      {message && <p className="message">{message}</p>}
      <form onSubmit={handleSubmit} className="add-politician-form">
        <div className="form-group">
          <label>Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter name"
            required
          />
        </div>
        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter email"
            required
          />
        </div>
        <div className="form-group">
          <label>Gender</label>
          <select name="gender" value={formData.gender} onChange={handleChange} required>
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
        </div>
        <div className="form-group">
          <label>Date of Birth</label>
          <input
            type="date"
            name="dateofbirth"
            value={formData.dateofbirth}
            onChange={handleChange}
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
            placeholder="Enter password"
            required
          />
        </div>
        <div className="form-group">
          <label>Position</label>
          <input
            type="text"
            name="position"
            value={formData.position}
            onChange={handleChange}
            placeholder="Enter position"
            required
          />
        </div>
        <div className="form-group">
          <label>Party</label>
          <input
            type="text"
            name="party"
            value={formData.party}
            onChange={handleChange}
            placeholder="Enter party"
            required
          />
        </div>
        <div className="form-group">
          <label>Contact Number</label>
          <input
            type="text"
            name="contact"
            value={formData.contact}
            onChange={handleChange}
            placeholder="Enter contact number"
            required
          />
        </div>
        <div className="form-group">
          <label>State</label>
          <input
            type="text"
            name="state"
            value={formData.state}
            onChange={handleChange}
            placeholder="Enter state"
          />
        </div>
        <button type="submit" className="submit-btn">
          Add Politician
        </button>
      </form>
    </div>
  );
};

export default AddPolitician;
