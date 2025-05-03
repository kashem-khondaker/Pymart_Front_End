import React from 'react';
import useAuthContext from '../hooks/useAuthContext';
import { Navigate } from 'react-router';

const PrivateRoute = ({children}) => {
    const tokens = localStorage.getItem("authTokens");
    const {user} = useAuthContext();
    console.log("From Private Route", user);
    if (user===null) return <p>Loading....</p>
    return tokens && user ? children : <Navigate to = "/login" />
};

export default PrivateRoute;