import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import "../css/PlantasDashboard.css"; 

const PlantasDashboard = () => {
  const [plantas, setPlantas] = useState([]);
  const [humedades, setHumedades] = useState({});
  const API_URL_PLANTAS = "http://192.168.1.150:8087/api/plantas";
  const API_URL_HUMEDAD = "http://192.168.1.150:8087/api/plantas/humedad";

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(API_URL_PLANTAS);
        const data = await response.json();
        setPlantas(data);
      } catch (error) {
        console.error("Error al obtener las plantas:", error);
      }
    };

    fetchData(); 
    const interval = setInterval(fetchData, 15000); // Actualiza cada 5 segundos

    return () => clearInterval(interval); 
  }, []);

  const fetchHumedades = async () => {
    try {
      const response = await fetch(API_URL_HUMEDAD);
      if (!response.ok) {
        throw new Error(`Error en la respuesta de la API: ${response.status}`);
      }
      const data = await response.json();
      const humedadMap = {};
      data.sensores.forEach((sensor) => {
        humedadMap[sensor.id] = sensor.humedad;
      });
      setHumedades(humedadMap);
    } catch (error) {
      console.error("Error al obtener las humedades:", error);
    }
  };

  useEffect(() => {
    fetchHumedades();
    const interval = setInterval(fetchHumedades, 10000); // Actualiza cada 10 segundos

    return () => clearInterval(interval);
  }, []);

  const regarPlanta = (id) => {
    fetch(`http://192.168.1.150:8087/api/plantas/${id}/regar`, {
      method: "GET",
    })
      .then((response) => {
        if (response.ok) {
          alert(`La planta con ID ${id} ha sido regada exitosamente.`);
        } else {
          alert(`Hubo un problema al regar la planta con ID ${id}.`);
        }
      })
      .catch((error) => {
        console.error(`Error al regar la planta con ID ${id}:`, error);
        alert("No se pudo conectar con el servidor.");
      });
  };

  // Función para determinar el estado de la humedad
  const getEstadoHumedad = (humedad) => {
    if (humedad === undefined) return "Cargando...";
    if (humedad < 30) return "🌵 Muy seca";
    if (humedad > 70) return "💧 Muy húmeda";
    return "✅ Okay";
  };

  return (
    <div>
      <h2 className="plantas-title">Lista de Plantas</h2>
      <ul className="plantas-lista">
        {plantas.map((planta) => (
          <li key={planta.id} className="planta-item">
            <span className="planta-nombre-tipo">
              🌱 <strong>{planta.nombre}</strong> - {planta.tipo}
            </span>
            <br />
            <span>
              {humedades[planta.id] !== undefined
                ? getEstadoHumedad(humedades[planta.id])
                : "Cargando..."}
            </span>
            <br />
            <strong>📅 Último Riego:</strong>
            <em>
              {planta.ultimoRiego ? (
                <div style={{ marginLeft: "20px", marginTop: "5px" }}>
                  <strong>Fecha:</strong> {new Date(planta.ultimoRiego).toLocaleDateString()}
                  <br />
                  <strong>Hora:</strong> {new Date(planta.ultimoRiego).toLocaleTimeString()}
                </div>
              ) : (
                <span style={{ marginTop: "5px", display: "block" }}>Sin registro</span>
              )}
            </em>
            <br />
            🌡️ <strong>
              Humedad: {humedades[planta.id] !== undefined ? `${humedades[planta.id]}%` : "Cargando..."}
            </strong>
            <br />
            <Link to={`/plantas/${planta.id}`} className="btn btn-primary mt-2">Ver Detalles</Link>
            <button 
              onClick={() => regarPlanta(planta.id)} 
              className="btn btn-success mt-2 ms-2"
            >
              Regar
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PlantasDashboard;
