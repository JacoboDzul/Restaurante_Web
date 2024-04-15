import React, { useState, useEffect } from "react";
import ClienteAxios from '../../../config/axios';

const ActualizarProveedor = ({ estado, cambiarEstado, usuario }) => {

    const [proveedor, guardarProveedor] = useState({
        nombre: "",
        activo: ""
    });

    const consultarProveedor = async () => {
        try {
            const respuesta = await ClienteAxios.get('/getEmpleadoId/' + usuario);
            const proveedor = respuesta.data[0];
            guardarProveedor(proveedor);
        } catch (error) {
            console.error("Error al consultar la API:", error);
        }
    };

    useEffect(() => {
        consultarProveedor();
    }, [usuario]);

    const ActualizarProveedor = async (e) => {
        e.preventDefault();
        try {
            const respuesta = await ClienteAxios.post(`/updateProveedor/${usuario}`, proveedor);
            console.log(respuesta.data);
            alert("Información actualizada");
        } catch (error) {
            console.error("Error al actualizar el empleado:", error);
        }
    };

    const actualizarState = (e) => {
        guardarProveedor({
            ...proveedor,
            [e.target.name]: e.target.value
        });
    };
    return (
        <div>
            {estado &&
                <div className="overlay">
                    <div className="contenedorModal">
                        <div className="encabezadoModal">
                            <h3>Actualizar proveedor</h3>
                        </div>
                        <button className="btnCerrar" onClick={() => cambiarEstado(false)}>
                            <ion-icon name="close-outline"></ion-icon>
                        </button>
                        <div>
                            <form onSubmit={ActualizarProveedor}>
                            <legend>Llena todos los campos</legend>
                            <div class="campo">
                                <label>Nombre:</label>
                                <input type="text" 
                                    placeholder="Ingrese el nombre" 
                                    name="nombre" 
                                    onChange={actualizarState} 
                                    value={proveedor.nombre} />
                            </div>

                            <div class="campo">
                                <label>Activo:</label>
                                <select name="activo" 
                                        onChange={actualizarState} 
                                        value={proveedor.activo}>
                                    <option value="">Seleccionar</option>
                                    <option value="1">Activo</option>
                                    <option value="2">Inactivo</option>
                                </select>
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

export default ActualizarProveedor;