import React from "react";
import "./NavBar.css";
import logo from '../images/NavbarLogo.png'
import { Route, Routes, useNavigate } from "react-router-dom";
import Home from "./Home";
import CitizenLogin from "./CitizenLogin";
import PoliticianLogin from "./PoliticianLogin";
import Registration from "./Registration";
import ContactUs from "./ContactUs";
import AdminLogin from "./AdminLogin";
export default function NavBar({onAdminLogin,onCitizenLogin,onPoliticianLogin})
{
const navigate = useNavigate();
    const register = ()=>{
        navigate("/register");
    }
    const signin = ()=>{
        navigate("/citizen");
    }
    
    // const logout = ()=>{
    //   localStorage.removeItem('isCitizenLogIn')
    //   localStorage.removeItem('citizen')
    //   navigate('/citizen');
    //   window.location.reload();
    // }
  return (
    <div>
        <nav className="navbar">
      <div className="navbar-logo">
        <img src={logo} alt="Praja Seva Logo" />
        <span>Praja Seva</span>
      </div>
      <ul className="navbar-links">
        <li><a href="/">Home</a></li>
        <li><a href="/citizen">Citizen</a></li>
        <li><a href="/politician">Politicians</a></li>
        <li><a href="/contactus">Contact</a></li>
      </ul>
          <div className="navbar-actions">
            <button className="signin-btn" onClick={signin}>Sign in</button>
            <button className="register-btn" onClick={register}>Register</button>
            {/* <button className="register-btn" onClick={logout}>Lgout</button> */}
          </div>
    </nav>
    <Routes>
     <Route path="/" element={<Home/>} />
     <Route path="/citizen" element={<CitizenLogin onCitizenLogin={onCitizenLogin}/>} />
     <Route path="/politician" element={<PoliticianLogin onPoliticianLogin={onPoliticianLogin} />} />
     <Route path="/adminlogin" element={<AdminLogin onAdminLogin={onAdminLogin} />} />
     <Route path="/register" element={<Registration/>} />
     <Route path="/contactus" element={<ContactUs/>} />

  </Routes>
    </div>
    
  );
 
};
