import React, { useState, useEffect } from "react";
import ClienteAxios from '../../../config/axios';

const ActualizarEmpleado = ({ estado, cambiarEstado, usuario }) => {

    const [empleado, guardarEmpleado] = useState({
        nombre: '',
        username: '',
        correo: '',
        puesto: '',
        password: ''
    });

    const consultarEmpleado = async () => {
        try {
            const respuesta = await ClienteAxios.get('/getEmpleadoId/' + usuario);
            const empleado = respuesta.data[0];
            guardarEmpleado(empleado);
        } catch (error) {
            console.error("Error al consultar la API:", error);
        }
    };

    useEffect(() => {
        consultarEmpleado();
    }, [usuario]);

    const actualizarEmpleado = async (e) => {
        e.preventDefault();
        try {
            const respuesta = await ClienteAxios.post(`/updateEmpleado/${usuario}`, empleado);
            console.log(respuesta.data);
            alert("Información actualizada");
        } catch (error) {
            console.error("Error al actualizar el empleado:", error);
        }
    };

    const actualizarState = (e) => {
        guardarEmpleado({
            ...empleado,
            [e.target.name]: e.target.value
        });
    };
    return (
        <div>
            {estado &&
                <div className="overlay">
                    <div className="contenedorModal">
                        <div className="encabezadoModal">
                            <h3>Actualizar empleado</h3>
                        </div>
                        <button className="btnCerrar" onClick={() => cambiarEstado(false)}>
                            <ion-icon name="close-outline"></ion-icon>
                        </button>
                        <div>
                            <form onSubmit={actualizarEmpleado}>
                            <legend>Llena todos los campos</legend>
                            <div class="campo">
                                    <label>Nombre:</label>
                                    <input type="text" 
                                           placeholder="Ingrese el nombre" 
                                           name="nombre" 
                                           onChange={actualizarState} 
                                           value={empleado.nombre} />
                                </div>

                                <div class="campo">
                                    <label>Usuario:</label>
                                    <input type="text" 
                                           placeholder="Nombre de usuario" 
                                           name="username" 
                                           onChange={actualizarState} 
                                           value={empleado.username} />
                                </div>

                                <div class="campo">
                                    <label>Puesto:</label>
                                    <select name="puesto" 
                                            onChange={actualizarState} 
                                            value={empleado.puesto}>
                                        <option value="">Puesto del empleado</option>
                                        <option value="1">Gerente de tienda</option>
                                        <option value="2">Gerente de área</option>
                                        <option value="3">Cocinero</option>
                                        <option value="4">Empleado general</option>
                                        <option value="5">Mesero</option>
                                        <option value="6">Cajero</option>
                                    </select>
                                </div>
                                <div class="campo">
                                    <label>Correo electronico:</label>
                                    <input type="email" 
                                           placeholder="Ingrese correo electronico" 
                                           name="correo" 
                                           onChange={actualizarState} 
                                           value={empleado.correo} />
                                </div>
                                <div class="campo">
                                    <label>Contraseña:</label>
                                    <input type="password" 
                                           placeholder="Ingrese contraseña" 
                                           name="password" 
                                           onChange={actualizarState} 
                                           value={empleado.password} />
                                </div>

                                <div class="enviar">
                                    <input type="submit" 
                                           class="btnEnviar" 
                                           value="Enviar" />
                                </div>
                            </form>
                        </div>
                        
                    </div>
                </div>
            }
        </div>
    );
}

export default ActualizarEmpleado;