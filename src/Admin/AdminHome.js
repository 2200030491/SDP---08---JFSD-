import React, { useEffect, useState } from 'react';
import { AiOutlineFileText, AiOutlineForm } from 'react-icons/ai';

export default function AdminHome() {
  const [adminData, setAdminData] = useState("");
  const [citizencount, setCitizenCount] = useState(null);
  const [politiciancount, setPoliticianCount] = useState(null);

  useEffect(() => {
    const storedAdminData = localStorage.getItem('admin');
    if (storedAdminData) {
      const parsedAdminData = JSON.parse(storedAdminData);
      setAdminData(parsedAdminData);
    }

    const fetchCitizenCount = async () => {
      try {
        const response = await fetch('http://localhost:2020/admin/citizencount');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setCitizenCount(data);
      } catch (error) {
        console.error('Error fetching citizen count:', error);
      }
    };

    const fetchPoliticianCount = async () => {
      try {
        const response = await fetch('http://localhost:2020/admin/politiciancount');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setPoliticianCount(data);
      } catch (error) {
        console.error('Error fetching politician count:', error);
      }
    };

    fetchCitizenCount();
    fetchPoliticianCount();
  }, []);

  // Inline styles
  const containerStyle = {
    textAlign: 'center',
    padding: '20px',
    fontFamily: 'Arial, sans-serif',
    backgroundColor: '#f7f9fc',
    minHeight: '100vh',
  };

  const cardsStyle = {
    display: 'flex',
    justifyContent: 'center',
    gap: '20px',
    marginTop: '20px',
    flexWrap: 'wrap',
  };

  const cardStyle = {
    background: '#fff',
    borderRadius: '10px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    padding: '20px',
    width: '200px',
    textAlign: 'center',
    transition: 'transform 0.3s, box-shadow 0.3s',
    border: '1px solid #e1e8ed',
  };

  const cardHoverStyle = {
    transform: 'translateY(-10px)',
    boxShadow: '0 8px 16px rgba(0, 0, 0, 0.2)',
  };

  const iconStyle = {
    fontSize: '3rem',
    marginBottom: '10px',
  };

  const citizenIconStyle = {
    ...iconStyle,
    color: '#007bff',
  };

  const politicianIconStyle = {
    ...iconStyle,
    color: '#ff5722',
  };

  const textStyle = {
    fontSize: '1.5rem',
    marginBottom: '10px',
    color: '#555',
  };

  const countStyle = {
    fontSize: '2rem',
    fontWeight: 'bold',
    color: '#333',
  };

  return (
    <div style={containerStyle}>
      <h1>Welcome {adminData.username || 'Admin'}</h1>
      <div style={cardsStyle}>
        {citizencount !== null && (
          <div
            style={{
              ...cardStyle,
              ':hover': cardHoverStyle, // Simulating hover effects
            }}
          >
            <AiOutlineFileText style={citizenIconStyle} />
            <h2 style={textStyle}>Citizen Count</h2>
            <p style={countStyle}>{citizencount}</p>
          </div>
        )}
        {politiciancount !== null && (
          <div
            style={{
              ...cardStyle,
              ':hover': cardHoverStyle, // Simulating hover effects
            }}
          >
            <AiOutlineForm style={politicianIconStyle} />
            <h2 style={textStyle}>Politician Count</h2>
            <p style={countStyle}>{politiciancount}</p>
          </div>
        )}
      </div>
    </div>
  );
}
