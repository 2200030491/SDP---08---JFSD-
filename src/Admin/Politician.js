import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import config from '../Main/config';
export default function Politician() {
  const [politician, setPolitician] = useState(null);
  const { id } = useParams();

  const fetchPolitician = async () => {
    if (id) {
      try {
        const response = await axios.get(`${config.url}/admin/viewpoliticianbyid?id=${id}`);
        setPolitician(response.data);
        console.log(response.data);
      } catch (error) {
        console.error(error.message);
      }
    }
  };

  useEffect(() => {
    fetchPolitician();
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

  return politician ? (
    <div style={cardStyle}>
      <p style={fieldStyle}>
        <span style={labelStyle}>ID:</span> {politician.id}
      </p>
      <p style={fieldStyle}>
        <span style={labelStyle}>Name:</span> {politician.name}
      </p>
      <p style={fieldStyle}>
        <span style={labelStyle}>Gender:</span> {politician.gender}
      </p>
      <p style={fieldStyle}>
        <span style={labelStyle}>Date Of Birth:</span> {politician.dateofbirth}
      </p>
      <p style={fieldStyle}>
        <span style={labelStyle}>Email:</span> {politician.email}
      </p>
      <p style={fieldStyle}>
        <span style={labelStyle}>Position:</span> {politician.position}
      </p>
      <p style={fieldStyle}>
        <span style={labelStyle}>Party:</span> {politician.party}
      </p>
      <p style={fieldStyle}>
        <span style={labelStyle}>Contact Number:</span> {politician.contact}
      </p>
      <p style={fieldStyle}>
        <span style={labelStyle}>State:</span> {politician.state}
      </p>
    </div>
  ) : (
    <p style={notFoundStyle}>Politician Data Not Found</p>
  );
}
