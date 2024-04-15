import { Link } from "react-router-dom";
import "./reservacion.css";
import ClienteAxios from '../../../config/axios';
import React, { useEffect, useState} from 'react';
import DataTable from 'react-data-table-component';
import {CSVLink} from "react-csv";
import Swal from "sweetalert2";
import ActualizarReservacion from "./ActualizarReservacion";


function Reservaciones(){
    const [users, setUsers] = useState([]);
    const [filteredUsers, setFilteredUsers] = useState([]);
    const [estadoModal, setEstado] = useState(false);
    const [estadoModal2, setEstado2] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null); 
    
    const headersExcel = [
        {label: "Nombre", key: "Reservaciones_Nombre"},
        {label: "Fecha", key: "Reservaciones_Fecha"},
        {label: "Número de personas", key: "Reservaciones_NumPersonas"},
        {label: "Número de mesa", key: "Reservaciones_NoMesa"},
        {label: "Observaciones", key:"Reservaciones_Observaciones"}
    ]

    const URL = 'http://localhost:7777/getReservaciones'
    
    const showData = async () => {
        const response = await fetch(URL);
        const data = await response.json();
        setUsers(data);
        setFilteredUsers(data);
    }

    const columns = [
        {
            name: 'Nombre',
            selector: row => row.Reservaciones_Nombre,
            sortable: true
        },
        {
            name: 'Fecha',
            selector: row => row.Reservaciones_Fecha
        },
        {
            name: '#Personas',
            selector: row => row.Reservaciones_NumPersonas
        },
        {
            name: '#Mesa',
            selector: row => row.Reservaciones_NoMesa
        },
        {
            name: 'Observaciones',
            selector: row => row.Reservaciones_Observaciones
        },
        {
            name: 'Acciones',
            cell: row => <button className="editReservacion" onClick={() => handleEdit(row.Reservaciones_Id)}><ion-icon name="pencil-outline"></ion-icon></button> 
        },
        {
            name: '',
            cell: row => <button className="deletReservacion" onClick={() => mostrarAlerta(row.Reservaciones_Id)}><ion-icon name="trash-outline"></ion-icon></button>
        }
    ];

    const handleChange = (e) => {
        const searchTerm = e.target.value.toLowerCase();
        const filteredRecords = users.filter(record => record.React_Nombre.toLowerCase().includes(searchTerm));
        setFilteredUsers(filteredRecords);
    }

    const deleteUser = async (id) => {
        try {
            await ClienteAxios.delete(`/delReserva/${id}`);
            const updatedUsers = users.filter(user => user.Reservaciones_Id !== id);
            setUsers(updatedUsers);
            setFilteredUsers(updatedUsers);
        } catch (error) {
            console.error("Error al eliminar el registro:", error);
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
    }, [users]);

    return(
        <div className="reservacion">
            <h2>Reservaciones</h2>
            
            <input className="empleadoReservacion" type="text" onChange={handleChange} placeholder="Buscar por nombre"/>

            <button className="csv-button">
                <ion-icon className="excelIcon" name="download-outline"></ion-icon>
                <CSVLink data={users} filename={"reservaciones.csv"} headers={headersExcel}>Exportar a Excel</CSVLink>
            </button>      

            <DataTable
                columns={columns}
                data={filteredUsers}
                paginationPerPage={7}
                pagination
            />

            <ActualizarReservacion
                estado={estadoModal2} 
                cambiarEstado={setEstado2}
                usuario={selectedUser} 
            />
        </div>
    )
}

export default Reservaciones;