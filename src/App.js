import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './components/Home';  
import Sidebar from './components/Sidebar';  
import PlantasDashboard from './components/PlantasDashboard';
import PlantaDetail from './components/PlantaDetail';
import DispositivosDashboard from './components/DispositivosDashboard';
import DispositivoDetail from './components/DispositivoDetail';
import CamaraDashboardDashboard from './components/CamaraDashboard';
function App() {
  return (
    <div className="App">
      <div className="d-flex">
        <Sidebar />
        <div className="main-content" style={{ marginLeft: '250px', padding: '20px', width: '100%' }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/plantas" element={<PlantasDashboard />} />
            <Route path="/plantas/:id" element={<PlantaDetail />} />
            <Route path="/dispositivos" element={<DispositivosDashboard />} /> 
            <Route path="/camara" element={<CamaraDashboardDashboard />} />
            <Route path="/dispositivos/:id" element={<DispositivoDetail />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}

export default App;
