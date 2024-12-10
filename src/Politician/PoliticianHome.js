import React, { useEffect, useState } from 'react';
import './PoliticianNavBar.css';
import { useNavigate } from 'react-router-dom';

export default function PoliticianHome() {
  const [politicianData, setPoliticianData] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    const storedPoliticianData = localStorage.getItem('politician');
    if (storedPoliticianData) {
      const parsedPoliticianData = JSON.parse(storedPoliticianData);
      setPoliticianData(parsedPoliticianData);
    }
  }, []);

  const issues = ()=>{
    navigate("/politicianissues")
  }
  const schemes = ()=>{
    navigate("/politicianschemes")
  }

  return (
    <div className="politician-home-container">
      <h1>Welcome {politicianData.name || "Politician"}</h1>

      <div className="cards-container">
        {/* Issues Card */}
        <div className="card">
          <h2>Issues</h2>
          <p>View and manage reported issues from citizens.</p>
          <button className="card-button" onClick={issues}>View Issues</button>
        </div>

        {/* Government Schemes Card */}
        <div className="card">
          <h2>Government Schemes</h2>
          <p>Explore and manage government schemes for your constituency.</p>
          <button className="card-button" onClick={schemes}>View Schemes</button>
        </div>
      </div>
    </div>
  );
}
