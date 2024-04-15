import React, { useState, useEffect } from "react";
import ClienteAxios from '../../../config/axios';

const ActualizarPlatillo = ({ estado, cambiarEstado, usuario }) => {

    const [platillo, guardarPlatillo] = useState({
        nombre: '',
        tipo:'', 
        descripcion:'', 
        precio:''
    });

    const consultarPlatillo = async () => {
        try {
            const respuesta = await ClienteAxios.get('/getPlatilloId/' + usuario);
            const reserva = respuesta.data[0];
            guardarPlatillo(reserva);
        } catch (error) {
            console.error("Error al consultar la API:", error);
        }
    };

    useEffect(() => {
        consultarPlatillo();
    }, [usuario]);

    const ActualizarPlatillo = async (e) => {
        e.preventDefault();
        try {
            const respuesta = await ClienteAxios.post(`/updatePlatillo/${usuario}`, platillo);
            console.log(respuesta.data);
            alert("Información actualizada");
        } catch (error) {
            console.error("Error al actualizar el registro:", error);
        }
    };

    const actualizarState = (e) => {
        guardarPlatillo({
            ...platillo,
            [e.target.name]: e.target.value
        });
    };
    return (
        <div>
            {estado &&
                <div className="overlay">
                    <div className="contenedorModal">
                        <div className="encabezadoModal">
                            <h3>Actualizar platillo</h3>
                        </div>
                        <button className="btnCerrar" onClick={() => cambiarEstado(false)}>
                            <ion-icon name="close-outline"></ion-icon>
                        </button>
                        <div>
                            <form onSubmit={ActualizarPlatillo}>
                            <legend>Llena todos los campos</legend>
                            <div class="campo">
                                <label>Nombre:</label>
                                <input type="text" placeholder="Ingrese el nombre" name="nombre" onChange={actualizarState}/>
                            </div>

                            <div class="campo">
                                <label>Tipo:</label>
                                <input type="text" placeholder="Ingrese el tipo" name="tipo" onChange={actualizarState}/>
                            </div>

                            <div class="campo">
                                <label>Descripción:</label>
                                <input type="text" placeholder="Descripción..." name="descripcion" onChange={actualizarState}/>
                            </div>
                            <div class="campo">
                                <label>Precio:</label>
                                <input type="number" placeholder="Precio" name="precio" onChange={actualizarState}/>
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

export default ActualizarPlatillo;