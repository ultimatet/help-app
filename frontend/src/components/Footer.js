import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <p>&copy; 2025 Healthy End of Life Program </p>
      <div className="feedback-section">
        <p>We would appreciate your feedback</p>
        <Link to="/feedback" className="feedback-btn">Give Feedback</Link>
      </div>
      
    </footer>
  );
};

export default Footer;