import React, { useState, useEffect } from "react";
import axios from "axios";
import "./PoliticianProfile.css"; // Form CSS
import config from "../Main/config";
export default function PoliticianSchemes() {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    deadline: "",
    eligibilityCriteria: "",
  });

  const [message, setMessage] = useState("");
  const [schemes, setSchemes] = useState([]); // State to store the list of schemes

  useEffect(() => {
    // Fetch all schemes when the component is mounted
    fetchSchemes();
  }, []);

  const fetchSchemes = async () => {
    try {
      const response = await axios.get(`${config.url}/politician/getschemes`);
      setSchemes(response.data); // Set schemes from the backend
    } catch (error) {
      console.error("Error fetching schemes:", error);
      setMessage("An error occurred while fetching the schemes.");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(`${config.url}/politician/insertscheme`, formData);

      if (response.status === 200) {
        setMessage("Scheme added successfully!");
        setFormData({
          name: "",
          description: "",
          deadline: "",
          eligibilityCriteria: "",
        });
        fetchSchemes(); // Refresh the list of schemes after adding a new one
      } else {
        setMessage("Failed to add the scheme. Please try again.");
      }
    } catch (error) {
      console.error("Error adding scheme:", error.response ? error.response.data : error.message);
      setMessage("An error occurred while adding the scheme. Please try again.");
    }
  };

  return (
    <div className="schemes-container">
      <h1>Add New Scheme</h1>
      {message && <p className="scheme-message">{message}</p>} {/* Feedback message */}
      <form onSubmit={handleSubmit} className="scheme-form">
        <div className="form-group">
          <label>Scheme Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Scheme Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Deadline</label>
          <input
            type="date"
            name="deadline"
            value={formData.deadline}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Eligibility Criteria</label>
          <textarea
            name="eligibilityCriteria"
            value={formData.eligibilityCriteria}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" className="submit-btn">
          Add Scheme
        </button>
      </form>

      <h2>Scheme List</h2>
      {schemes.length > 0 ? (
        <table className="schemes-table">
          <thead>
            <tr>
              <th>Scheme Name</th>
              <th>Description</th>
              <th>Deadline</th>
              <th>Eligibility Criteria</th>
            </tr>
          </thead>
          <tbody>
            {schemes.map((scheme) => (
              <tr key={scheme.id}>
                <td>{scheme.name}</td>
                <td>{scheme.description}</td>
                <td>{scheme.deadline}</td>
                <td>{scheme.eligibilityCriteria}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No schemes available.</p>
      )}
    </div>
  );
}
