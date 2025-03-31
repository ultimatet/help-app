import React, {useState} from 'react';
import { Link } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';
import './Header.css';

const Header = () => {
const {popUp, setPopUp} = useState(false);
const { loginWithRedirect, logout, user } = useAuth0();

const handlePopUp = () => {
  setPopUp(!popUp);
  
  return (
    <div className="container">
      <div className="pop-up">
        <h2>Welcome {user.name}</h2>
        <h2>Sign-In</h2>
        <button onClick={handlePopUp}>Sign-In</button>
        <h2>Close</h2>
        <button onClick={handlePopUp}>Close</button>
      </div>
    </div>
    
  );
}

const handleLogin = () => {
    loginWithRedirect({
      authorizationParams: {
        redirect_uri: window.location.origin
      }
    });
};

  return (
    <header className="header">
      <h1>HELP</h1>
      <nav className="nav">
        <ul className="nav-list">
          <li><Link to="/">About Death Literacy</Link></li>
          <li><Link to="/quiz">Take the assessment</Link></li>
          <li><Link to="/resource">Resource & Support</Link></li>
          <li><Link to="/org">For Organisations</Link></li>
          <li><Link to="/contact">Contact Us</Link></li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;