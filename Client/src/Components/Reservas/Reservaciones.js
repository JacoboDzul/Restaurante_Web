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
    <section className="section2">
      <div className="wrap-two-column2">
        <div className="column-half">
            <img src={hero} alt="Descripción de la imagen" style={{ width: 'auto', height: 'auto' }} />
        </div>
        <div className="column-half">
          <form action="" className="formulario2">
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
    </section>
  );
}

function ImageGallery() {
  const handleScrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  };
  return (
      <div style={{ margin: '20px auto', maxWidth: '1000px' }}>
           <h4 style={{ textAlign: 'center', fontFamily: 'Roboto Slab, sans-serif', fontWeight: 'bold', fontSize: '3rem', color: 'orange' }}>Reserva con nosotros</h4>
<div style={{ display: 'flex', justifyContent: 'space-between' }}>
  <img src="https://img.freepik.com/foto-gratis/penne-pasta-salsa-tomate-pollo-tomates-mesa-madera_2829-19739.jpg?t=st=1713053063~exp=1713056663~hmac=fcf144b6689d7b56b567c93ce535b1b7cfe75077a490b69c2cd34f57165295cb&w=740" alt="Plato 1" className="gallery-image" style={{ width: '30%', height: 'auto' }} />
  <img src="https://img.freepik.com/foto-gratis/toma-enfoque-selectivo-deliciosas-flautas-cerdo-al-estilo-mexicano-placa-blanca_181624-38905.jpg?t=st=1713053092~exp=1713056692~hmac=26724e531cf73f70b9264b0222373d45b065671e6b5068eb998df3b4408e650a&w=740" alt="Imagen 2" className="gallery-image" style={{ width: '30%', height: 'auto' }} />
  <img src="https://img.freepik.com/foto-gratis/cocina-mexicana_23-2147640325.jpg?t=st=1713053117~exp=1713056717~hmac=b64807495bdaffa15f30ec67ecd41c978560726f72e196e8085b18521cd6cadf&w=740" alt="Plato 3" className="gallery-image" style={{ width: '30%', height: 'auto' }} />
</div>
<div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '20px' }}>
  <img src="https://img.freepik.com/fotos-premium/chilaquiles-plato-blanco-comida-mexicana_147448-116.jpg?w=740" alt="Plato 4" className="gallery-image"  style={{ width: '30%', height: 'auto' }} />
  <img src="https://img.freepik.com/fotos-premium/mole-mexicano-ingredientes-mole-poblano-comida-picante-mexicana-tradicional-mexico_137422-10.jpg" alt="Plato 5" className="gallery-image"  style={{ width: '30%', height: 'auto' }} />
  <img src="https://img.freepik.com/foto-gratis/sopa-zanahoria-crema-perejil-sobre-mesa-madera_123827-22531.jpg?t=st=1713058811~exp=1713062411~hmac=e1876470d5d47ec6a3fa44d26abe7eabab30042e313d9ffaa659feacb6766033&w=740" alt="Plato 6" className="gallery-image"  style={{ width: '30%', height: 'auto' }} />
</div>

<div class="Boton-Container">
<button class="Btn-Regret" onClick={handleScrollToTop}>¡Reserva!</button>
</div>

<div>
        <Footer/>
      </div>
</div>

  );
}


function ReservasPage() {
  return (
    <main>
      <HeroSection />
      <ReservationSection />
      <ImageGallery/>
    </main>
  );
}

export default ReservasPage;