import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import { BsHouse, BsTree, BsGear, BsList, BsCpu, BsCameraVideo } from "react-icons/bs"; 
import { Link } from "react-router-dom"; 
import "bootstrap/dist/css/bootstrap.min.css";
import './css/App.css'; 
import './css/Sidebar.css'; 
import Home from './components/Home';  
import PlantasDashboard from './components/PlantasDashboard';
import PlantaDetail from './components/PlantaDetail';
import DispositivosDashboard from './components/DispositivosDashboard';
import DispositivoDetail from './components/DispositivoDetail';
import CameraStream from './components/CameraStream';

const Sidebar = ({ onToggle }) => {
  const [isOpen, setIsOpen] = useState(false); // Estado para controlar si el sidebar está abierto

  const toggleSidebar = () => {
    const newState = !isOpen;
    setIsOpen(newState); 
    onToggle(newState); 
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
            <Link to="/" className="text-white text-decoration-none">
              <BsHouse size={24} className="me-2" /> Inicio
            </Link>
          </li>
          <li className="p-2 d-flex align-items-center">
            <Link to="/plantas" className="text-white text-decoration-none">
              <BsTree size={24} className="me-2" /> Plantas
            </Link>
          </li>
          <li className="p-2 d-flex align-items-center">
            <Link to="/dispositivos" className="text-white text-decoration-none">
              <BsCpu size={24} className="me-2" /> Dispositivos
            </Link>
          </li>
          <li className="p-2 d-flex align-items-center">
            <Link to="/camara" className="text-white text-decoration-none">
              <BsCameraVideo size={24} className="me-2" /> Cámara
            </Link>
          </li>
          <li className="p-2 d-flex align-items-center">
            <Link to="/configuracion" className="text-white text-decoration-none">
              <BsGear size={24} className="me-2" /> Configuración
            </Link>
          </li>
        </ul>
      </div>
    </>
  );
};

function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // Estado para controlar el sidebar

  const handleSidebarToggle = (isOpen) => {
    setIsSidebarOpen(isOpen); // Actualizar el estado cuando el sidebar se abre o cierra
  };

  return (
    <div className={`App ${isSidebarOpen ? "sidebar-open" : ""}`}>
      <Sidebar onToggle={handleSidebarToggle} />
      <div className="main-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/plantas" element={<PlantasDashboard />} />
          <Route path="/plantas/:id" element={<PlantaDetail />} />
          <Route path="/dispositivos" element={<DispositivosDashboard />} /> 
          <Route path="/camara" element={<CameraStream />} />
          <Route path="/dispositivos/:id" element={<DispositivoDetail />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
