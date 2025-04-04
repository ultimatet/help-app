import { useAuth0 } from "@auth0/auth0-react";
import React from "react";
import { Link } from "react-router-dom";
import "./Home.css";

const Home = () => {
  const { isAuthenticated, user } = useAuth0();

  return (
    <div className="container">
        {isAuthenticated && user && (
          <div>
            <p className="welcome-text">Welcome, {user.name}</p>
          </div>
          
        )} 
      <div className="home-content">
        <h1>Welcome to the Death Literacy Assessment</h1>
        <p>Take the quiz to assess your death literacy.</p>
        <Link to="/quiz" className="btn btn-primary">Take the Assessment</Link>
        </div>
        <div className="card-container">
          <div className="card">
            <h2>About Death Literacy</h2>
            <p>Learn about the importance of death literacy and how it can help you and your loved ones.</p>
            <Link to="/about" className="btn btn-secondary">Learn More</Link>
          </div>
          <div className="card">
            <h2>Resources & Support</h2>
            <p>Find resources and support for end-of-life planning.</p>
            <Link to="/resource" className="btn btn-secondary">Explore Resources</Link>
          </div>
          <div className="card">
            <h2>For Organisations</h2>
            <p>Discover how organisations can promote death literacy.</p>
            <Link to="/org" className="btn btn-secondary">Get Involved</Link>
          </div>
        </div>
    </div>
  );
};

export default Home;