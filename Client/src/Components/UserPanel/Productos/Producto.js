import { Link } from "react-router-dom";
import "./producto.css";
import ClienteAxios from '../../../config/axios';
import React, { useEffect, useState} from 'react';
import DataTable from 'react-data-table-component';
import {CSVLink} from "react-csv";
import Swal from "sweetalert2";
import NuevoProducto from "./NuevoProducto";
import ActualizarProducto from "./ActualizarProducto";


function Productos(){
    const [users, setUsers] = useState([]);
    const [filteredUsers, setFilteredUsers] = useState([]);
    const [estadoModal, setEstado] = useState(false);
    const [estadoModal2, setEstado2] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null); 
    
    const headersExcel = [
        {label: "Nombre", key: "Productos_Nombre"},
        {label: "Descripción", key: "Productos_Descripcion"},
        {label: "Tipo", key: "Productos_Tipo"},
        {label: "Precio", key: "Productos_Precio"}
    ]

    const URL = 'http://localhost:7777/getProductos'
    
    const showData = async () => {
        const response = await fetch(URL);
        const data = await response.json();
        setUsers(data);
        setFilteredUsers(data);
    }

    const columns = [
        {
            name: 'Nombre',
            selector: row => row.Productos_Nombre,
            sortable: true
        },
        {
            name: 'Descripción',
            selector: row => row.Productos_Descripcion
        },
        {
            name: 'Tipo',
            selector: row => row.Productos_Tipo
        },
        {
            name: 'Precio',
            selector: row => row.Productos_Precio
        },
        {
            name: 'Acciones',
            cell: row => <button className="editProducto" onClick={() => handleEdit(row.Productos_Id)}><ion-icon name="pencil-outline"></ion-icon></button>
        },
        {
            name: '',
            cell: row => <button className="deletProducto" onClick={() => mostrarAlerta(row.Productos_Id)}><ion-icon name="trash-outline"></ion-icon></button>
        }
    ];

    const handleChange = (e) => {
        const searchTerm = e.target.value.toLowerCase();
        const filteredRecords = users.filter(record => record.Productos_Nombre.toLowerCase().includes(searchTerm));
        setFilteredUsers(filteredRecords);
    }

    const deleteUser = async (id) => {
        try {
            await ClienteAxios.delete(`/delProducto/${id}`);
            const updatedUsers = users.filter(user => user.Productos_Id !== id);
            setUsers(updatedUsers);
            setFilteredUsers(updatedUsers);
        } catch (error) {
            console.error("Error al eliminar el registro:", error);
            alert("Error al eliminar el registro.");
        }
    };

    const handleEdit = (id) => {
        setSelectedUser(id); 
        setEstado2(true); 
    }

    const mostrarAlerta = (id) => {
        Swal.fire({
            title: 'Advertencia',
            text: '¿Está seguro que desea eliminar este registro?',
            icon: "warning",
            confirmButtonText: "Aceptar",
            showCancelButton: true,
            cancelButtonText: "Cancelar",
            cancelButtonColor: "Red"
        }).then(response => {
            if (response.isConfirmed) {
                deleteUser(id);
                Swal.fire('Éxito', 'El registro se eliminó correctamente.', 'success');
            }
        });
    }

    useEffect(() => {
        showData();
    }, [users]);

    return(
        <div className="producto">
            <h2>Productos</h2>
            <button onClick={() => setEstado(!estadoModal)} className="adaptive-button">
                <ion-icon name="person-add-outline"></ion-icon>
                Nuevo producto
            </button>
            <NuevoProducto 
                estado={estadoModal} 
                cambiarEstado={setEstado}
            />
            {/*<input className="productoBuscador" type="text" onChange={handleChange} placeholder="Buscar por nombre"/>*/}

            <button className="csv-button">
                <ion-icon className="excelIcon" name="download-outline"></ion-icon>
                <CSVLink data={users} filename={"productos.csv"} headers={headersExcel}>Exportar a Excel</CSVLink>
            </button>      

            <DataTable
                columns={columns}
                data={filteredUsers}
                paginationPerPage={7}
                pagination
            />

            <ActualizarProducto
                estado={estadoModal2} 
                cambiarEstado={setEstado2}
                usuario={selectedUser} 
            />
        </div>
    )
}

export default Productos;