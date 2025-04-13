import { useAuth0 } from "@auth0/auth0-react";
import React from "react";
import { Link } from "react-router-dom";
import "./Home.css";

const Home = () => {
  const { isAuthenticated, user, logout } = useAuth0();

  const handleLogout = () => {
    logout({ logoutParams: { 
        returnTo: window.location.origin
      } });
  }

  return (
    <div className="container">
        {isAuthenticated && user && (
          <div>
            <p className="welcome-text">Welcome, {user.name}</p>
          </div>
        )}
        <h1>Take quiz</h1>
        <p>Click the button below to start the quiz</p>
        <Link to="/quiz" className="link-btn">Start Quiz</Link>
        <h1>View Report</h1>
        <p>Click the button below to view your report</p> 
        <Link to="/report" className="link-btn">View Report</Link>
        <h1>Logout</h1>
        <button className="btn" onClick={handleLogout}>
          Log Out
        </button>  
    </div>
  );
};

export default Home;