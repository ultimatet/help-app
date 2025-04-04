import React, {useState} from 'react';
import { Link } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';
import './Header.css';

const Header = () => {
const [popup, setPopup] = useState(false);
const { loginWithRedirect, logout, user, isAuthenticated } = useAuth0();

const handleLogin = () => {
    loginWithRedirect({
      authorizationParams: {
        redirect_uri: window.location.origin
      }
    });
};

const handleLogout = () => {
    logout({
      returnTo: window.location.origin
    });
}

  return (
    <header className="header">
      <div className="header-right">
        <h1>HELP</h1>
        <nav className="nav">
          <ul className="nav-list">
            <li><Link to="/">About Death Literacy</Link></li>
            <li><Link to="/quiz">Take the assessment</Link></li>
            <li><Link to="/resource">Resource & Support</Link></li> 
            <li><Link to="/org">For Organisations</Link></li>
            <li><Link to="/contact">Contact Us</Link></li>
            <li>
              <button className='user-icon' onClick={() => setPopup(!popup)}>
                <img alt='user' src='/pic/person.png'/>
              </button>
            </li>
          </ul>
        </nav>
        <div className="hero">
          <img src="/pic/bud-hold.jpg" alt="Hero" className="hero-image" />
        </div>
      </div>
      {popup && (
        <div className="popup-overlay">
          <div className="popup-content">
            {isAuthenticated ? (
              <>
                <h2>Welcome {user?.name}</h2>
                <button onClick={handleLogout}>Sign Out</button>
              </>
            ) : (
              <>
                <h2>Sign In</h2>
                <button onClick={handleLogin}>Sign In</button>
              </>
            )}
            <button className="close-btn" onClick={() => setPopup(false)}>Close</button>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;