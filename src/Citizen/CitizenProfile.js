import React from "react";
import "./CitizenProfile.css";
import { useNavigate } from "react-router-dom";

const CitizenProfile = () => {
  // Retrieve citizen data from localStorage
  const citizenData = JSON.parse(localStorage.getItem("citizen"));
const navigate = useNavigate();

  if (!citizenData) {
    return (
      <div className="profile-container">
        <h2>No Citizen Data Found</h2>
        <p>Please log in to view your profile.</p>
      </div>
    );
  }
  const edit = ()=>{
    navigate('/updatecitizenprofile')
  }

  return (
    <div className="profile-container">
      <h1>Your Profile</h1>
      <div className="profile-card">
        <div className="profile-item">
          <strong>Name:</strong> {citizenData.name}
        </div>
        <div className="profile-item">
          <strong>Email:</strong> {citizenData.email}
        </div>
        <div className="profile-item">
          <strong>Mobile:</strong> {citizenData.mobile}
        </div>
        <div className="profile-item">
          <strong>Aadhaar Number:</strong> {citizenData.aadhaarnumber}
        </div>
        <div className="profile-item">
          <strong>Gender:</strong> {citizenData.gender}
        </div>
        <div className="profile-item">
          <strong>Date of Birth:</strong> {citizenData.dateofbirth}
        </div>
        <div className="profile-item">
          <strong>State:</strong> {citizenData.state}
        </div>
        
        <button class="button-7" onClick={edit}>Edit Profile</button>
      </div>
    </div>
  );
};

export default CitizenProfile;
