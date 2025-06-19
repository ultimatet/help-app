import React, { useEffect, useState } from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Quiz from "./components/Quiz";
import Home from "./components/Home";
import Contact from "./components/Contact";
import Profile from "./components/Profile";
import About from "./components/About";
import Resource from "./components/Resource";
import Org from "./components/Org";
import Dashboard from "./components/Dashboard";

import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import ReactLoading from "react-loading";
import "./App.css";

function ScrollToTop() {
    const { pathname } = useLocation();
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname]);

    return null;
}

function App() {

    // Remove Supabase Auth UI from here, login is now handled in Header
    return (
        <div className="App">
            <Header />
            <ScrollToTop />
            <div className="container">
                <Routes>
                    <Route path="/" element={<Navigate to="/home" replace />} />
                    <Route path="/home" element={<Home />} />
                    <Route path="/quiz" element={<Quiz />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/resource" element={<Resource />} />
                    <Route path="/org" element={<Org />} />
                    <Route path="/contact" element={<Contact />} />
                    <Route path="/profile" element={<Profile />} />
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="*" element={<Navigate to="/home" replace />} />
                </Routes>
            </div>
            <Footer />
        </div>
    );
}

export default App;
