import { useState } from "react";
import { BsHouse, BsTree, BsGear, BsList } from "react-icons/bs";
import "bootstrap/dist/css/bootstrap.min.css";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className="d-flex">
      {/* Sidebar */}
      <div className={`bg-dark text-white p-3 vh-100 position-fixed ${isOpen ? "w-250" : "w-75"} transition`}>
        <button
          className="btn btn-outline-light mb-3"
          onClick={() => setIsOpen(!isOpen)}
        >
          <BsList size={24} />
        </button>
        <h4 className={`mb-4 ${isOpen ? "d-block" : "d-none"}`}>🌿 Riego App</h4>
        <ul className="list-unstyled">
          <li className="p-2 d-flex align-items-center">
            <BsHouse size={24} className="me-2" /> {isOpen && "Inicio"}
          </li>
          <li className="p-2 d-flex align-items-center">
            <BsTree size={24} className="me-2" /> {isOpen && "Plantas"}
          </li>
          <li className="p-2 d-flex align-items-center">
            <BsGear size={24} className="me-2" /> {isOpen && "Configuración"}
          </li>
        </ul>
      </div>

    
    </div>
  );
};

export default Sidebar;
