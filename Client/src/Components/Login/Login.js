import React, { useState } from "react";
import Navbar from "../Main/Navbar";
import Footer from "../Main/Footer";
import "./login.css";
import { useAuth } from "../../Auth/AuthProvider";
import { Link, Navigate, useNavigate} from "react-router-dom";
import axiosInstance from "../../config/axios"
import App from "../../App";
import DashBoard from "../UserPanel/DashBoard/DashBoard";


/*function parseJwt(token){
    const base64Url = token.split('.'[1]);
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g,'/');
    const jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function(c){
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    return JSON.parse(jsonPayload);
}*/

function Login(){
    const [password, setPassword] = useState('');
    const [username, setUsername] = useState('');
    const [loginSuccessful, setLoginSuccessful] = useState(false);
    const goTo = useNavigate;

    const handleSubmit = (e) => {
        e.preventDefault();
        const data = {
            username: username,
            password: password
        };
        fetch('http://localhost:7777/login',{
            method: 'POST',
            headers:{
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        .then(response => response.json())
        .then(result =>{
            console.log(result.token)
            if(result.token){
                localStorage.setItem('token', result.token)
                setLoginSuccessful(true);
                goTo('/dashboard');
            }
            else{
                setLoginSuccessful(false);
            }
        })
        .catch(error =>{
            console.log(error)
        })
    };

    return (
        <>{loginSuccessful ? <DashBoard/>:
        <div>
            <Navbar />
            <body className="login">
                <div className="container">
                    <div className="form-container sign-in">
                        <form onSubmit={handleSubmit}>
                            <h1>Iniciar sesión</h1>
                            <span>Inicia sesión para administrar las reservaciones. :D</span>
                            <input type="text" placeholder="Usuario" onChange={(event) => setUsername(event.target.value)} />
                            <input type="password" placeholder="Contraseña" onChange={(event) => setPassword(event.target.value)} />

                            <button>Ingresar</button>

                            <div className="toggle-container">
                                <div className="toggle">
                                    <div className="toggle-panel toggle-left">
                                        <div className="toggle-text">
                                            <h1>¡Bienvenido!</h1>
                                            <p>Ingresa los datos para acceder al panel de control.</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </body>
            <Footer />
        </div>
    }</>
    );
}
export default Login;