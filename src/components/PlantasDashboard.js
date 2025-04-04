import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import "../css/PlantasDashboard.css"; 

const PlantasDashboard = () => {
  const [plantas, setPlantas] = useState([]);
  const API_URL = "http://192.168.1.150:8087/api/plantas";

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(API_URL);
        const data = await response.json();
        setPlantas(data);
      } catch (error) {
        console.error("Error al obtener las plantas:", error);
      }
    };

    fetchData(); 
    const interval = setInterval(fetchData, 5000); // Actualiza cada 5 segundos

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

  return (
    <div>
      <h2>Lista de Plantas</h2>
      <ul>
        {plantas.map((planta) => (
          <li key={planta.id} className="planta-item">
            🌱 <strong>{planta.nombre}</strong> - {planta.tipo} - {planta.necesitaAgua ? "💧 Necesita agua" : "✅ Ok"}  
            <br />
            📅 <em>Ultimo Riego: {new Date(planta.fechaPlantacion).toLocaleDateString()}</em>
            <br />
            🌡️ <strong>Humedad: {planta.humedad}%</strong>
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
