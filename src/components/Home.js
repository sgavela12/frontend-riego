// src/components/Home.js
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import "../css/Home.css";

const Home = () => {
  const [ambiente, setAmbiente] = useState({ temperatura: 0, humedad: 0 });

  // Función para obtener los datos del ambiente
  useEffect(() => {
    const fetchAmbiente = async () => {
      try {
        const response = await fetch("http://192.168.1.150:8087/api/plantas/ambiente");
        const data = await response.json();
        setAmbiente(data);
      } catch (error) {
        console.error("Error al obtener los datos del ambiente:", error);
      }
    };

    fetchAmbiente();

    // Actualizar cada 15 segundos
    const interval = setInterval(fetchAmbiente, 15000);
    return () => clearInterval(interval); // Limpiar el intervalo al desmontar el componente
  }, []);

  return (
    <div className="home-container">
      <h1>Bienvenido al Sistema de Gestión de Riego</h1>
      <p>Administra y monitorea tus dispositivos de riego de manera eficiente.</p>

      {/* Indicadores visuales */}
      <div className="indicadores-ambiente">
        <div className="indicador">
          🌡️ <strong>Temperatura:</strong> {ambiente.temperatura}°C
        </div>
        <div className="indicador">
          💧 <strong>Humedad:</strong> {ambiente.humedad}%
        </div>
      </div>

      <div className="home-buttons">
        <Link to="/plantas" className="btn btn-primary">Ver Plantas</Link>
        <Link to="/dispositivos" className="btn btn-secondary">Ver Dispositivos</Link>
      </div>
    </div>
  );
};

export default Home;
