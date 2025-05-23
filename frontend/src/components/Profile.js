import React, { useState, useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { Radar } from "react-chartjs-2";
import {
    Chart as ChartJS,
    RadialLinearScale,
    PointElement,
    LineElement,
    Filler,
    Tooltip,
    Legend,
} from "chart.js";
import "./Profile.css";

// Register Chart.js components
ChartJS.register(RadialLinearScale, PointElement, LineElement, Filler, Tooltip, Legend);

const Profile = () => {
    const { user, isAuthenticated } = useAuth0();
    const [userRole, setUserRole] = useState(null);

    useEffect(() => {
        const fetchRole = async () => {
            if (isAuthenticated && user?.email) {
                try {
                    const encodedEmail = encodeURIComponent(user.email);
                    const response = await fetch(
                        `http://localhost:5000/user/auth0_email/${encodedEmail}`
                    );
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

        fetchRole();
    }, [isAuthenticated, user]);

    // Radar chart data
    const radarData = {
        labels: [
            "Knowledge of Care Options",
            "Planning & Legal",
            "Community Support",
            "Grief Literacy",
            "End-of-Life Awareness",
            "Communication Skills",
        ],
        datasets: [
            {
                label: "Death Literacy Score",
                data: [65, 59, 80, 81, 56, 70], // Replace with dynamic data if needed
                backgroundColor: "rgba(0, 128, 0, 0.2)",
                borderColor: "green",
                borderWidth: 3,
            },
        ],
    };

    const radarOptions = {
        responsive: true,
        scales: {
            r: {
                suggestedMin: 0,
                suggestedMax: 100,
                ticks: {
                    beginAtZero: true,
                },
            },
        },
    };

    return (
        isAuthenticated && (
            <div className="profile-container">
                <div className="container-bg">
                    <div className="profile">
                        <h1>User Profile</h1>
                        <h2>{user.name}</h2>
                        <p>{user.email}</p>
                        <p>Role: {userRole}</p>
                    </div>
                    <div className="report-container">
                        <div className="report-card">
                            <h2>Reports</h2>
                            <h3>Report 1</h3>
                            <p>Details about report 1...</p>

                            {/* Radar Chart Section */}
                            <div className="radar-chart">
                                <Radar data={radarData} options={radarOptions} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    );
};

export default Profile;
