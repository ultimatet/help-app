import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import supabase from "../lib/supabase";
import "./Header.css";

const Header = () => {
    const [popup, setPopup] = useState(false);
    const [user, setUser] = useState(null);
    const [userRole, setUserRole] = useState(null);
    const [scrolled, setScrolled] = useState(false);
    const location = useLocation();

    useEffect(() => {
        const handleScroll = () => {
            const isScrolled = window.scrollY > 10;
            if (isScrolled !== scrolled) {
                setScrolled(isScrolled);
            }
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, [scrolled]);

    useEffect(() => {
        // Get Supabase Auth user
        const getUser = async () => {
            const {
                data: { user },
            } = await supabase.auth.getUser();
            setUser(user);
            if (user && user.email) {
                try {
                    const encodedEmail = encodeURIComponent(user.email); // handle @
                    const response = await fetch(`http://localhost:5000/user/role/${encodedEmail}`);
                    const data = await response.json();

                    if (response.ok) {
                        setUserRole(data.role);
                    } else {
                        console.error("Error fetching role:", data.error);
                    }
                } catch (error) {
                    console.error("API error:", error);
                }
            }
        };

        getUser();
    }, []);

    const handleLogin = async () => {
        await supabase.auth.signInWithOAuth({ provider: "google" });
    };
    const handleRegister = handleLogin; // Supabase Auth handles signup via OAuth
    const handleLogout = async () => {
        await supabase.auth.signOut();
        setUser(null);
        setUserRole(null);
    };

    return (
        <header className="header">
            <nav className={`nav ${scrolled ? "scrolled" : ""}`}>
                <h1 id="logo">
                    <Link to="/">HELP.</Link>
                </h1>
                <ul className="nav-list">
                    <li>
                        <Link to="/about">About Death Literacy</Link>
                    </li>
                    <li>
                        <Link to="/quiz">Take the assessment</Link>
                    </li>
                    <li>
                        <Link to="/resource">Resource & Support</Link>
                    </li>
                    <li>
                        <Link to="/org">For Organisations</Link>
                    </li>
                    <li>
                        <Link to="/contact">Contact Us</Link>
                    </li>
                </ul>
                <button className="user-icon" onClick={() => setPopup(!popup)}>
                    <img alt="user" src="/pic/person.png" />
                </button>
            </nav>
            <div className={`hero ${location.pathname === "/home" ? "" : "hero-other"}`}>
                <img src="/pic/hero-plant.png" alt="Hero" className="hero-image" />
                <div className="hero-text">
                    <h1>Be informed. Be prepared.</h1>
                </div>
            </div>
            {popup && (
                <div className="popup-overlay" onClick={() => setPopup(!popup)}>
                    <div className="popup-content">
                        {!!user ? (
                            <>
                                <button>
                                    <Link to="/profile">My Profile</Link>
                                </button>
                                {userRole === "admin" && (
                                    <button>
                                        <Link to="/dashboard">Dashboard</Link>
                                    </button>
                                )}
                                <button onClick={handleLogout}>Log Out</button>
                            </>
                        ) : (
                            <>
                                <button onClick={handleLogin}>Login</button>
                                <button onClick={handleRegister}> Register </button>
                            </>
                        )}
                        <button className="close-btn" onClick={() => setPopup(false)}>
                            Close
                        </button>
                    </div>
                </div>
            )}
        </header>
    );
};

export default Header;
