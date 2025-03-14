import { useState } from "react";
import { BsHouse, BsTree, BsGear, BsList, BsCpu, BsCameraVideo } from "react-icons/bs"; 
import { Link } from "react-router-dom"; 
import "bootstrap/dist/css/bootstrap.min.css";

const Sidebar = () => {
  return (
    <div className="d-flex">
      {/* Sidebar */}
      <div className="bg-dark text-white p-3 vh-100 position-fixed w-250 transition">
        <h4 className="mb-4">🌿 Riego App</h4>
        <ul className="list-unstyled">
          {/* Enlace de navegación para "Inicio" */}
          <li className="p-2 d-flex align-items-center">
            <Link to="/" className="text-white text-decoration-none">
              <BsHouse size={24} className="me-2" /> Inicio
            </Link>
          </li>
          {/* Enlace de navegación para "Plantas" */}
          <li className="p-2 d-flex align-items-center">
            <Link to="/plantas" className="text-white text-decoration-none">
              <BsTree size={24} className="me-2" /> Plantas
            </Link>
          </li>
          {/* Enlace de navegación para "Dispositivos" */}
          <li className="p-2 d-flex align-items-center">
            <Link to="/dispositivos" className="text-white text-decoration-none">
              <BsCpu size={24} className="me-2" /> Dispositivos
            </Link>
          </li>
          {/* Enlace de navegación para "Cámara" */}
          <li className="p-2 d-flex align-items-center">
            <Link to="/camara" className="text-white text-decoration-none">
              <BsCameraVideo size={24} className="me-2" /> Cámara
            </Link>
          </li>
          {/* Enlace de navegación para "Configuración" */}
          <li className="p-2 d-flex align-items-center">
            <Link to="/configuracion" className="text-white text-decoration-none">
              <BsGear size={24} className="me-2" /> Configuración
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
