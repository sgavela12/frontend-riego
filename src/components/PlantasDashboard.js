import { useEffect, useState } from "react";

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

    fetchData(); // Llamada inicial
    const interval = setInterval(fetchData, 5000); // Actualiza cada 5 segundos

    return () => clearInterval(interval); // Limpieza del intervalo cuando el componente se desmonta
  }, []);

  return (
    <div>
      <h2>Lista de Plantas</h2>
      <ul>
        {plantas.map((planta) => (
          <li key={planta.id}>
            🌱 <strong>{planta.nombre}</strong> - {planta.tipo} - {planta.necesitaAgua ? "💧 Necesita agua" : "✅ Ok"}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PlantasDashboard;
