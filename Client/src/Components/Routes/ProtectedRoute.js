import { useState } from "react";
import { Outlet, Navigate } from "react-router-dom";
import { useAuth } from "../../Auth/AuthProvider";

function ProtectedRoute(){
    const auth = useAuth();

    //Validar si es verdadero
    return auth.isAuthenticated ? <Outlet/> : <Navigate to="/login"/>;

}

export default ProtectedRoute;