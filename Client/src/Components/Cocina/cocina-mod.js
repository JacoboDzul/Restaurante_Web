
import React, { useState, useEffect } from 'react';
import "./bin.css"
import axios from 'axios';
import Swal from 'sweetalert2';
import Slider from '@mui/material/Slider';
import DateMomentUtils from '@date-io/moment';
import chef from "../../Assets/chef.jpg";
import Navbar from '../Main/Navbar';
import Footer from '../Main/Footer';
import {
    DateTimePicker,
    MuiPickersUtilsProvider,
  } from '@material-ui/pickers';
  

function Cocina() {
  return (
<section>
    <Navbar/>
<div className="cover d-flex flex-column align-items-center justify-content-center text-center text-white">
    <h1 className="cover-heading">Cocina</h1>
    <p className="lead">¡Chef, es hora de transformar tu experiencia en la cocina!</p>
</div>
</section>

  );
}





function Contenido(){
  const [nombreValue, setNombreValue] = useState("");
  const [tipoValue, setTipoValue] = useState("");
  const [descripcionValue, setDescripcionValue] = useState("");
  const [PrecioValue, setPrecioValue] = useState("");

  const handleSliderChange = (event, newValue) => {
    setPrecioValue(newValue);
    
  };

  

  const AgregarPlatillo = e => {
    e.preventDefault();
    const nuevoPlatillo = {
      action: 'insert',
      nombre: nombreValue,
      tipo: tipoValue, 
      descripcion: descripcionValue,
      precio: PrecioValue,
    };

    if (!nombreValue || !tipoValue || !descripcionValue || !PrecioValue) {
      Swal.fire({
        title: "Error",
        text: "Por favor, completa todos los campos.",
        icon: "error"
      });
      return;
    }
  

    axios.post('http://localhost:7777/postPlatillo', nuevoPlatillo)
      .then(res => {
        Swal.fire({
          title: "¡Platillo guardado!",
          icon: "success"
        }).then(() => {
          window.location.reload();
        });
        console.log(res);
      })
      .catch(err => {
        console.error('Error al guardar el platillo', err);
      });
  };


    return(
        <section className="section">
        <div className="wrap-two-column">
          <div className="column-half">
          <img src={chef} alt="Descripción de la imagen" style={{ width: 'auto', height: 'auto' }} />
          </div>
          <div className="column-half">
            <form action="" className="formulario">
            <h3>Nuevos Platillos</h3>
              <input
                label="Nombre"
                placeholder="Nombre"
                value={nombreValue}
                onChange={(e) => setNombreValue(e.target.value)}
                style={{backgroundColor: 'white', border: 'none',borderRadius: '5px',textAlign: 'left', marginBottom: '1rem' }}
              />
              <select className='Select' value={tipoValue} onChange={(e) => setTipoValue(e.target.value)}>
              <option value="">Selecciona una opción</option>
              <option value="Italiano">Italiano</option>
              <option value="Francés">Francés</option>
              <option value="Potugués">Portugués</option>
              </select>
              <input
                label="Precio del Platillo"
                type='number'
                placeholder="Precio del Platillo"
                value={PrecioValue}
                disabled
                onChange={(e) => setPrecioValue(e.target.value)}
                style={{ backgroundColor: 'white', border: 'none',borderRadius: '5px',textAlign: 'left', marginBottom: '1rem' }}
              />
               <Slider
                defaultValue={1}
                value={PrecioValue}
                onChange={handleSliderChange}
                aria-labelledby="discrete-slider"
                valueLabelDisplay="auto"
                step={1}
                marks
                min={1}
                max={30}
                sx={{
                  color: 'success.main',
                  marginBottom: '1rem',
                  color: 'white',
                }}
              />
              <input
                label="Descripción"
                placeholder="Descripción"
                value={descripcionValue}
                onChange={(e) => setDescripcionValue(e.target.value)}
                style={{ backgroundColor: 'white', border: 'none',borderRadius: '5px',textAlign: 'left', marginBottom: '1rem' }}
              />
              <button type="button" className="btn btn-warning" onClick={AgregarPlatillo}>Agregar Platillo</button>
            </form>
          </div>
        </div>
      </section>
      
        

    );
}

