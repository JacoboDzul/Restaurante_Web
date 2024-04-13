import React, { useState } from "react";
import { useAuth } from "../../../Auth/AuthProvider";
import { Navigate, useNavigate } from "react-router-dom";
import axiosInstance from "../../../config/axios"
//import { AuthResponseError } from "../../../types/types";

function Registrar(){
    const[name, setName] = useState("");
    const[username, setUsername] = useState("");
    const[correo, setEmail] = useState("");
    const[password, setPassword] = useState("");
    const[errorResponse, setErrorResponse] = useState("");

    const auth = useAuth();
    const goTo = useNavigate();

    if(auth.isAuthenticated){
        return <Navigate to="/dashboard"/>;
    }


    async function handleSubmit(e) {
        e.preventDefault();
        try {
            const response = await axiosInstance.post("/usuarios/register", {
                name,
                username,
                correo,
                password
            });

            if (response.status >= 200 && response.status < 300) {
                console.log("Usuario creado:)");
                setErrorResponse("");


            } else {
                console.log("Algo falló :(");
                const json = await response.json();
                setErrorResponse(json.body.error);
                return;
            }
        } catch (error) {
            console.log("Error al crear usuario:", error.response.data);
        }
    }


    return(
            <form className="form" onSubmit={handleSubmit}>
                <h1>Registrar</h1>
                
                <label>Nombre</label>
                <input type="text" value={name} onChange={(e) => setName(e.target.value)}/>

                <label>Usuario</label>
                <input type="text" value={username} onChange={(e) => setUsername(e.target.value)}/>

                <label>Correo</label>
                <input type="email" value={correo} onChange={(e) => setEmail(e.target.value)}/>

                <label>Password</label>
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)}/>

                <button>Crear usuario</button>
            </form>

    )
}

export default Registrar;