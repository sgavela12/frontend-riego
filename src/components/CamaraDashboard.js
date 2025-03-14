import React from 'react';
import "../css/CamaraDashboard.css";

const CamaraDashboard = () => {
  return (
    <div className="camara-dashboard">
      <h2>Control de Cámara</h2>
      <div className="camara-controls">
        <button className="btn btn-primary">Arriba</button>
        <div className="horizontal-controls">
          <button className="btn btn-primary">Izquierda</button>
          <button className="btn btn-primary">Derecha</button>
        </div>
        <button className="btn btn-primary">Abajo</button>
      </div>
      <div className="camara-view">
        {/* Espacio en blanco para la futura imagen */}
      </div>
    </div>
  );
};

export default CamaraDashboard;