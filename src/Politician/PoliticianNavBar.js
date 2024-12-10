import React from 'react'
import logo from '../images/NavbarLogo.png'
import { Route, Routes, useNavigate } from 'react-router-dom'
import './PoliticianNavBar.css'
import PoliticianHome from './PoliticianHome'

import PoliticianProfile from './PoliticianProfile'
import PoliticianIssues from './PoliticianIssues'
import PoliticianSchemes from './PoliticianSchemes'
import UpdatePoliticianProfile from './UpdatePoliticianProfile'

export default function PoliticianNavBar() 
{
 
  const navigate = useNavigate()
  const logout = ()=>{
    localStorage.removeItem('isPoliticianLogIn')
    localStorage.removeItem('politician')
    navigate('/politician');
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
        <li><a href="/politicianhome">Home</a></li>
        <li><a href="/politicianissues">Issues</a></li>
        <li><a href="/politicianprofile">Profile</a></li>
      </ul>
      <div className="navbar-actions">
        <button className="signin-btn" onClick={logout}>Logout</button>
      </div>
    </nav>
    <Routes>
     <Route path="/politicianhome" element={<PoliticianHome/>} />
     <Route path="/politicianissues" element={<PoliticianIssues/>} />
     <Route path="/politicianschemes" element={<PoliticianSchemes/>} />
     <Route path="/politicianprofile" element={<PoliticianProfile/>} />
     <Route path='/updatepoliticianprofile' element={<UpdatePoliticianProfile/>}/>
     {/* <Route path="/register" element={<Registration/>} />
     <Route path="/contactus" element={<ContactUs/>} /> */}

  </Routes>
    </div>
    </div>
  )
}
