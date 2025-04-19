import React, { useState, useEffect } from 'react';
import { useAuth0 } from "@auth0/auth0-react";
import './Profile.css';

const Profile = () => { 
    const { user, isAuthenticated } = useAuth0();
    
    return (
        isAuthenticated && (
            <div className='profile-container'>
                <h1>User Profile</h1>
                <h2>{user.name}</h2>
                <p>{user.email}</p>
            </div>
        )
    );
}

export default Profile;