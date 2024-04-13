import React, { useState } from 'react';
import './Reserva.css';
import Navbar from '../Main/Navbar';
import Footer from '../Main/Footer';
import TextField from '@mui/material/TextField';
import axios from 'axios';
import Swal from 'sweetalert2';
import Slider from '@mui/material/Slider';
import DateMomentUtils from '@date-io/moment';
import hero from "../../Assets/cocina.jpg";

import {
  DateTimePicker,
  MuiPickersUtilsProvider,
} from '@material-ui/pickers';

function HeroSection() {
  return (
    <div>
        <Navbar/>
  </div>
    
  );
}

function ReservationSection() {
  const [nombreValue, setNombreValue] = useState("");
  const [dateTimeValue, setDateTimeValue] = useState(new Date()); // Estado para la fecha y hora seleccionadas
  const [personasValue, setPersonasValue] = useState("");
  const [mesaValue, setMesaValue] = useState("");
  const [observacionesValue, setObservacionesValue] = useState("");

  const handleSliderChange = (event, newValue) => {
    setPersonasValue(newValue);
    
  };
  const handleMesaChange = (event, newValue) => {
    setMesaValue(newValue); // Actualizar el estado del número de mesa
  };

  const AgregarMesa = e => {
    e.preventDefault();
    const nuevaReservacion = {
      action: 'insert',
      nombre: nombreValue,
      fecha: dateTimeValue, // Fecha y hora seleccionadas
      numper: personasValue,
      nummesa: mesaValue,
      observaciones: observacionesValue
    };

    if (!nombreValue || !dateTimeValue || !personasValue || !mesaValue || !observacionesValue) {
      Swal.fire({
        title: "Error",
        text: "Por favor, completa todos los campos.",
        icon: "error"
      });
      return;
    }
  

    axios.post('http://localhost:7777/postReserva', nuevaReservacion)
      .then(res => {
        Swal.fire({
          title: "¡Reservación guardada!",
          icon: "success"
        }).then(() => {
          window.location.reload();
        });
        console.log(res);
      })
      .catch(err => {
        console.error('Error al guardar la reservación', err);
      });
  };

  return (
    <section className="section">
      <div className="wrap-two-column">
        <div className="column-half">
            <img src={hero} alt="Descripción de la imagen" style={{ width: 'auto', height: 'auto' }} />
        </div>
        <div className="column-half">
          <form action="" className="formulario">
          <h3>Reserva tu mesa</h3>
            <input
              label="Nombre"
              placeholder="Nombre"
              value={nombreValue}
              onChange={(e) => setNombreValue(e.target.value)}
              style={{backgroundColor: 'white', border: 'none',borderRadius: '5px',textAlign: 'left', marginBottom: '1rem' }}
            />
            <input
              label="No. de Personas"
              type='number'
              placeholder=" Número de Personas"
              value={personasValue}
              disabled
              onChange={(e) => setPersonasValue(e.target.value)}
              style={{  backgroundColor: 'white', border: 'none',borderRadius: '5px',textAlign: 'center', marginBottom: '1rem' }}
            />
            <Slider
              defaultValue={1}
              value={personasValue}
              onChange={handleSliderChange}
              aria-labelledby="discrete-slider"
              valueLabelDisplay="auto"
              step={1}
              marks
              min={1}
              max={15}
              sx={{
                
                color: 'success.main',
                marginBottom: '1rem',
                color: 'orange',
             
              }}
            />
            <input
              label="No. de Mesa"
              type='number'
              placeholder="Número de mesa"
              value={mesaValue}
              disabled
              onChange={(e) => setMesaValue(e.target.value)}
              style={{ backgroundColor: 'white', border: 'none',borderRadius: '5px',textAlign: 'center', marginBottom: '1rem' }}
            />
             <Slider
              defaultValue={1}
              value={mesaValue}
              onChange={handleMesaChange}
              aria-labelledby="discrete-slider"
              valueLabelDisplay="auto"
              step={1}
              marks
              min={1}
              max={15}
              sx={{
                color: 'success.main',
                marginBottom: '1rem',
                color: 'orange',
              }}
            />
             <MuiPickersUtilsProvider utils={DateMomentUtils}>
              <DateTimePicker
                label="Fecha y hora de reservación"
                value={dateTimeValue}
                placeholder="Fecha de Reservación"
                onChange={setDateTimeValue}
                style={{ backgroundColor: 'white', border: 'none',borderRadius: '5px', marginBottom: '1rem'}}
              />
            </MuiPickersUtilsProvider>
            <input
              label="Observaciones"
              placeholder="Observaciones"
              value={observacionesValue}
              onChange={(e) => setObservacionesValue(e.target.value)}
              style={{ backgroundColor: 'white', border: 'none',borderRadius: '5px',textAlign: 'left', marginBottom: '1rem' }}
            />
            <button type="button" className="btn btn-warning" onClick={AgregarMesa}>Agregar Reservación</button>
          </form>
        </div>
      </div>
      <div>
        <Footer/>
      </div>
    </section>
  );
}

function ReservasPage() {
  return (
    <main>
      <HeroSection />
      <ReservationSection />
    </main>
  );
}

export default ReservasPage;