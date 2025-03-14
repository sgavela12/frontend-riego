// src/components/Home.js
import React from 'react';
import { Link } from 'react-router-dom';
import "../css/Home.css";

const Home = () => {
  return (
    <div className="home-container">
      <h1>Bienvenido al Sistema de Gestión de Riego</h1>
      <p>Administra y monitorea tus dispositivos de riego de manera eficiente.</p>
      <div className="home-buttons">
        <Link to="/plantas" className="btn btn-primary">Ver Plantas</Link>
        <Link to="/dispositivos" className="btn btn-secondary">Ver Dispositivos</Link>
      </div>
    </div>
  );
};

export default Home;