function ImageGallery() {
    const handleDownload = (imageName) => {
        let content;
        if (imageName === 'Recetario 1') {
          content = `Penne pasta en salsa de tomate con pollo y tomates:

          Ingredientes:
          - 350 gramos de penne pasta
          - 2 pechugas de pollo, cortadas en trozos pequeños
          - 2 cucharadas de aceite de oliva
          - 1 cebolla mediana, picada finamente
          - 2 dientes de ajo, picados
          - 400 gramos de tomates cherry, cortados por la mitad
          - 1 lata (400 gramos) de tomates triturados
          - 1 cucharadita de azúcar
          - Sal y pimienta al gusto
          - Hojas de albahaca fresca, picadas (opcional)
          - Queso parmesano rallado para servir
          
          Instrucciones:
          1. Cocina la pasta en agua con sal de acuerdo con las instrucciones del paquete hasta que esté al dente. Escurre y reserva.
          2. Mientras tanto, sazona los trozos de pollo con sal y pimienta al gusto.
          3. Calienta una sartén grande a fuego medio-alto y agrega una cucharada de aceite de oliva. Agrega el pollo y cocina hasta que esté dorado por todos lados y cocido completamente. Retira el pollo de la sartén y reserva.
          4. En la misma sartén, agrega la cebolla y el ajo picados. Cocina hasta que estén dorados y fragantes, aproximadamente 2-3 minutos.
          5. Agrega los tomates cherry cortados por la mitad a la sartén y cocina por unos minutos hasta que comiencen a ablandarse.
          6. Agrega los tomates triturados a la sartén junto con el azúcar. Reduce el fuego a medio-bajo y cocina la salsa, revolviendo ocasionalmente, durante unos 10-15 minutos hasta que espese ligeramente.
          7. Una vez que la salsa esté lista, agrega el pollo cocido a la sartén y revuelve para combinar. Cocina por unos minutos adicionales para calentar el pollo.
          8. Agrega la pasta cocida a la sartén con la salsa y el pollo. Mezcla bien para asegurarte de que la pasta esté completamente cubierta con la salsa.
          9. Si lo deseas, espolvorea hojas de albahaca fresca picada por encima.
          10. Sirve la penne pasta en salsa de tomate con pollo y tomates caliente, espolvoreada con queso parmesano rallado.
          
          ¡Disfruta de esta deliciosa y reconfortante comida italiana en la comodidad de tu hogar!`;
          Swal.fire({
            title: 'Recetario Descargado',
            text: 'Disfruta de la preparación',
            icon: 'success',
            confirmButtonText: 'Cerrar'
          });
        } else if (imageName === 'Recetario 2') {
          content = `Receta para preparar fajitas de cerdo estilo mexicano:

          Ingredientes:
          - 500 gramos de filete de cerdo cortado en tiras delgadas
          - 1 cebolla grande cortada en tiras
          - 1 pimiento verde cortado en tiras
          - 1 pimiento rojo cortado en tiras
          - 2 dientes de ajo picados
          - 1 cucharadita de comino molido
          - 1 cucharadita de chile en polvo
          - 1 cucharadita de orégano seco
          - 1 cucharadita de paprika
          - Sal y pimienta al gusto
          - Tortillas de maíz o harina
          - Aceite de oliva
          - Limones cortados en cuartos, para servir
          - Guarniciones opcionales: aguacate en rodajas, crema agria, salsa mexicana, cilantro fresco, etc.
          
          Instrucciones:
          1. En un tazón grande, mezcla las tiras de cerdo con el comino, el chile en polvo, el orégano, la paprika, el ajo picado, sal y pimienta al gusto. Mezcla bien para asegurarte de que todas las tiras de cerdo estén cubiertas con las especias. Deja marinar durante al menos 30 minutos en el refrigerador.
          2. Calienta un poco de aceite de oliva en una sartén grande a fuego medio-alto. Agrega las tiras de cerdo marinadas y cocina hasta que estén doradas y cocidas por completo, aproximadamente de 5 a 7 minutos. Retira la carne de la sartén y reserva.
          3. En la misma sartén, agrega un poco más de aceite si es necesario y añade las tiras de cebolla y pimientos. Cocina hasta que estén tiernos y ligeramente dorados, aproximadamente de 5 a 7 minutos.
          4. Regresa la carne cocida a la sartén con las verduras y mezcla bien. Cocina por unos minutos más para que los sabores se combinen.
          5. Calienta las tortillas en un comal o sartén caliente durante unos segundos por cada lado, hasta que estén calientes y ligeramente doradas.
          6. Sirve las fajitas de cerdo calientes en las tortillas calientes, acompañadas de guarniciones opcionales como aguacate, crema agria, salsa mexicana, cilantro fresco y limones cortados en cuartos.
          
          ¡Disfruta de estas deliciosas fajitas de cerdo estilo mexicano con tu familia y amigos!`;
          Swal.fire({
            title: 'Recetario Descargado',
            text: 'Disfruta de la preparación',
            icon: 'success',
            confirmButtonText: 'Cerrar'
          });
        } else if (imageName === 'Recetario 3') {
          content = `Guacamole rojo mexicano:

          Ingredientes:
          - 3 aguacates maduros
          - 2 tomates medianos
          - 1/4 de cebolla morada
          - 1/4 de taza de cilantro fresco picado
          - 1 chile serrano (opcional, dependiendo de tu preferencia de picante)
          - El jugo de 1 limón
          - Sal al gusto
        
          Instrucciones:
          1. Comienza cortando los tomates por la mitad y retirando las semillas. Luego, córtalos en cubitos pequeños y colócalos en un tazón grande.
          2. Pela y pica finamente la cebolla morada. Agrégala al tazón con los tomates.
          3. Si decides usar chile serrano, pícalo muy finamente y agrégalo al tazón. Si prefieres un guacamole menos picante, puedes quitar las semillas y las venas del chile antes de picarlo.
          4. Ahora, corta los aguacates por la mitad y retira el hueso. Con una cuchara, saca la pulpa de los aguacates y agrégala al tazón con los otros ingredientes.
          5. Agrega el cilantro fresco picado al tazón.
          6. Exprime el jugo de limón sobre los ingredientes en el tazón. Esto ayudará a realzar los sabores y a prevenir que el guacamole se oxide y se ponga marrón.
          7. Con un tenedor, aplasta los ingredientes en el tazón hasta obtener la consistencia deseada para tu guacamole.
          8. Una vez que hayas alcanzado la consistencia deseada, sazona el guacamole con sal al gusto y mezcla bien.
          9. Sirve el guacamole rojo con totopos de maíz o como acompañamiento para tacos, quesadillas, nachos o cualquier otro platillo mexicano que desees disfrutar.
        
          ¡Espero que disfrutes de este delicioso guacamole rojo mexicano!
          `;
          Swal.fire({
            title: 'Recetario Descargado',
            text: 'Disfruta de la preparación',
            icon: 'success',
            confirmButtonText: 'Cerrar'
          });
        } else if (imageName === 'Recetario 4'){
            content=`Recetario de Chilaquiles:

            Ingredientes:
            - 12 tortillas de maíz cortadas en triángulos
            - 2 tazas de salsa roja o verde (puedes prepararla en casa o utilizar salsa comprada)
            - 1/2 cebolla blanca, picada finamente
            - 2 dientes de ajo, picados
            - 1 chile jalapeño, picado (opcional, ajusta según tu preferencia de picante)
            - 1 taza de queso fresco desmenuzado
            - 1/4 de taza de crema agria
            - Aceite vegetal para freír
            - Sal al gusto
            - Cilantro fresco picado para decorar
            - Rodajas de aguacate (opcional)
        
            Instrucciones:
            1. En una sartén grande, calienta suficiente aceite vegetal para freír a fuego medio-alto.
            2. Fríe los triángulos de tortilla en lotes hasta que estén dorados y crujientes. Retíralos del aceite y colócalos sobre papel absorbente para eliminar el exceso de grasa.
            3. En una sartén aparte, calienta un poco de aceite y sofríe la cebolla y el ajo hasta que estén dorados y fragantes.
            4. Agrega el chile jalapeño picado y cocina por unos minutos más.
            5. Vierte la salsa roja o verde sobre la mezcla de cebolla, ajo y chile. Cocina a fuego medio durante unos 5 minutos, revolviendo ocasionalmente.
            6. Agrega los triángulos de tortilla fritos a la salsa y revuelve bien para asegurarte de que estén completamente cubiertos.
            7. Cocina los chilaquiles en la salsa durante unos minutos, hasta que estén bien calientes y hayan absorbido parte de la salsa.
            8. Retira los chilaquiles del fuego y sírvelos en platos individuales.
            9. Espolvorea queso fresco desmenuzado y crema agria sobre los chilaquiles.
            10. Decora con cilantro fresco picado y rodajas de aguacate si lo deseas.
            11. Sirve los chilaquiles calientes como plato principal o acompañamiento. ¡Disfruta!`;
            Swal.fire({
                title: 'Recetario Descargado',
                text: 'Disfruta de la preparación',
                icon: 'success',
                confirmButtonText: 'Cerrar'
              });
        }
        else if (imageName === 'Recetario 5'){
            content=`Recetario de Mole:

            Ingredientes:
            - 6 chiles anchos secos
            - 4 chiles mulatos secos
            - 3 chiles pasilla secos
            - 1/2 taza de aceite vegetal
            - 1/2 taza de almendras enteras
            - 1/2 taza de ajonjolí (sésamo)
            - 1/2 taza de pasas
            - 1/4 de taza de cacahuetes (maní)
            - 1/4 de taza de nueces
            - 1/4 de taza de semillas de calabaza (pepitas)
            - 1/4 de taza de semillas de sésamo (opcional)
            - 1/4 de taza de semillas de girasol (opcional)
            - 1/4 de taza de avellanas (opcional)
            - 1/2 cucharadita de anís en grano (opcional)
            - 1/2 cucharadita de comino en grano
            - 1/2 cucharadita de pimienta negra entera
            - 3 clavos de olor enteros
            - 1 rama de canela
            - 1/2 cucharadita de semillas de cilantro
            - 3 tortillas de maíz
            - 2 rodajas de pan de caja (pan blanco)
            - 1/2 cebolla blanca
            - 3 dientes de ajo
            - 1/2 tomate rojo
            - 1/2 plátano macho
            - 1/2 tabletas de chocolate de mesa (aproximadamente 90 g)
            - 8 tazas de caldo de pollo o vegetales (aproximadamente)
            - Sal al gusto
        
            Instrucciones:
            1. Retira las semillas y venas de los chiles anchos, mulatos y pasilla. 
            2. En una sartén grande, calienta el aceite vegetal a fuego medio y fríe los chiles hasta que estén ligeramente dorados. 
            3. Retira los chiles de la sartén y resérvalos.
            4. En la misma sartén, tuesta las almendras, el ajonjolí, las pasas, los cacahuetes, las nueces, las semillas de calabaza, las semillas de sésamo, las semillas de girasol, las avellanas (si las usas), el anís, el comino, la pimienta, los clavos de olor, la canela y las semillas de cilantro. 
            5. Tuesta las tortillas y el pan.
            6. Licúa todos los ingredientes tibios con la cebolla, el ajo, el tomate, el plátano y el chocolate. 
            7. Cuela la salsa y regresa al fuego en una olla grande. 
            8. Cocina la salsa a fuego medio-alto durante aproximadamente 10 minutos. 
            9. Añade caldo de pollo o vegetales según sea necesario para obtener la consistencia deseada. 
            10. Sazona con sal al gusto.
            11. Sirve caliente sobre pollo, pavo, cerdo o cualquier otro plato de tu elección. ¡Disfruta!`;
        
            Swal.fire({
              title: 'Recetario Descargado',
              text: 'Disfruta de la preparación',
              icon: 'success',
              confirmButtonText: 'Cerrar'
            });
        }else if (imageName === 'Recetario 6'){
            content=`Recetario de Sopa de Zanahoria:

            Ingredientes:
            - 1 kg de zanahorias, peladas y cortadas en rodajas
            - 1 cebolla grande, picada
            - 2 tallos de apio, picados
            - 2 dientes de ajo, picados
            - 4 tazas de caldo de verduras
            - 1 cucharadita de comino molido
            - 1 cucharadita de jengibre fresco rallado
            - Sal y pimienta negra al gusto
            - Aceite de oliva
            - Yogur griego o crema agria para servir
            - Cilantro fresco picado para decorar (opcional)
        
            Instrucciones:
            1. En una olla grande, calienta un poco de aceite de oliva a fuego medio.
            2. Agrega la cebolla y el apio picados, y cocina hasta que estén tiernos.
            3. Añade el ajo picado y cocina por un minuto más.
            4. Incorpora las rodajas de zanahoria y cocina por unos minutos.
            5. Vierte el caldo de verduras en la olla y agrega el comino molido y el jengibre rallado.
            6. Lleva la sopa a ebullición, luego reduce el fuego y deja cocinar a fuego lento hasta que las zanahorias estén tiernas.
            7. Retira la olla del fuego y deja que la sopa se enfríe un poco.
            8. Usa una licuadora de mano o una licuadora de pie para triturar la sopa hasta que quede suave.
            9. Vuelve a colocar la sopa en la olla y caliéntala a fuego medio.
            10. Sazona con sal y pimienta al gusto.
            11. Sirve la sopa caliente, acompañada de una cucharada de yogur griego o crema agria y cilantro fresco picado si lo deseas.
            
            ¡Disfruta de esta reconfortante sopa de zanahoria llena de sabor y nutrición!`;
        
            Swal.fire({
              title: 'Recetario Descargado',
              text: 'Disfruta de la preparación',
              icon: 'success',
              confirmButtonText: 'Cerrar'
            });
        }
    
        const blob = new Blob([content], { type: 'text/plain' }); 
        const url = URL.createObjectURL(blob); 
    
       
        const link = document.createElement('a');
        link.href = url;
        link.download = `${imageName.replace(/\.[^/.]+$/, '')}.txt`; 
        document.body.appendChild(link);
        link.click();
    
     
        URL.revokeObjectURL(url);
        document.body.removeChild(link);
      };
    return (
        <div style={{ margin: '20px auto', maxWidth: '1000px' }}>
             <h4 style={{ textAlign: 'center', fontFamily: 'Roboto Slab, sans-serif', fontWeight: 'bold', fontSize: '3rem', color: 'orange' }}>Platillos de la semana</h4>
  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
    <img src="https://img.freepik.com/foto-gratis/penne-pasta-salsa-tomate-pollo-tomates-mesa-madera_2829-19739.jpg?t=st=1713053063~exp=1713056663~hmac=fcf144b6689d7b56b567c93ce535b1b7cfe75077a490b69c2cd34f57165295cb&w=740" alt="Plato 1" onClick={() => handleDownload('Recetario 1')} className="gallery-image" style={{ width: '30%', height: 'auto' }} />
    <img src="https://img.freepik.com/foto-gratis/toma-enfoque-selectivo-deliciosas-flautas-cerdo-al-estilo-mexicano-placa-blanca_181624-38905.jpg?t=st=1713053092~exp=1713056692~hmac=26724e531cf73f70b9264b0222373d45b065671e6b5068eb998df3b4408e650a&w=740" onClick={() => handleDownload('Recetario 2')} alt="Imagen 2" className="gallery-image" style={{ width: '30%', height: 'auto' }} />
    <img src="https://img.freepik.com/foto-gratis/cocina-mexicana_23-2147640325.jpg?t=st=1713053117~exp=1713056717~hmac=b64807495bdaffa15f30ec67ecd41c978560726f72e196e8085b18521cd6cadf&w=740" alt="Plato 3" className="gallery-image" onClick={() => handleDownload('Recetario 3')} style={{ width: '30%', height: 'auto' }} />
  </div>
  <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '20px' }}>
    <img src="https://img.freepik.com/fotos-premium/chilaquiles-plato-blanco-comida-mexicana_147448-116.jpg?w=740" alt="Plato 4" className="gallery-image" onClick={() => handleDownload('Recetario 4')} style={{ width: '30%', height: 'auto' }} />
    <img src="https://img.freepik.com/fotos-premium/mole-mexicano-ingredientes-mole-poblano-comida-picante-mexicana-tradicional-mexico_137422-10.jpg" alt="Plato 5" className="gallery-image" onClick={() => handleDownload('Recetario 5')} style={{ width: '30%', height: 'auto' }} />
    <img src="https://img.freepik.com/foto-gratis/sopa-zanahoria-crema-perejil-sobre-mesa-madera_123827-22531.jpg?t=st=1713058811~exp=1713062411~hmac=e1876470d5d47ec6a3fa44d26abe7eabab30042e313d9ffaa659feacb6766033&w=740" alt="Plato 6" className="gallery-image" onClick={() => handleDownload('Recetario 6')} style={{ width: '30%', height: 'auto' }} />
  </div>
