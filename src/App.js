import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./css/App.css";
import "./css/Sidebar.css";
import Sidebar from "./components/Sidebar"; // Importar el Sidebar
import Home from "./components/Home";
import PlantasDashboard from "./components/PlantasDashboard";
import PlantaDetail from "./components/PlantaDetail";
import DispositivosDashboard from "./components/DispositivosDashboard";
import DispositivoDetail from "./components/DispositivoDetail";
import CameraStream from "./components/CameraStream";

function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // Estado para controlar el sidebar

  const handleSidebarToggle = (isOpen) => {
    setIsSidebarOpen(isOpen); // Actualizar el estado cuando el sidebar se abre o cierra
  };

  return (
    <div className={`App ${isSidebarOpen ? "sidebar-open" : ""}`}>
      <Sidebar onToggle={handleSidebarToggle} /> {/* Usar el componente Sidebar */}
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
