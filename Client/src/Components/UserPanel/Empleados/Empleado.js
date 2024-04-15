import { Link } from "react-router-dom";
import "./empleado.css";
import ClienteAxios from '../../../config/axios';
import React, { useEffect, useState} from 'react';
import DataTable from 'react-data-table-component';
import NuevoEmpleado from "./NuevoEmpleado";
import {CSVLink} from "react-csv";
import Swal from "sweetalert2";
import ActualizarEmpleado from "./ActualizarEmpleado";

function Empleados(){
    const [users, setUsers] = useState([]);
    const [filteredUsers, setFilteredUsers] = useState([]);
    const [estadoModal, setEstado] = useState(false);
    const [estadoModal2, setEstado2] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null); 
    const headersExcel = [
        {label: "Nombre", key: "Usuario_Nombre"},
        {label: "Usuario", key: "Usuario_Username"},
        {label: "Correo", key: "Usuario_Correo"},
        {label: "Puesto", key: "Usuario_Puesto"}
    ]

    const URL = 'http://localhost:7777/getEmpleados'
    
    const showData = async () => {
        const response = await fetch(URL);
        const data = await response.json();
        setUsers(data);
        setFilteredUsers(data);
    }

    const columns = [
        {
            name: 'Nombre',
            selector: row => row.Usuario_Nombre,
            sortable: true
        },
        {
            name: 'Usuario',
            selector: row => row.Usuario_Username
        },
        {
            name: 'Correo',
            selector: row => row.Usuario_Correo
        },
        {
            name: 'Puesto',
            selector: row => row.Usuario_Puesto
        },
        {
            name: 'Acciones',
            cell: row => <button className="editEmpleado" onClick={() => handleEdit(row.Usuario_Id)}><ion-icon name="pencil-outline"></ion-icon></button>
        },
        {
            name: '',
            cell: row => <button className="deletEmpleado" onClick={() => mostrarAlerta(row.Usuario_Id)}><ion-icon name="trash-outline"></ion-icon></button>
        }
    ];

    const handleChange = (e) => {
        const searchTerm = e.target.value.toLowerCase();
        const filteredRecords = users.filter(record => record.Usuario_Nombre.toLowerCase().includes(searchTerm));
        setFilteredUsers(filteredRecords);
    }

    const deleteUser = async (id) => {
        try {
            await ClienteAxios.delete(`/delEmpleado/${id}`);
            const updatedUsers = users.filter(user => user.Usuario_Id !== id);
            setUsers(updatedUsers);
            setFilteredUsers(updatedUsers);
        } catch (error) {
            console.error("Error al eliminar el usuario:", error);
            alert("Error al eliminar el usuario.");
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
        <div className="empleado">
            <h2>Empleados</h2>
            <button onClick={() => setEstado(!estadoModal)} className="adaptive-button">
                <ion-icon name="person-add-outline"></ion-icon>
                Nuevo empleado
            </button>
            <NuevoEmpleado 
                estado={estadoModal} 
                cambiarEstado={setEstado}
            />
            <input className="empleadoBuscador" type="text" onChange={handleChange} placeholder="Buscar por nombre"/>

            <button className="csv-button">
                <ion-icon className="excelIcon" name="download-outline"></ion-icon>
                <CSVLink data={users} filename={"empleados.csv"} headers={headersExcel}>Exportar a Excel</CSVLink>
            </button>      

            <DataTable
                columns={columns}
                data={filteredUsers}
                paginationPerPage={7}
                pagination
            />

            <ActualizarEmpleado 
                estado={estadoModal2} 
                cambiarEstado={setEstado2}
                usuario={selectedUser} 
            />
        </div>
    )
}

export default Empleados;