import React, { useState, useEffect } from "react";
import axios from "axios";
import "./CitizenProfile.css";

const UpdateProfile = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
    aadhaarnumber: "",
    gender: "",
    dateofbirth: "",
    state: "",
  });

  const [message, setMessage] = useState("");

  // Load data from localStorage on component mount
  useEffect(() => {
    const citizenData = JSON.parse(localStorage.getItem("citizen"));
    if (citizenData) {
      setFormData(citizenData);
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.put(`http://localhost:2020/citizen/updatecitizen/${formData.id}`, formData);

      if (response.status === 200) {
        setMessage("Profile updated successfully!");
        // Update localStorage with new data
        localStorage.setItem("citizen", JSON.stringify(formData));
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
      <h1>Update Profile</h1>
      {message && <p className="update-message">{message}</p>} {/* Display feedback message */}
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
          <label>Mobile</label>
          <input
            type="text"
            name="mobile"
            value={formData.mobile}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Aadhaar Number</label>
          <input
            type="text"
            name="aadhaarnumber"
            value={formData.aadhaarnumber}
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
          <label>State</label>
          <input
            type="text"
            name="state"
            value={formData.state}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" className="update-btn">
          Update
        </button>
      </form>
    </div>
  );
};

export default UpdateProfile;
