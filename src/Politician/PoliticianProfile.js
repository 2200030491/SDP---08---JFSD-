import React from "react";
import "./PoliticianNavBar.css";
import { useNavigate } from "react-router-dom";

const PoliticianProfile = () => {
  // Retrieve politician data from localStorage
  const politicianData = JSON.parse(localStorage.getItem("politician"));
  const navigate = useNavigate();

  if (!politicianData) {
    return (
      <div className="profile-container">
        <h2>No Politician Data Found</h2>
        <p>Please log in to view your profile.</p>
      </div>
    );
  }

  const edit = () => {
    navigate('/updatepoliticianprofile');
  };

  return (
    <div className="profile-container">
      <h1>Your Profile</h1>
      <div className="profile-card">
        <div className="profile-item">
          <strong>Name:</strong> {politicianData.name}
        </div>
        <div className="profile-item">
          <strong>Email:</strong> {politicianData.email}
        </div>
        <div className="profile-item">
          <strong>Mobile:</strong> {politicianData.mobile}
        </div>
        <div className="profile-item">
          <strong>Constituency:</strong> {politicianData.constituency}
        </div>
        <div className="profile-item">
          <strong>Party:</strong> {politicianData.party}
        </div>
        <div className="profile-item">
          <strong>State:</strong> {politicianData.state}
        </div>
        <div className="profile-item">
          <strong>Experience:</strong> {politicianData.experience} years
        </div>
        
        <button className="button-7" onClick={edit}>Edit Profile</button>
      </div>
    </div>
  );
};

export default PoliticianProfile;
