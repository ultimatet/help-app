import React from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import Quiz from './components/Quiz';
import Welcome from './components/Welcome';
import Home from './components/Home';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth0 } from "@auth0/auth0-react";
import ReactLoading from "react-loading";
import './App.css';

function App() {
  const { isAuthenticated, isLoading } = useAuth0();

  if (isLoading) {
    return <div className="App">
      <Header />
      <div className="container">
        <div className="loading-container">
          <ReactLoading className='loading'type={"spin"} color={"#000000"} height={100} width={100} />
        </div>
      </div>
      <Footer />
    </div>;
  }

  return (
    <div className="App">
      <Header />
      <div className="container">
        <Routes>
          <Route path="/" element={<Navigate to="/home" />} />
          <Route path="/home" element={isAuthenticated ? <Home /> : <Welcome />} />
          <Route path="/welcome" element={<Welcome />} />
          <Route path="/quiz" element={isAuthenticated ? <Quiz /> : <Welcome />} />

          {/* Catch-all route */}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>

        
      </div>
      <Footer />
    </div>
  );
}

export default App;