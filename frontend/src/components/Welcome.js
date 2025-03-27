import React from 'react';
import { Link } from 'react-router-dom';
import './Welcome.css';

function Welcome() {
  return (
    <div className="welcome-card">
      <h1 className="welcome-title">Death Literacy Assessment</h1>
      <p className="welcome-description">
        Welcome to our interactive assessment platform that helps you understand and improve your knowledge about end-of-life matters.
      </p>
      <div className="welcome-links">
        <Link to="/login" className="welcome-link">Login</Link>
        <Link to="/register" className="welcome-link">Register</Link>
      </div>
    </div>
  );
}

export default Welcome;