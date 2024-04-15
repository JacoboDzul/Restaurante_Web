import React, { useState } from "react";
import './nuevoEmpleado.css'
import ClienteAxios from '../../../config/axios';
import Swal from "sweetalert2";

const NuevoEmpleado = ({ estado, cambiarEstado }) => {
    const [empleado, guardarEmpleado] = useState({
        action: 'insert',
        nombre: '',
        username: '',
        puesto: '',
        correo: '',
        password: ''
    });

    const actualizarState = e => {
        guardarEmpleado({
            ...empleado,
            [e.target.name]: e.target.value
        })
    }

    const agregarEmpleado = e => {
        e.preventDefault();
        ClienteAxios.post('/postEmpleado', empleado)
            .then(res => {
                Swal.fire({
                    title: '¡Éxito!',
                    text: 'El empleado se ha creado exitosamente.',
                    icon: 'success',
                    confirmButtonText: 'Aceptar'
                }).then(() => {
                    limpiarCampos();
                    cambiarEstado(false);
                });
            })
            .catch(error => {
                Swal.fire({
                    title: 'Error',
                    text: 'Hubo un error al crear el empleado.',
                    icon: 'error',
                    confirmButtonText: 'Aceptar'
                });
            });
    }

    const validarEmpleado = () => {
        const { nombre, username, puesto, correo, password } = empleado;
        return !nombre || !username || !puesto || !correo || !password;
    }

    const limpiarCampos = () => {
        guardarEmpleado({
            action: "insert",
            nombre: "",
            username: "",
            puesto: "",
            correo: "",
            password: ""
        });
    };

    return (
        <>
            {estado &&
                <div className="overlay">
                    <div className="contenedorModal">
                        <div className="encabezadoModal">
                            <h3>Agregar empleado</h3>
                        </div>
                        <button className="btnCerrar" onClick={() => cambiarEstado(false)}>
                            <ion-icon name="close-outline"></ion-icon>
                        </button>

                        <div>
                            <form onSubmit={agregarEmpleado}>
                                <legend>Llena todos los campos</legend>
                                <div class="campo">
                                    <label>Nombre:</label>
                                    <input type="text" placeholder="Ingrese el nombre" name="nombre" onChange={actualizarState} />
                                </div>

                                <div class="campo">
                                    <label>Usuario:</label>
                                    <input type="text" placeholder="Nombre de usuario" name="username" onChange={actualizarState} />
                                </div>

                                <div class="campo">
                                    <label>Puesto:</label>
                                    <select name="puesto" onChange={actualizarState}>
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
                                    <input type="email" placeholder="Ingrese correo electronico" name="correo" onChange={actualizarState} />
                                </div>
                                <div class="campo">
                                    <label>Contraseña:</label>
                                    <input type="password" placeholder="Ingrese contraseña" name="password" onChange={actualizarState} />
                                </div>

                                <div class="enviar">
                                    <input type="submit" class="btnEnviar" value="Enviar" disabled={validarEmpleado()} />
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            }
        </>
    );
}

export default NuevoEmpleado;
