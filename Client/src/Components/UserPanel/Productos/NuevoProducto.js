import React, {useState}  from "react";
import './nuevoProducto.css'
import ClienteAxios from '../../../config/axios';

const NuevoProducto = ({estado, cambiarEstado}) => {

    const [producto, guardarProducto] = useState({
        action :'insert', 
        nombre: '', 
        descripcion:'', 
        tipo:'', 
        precio:'', 
        idProveedor:''
    });

    const actualizarState = e =>{
        console.log(e.target.value);
        guardarProducto({
        ...producto,
        [e.target.name] : e.target.value
        
       })
    }

    const agregarProducto = e => {
        e.preventDefault();
        ClienteAxios.post('/postProducto', producto)
        .then(res =>{
            console.log(res);
            limpiarCampos();
		});
    }

    const validarProducto = () => {
        const {nombre,descripcion,tipo,precio,idProveedor} = producto;
        let valido = !nombre.length || !descripcion.length || !tipo.length || !precio.length || !idProveedor.length;
        return valido;
    }

    const limpiarCampos = () => {
        guardarProducto({
          action: "insert",
          nombre: "",
          descripcion: "",
          tipo: "",
          precio: "",
          idProveedor: ""
        });
      };


    return(
        <>
            {estado &&
            <div className="overlay">
                <div className="contenedorModal">
                    <div className="encabezadoModal">
                        <h3>Agregar producto</h3>
                    </div>
                    <button className="btnCerrar" onClick={() => cambiarEstado(false)}>
                        <ion-icon name="close-outline"></ion-icon>
                    </button>

                    <div>
                        <form onSubmit={agregarProducto}>
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
                                <input type="submit" class="btnEnviar" value="Enviar" disabled={validarProducto()}/>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            }
        </>
    );
}

export default NuevoProducto;