</div>

    );
  }

  
  function Contenido2() {
    const [nombreValue, setNombreValue] = useState("");
    const [tipoValue, setTipoValue] = useState("");
    const [descripcionValue, setDescripcionValue] = useState("");
    const [precioValue, setPrecioValue] = useState(1);
    const [platillos, setPlatillos] = useState([]);
    const [platilloSeleccionado, setPlatilloSeleccionado] = useState(null);
  
    const handleSliderChange = (event, newValue) => {
      setPrecioValue(newValue);
    };
  
    const obtenerPlatillos = () => {
      axios.get('http://localhost:7777/getPlatillos')
        .then(response => {
          setPlatillos(response.data);
        })
        .catch(error => {
          console.error('Error al obtener los platillos', error);
        });
    };
  
    useEffect(() => {
      obtenerPlatillos();
    }, []);
  
    const mostrarDetallesPlatillo = (platillo) => {
      setPlatilloSeleccionado(platillo);
      setNombreValue(platillo.Platillos_Nombre);
      setTipoValue(platillo.Platillos_Tipo);
      setDescripcionValue(platillo.Platillos_Descripcion);
      setPrecioValue(platillo.Platillos_Precio);
    };
  
    return (
      <section className="section">
        <div className="wrap-two-column" style={{ display: 'flex', justifyContent: 'space-between', gap: '20px' }}>
          <div className="column-half">
            <form action="" className="formulario">
              <h3>Consultar Platillos</h3>
              <select className='Select' value={nombreValue} onChange={(e) => mostrarDetallesPlatillo(JSON.parse(e.target.value))}>
                <option value="">Selecciona un platillo</option>
                {platillos.map(platillo => (
                  <option key={platillo.Platillos_Id} value={JSON.stringify(platillo)}>{platillo.Platillos_Nombre}</option>
                ))}
              </select>
              <input
                label="Nombre"
                disabled
                placeholder="Nombre"
                value={nombreValue}
                onChange={(e) => setNombreValue(e.target.value)}
                style={{ backgroundColor: 'white', border: 'none', borderRadius: '5px', textAlign: 'left', marginBottom: '1rem' }}
              />
             <input
             label="Tipo"
             disabled
             placeholder='Tipo de platillo'
             value={tipoValue}
             onChange={(e)=> setTipoValue(e.target.value)}
             style={{ backgroundColor: 'white', border: 'none', borderRadius: '5px', textAlign: 'left', marginBottom: '1rem' }}
             />
              <input
                label="Precio del Platillo"
                type='number'
                disabled
                placeholder="Precio del Platillo"
                value={precioValue}
                onChange={(e) => setPrecioValue(e.target.value)}
                style={{ backgroundColor: 'white', border: 'none', borderRadius: '5px', textAlign: 'left', marginBottom: '1rem' }}
              />
              <input
                label="Descripción"
                disabled
                placeholder="Descripción"
                value={descripcionValue}
                onChange={(e) => setDescripcionValue(e.target.value)}
                style={{ backgroundColor: 'white', border: 'none', borderRadius: '5px', textAlign: 'left', marginBottom: '1rem' }}
              />
            </form>
          </div>
          <div className="column-half">
            <img src='https://img.freepik.com/foto-gratis/hermosa-mujer-imagen-chef_144627-9604.jpg?t=st=1713066241~exp=1713069841~hmac=7248ef5e733b353b607cc4ce2d28f30d1802ba4b208a3fc2b0c47ac9fa047698&w=740' alt="Chef" style={{ width: '100%', height: 'auto' }} />
          </div>
        </div>
        <Footer/>
      </section>
    );
  }
function Modulo() {
    return (
      <main>
        <Cocina />
        <br></br>
        <Contenido />
        <br></br>
        <br></br>
        <ImageGallery/>
        <br></br>
        <br></br>
        <Contenido2/>
      </main>
    );
  }
  
  export default Modulo;