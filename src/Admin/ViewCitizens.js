import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Admin.css"; // Optional CSS for styling
import { useNavigate } from "react-router-dom";
import config from "../Main/config";

export default function ViewCitizens() {
  const [citizens, setCitizens] = useState([]);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    const fetchCitizens = async () => {
      try {
        const response = await axios.get(`${config.url}/admin/viewallcitizens`);
        setCitizens(response.data);
      } catch (error) {
        console.error("Error fetching citizens:", error);
        setError("Failed to fetch citizens data. Please try again later.");
      }
    };

    fetchCitizens();
  }, []);

  const displayCitizen = async (id) => 
    {
        try 
        {
          navigate(`/viewcitizen/${id}`)
          console.log(id)
        } 
        catch (error) 
        {
          console.error(error.message);
        }
    
    }

  return (
    <div className="view-politician-container">
      <h1>Citizens List</h1>
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
              <th>State</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {citizens.length > 0 ? (
              citizens.map((c) => (
                <tr key={c.id}>
                  <td>{c.id}</td>
                  <td>{c.name}</td>
                  <td>{c.email}</td>
                  <td>{c.gender}</td>
                  <td>{c.dateofbirth}</td>
                  <td>{c.aadhaarnumber}</td>
                  <td>{c.mobile}</td>
                  <td>{c.state}</td>
                  <td>
                    <button className="view-button" style={{ marginLeft: '10px' }} onClick={()=>displayCitizen(c.id)}>View</button></td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="9" className="no-data">
                  No Citizens found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      )}
    </div>
  );
}
