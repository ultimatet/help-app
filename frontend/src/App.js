import React, { useEffect } from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Quiz from "./components/Quiz";
import Home from "./components/Home";
import Contact from "./components/Contact";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import ReactLoading from "react-loading";
import "./App.css";

function App() {
    const { isAuthenticated, isLoading } = useAuth0();
    const location = useLocation();

    useEffect(() => {
        if (!isLoading && !isAuthenticated && location.pathname === "/quiz") {
            alert("You need to sign in to access the quiz.");
        }
    }, [isAuthenticated, isLoading, location.pathname]);

    if (isLoading) {
        return (
            <div className="App">
                <Header />
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
            <Header />
            <div className="container">
                <Routes>
                    <Route path="/" element={<Navigate to="/home" replace />} />
                    <Route path="/home" element={<Home />} />
                    <Route
                        path="/quiz"
                        element={
                            isAuthenticated ? (
                                <Quiz />
                            ) : (
                                <Navigate to="/home" replace />
                            )
                        }
                    />
                    <Route path="/contact" element={<Contact />} />
                    <Route path="*" element={<Navigate to="/home" replace />} />
                </Routes>
            </div>
            <Footer />
        </div>
    );
}

export default App;
