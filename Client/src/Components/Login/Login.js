import React, { useState, useEffect } from "react";
import Navbar from "../Main/Navbar";
import Footer from "../Main/Footer";
import { useNavigate } from "react-router-dom";
import DashBoard from "../UserPanel/DashBoard/DashBoard";
import "./login.css"

function Login() {
    const [password, setPassword] = useState('');
    const [username, setUsername] = useState('');
    const [puesto, setPuesto] = useState('');
    const [loginSuccessful, setLoginSuccessful] = useState(false);
    const goTo = useNavigate();

    const URL = 'http://localhost:7777/getEmpleados';
    const [users, setUsers] = useState([]);
    
    useEffect(() => {
        showData();
    }, []);

    const showData = async () => {
        try {
            const response = await fetch(URL);
            const data = await response.json();
            setUsers(data);
        } catch (error) {
            console.error("Error al obtener datos de empleados:", error);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const data = {
            username: username,
            password: password,
            puesto: puesto
        };
        fetch('http://localhost:7777/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
            .then(response => response.json())
            .then(result => {
                if (result.token) {
                    localStorage.setItem('token', result.token);
                    setLoginSuccessful(true);

                    showData();

                    // Verificar si el usuario tiene el puesto de cocinero (id 3)
                    const user = users.find(user => user.Usuario_Username === username);
                    const userPuesto = user ? user.Usuario_Puesto : null;
                    goTo(userPuesto === 3 ? '/cocina' : '/dashboard');
                } else {
                    setLoginSuccessful(false);
                }
            })
            .catch(error => {
                console.log(error);
            });
    };

    return (
        <>
            {loginSuccessful ? <DashBoard /> :
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
            }
        </>
    );
}
export default Login;