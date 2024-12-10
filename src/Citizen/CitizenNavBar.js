import React from 'react'
import logo from '../images/NavbarLogo.png'
import { Route, Routes, useNavigate } from 'react-router-dom'
import CitizenHome from './CitizenHome'
import Issues from './Issues'
import CitizenProfile from './CitizenProfile'
import './CitizenNavBar.css'
import UpdateProfile from './UpdateProfile'

export default function CitizenNavBar() 
{
  const navigate = useNavigate()
  const logout = ()=>{
    localStorage.removeItem('isCitizenLogIn')
    localStorage.removeItem('citizen')
    navigate('/citizen');
    window.location.reload();
  }

  return (
    <div>
       <div>
        <nav className="navbar">
      <div className="navbar-logo">
        <img src={logo} alt="Praja Seva Logo" />
        <span>Praja Seva</span>
      </div>
      <ul className="navbar-links">
        <li><a href="/citizenhome">Home</a></li>
        <li><a href="/citizenissues">Issues</a></li>
        <li><a href="/citizenprofile">Profile</a></li>
        
      </ul>
      <div className="navbar-actions">
        <button className="signin-btn" onClick={logout}>Logout</button>
      </div>
    </nav>
    <Routes>
     <Route path="/citizenhome" element={<CitizenHome/>} />
     <Route path="/citizenissues" element={<Issues/>} />
     <Route path="/citizenprofile" element={<CitizenProfile/>} />
     <Route path="/updatecitizenprofile" element={<UpdateProfile/>}/>
    
     {/* <Route path="/register" element={<Registration/>} />
     <Route path="/contactus" element={<ContactUs/>} /> */}
     
  </Routes>
    </div>
    </div>
  )
}
