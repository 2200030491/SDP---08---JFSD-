import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

export default function Citizen() {
  const [citizen, setCitizen] = useState(null);
  const { id } = useParams();

  const fetchCitizen = async () => {
    if (id) {
      try {
        const response = await axios.get(`http://localhost:2020/admin/viewcitizenbyid?id=${id}`);
        setCitizen(response.data);
        console.log(response.data);
      } catch (error) {
        console.error(error.message);
      }
    }
  };

  useEffect(() => {
    fetchCitizen();
  }, [id]);

  // Inline styles
  const cardStyle = {
    maxWidth: '400px',
    margin: '20px auto',
    padding: '20px',
    borderRadius: '10px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    backgroundColor: '#ffffff',
    fontFamily: 'Arial, sans-serif',
    lineHeight: '1.6',
    textAlign: 'left',
  };

  const fieldStyle = {
    margin: '10px 0',
    fontSize: '1rem',
    color: '#333',
  };

  const labelStyle = {
    fontWeight: 'bold',
    color: '#555',
  };

  const notFoundStyle = {
    color: 'red',
    fontWeight: 'bolder',
    textAlign: 'center',
    marginTop: '20px',
    fontFamily: 'Arial, sans-serif',
  };

  return citizen ? (
    <div style={cardStyle}>
      <p style={fieldStyle}>
        <span style={labelStyle}>ID:</span> {citizen.id}
      </p>
      <p style={fieldStyle}>
        <span style={labelStyle}>Name:</span> {citizen.name}
      </p>
      <p style={fieldStyle}>
        <span style={labelStyle}>Gender:</span> {citizen.gender}
      </p>
      <p style={fieldStyle}>
        <span style={labelStyle}>Date Of Birth:</span> {citizen.dateofbirth}
      </p>
      <p style={fieldStyle}>
        <span style={labelStyle}>Email:</span> {citizen.email}
      </p>
      <p style={fieldStyle}>
        <span style={labelStyle}>Aadhaar Number:</span> {citizen.aadhaarnumber}
      </p>
      <p style={fieldStyle}>
        <span style={labelStyle}>Contact Number:</span> {citizen.mobile}
      </p>
    </div>
  ) : (
    <p style={notFoundStyle}>Citizen Data Not Found</p>
  );
}
