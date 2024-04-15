import "./platillo.css";
import ClienteAxios from '../../../config/axios';
import React, { useEffect, useState} from 'react';
import DataTable from 'react-data-table-component';
import {CSVLink} from "react-csv";
import Swal from "sweetalert2";
import ActualizarPlatillo from "./ActualizarPlatillo";


function Platillos(){
    const [users, setUsers] = useState([]);
    const [filteredUsers, setFilteredUsers] = useState([]);
    const [estadoModal, setEstado] = useState(false);
    const [estadoModal2, setEstado2] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null); 
    
    const headersExcel = [
        {label: "Nombre", key: "Platillos_Nombre"},
        {label: "Tipo", key: "Platillos_Tipo"},
        {label: "Descripción", key: "Platillos_Descripcion"},
        {label: "Precio", key: "Platillos_Precio"}
    ]

    const URL = 'http://localhost:7777/getPlatillos'
    
    const showData = async () => {
        const response = await fetch(URL);
        const data = await response.json();
        setUsers(data);
        setFilteredUsers(data);
    }

    const columns = [
        {
            name: 'Nombre',
            selector: row => row.Platillos_Nombre,
            sortable: true
        },
        {
            name: 'Tipo',
            selector: row => row.Platillos_Tipo
        },
        {
            name: 'Descripción',
            selector: row => row.Platillos_Descripcion
        },
        {
            name: 'Precio',
            selector: row => row.Platillos_Precio
        },
        {
            name: 'Acciones',
            cell: row => <button className="editPlatillo" onClick={() => handleEdit(row.Platillos_Id)}><ion-icon name="pencil-outline"></ion-icon></button> 
        },
        {
            name: '',
            cell: row => <button className="deletPlatillo" onClick={() => mostrarAlerta(row.Platillos_Id)}><ion-icon name="trash-outline"></ion-icon></button>
        }
    ];

    const handleChange = (e) => {
        const searchTerm = e.target.value.toLowerCase();
        const filteredRecords = users.filter(record => record.React_Nombre.toLowerCase().includes(searchTerm));
        setFilteredUsers(filteredRecords);
    }

    const deleteUser = async (id) => {
        try {
            await ClienteAxios.delete(`/delPlatillo/${id}`);
            const updatedUsers = users.filter(user => user.Platillos_Id !== id);
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
    }, []);

    return(
        <div className="platillo">
            <h2>Platillos</h2>
            
            <input className="platilloBuscador" type="text" onChange={handleChange} placeholder="Buscar por nombre"/>

            <button className="csv-button">
                <ion-icon className="excelIcon" name="download-outline"></ion-icon>
                <CSVLink data={users} filename={"platillos.csv"} headers={headersExcel}>Exportar a Excel</CSVLink>
            </button>      

            <DataTable
                columns={columns}
                data={filteredUsers}
                paginationPerPage={7}
                pagination
            />

            <ActualizarPlatillo
                estado={estadoModal2} 
                cambiarEstado={setEstado2}
                usuario={selectedUser} 
            />
        </div>
    )
}

export default Platillos;