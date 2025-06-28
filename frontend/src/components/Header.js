import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import supabase  from "../lib/supabase";
import "./Header.css";

const Header = ({ user}) => {
    const [popup, setPopup] = useState(false);
    const [userRole, setUserRole] = useState(null);
    const [scrolled, setScrolled] = useState(false);
    const location = useLocation();
    const navigate = useNavigate();

    // 1️⃣ scroll‐style hook (always runs)
    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 10);
        window.addEventListener("scroll", onScroll);
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    // 2️⃣ fetch role whenever `user` changes
    useEffect(() => {
        const loadRole = async () => {
            if (!user?.id) {
                setUserRole(null);
                return;
            }
            const { data, error } = await supabase
                .from("users")
                .select("role")
                .eq("auth_id", user.id)
                .single();
            if (error) {
                console.error("fetch role:", error);
            } else if (data) {
                setUserRole(data.role);
            }
        };
        loadRole();
    }, [user]);

    // 3️⃣ sign‐out handler
    const handleLogout = async () => {
        await supabase.auth.signOut();
        navigate("/home");
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
                <div className="popup-overlay" onClick={() => setPopup(false)}>
                    <div className="popup-content" onClick={(e) => e.stopPropagation()}>
                        {user ? (
                            <>
                                <button onClick={() => navigate("/profile")}>My Profile</button>
                                {userRole === "admin" && (
                                    <button onClick={() => navigate("/dashboard")}>
                                        Dashboard
                                    </button>
                                )}
                                <button onClick={handleLogout}>Log Out</button>
                            </>
                        ) : (
                            <>
                                <button onClick={() => navigate("/login")}>Login</button>
                                <button onClick={() => navigate("/register")}>Register</button>
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
