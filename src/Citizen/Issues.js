import React, { useEffect, useState } from 'react';
import './CitizenProfile.css';
import axios from 'axios';
import config from '../Main/config';

function Issues() {
  const [formData, setFormData] = useState({
    description: '',
    image_url: '',
    constituency: '',
  });
  const [citizenData, setCitizenData] = useState('');
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    const storedCitizenData = localStorage.getItem('citizen');
    if (storedCitizenData) {
      const parsedCitizenData = JSON.parse(storedCitizenData);
      setCitizenData(parsedCitizenData);
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const citizenId = citizenData.id;
      const response = await axios.post(
        `${config.url}/citizen/${citizenId}/issues`,
        formData
      );

      if (response.status === 200) {
        setMessage('🎉 Issue created successfully!');
        setFormData({
          description: '',
          image_url: '',
          constituency: '',
        });
      } else {
        setMessage('❌ Issue creation failed. Please try again.');
      }
    } catch (error) {
      setMessage('❌ Issue creation failed. Please try again.');
    }
  };

  return (
    <div className="add-citizen-container">
      <h2>Post Your Issue</h2>
      {message && <p className="form-message">{message}</p>}
      <form className="add-citizen-form" onSubmit={handleSubmit}>
        <label>Description</label>
        <input
          type="text"
          name="description"
          value={formData.description}
          onChange={handleChange}
          required
          placeholder="Enter Issue Description"
        />

        <label>Image URL</label>
        <input
          type="text"
          name="image_url"
          value={formData.image_url}
          onChange={handleChange}
          required
          placeholder="Enter Image Link"
        />

        <label>Constituency</label>
        <input
          type="text"
          name="constituency"
          value={formData.constituency}
          onChange={handleChange}
          required
          placeholder="Enter Constituency"
        />

        <button type="submit" className="submit-button">
          Add Issue
        </button>
      </form>
    </div>
  );
}

export default Issues;
