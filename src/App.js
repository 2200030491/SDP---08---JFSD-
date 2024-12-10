
import './App.css';
import { BrowserRouter, BrowserRouter as Router } from 'react-router-dom';
import NavBar from './Main/NavBar';
import { useEffect, useState } from 'react';
import AdminNavBar from './Admin/AdminNavBar';
import CitizenNavBar from './Citizen/CitizenNavBar';
import PoliticianNavBar from './Politician/PoliticianNavBar';
function App() {

  const [isAdminLogIn,setIsAdminLoggedIn] = useState(false)
  const [isCitizenLogIn,setIsCitizenLoggedIn] = useState(false)
  const [isPoliticianLogIn,setIsPoliticianLoggedIn] = useState(false)
  
  useEffect(() => {
    const adminLoggedIn = localStorage.getItem('isAdminLogIn') === 'true';
    const citizenLoggedIn = localStorage.getItem('isCitizenLogIn') === 'true';
    const politicianLoggedIn = localStorage.getItem('isPoliticianLogIn') === 'true';
   
    setIsAdminLoggedIn(adminLoggedIn);
    setIsCitizenLoggedIn(citizenLoggedIn);
    setIsPoliticianLoggedIn(politicianLoggedIn);
  }, [])
  
 
  const onAdminLogin = ()=>{
    localStorage.setItem('isAdminLogIn','true')
    setIsAdminLoggedIn(true)
  }

  const onCitizenLogin = ()=>{
    localStorage.setItem('isCitizenLogIn','true')
    setIsCitizenLoggedIn(true)
  }

  const onPoliticianLogin = ()=>{
    localStorage.setItem('isPoliticianLogIn','true')
    setIsPoliticianLoggedIn(true)
  }
  return (
    <div className="App">

      <Router>
        {
          isAdminLogIn ? (
            <AdminNavBar/>
          ):isCitizenLogIn ? (
            <CitizenNavBar/>
          ):isPoliticianLogIn ? (
            <PoliticianNavBar/>
          ):(
            <NavBar onAdminLogin={onAdminLogin} onCitizenLogin={onCitizenLogin} onPoliticianLogin={onPoliticianLogin}/>
          )
        }
      </Router>
    </div>
  );  
}

export default App;
