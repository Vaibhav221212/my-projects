import React from 'react'
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({children}) => {

    const token=JSON.parse(localStorage.getItem("token"));
    if(token!==null)
    {
        return children
    }
     else
     {
        return <Navigate to="/login"></Navigate>
     }
}

export default PrivateRoute