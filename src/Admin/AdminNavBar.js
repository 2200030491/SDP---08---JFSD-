import React from 'react';
import logo from '../images/NavbarLogo.png';
import { Route, Routes, useNavigate } from 'react-router-dom';
import AdminHome from './AdminHome';
import Manage from './Manage';
import './AdminNavBar.css';
import Issues from '../Citizen/Issues';
import AddCitizen from './AddCitizen';
import AddPolitician from './AddPolitician';
import ViewCitizens from './ViewCitizens';
import ViewPoliticians from './ViewPoliticians';
import Citizen from './Citizen';
import Politician from './Politician';


export default function AdminNavBar() {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem('isAdminLogIn');
    localStorage.removeItem('admin');
    navigate('/citizen');
    window.location.reload();
  };

  return (
    <div>
      <nav className="navbar">
        <div className="navbar-logo">
          <img src={logo} alt="Praja Seva Logo" />
          <span>Praja Seva Admin</span>
        </div>
        <ul className="navbar-links">
          <li><a href="/adminhome">Home</a></li>
          <li><a href="/manageusers">Manage Users</a></li>
          <li><a href="/adminissues">Issues</a></li>
        </ul>
        <div className="navbar-actions">
          <button className="signin-btn" onClick={logout}>Logout</button>
        </div>
      </nav>
      <Routes>
        <Route path="/adminhome" element={<AdminHome />} />
        <Route path="/manageusers" element={<Manage />} />
        <Route path="/adminissues" element={<Issues />} />
        <Route path="/addcitizens" element={<AddCitizen />} />
        <Route path="/addpoliticians" element={<AddPolitician />} />
        <Route path="/viewcitizens" element={<ViewCitizens />} />
        <Route path="/viewpoliticians" element={<ViewPoliticians />} />
        <Route path="/viewcitizen/:id" element={<Citizen />} />
        <Route path="/viewpolitician/:id" element={<Politician />} />
      </Routes>
    </div>
  );
}
