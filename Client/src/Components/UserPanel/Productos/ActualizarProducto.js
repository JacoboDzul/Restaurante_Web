import React, { useState, useEffect } from "react";
import ClienteAxios from '../../../config/axios';

const ActualizarProducto = ({ estado, cambiarEstado, usuario }) => {

    const [producto, guardarProducto] = useState({
        nombre: '',
        descripcion:'', 
        tipo:'', 
        precio:'', 
        idProveedor:''
    });

    const consultarProducto = async () => {
        try {
            const respuesta = await ClienteAxios.get('/getProductoId/' + usuario);
            const producto = respuesta.data[0];
            guardarProducto(producto);
        } catch (error) {
            console.error("Error al consultar la API:", error);
        }
    };

    useEffect(() => {
        consultarProducto();
    }, [usuario]);

    const actualizarEmpleado = async (e) => {
        e.preventDefault();
        try {
            const respuesta = await ClienteAxios.post(`/updateProducto/${usuario}`, producto);
            console.log(respuesta.data);
            alert("Información actualizada");
        } catch (error) {
            console.error("Error al actualizar el registro:", error);
        }
    };

    const actualizarState = (e) => {
        guardarProducto({
            ...producto,
            [e.target.name]: e.target.value
        });
    };
    return (
        <div>
            {estado &&
                <div className="overlay">
                    <div className="contenedorModal">
                        <div className="encabezadoModal">
                            <h3>Actualizar producto</h3>
                        </div>
                        <button className="btnCerrar" onClick={() => cambiarEstado(false)}>
                            <ion-icon name="close-outline"></ion-icon>
                        </button>
                        <div>
                            <form onSubmit={actualizarEmpleado}>
                            <legend>Llena todos los campos</legend>
                            <div class="campo">
                                <label>Nombre:</label>
                                <input type="text" placeholder="Ingrese el nombre" name="nombre" onChange={actualizarState}/>
                            </div>

                            <div class="campo">
                                <label>Descripción:</label>
                                <input type="text" placeholder="Descripción..." name="descripcion" onChange={actualizarState}/>
                            </div>

                            <div class="campo">
                                <label>Tipo:</label>
                                <input type="text" placeholder="Tipo de producto" name="tipo" onChange={actualizarState}/>
                            </div>
                            <div class="campo">
                                <label>Precio:</label>
                                <input type="number" placeholder="Precio" name="precio" onChange={actualizarState}/>
                            </div>
                            <div class="campo">
                                <label>Proveedor:</label>
                                <input type="text" placeholder="Ingrese proveedor" name="idProveedor" onChange={actualizarState}/>
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

export default ActualizarProducto;