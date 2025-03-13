import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import "../css/SensoresDashboard.css";  // Asegúrate de que el archivo CSS existe

const DispositivosDashboard = () => {
  const [sensores, setSensores] = useState([]);
  const API_URL = "http://192.168.1.150:8087/api/sensores";  // Cambia esto con tu URL de API real

  // Llamada a la API para obtener la lista de sensores
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(API_URL);
        const data = await response.json();
        setSensores(data);
      } catch (error) {
        console.error("Error al obtener los sensores:", error);
      }
    };

    fetchData();
    const interval = setInterval(fetchData, 5000); // Actualiza cada 5 segundos

    return () => clearInterval(interval); // Limpiar intervalo cuando se desmonte el componente
  }, []);

  return (
    <div>
      <h2>Lista de Sensores</h2>
      <ul>
        {sensores.map((sensor) => (
          <li key={sensor.id} className="sensor-item">
            🔌 <strong>{sensor.nombre}</strong> - {sensor.tipo} - {sensor.estado ? "🟢 Activo" : "🔴 Inactivo"}  
            <br />
            📅 <em>Instalado el: {new Date(sensor.fechaInstalacion).toLocaleDateString()}</em>
            <br />
            <Link to={`/sensores/${sensor.id}`} className="btn btn-primary mt-2">Ver Detalles</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DispositivosDashboard;
