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
    const interval = setInterval(fetchData, 15000);
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
    const interval = setInterval(fetchHumedades, 10000);
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

  // Estado visual y color según humedad
  const getEstadoHumedad = (humedad) => {
    if (humedad === undefined) return { texto: "Cargando...", color: "#bdbdbd", icon: "💧" };
    if (humedad < 30) return { texto: "Muy seca", color: "#e57373", icon: "🌵" };
    if (humedad > 70) return { texto: "Muy húmeda", color: "#64b5f6", icon: "💧" };
    return { texto: "Okay", color: "#81c784", icon: "✅" };
  };

  // Barra de progreso de humedad
  const HumedadBar = ({ humedad, color }) => (
    <div className="humedad-bar-bg">
      <div
        className="humedad-bar-fill"
        style={{
          width: `${humedad || 0}%`,
          background: color,
          transition: "width 0.8s cubic-bezier(.4,2,.6,1)"
        }}
      />
      <span className="humedad-bar-label">{humedad !== undefined ? `${humedad}%` : "Cargando..."}</span>
    </div>
  );

  return (
    <div className="plantas-dashboard-container">
      <h2 className="plantas-title">Lista de Plantas</h2>
      <ul className="plantas-lista">
        {plantas.map((planta) => {
          const humedad = humedades[planta.id];
          const estado = getEstadoHumedad(humedad);
          return (
            <li
              key={planta.id}
              className="planta-item"
              style={{
                border: `2px solid ${estado.color}`,
                boxShadow: `0 2px 12px ${estado.color}33`,
                transition: "border 0.4s, box-shadow 0.4s"
              }}
            >
              <span className="planta-nombre-tipo">
                🌱 <strong>{planta.nombre}</strong> - {planta.tipo}
              </span>
              <span className="estado-humedad" style={{ color: estado.color, fontWeight: "bold" }}>
                {estado.icon} {estado.texto}
              </span>
              <HumedadBar humedad={humedad} color={estado.color} />
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
              <div className="planta-botones">
                <Link to={`/plantas/${planta.id}`} className="btn btn-primary mt-2">Ver Detalles</Link>
                <button
                  onClick={() => regarPlanta(planta.id)}
                  className="btn btn-success mt-2 ms-2"
                >
                  Regar
                </button>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default PlantasDashboard;
