import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';

function Login({ userData, setUserData }) {
  const navigate = useNavigate();
//   const handleLogin = () => {
//     // Add authentication logic here 
//     navigate('/instructions');
//   };

  return (
    <div className="login-card">
      <h1 className="login-title">Login</h1>
      <div className="form-group">
        <label className="form-label" htmlFor="email">
          Email
        </label>
        <input
          type="email"
          id="email"
          className="form-input"
          value={userData.email}
          onChange={(e) => setUserData({ ...userData, email: e.target.value })}
        />
      </div>
      <div className="form-group">
        <label className="form-label" htmlFor="password">
          Password
        </label>
        <input
          type="password"
          id="password"
          className="form-input"
          value={userData.password}
          onChange={(e) => setUserData({ ...userData, password: e.target.value })}
        />
      </div>
      <div className="button-group">
        <button
          className="btn btn-back"
          onClick={() => navigate('/')}
        >
          Back
        </button>
        <button
          className="btn btn-login"
        //   onClick={handleLogin}
          onClick={() => navigate('/quiz')}
        >
          Login
        </button>
      </div>
    </div>
  );
}

export default Login;