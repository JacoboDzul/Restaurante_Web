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
    /*const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const[errorResponse, setErrorResponse] = useState("");

    const auth = useAuth();
    const goTo = useNavigate;
    

    

    async function handleSubmit(e) {
        e.preventDefault();
        try {
            const response = await axiosInstance.post("/usuarios/login", {
                username,
                password
            });

            if (response.status >= 200 && response.status < 300) {
                console.log("Login exitoso :)");
                const json = await response.json();
                
                if (json.body.accessToken && json.body.refreshToken) {
                    auth.saveUser(json);
                    goToDashboard(); // Redirigir al panel de control
                }
            } else {
                console.log("Algo falló :(");
                const json = await response.json();
                setErrorResponse(json.body.error);
            }
        } catch (error) {
            goTo("/dashboard");
            if(auth.isAuthenticated){
                return <Navigate to="/dashboard"/>;
            }
        }
    }

    // Función para redirigir al panel de control
    function goToDashboard() {
        goTo("/dashboard");
    }*/
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
            console.log(result.token) // Accede al token dentro del objeto JSON
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