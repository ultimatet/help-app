import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Register.css'; // Import the CSS file

function Register({ userData, setUserData }) {
  const navigate = useNavigate();

//   const handleRegister = () => {
//     // Add registration logic here if needed
//     navigate('/instructions');
//   };

  return (
    <div className="register-card">
      <h1 className="register-title">Create Account</h1>
      <div className="form-group">
        <label className="form-label" htmlFor="name">
          Full Name
        </label>
        <input
          type="text"
          id="name"
          className="form-input"
          value={userData.name}
          onChange={(e) => setUserData({ ...userData, name: e.target.value })}
        />
      </div>
      <div className="form-group">
        <label className="form-label" htmlFor="reg-email">
          Email
        </label>
        <input
          type="email"
          id="reg-email"
          className="form-input"
          value={userData.email}
          onChange={(e) => setUserData({ ...userData, email: e.target.value })}
        />
      </div>
      <div className="form-group">
        <label className="form-label" htmlFor="reg-password">
          Password
        </label>
        <input
          type="password"
          id="reg-password"
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
          className="btn btn-register"
        //   onClick={handleRegister}
            onClick={() => navigate('/quiz')}
        >
          Register
        </button>
      </div>
    </div>
  );
}

export default Register;