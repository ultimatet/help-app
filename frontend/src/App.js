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
import AuthPage from "./components/AuthPage"; 
import Report from "./components/Report";
import supabase from "./lib/supabase";
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
    const [session, setSession] = useState(null);
    const [user, setUser] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // 1) On mount, get current session (and user) if any
        supabase.auth.getSession().then(({ data: { session } }) => {
            setSession(session);
            setUser(session?.user ?? null);
            setIsLoading(false);
        });

        // 2) Subscribe to auth changes (login, logout, token refresh…)
        const { data: {subscription} } = supabase.auth.onAuthStateChange((_event, session) => {
            setSession(session);
            setUser(session?.user ?? null);
        });

        return () => subscription.unsubscribe();
    }, []);

    if (isLoading) {
        return (
            <div className="App">
                <Header user={user} />
                <div className="container">
                    <div className="loading-container">
                        <ReactLoading
                            className="loading"
                            type={"spin"}
                            color={"#000000"}
                            height={100}
                            width={100}
                        />
                    </div>
                </div>
                <Footer />
            </div>
        );
    }

    return (
        <div className="App">
            <Header user={user}/>
            <ScrollToTop />
            <div className="container">
                <Routes>
                    <Route path="/" element={<Navigate to="/home" replace />} />
                    <Route path="/home" element={<Home />} />
                    <Route path="/login" element={<AuthPage initialView="sign_in" />} />
                    <Route path="/register" element={<AuthPage initialView="sign_up" />} />
                    <Route path="/quiz" element={<Quiz loading={isLoading} setLoading={setIsLoading}/>} />
                    <Route path="/report" element={<Report session={session} user={user}/>} />
                    <Route path="/about" element={<About />} />
                    <Route path="/resource" element={<Resource />} />
                    <Route path="/org" element={<Org />} />
                    <Route path="/contact" element={<Contact />} />
                    <Route path="/profile" element={<Profile session={session} user={user}/>} />
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="*" element={<Navigate to="/home" replace />} />
                </Routes>
            </div>
            <Footer />
        </div>
    );
}

export default App;
