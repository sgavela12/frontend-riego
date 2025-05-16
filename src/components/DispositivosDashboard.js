import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../css/PlantasDashboard.css"; // Usa el mismo CSS oscuro

const API_URL_DISPOSITIVOS = "http://192.168.1.150:8087/api/dispositivos";

const DispositivosDashboard = () => {
  const [dispositivos, setDispositivos] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(API_URL_DISPOSITIVOS);
        const data = await response.json();
        setDispositivos(data);
      } catch (error) {
        console.error("Error al obtener los dispositivos:", error);
      }
    };
    fetchData();
    const interval = setInterval(fetchData, 10000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="plantas-dashboard-container">
      <h2 className="plantas-title">Lista de Dispositivos</h2>
      <ul className="plantas-lista">
        {dispositivos.map((dispositivo) => (
          <li key={dispositivo.id} className="planta-item">
            🔌 <strong>{dispositivo.nombre}</strong> - {dispositivo.tipo} - {dispositivo.estado ? "🟢 Activo" : "🔴 Inactivo"}
            <br />
            📍 <em>Ubicación: {dispositivo.ubicacion}</em>
            <br />
            <Link to={`/dispositivos/${dispositivo.id}`} className="btn btn-primary mt-2">Ver Detalles</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DispositivosDashboard;
