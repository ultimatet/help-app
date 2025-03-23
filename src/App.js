import React from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import Quiz from './components/Quiz';
import './App.css';

function App() {
  return (
    <div className="App">
      <Header />
      <main>
        <Quiz />
      </main>
      <Footer />
    </div>
  );
}

export default App;