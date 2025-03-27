import React, {useState} from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import Quiz from './components/Quiz';
import Welcome from './components/Welcome';
import Login from './components/Login';
import Register from './components/Register';
import { BrowserRouter, Routes, Route, Navigate} from 'react-router-dom';
import './App.css';

function App() {
  const [userData, setUserData] = useState({
    email: '',
    password: '',
    name: ''
  });

  return (
    <div className="App">
      <Header />
      <div className="container">
        

        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Welcome/>} />
            <Route path="/login" element={<Login userData={userData} setUserData={setUserData}/>} />
            <Route path="/register" element={<Register userData={userData} setUserData={setUserData}/>} />
            <Route path="/quiz" element={<Quiz />} />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </BrowserRouter>
        

        
        
      </div>
      <Footer />
    </div>
  );
}

export default App;