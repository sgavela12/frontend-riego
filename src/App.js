import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './components/Home'; 
import Sidebar from './components/Sidebar';  
import PlantasDashboard from './components/PlantasDashboard';
import PlantaDetail from './components/PlantaDetail'; // Asegúrate de importar el nuevo componente

function App() {
  return (
    <div className="App">
      <div className="d-flex">
        <Sidebar />
        <div className="main-content" style={{ marginLeft: '250px', padding: '20px', width: '100%' }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/plantas" element={<PlantasDashboard />} />
            <Route path="/plantas/:id" element={<PlantaDetail />} /> {/* Ruta para los detalles */}
          </Routes>
        </div>
      </div>
    </div>
  );
}

export default App;
