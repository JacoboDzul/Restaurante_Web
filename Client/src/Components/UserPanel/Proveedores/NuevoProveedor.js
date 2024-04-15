import React, {useState}  from "react";
import './nuevoProveedor.css'
import ClienteAxios from '../../../config/axios';

const NuevoProveedor = ({estado, cambiarEstado}) => {

    const [proveedor, guardarProveedor] = useState({
        action :'insert', 
        nombre: '', 
        activo:''
    });

    const actualizarState = e =>{
        console.log(e.target.value);
        guardarProveedor({
        ...proveedor,
        [e.target.name] : e.target.value
       })
    }

    const agregarProveedor = e => {
        e.preventDefault();
        ClienteAxios.post('/postProveedor', proveedor)
        .then(res =>{
            console.log(res);
            limpiarCampos();
		});
    }

    const validarProveedor = () => {
        const {nombre, activo} = proveedor;
        let valido = !nombre.length || !activo.length;
        return valido;
    }

    const limpiarCampos = () => {
        guardarProveedor({
          action: "insert",
          nombre: "",
          activo: ""
        });
      };


    return(
        <>
            {estado &&
            <div className="overlay">
                <div className="contenedorModal">
                    <div className="encabezadoModal">
                        <h3>Agregar proveedor</h3>
                    </div>
                    <button className="btnCerrar" onClick={() => cambiarEstado(false)}>
                        <ion-icon name="close-outline"></ion-icon>
                    </button>

                    <div>
                        <form onSubmit={agregarProveedor}>
                            <legend>Llena todos los campos</legend>
                            <div class="campo">
                                <label>Nombre:</label>
                                <input type="text" placeholder="Ingrese el nombre" name="nombre" onChange={actualizarState}/>
                            </div>

                            <div class="campo">
                                <label>Activo:</label>
                                <select name="activo" onChange={actualizarState}>
                                    <option value="">Seleccionar</option>
                                    <option value="1">Activo</option>
                                    <option value="2">Inactivo</option>
                                </select>
                            </div>

                            <div class="enviar">
                                <input type="submit" class="btnEnviar" value="Enviar" disabled={validarProveedor()}/>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            }
        </>
    );
}

export default NuevoProveedor;

