import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../Citizen/CitizenNavBar.css';
import config from '../Main/config';
export default function PoliticianIssues() {
  const [politicianData, setPolticianData] = useState('');
  const [issues, setIssues] = useState([]);

  useEffect(() => {
    const storedpoliticianData = localStorage.getItem('politician');
    if (storedpoliticianData) {
      const parsedPoliticianData = JSON.parse(storedpoliticianData);
      setPolticianData(parsedPoliticianData);

      // Fetch issues for the logged-in citizen
      axios.get(`${config.url}/politician/viewallissues`)
        .then((response) => {
          setIssues(response.data);
        })
        .catch((error) => {
          console.error('Error fetching issues:', error);
        });
    }
  }, []);

  return (
    <div className="citizen-home-container">
     

      <h2>Issues</h2>
      {issues.length === 0 ? (
        <p>You have not reported any issues yet.</p>
      ) : (
        <div className="issues-list">
          {issues.map((issue) => (
            <div className="issue-card" key={issue.id}>
              <h3>{issue.description}</h3>
              <p><strong>Constituency:</strong> {issue.constituency}</p>
              <p><strong>Status:</strong> {issue.status}</p>
              {issue.image_url && (
                <img
                  src={issue.image_url}
                  alt="Issue"
                  className="issue-image"
                />
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
