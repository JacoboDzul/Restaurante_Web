import { Link } from "react-router-dom";
import "./proveedor.css";
import ClienteAxios from '../../../config/axios';
import React, { useEffect, useState} from 'react';
import DataTable from 'react-data-table-component';
import {CSVLink} from "react-csv";
import Swal from "sweetalert2";
import NuevoProveedor from "./NuevoProveedor";
import ActualizarProveedor from "./ActualizarProveedor";

function Proveedor(){
    const [users, setUsers] = useState([]);
    const [filteredUsers, setFilteredUsers] = useState([]);
    const [estadoModal, setEstado] = useState(false);
    const [estadoModal2, setEstado2] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);
    
    const headersExcel = [
        {label: "Nombre", key: "Proveedor_Nombre"},
        {label: "Activo", key: "Proveedor_Activo"}
    ]

    const URL = 'http://localhost:7777/getProveedores'
    
    const showData = async () => {
        const response = await fetch(URL);
        const data = await response.json();
        setUsers(data);
        setFilteredUsers(data);
    }

    const columns = [
        {
            name: 'Nombre',
            selector: row => row.Proveedor_Nombre,
            sortable: true
        },
        {
            name: 'Activo',
            selector: row => row.Proveedor_Activo
        },
        {
            name: 'Acciones',
            cell: row => <button className="editProveedor" onClick={() => handleEdit(row.Proveedor_Id)}>Editar</button>
        },
        {
            name: '',
            cell: row => <button className="deletProveedor" onClick={() => mostrarAlerta(row.Proveedor_Id)}><ion-icon name="trash-outline"></ion-icon></button>
        }
    ];

    const handleChange = (e) => {
        const searchTerm = e.target.value.toLowerCase();
        const filteredRecords = users.filter(record => record.Proveedor_Nombre.toLowerCase().includes(searchTerm));
        setFilteredUsers(filteredRecords);
    }

    const deleteUser = async (id) => {
        try {
            await ClienteAxios.delete(`/delProveedor/${id}`);
            const updatedUsers = users.filter(user => user.Proveedor_Id !== id);
            setUsers(updatedUsers);
            setFilteredUsers(updatedUsers);
        } catch (error) {
            console.error("Error al eliminar registro:", error);
            alert("Error al eliminar registro.");
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
    }, []);

    return(
        <div className="proveedor">
            <h2>Proveedores</h2>
            <button onClick={() => setEstado(!estadoModal)} className="adaptive-button">
                <ion-icon name="person-add-outline"></ion-icon>
                Nuevo proveedor
            </button>
            <NuevoProveedor 
                estado={estadoModal} 
                cambiarEstado={setEstado}
            />
            <input className="proveedorBuscador" type="text" onChange={handleChange} placeholder="Buscar por nombre"/>

            <button className="csv-button">
                <ion-icon className="excelIcon" name="download-outline"></ion-icon>
                <CSVLink data={users} filename={"proveedores.csv"} headers={headersExcel}>Exportar a Excel</CSVLink>
            </button>      

            <DataTable
                columns={columns}
                data={filteredUsers}
                paginationPerPage={7}
                pagination
            />

            <ActualizarProveedor 
                estado={estadoModal2} 
                cambiarEstado={setEstado2}
                usuario={selectedUser}
            />
        </div>
    )
}

export default Proveedor;