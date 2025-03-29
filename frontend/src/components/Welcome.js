import React, { useEffect } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import './Welcome.css';

function Welcome() {
  const { loginWithRedirect, error } = useAuth0();

  useEffect(() => {
    if (error) {
      console.error('Auth0 Error:', error);
    }
  }, [error]);

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

  return (
    <div className="welcome-card">
      <h1 className="welcome-title">Death Literacy Assessment</h1>
      <p className="welcome-description">
        Welcome to our interactive assessment platform that helps you understand and improve your knowledge about end-of-life matters.
      </p>
      <div className="welcome-links">
        <button onClick={handleLogin} className="welcome-link">Login</button>
        <button onClick={handleRegister} className="welcome-link">Register</button>
      </div>
    </div>
  );
}

export default Welcome;