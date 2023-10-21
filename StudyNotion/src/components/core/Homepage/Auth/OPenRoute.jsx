import React from 'react'
import { Navigate } from 'react-router-dom';

const OPenRoute = ({ children }) => {
    const token = JSON.parse(localStorage.getItem("token"));

    if (token === null) {
        return children
    }
    else {
        return <Navigate to="dashboard/my-profile"></Navigate>
    }
}

export default OPenRoute