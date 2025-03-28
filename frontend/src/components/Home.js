import { useAuth0 } from "@auth0/auth0-react";
import React from "react";
import "./Home.css";

const LogoutButton = () => {
  const { isAuthenticated, user, logout } = useAuth0();

  return (
    <div className="container">
        {isAuthenticated && user && (
          <div>
            <p className="welcome-text">Welcome, {user.name}</p>
          </div>
        )}
        <h1>Take quiz</h1>
        <p>Click the button below to start the quiz</p>
        <button onClick={() => window.location.replace("/quiz")} className="btn">Start Quiz</button>
        <h1>Logout</h1>
        <button 
            className="btn"
            onClick={() =>
            logout({
                returnTo: window.location.origin,
            })
            }
        >
            Log Out
        </button>
        {/* Show user info if logged in */}
        
    </div>
  );
};

export default LogoutButton;