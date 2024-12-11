import React, { useState, useEffect } from "react";
import axios from "axios";
import "./PoliticianProfile.css";
import config from "../Main/config";
const UpdatePoliticianProfile = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    gender: "",
    dateofbirth: "",
    position: "",
    party: "",
    contact: "",
    state: "",
  });

  const [message, setMessage] = useState("");

  // Load politician data from localStorage on component mount
  useEffect(() => {
    const politicianData = JSON.parse(localStorage.getItem("politician"));
    if (politicianData) {
      setFormData(politicianData);
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.put(`${config.url}/politician/updatepoliticianprofile/${formData.id}`,
        formData
      );

      if (response.status === 200) {
        setMessage("Profile updated successfully!");
        // Update localStorage with new data
        localStorage.setItem("politician", JSON.stringify(formData));
      } else {
        setMessage("Failed to update profile. Please try again.");
      }
    } catch (error) {
      console.error("Update error:", error.response ? error.response.data : error.message);
      setMessage("An error occurred while updating the profile. Please try again.");
    }
  };

  return (
    <div className="update-profile-container">
      <h1>Update Politician Profile</h1>
      {message && <p className={`update-message ${message.includes("successfully") ? "success" : "error"}`}>{message}</p>}
      <form onSubmit={handleSubmit} className="update-profile-form">
        <div className="form-group">
          <label>Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
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
            required
          />
        </div>
        <div className="form-group">
          <label>Gender</label>
          <select
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            required
          >
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
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
          <label>Position</label>
          <input
            type="text"
            name="position"
            value={formData.position}
            onChange={handleChange}
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
          />
        </div>
        <button type="submit" className="update-btn">
          Update
        </button>
      </form>
    </div>
  );
};

export default UpdatePoliticianProfile;
