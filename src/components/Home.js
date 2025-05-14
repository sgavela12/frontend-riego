// src/components/Home.js
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import "../css/Home.css";

const Home = () => {
  const [ambiente, setAmbiente] = useState({ temperatura: 0, humedad: 0 });
  const [modo, setModo] = useState("Cargando...");
  const [nuevoModo, setNuevoModo] = useState(""); // Estado para el modo seleccionado

  // Función para obtener el modo
  const fetchModo = async () => {
    try {
      const response = await fetch("http://192.168.1.150:8087/api/plantas/modo");
      if (!response.ok) {
        throw new Error(`Error en la respuesta del servidor: ${response.status}`);
      }
      const data = await response.json();
      setModo(data.modo); // Actualiza el estado con el modo recibido
      setNuevoModo(data.modo); // Sincroniza el select con el modo actual
    } catch (error) {
      console.error("Error al obtener el modo:", error);
    }
  };

  // Función para obtener los datos del ambiente
  const fetchAmbiente = async () => {
    try {
      const response = await fetch("http://192.168.1.150:8087/api/plantas/ambiente");
      const data = await response.json();
      setAmbiente(data);
    } catch (error) {
      console.error("Error al obtener los datos del ambiente:", error);
    }
  };

  useEffect(() => {
    fetchAmbiente();
    fetchModo();

    // Actualizar cada 3 segundos
    const interval = setInterval(() => {
      fetchModo();
    }, 3000);
    return () => clearInterval(interval); // Limpiar el intervalo al desmontar el componente
  }, []);

  // Función para cambiar el modo
  const cambiarModo = async (nuevoModo) => {
    try {
      const valorModo = nuevoModo === "AUTOMATICO" ? 0 : nuevoModo === "MONITOREO" ? 1 : 2;
      const response = await fetch(`http://192.168.1.150:8087/api/plantas/modo?valor=${valorModo}`, {
        method: "POST",
      });
      if (response.ok) {
        const data = await response.json();
        setModo(data.modo); // Actualiza el estado localmente
        setNuevoModo(data.modo); // Actualiza el select con el nuevo modo
      } else {
        console.error("Error al cambiar el modo");
      }
    } catch (error) {
      console.error("Error al cambiar el modo:", error);
    }
  };

  // Manejar el cambio en el select con confirmación
  const handleSelectChange = (e) => {
    const nuevoModoSeleccionado = e.target.value;
    const confirmacion = window.confirm(`¿Estás seguro de que deseas cambiar el modo a ${nuevoModoSeleccionado}?`);
    if (confirmacion) {
      cambiarModo(nuevoModoSeleccionado);
    } else {
      setNuevoModo(modo); // Restablecer el select al modo actual si se cancela
    }
  };

  // Determinar la clase de color según el modo actual
  const getModoClass = () => {
    if (modo === "AUTOMATICO") return "modo-automatico";
    if (modo === "MONITOREO") return "modo-monitoreo";
    if (modo === "APAGADO") return "modo-apagado";
    return "";
  };

  return (
    <div className="home-container">
      <h1 className="home-title">🌱 Sistema de Gestión de Riego</h1>
      <p className="home-description">Administra y monitorea tus dispositivos de riego de manera eficiente.</p>

      {/* Indicadores visuales */}
      <div className="indicadores-ambiente">
        <div className="indicador">
          <span className="icon">🌡️</span>
          <strong>Temperatura:</strong> {ambiente.temperatura}°C
        </div>
        <div className="indicador">
          <span className="icon">💧</span>
          <strong>Humedad:</strong> {ambiente.humedad}%
        </div>
      </div>

      {/* Selector de modo */}
      <div className="modo-container">
        <h2 className="modo-title">
          Modo Actual: <span className={`modo-actual ${getModoClass()}`}>{modo}</span>
        </h2>
        <select
          className="modo-select"
          value={nuevoModo} // Sincroniza el valor del select con el estado
          onChange={handleSelectChange}
        >
          <option value="AUTOMATICO">Automático</option>
          <option value="MONITOREO">Monitoreo</option>
          <option value="APAGADO">Apagado</option>
        </select>
      </div>

      {/* Botones de navegación */}
      <div className="home-buttons">
        <Link to="/plantas" className="btn btn-primary">🌿 Ver Plantas</Link>
        <Link to="/dispositivos" className="btn btn-secondary">🔧 Ver Dispositivos</Link>
      </div>
    </div>
  );
};

export default Home;
