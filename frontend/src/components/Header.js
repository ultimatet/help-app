import React, {useState, useEffect} from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';
import './Header.css';

const Header = () => {
const [popup, setPopup] = useState(false);
const { loginWithRedirect, logout, user, isAuthenticated } = useAuth0();
const [scrolled, setScrolled] = useState(false);
const location = useLocation();


useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 15;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [scrolled]);

useEffect(() => {
    let isAnimating = false;
    let timeout;
    const handleWheel = (e) => {
    if (location.pathname !== '/home' || window.scrollY !== 0 || isAnimating || e.deltaY <= 0) return;

    e.preventDefault();
    isAnimating = true;

    // Only allow downward scroll (positive deltaY)
    if (e.deltaY > 0) {
      window.scrollBy({
        top: window.innerHeight,
        behavior: 'smooth'
      });
    }


    timeout = setTimeout(() => {
      isAnimating = false;
    }, 300); // Matches scroll duration
  };

    window.addEventListener('wheel', handleWheel, { passive: false });
    return () => window.removeEventListener('wheel', handleWheel);
  }, [location.pathname]);  

const handleLogin = () => {
    loginWithRedirect({
      authorizationParams: {
        redirect_uri: window.location.origin
      }
    });
};

const handleRegister = () => {
    loginWithRedirect({
      authorizationParams: {
        screen_hint: 'signup',
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
        <nav className={`nav ${scrolled ? 'scrolled' : ''}`}>

          <h1 id='logo'><Link to="/">HELP.</Link></h1>  

          <ul className="nav-list">
            <li><Link to="/about">About Death Literacy</Link></li>
            <li><Link to="/quiz">Take the assessment</Link></li>
            <li><Link to="/resource">Resource & Support</Link></li> 
            <li><Link to="/org">For Organisations</Link></li>
            <li><Link to="/contact">Contact Us</Link></li>
          </ul>
          <button className='user-icon' onClick={() => setPopup(!popup)}>
              <img alt='user' src='/pic/person.png'/>
            </button>
        </nav>
        <div className="hero">
          <img src="/pic/hero-plant.png" alt="Hero" className="hero-image" />
          <div className="hero-text">
            <h1>Be informed. Be prepared.</h1>
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
                <h2>Sign Up</h2>
                <p>Don't have an account? Create one now!</p>
                <button onClick={handleRegister}>Sign Up</button>
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