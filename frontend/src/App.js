import React from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import Quiz from './components/Quiz';
import Welcome from './components/Welcome';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth0 } from "@auth0/auth0-react";
import './App.css';

function App() {
  const { isAuthenticated } = useAuth0();

  return (
    <div className="App">
      <Header />
      <div className="container">
        <Routes>
          <Route path="/" element={<Welcome />} />

          {/* Protected Route */}
          <Route path="/quiz" element={isAuthenticated ? <Quiz /> : <Navigate to="/" />} />

          {/* Catch-all route */}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>

        {/* Logout Button */}
        {/* {isAuthenticated && (
          <button onClick={() => logout({ logoutParams: { returnTo: window.location.origin } })}>
            Logout
          </button>
        )} */}

        {/* Show user info if logged in */}
        {/* {isAuthenticated && user && (
          <div>
            <p>Welcome, {user.name}</p>
            <p>Email: {user.email}</p>
          </div>
        )} */}
      </div>
      <Footer />
    </div>
  );
}

export default App;