import React from 'react';
import { FaArrowUp, FaArrowDown, FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import "../css/CamaraDashboard.css";
import Streaming from './Streaming';

const CamaraDashboard = () => {
  return (
    <div className="camara-dashboard">
      <h2>Control de Cámara</h2>
      <div className="camara-controls">
        <button className="btn btn-primary">
          <FaArrowUp />
        </button>
        <div className="horizontal-controls">
          <button className="btn btn-primary">
            <FaArrowLeft />
          </button>
          <button className="btn btn-primary">
            <FaArrowRight />
          </button>
        </div>
        <button className="btn btn-primary">
          <FaArrowDown />
        </button>
      </div>
      <div className="camara-view">
        {/* Espacio en blanco para la futura imagen */}
        <Streaming />
      </div>
    </div>
  );
};

export default CamaraDashboard;