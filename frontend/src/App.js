import React from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import Quiz from './components/Quiz';
import Welcome from './components/Welcome';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useAuth0 } from "@auth0/auth0-react";
import './App.css';

function App() {
  const { isAuthenticated, loginWithRedirect, logout, user } = useAuth0();

  return (
    <div className="App">
      <Header />
      <div className="container">
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Welcome />} />

            {/* Login and Register are handled via Auth0 */}
            <Route path="/login" element={isAuthenticated ? <Navigate to="/" /> : <button onClick={() => loginWithRedirect()}>Login</button>} />
            <Route path="/register" element={isAuthenticated ? <Navigate to="/" /> : <button onClick={() => loginWithRedirect()}>Register</button>} />

            {/* Protected Route */}
            <Route path="/quiz" element={isAuthenticated ? <Quiz /> : <Navigate to="/login" />} />

            {/* Catch-all route */}
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </BrowserRouter>

        {/* Logout Button */}
        {isAuthenticated && (
          <button onClick={() => logout({ logoutParams: { returnTo: window.location.origin } })}>
            Logout
          </button>
        )}

        {/* Show user info if logged in */}
        {isAuthenticated && user && (
          <div>
            <p>Welcome, {user.name}</p>
            <p>Email: {user.email}</p>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
}

export default App;
