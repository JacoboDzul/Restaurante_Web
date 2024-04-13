import React, { useState } from "react";
import "./dashboard.css";
import { Link } from "react-router-dom";
import LogoDashboard from "../../../Assets/LogoDashboard.svg";
import Empleados from "../Empleados/Empleado";

function DashBoard() {
  const [isMenuActive, setMenuActive] = useState(false);
  const [activeView, setActiveView] = useState(""); // Estado para la vista activa


  const toggleMenu = () => {
    setMenuActive(!isMenuActive);
  };
  const handleViewChange = (view) => {
    setActiveView(view);
  };

  const renderContent = () => {
    // Renderizar contenido según la vista activa
    switch (activeView) {
      case "inicio":
        return <div className="nav-logo-container2">
                  <img src={LogoDashboard} alt="" />
                </div>;
      case "empleados":
        return <div className="ContenidoEmpleado">
                <Empleados/>
                <h2>.</h2>
               </div>;
      case "reservaciones":
        return <div>Contenido de la vista de Reservaciones</div>;
      case "platillos":
        return <div>Contenido de la vista de Platillos</div>;
      case "productos":
        return <div>Contenido de la vista de Productos</div>;
      case "proveedores":
        return <div>Contenido de la vista de Proveedores</div>;
      default:
        return <div className="nav-logo-container2">
                <img src={LogoDashboard} alt="" />
               </div>;
    }
  };

  return (
    <div className="dashboard-container">
      <div className={`dashboard ${isMenuActive ? "active" : ""}`}>
      <div className={"containe"}>
        <div className="navigation">
          <ul>
            <li>
              <a href="" onClick={() => handleViewChange("inicio")}>
                <span className="icon">
                  <ion-icon name="logo-apple-ar"></ion-icon>
                </span>
                <span className="title">FOODIE</span>
              </a>
            </li>
            <li>
                <Link to={""} onClick={() => handleViewChange("inicio")}>
                    <span className="icon">
                        <ion-icon name="home-outline"></ion-icon>
                    </span>
                    <span className="title">Inicio</span>
                </Link>
            </li>
            <li>
                <Link to={""} onClick={() => handleViewChange("empleados")}>
                    <span className="icon">
                        <ion-icon name="people-outline"></ion-icon>
                    </span>
                    
                      <span className="title">Empleados</span>
                    
                </Link>
            </li>
            <li>
                <a href="">
                    <span className="icon">
                        <ion-icon name="storefront-outline"></ion-icon>
                    </span>
                    <span className="title">Reservaciones</span>
                </a>
            </li>
            <li>
                <a href="">
                    <span className="icon">
                        <ion-icon name="restaurant-outline"></ion-icon>
                    </span>
                    <span className="title">Platillos</span>
               </a>
            </li>
            <li>
                <a href="">
                    <span className="icon">
                        <ion-icon name="cube-outline"></ion-icon>
                    </span>
                    <span className="title">Productos</span>
                </a>
            </li>
            <li>
                <a href="">
                    <span className="icon">
                        <ion-icon name="hand-right-outline"></ion-icon>
                    </span>
                    <span className="title">Proveedores</span>
                </a>
            </li>
            <li>
                <a href="">
                    <span className="icon">
                        <ion-icon name="log-out-outline"></ion-icon>
                    </span>
                    <span className="title">Cerrar sesión</span>
                </a>
            </li>
          </ul>
        </div>
      </div>

      <div className={`main_dashboard ${isMenuActive ? "active" : ""}`}>
        <div className="topbar_dashboard">
          <div className="toggle_dashboard" onClick={toggleMenu}>
            <ion-icon name="menu-outline"></ion-icon>
          </div>
          <div className="search_dashboard">
            <label>
              <input type="text" placeholder="Buscar"/>
              <ion-icon name="search-outline"></ion-icon>
            </label>
          </div>
        </div>
        <div className="Contenido">
          {renderContent()} {/* Renderizar el contenido dinámico */}
        </div>
      </div>
    </div>
    </div>
  );
}

export default DashBoard;