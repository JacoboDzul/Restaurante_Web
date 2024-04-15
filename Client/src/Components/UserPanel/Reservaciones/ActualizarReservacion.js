import React, { useState, useEffect } from "react";
import ClienteAxios from '../../../config/axios';

const ActualizarReservacion = ({ estado, cambiarEstado, usuario }) => {

    const [reserva, guardarReserva] = useState({
        nombre: '',
        fecha:'', 
        numper:'', 
        nunmesa:'', 
        observaciones:''
    });

    const consultarReserva = async () => {
        try {
            const respuesta = await ClienteAxios.get('/getReservaId/' + usuario);
            const reserva = respuesta.data[0];
            guardarReserva(reserva);
        } catch (error) {
            console.error("Error al consultar la API:", error);
        }
    };

    useEffect(() => {
        consultarReserva();
    }, [usuario]);

    const actualizarReserva = async (e) => {
        e.preventDefault();
        try {
            const respuesta = await ClienteAxios.post(`/updateReserva/${usuario}`, reserva);
            console.log(respuesta.data);
            alert("Información actualizada");
        } catch (error) {
            console.error("Error al actualizar el registro:", error);
        }
    };

    const actualizarState = (e) => {
        guardarReserva({
            ...reserva,
            [e.target.name]: e.target.value
        });
    };
    return (
        <div>
            {estado &&
                <div className="overlay">
                    <div className="contenedorModal">
                        <div className="encabezadoModal">
                            <h3>Actualizar reservación</h3>
                        </div>
                        <button className="btnCerrar" onClick={() => cambiarEstado(false)}>
                            <ion-icon name="close-outline"></ion-icon>
                        </button>
                        <div>
                            <form onSubmit={actualizarReserva}>
                            <legend>Llena todos los campos</legend>
                            <div class="campo">
                                <label>Nombre:</label>
                                <input type="text" placeholder="Ingrese el nombre" name="nombre" onChange={actualizarState}/>
                            </div>

                            <div class="campo">
                                <label>Fecha:</label>
                                <input type="date" placeholder="" name="fecha" onChange={actualizarState}/>
                            </div>

                            <div class="campo">
                                <label>#Personas:</label>
                                <input type="number" placeholder="Número de personas" name="numper" onChange={actualizarState}/>
                            </div>
                            <div class="campo">
                                <label>#Mesa:</label>
                                <input type="number" placeholder="Número de mesa" name="nummesa" onChange={actualizarState}/>
                            </div>
                            <div class="campo">
                                <label>Observaciones:</label>
                                <input type="text" placeholder="Observaciones..." name="observaciones" onChange={actualizarState}/>
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

export default ActualizarReservacion;