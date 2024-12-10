import React from 'react'
import leaderImage from '../images/leaderImage.png'
import { useNavigate } from 'react-router-dom'
export default function Home() {
  const navigate = useNavigate();
  const raiseissue = ()=>{
    navigate("/citizen")
  }
  const register = ()=>{
    navigate("/register")
  }
  return (
    <div>
      <div className="main-section">
      <div className="content">
        <h1>Connecting Citizens and Leaders for a Better Tomorrow!</h1>
        <p>
          Welcome to a platform that strengthens the relationship between you
          and your elected representatives. Report issues that matter, provide
          valuable feedback, and stay updated on the actions and responses from
          your leaders. Together, we can drive transparency, accountability,
          and meaningful change in our communities.
        </p>
        <div className="buttons">
          <button className="raise-issue-btn" onClick={raiseissue}>Raise an issue</button>
          <button className="register-btn" onClick={register}>Register now</button>
        </div>
      </div>
      <div className="image">
        <img src={leaderImage} alt="Leader illustration" />
      </div>
    </div>
    </div>
  )
}
