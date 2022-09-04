import React from "react";
import {Outlet,Navigate} from 'react-router-dom';
import Auth from "./Auth";
const ProtectedRoutes=({component:Component,...rest})=>{
    let authenticated = Auth.isAuthenticated();
    return (
        authenticated ? <Outlet />: <Navigate to="/login" exact/>
    );
};
export default ProtectedRoutes;