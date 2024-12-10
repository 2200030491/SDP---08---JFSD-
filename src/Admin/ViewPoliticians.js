import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function ViewPolitician() {
  const [politicians, setPoliticians] = useState([]);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    const fetchPoliticians = async () => {
      try {
        const response = await axios.get("http://localhost:2020/admin/viewpoliticians");
        setPoliticians(response.data);
      } catch (error) {
        console.error("Error fetching politicians:", error);
        setError("Failed to fetch politician data. Please try again later.");
      }
    };

    fetchPoliticians();
  }, []);

  const displayPolitician = (id) => {
    try {
      navigate(`/viewpolitician/${id}`);
      console.log(id);
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <div className="view-politician-container">
      <h1>Politician List</h1>
      {error ? (
        <p className="error">{error}</p>
      ) : (
        <table className="politician-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Gender</th>
              <th>Date of Birth</th>
              <th>Position</th>
              <th>Party</th>
              <th>Contact</th>
              <th>State</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {politicians.length > 0 ? (
              politicians.map((politician) => (
                <tr key={politician.id}>
                  <td>{politician.id}</td>
                  <td>{politician.name}</td>
                  <td>{politician.email}</td>
                  <td>{politician.gender}</td>
                  <td>{politician.dateofbirth}</td>
                  <td>{politician.position}</td>
                  <td>{politician.party}</td>
                  <td>{politician.contact}</td>
                  <td>{politician.state}</td>
                  <td>
                    <button
                      className="view-button"
                      style={{ marginLeft: "10px" }}
                      onClick={() => displayPolitician(politician.id)}
                    >
                      View
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="10" className="no-data">
                  No politicians found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      )}
    </div>
  );
}
