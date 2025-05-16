import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import "../css/SensoresDashboard.css";  

const DispositivosDashboard = () => {
  const [dispositivos, setDispositivos] = useState([]); 
  const API_URL = "http://192.168.1.150:8087/api/dispositivos";  // URL para la API de dispositivos

  // Llamada a la API para obtener la lista de dispositivos
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(API_URL);
        const data = await response.json();
        setDispositivos(data); // Guardar los dispositivos en el estado
      } catch (error) {
        console.error("Error al obtener los dispositivos:", error);
      }
    };

    fetchData();
    const interval = setInterval(fetchData, 5000); // Actualiza cada 5 segundos

    return () => clearInterval(interval); // Limpiar intervalo cuando se desmonte el componente
  }, []);

  const getEstadoHumedad = (humedad) => {
    if (humedad === undefined) return { texto: "Cargando...", color: "#bdbdbd", icon: "💧" };
    if (humedad < 30) return { texto: "Muy seca", color: "#e57373", icon: "🌵" };
    if (humedad > 70) return { texto: "Muy húmeda", color: "#64b5f6", icon: "💧" };
    return { texto: "Okay", color: "#81c784", icon: "✅" };
  };

  return (
    <div>
      <h2>Lista de Dispositivos</h2>
      <ul>
        {dispositivos.map((dispositivo) => (
          <li key={dispositivo.id} className="dispositivo-item">
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
