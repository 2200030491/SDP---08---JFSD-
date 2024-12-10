import React from 'react';
import { useNavigate } from 'react-router-dom';
import './AdminNavBar.css';

export default function Manage() {
  const navigate = useNavigate();

  const handleNavigation = (path) => {
    navigate(path);
  };

  return (
    <div className="manage-container">
      <h1 className="manage-heading">Manage Portal</h1>
      <div className="manage-buttons">
        <button className="manage-btn" onClick={() => handleNavigation('/addcitizens')}>
          Add Citizens
        </button>
        <button className="manage-btn" onClick={() => handleNavigation('/addpoliticians')}>
          Add Politicians
        </button>
        <button className="manage-btn" onClick={() => handleNavigation('/viewcitizens')}>
          View Citizens
        </button>
        <button className="manage-btn" onClick={() => handleNavigation('/viewpoliticians')}>
          View Politicians
        </button>
      </div>
    </div>
  );
}
