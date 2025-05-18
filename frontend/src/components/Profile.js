import React from 'react';
import { useAuth0 } from "@auth0/auth0-react";
import './Profile.css';

const Profile = () => { 
    const { user, isAuthenticated } = useAuth0();
    
    return (
        isAuthenticated && (
            <div className="profile-container">
                <div className="container-bg">
                    <div className="profile">
                        <h1>User Profile</h1> <br />
                        <h2>{user.name}</h2>
                        <p>{user.email}</p>
                        <p>{user.birthdate}</p>
                        <p>{user.role}</p>
                    </div>
                    <div className="report-container">
                        <div className="report-card">
                            <h2>Reports</h2>
                            <h3>Report 1</h3>
                            <p>Details about report 1...</p>
                        </div>
                    </div>
                </div>
            </div>
        )
    );
}

export default Profile;