import React, { useState } from "react";
import { BsHouse, BsTree, BsGear, BsCpu, BsCameraVideo } from "react-icons/bs";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "../css/Sidebar.css";

const Sidebar = ({ onToggle }) => {
  const [isOpen, setIsOpen] = useState(false); // Estado para controlar si el sidebar está abierto

  const toggleSidebar = () => {
    const newState = !isOpen;
    setIsOpen(newState); 
    onToggle(newState); // Notificar al componente padre (App)
  };

  const handleLinkClick = () => {
    setIsOpen(false); // Cerrar el Sidebar
    onToggle(false); // Notificar al componente padre que el Sidebar está cerrado
  };

  return (
    <>
      {/* Botón para mostrar/ocultar el sidebar */}
      <button className="sidebar-toggle bg-dark text-white" onClick={toggleSidebar}>
        {isOpen ? "✖" : "☰"} {/* Cambia el ícono según el estado */}
      </button>

      {/* Sidebar */}
      <div className={`sidebar bg-dark text-white p-3 vh-100 position-fixed ${isOpen ? "open" : ""}`}>
        <h4 className="mb-4">🌿 Riego App</h4>
        <ul className="list-unstyled">
          <li className="p-2 d-flex align-items-center">
            <Link to="/" className="text-white text-decoration-none" onClick={handleLinkClick}>
              <BsHouse size={24} className="me-2" /> Inicio
            </Link>
          </li>
          <li className="p-2 d-flex align-items-center">
            <Link to="/plantas" className="text-white text-decoration-none" onClick={handleLinkClick}>
              <BsTree size={24} className="me-2" /> Plantas
            </Link>
          </li>
          <li className="p-2 d-flex align-items-center">
            <Link to="/dispositivos" className="text-white text-decoration-none" onClick={handleLinkClick}>
              <BsCpu size={24} className="me-2" /> Dispositivos
            </Link>
          </li>
          <li className="p-2 d-flex align-items-center">
            <Link to="/camara" className="text-white text-decoration-none" onClick={handleLinkClick}>
              <BsCameraVideo size={24} className="me-2" /> Cámara
            </Link>
          </li>
          <li className="p-2 d-flex align-items-center">
            <Link to="/configuracion" className="text-white text-decoration-none" onClick={handleLinkClick}>
              <BsGear size={24} className="me-2" /> Configuración
            </Link>
          </li>
        </ul>
      </div>
    </>
  );
};

export default Sidebar;
