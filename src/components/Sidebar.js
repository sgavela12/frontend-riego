import { useState } from "react";
import { BsHouse, BsTree, BsGear, BsList } from "react-icons/bs";
import { Link } from "react-router-dom"; // Importamos Link para navegación
import "bootstrap/dist/css/bootstrap.min.css";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className="d-flex">
      {/* Sidebar */}
      <div
        className={`bg-dark text-white p-3 vh-100 position-fixed ${isOpen ? "w-250" : "w-75"} transition`}
      >
        <button
          className="btn btn-outline-light mb-3"
          onClick={() => setIsOpen(!isOpen)}
        >
          <BsList size={24} />
        </button>
        <h4 className={`mb-4 ${isOpen ? "d-block" : "d-none"}`}>🌿 Riego App</h4>
        <ul className="list-unstyled">
          {/* Enlace de navegación para "Inicio" */}
          <li className="p-2 d-flex align-items-center">
            <Link to="/" className="text-white text-decoration-none">
              <BsHouse size={24} className="me-2" /> {isOpen && "Inicio"}
            </Link>
          </li>
          {/* Enlace de navegación para "Plantas" */}
          <li className="p-2 d-flex align-items-center">
            <Link to="/plantas" className="text-white text-decoration-none">
              <BsTree size={24} className="me-2" /> {isOpen && "Plantas"}
            </Link>
          </li>
          {/* Enlace de navegación para "Configuración" */}
          <li className="p-2 d-flex align-items-center">
            <Link to="/configuracion" className="text-white text-decoration-none">
              <BsGear size={24} className="me-2" /> {isOpen && "Configuración"}
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
