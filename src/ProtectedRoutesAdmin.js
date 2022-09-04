import React from "react";
import {Outlet,Navigate} from 'react-router-dom';
import Auth from "./Auth";
const ProtectedRoutesAdmin=({component:Component,...rest})=>{
    let authenticated = Auth.isAdmin();
    return (
        
        authenticated ? <Outlet />: <Navigate to="/" exact/>
    );
};
export default ProtectedRoutesAdmin;