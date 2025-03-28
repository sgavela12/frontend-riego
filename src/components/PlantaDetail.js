import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import "../css/PlantaDetail.css"; // Asegúrate de importar los estilos

const PlantaDetail = () => {
  const { id } = useParams(); // Obtenemos el id de la URL
  const [planta, setPlanta] = useState(null);

  useEffect(() => {
    const fetchPlanta = async () => {
      try {
        const response = await fetch(`http://192.168.1.150:8087/api/plantas/${id}`);
        const data = await response.json();
        setPlanta(data);
      } catch (error) {
        console.error("Error al obtener los detalles de la planta:", error);
      }
    };

    fetchPlanta();
  }, [id]);

  if (!planta) return <p>Cargando...</p>;

  return (
    <div className="planta-detail">
      <h2>Detalles de la Planta</h2>
      <p><span className="label">Nombre:</span> <span className="value">{planta.nombre}</span></p>
      <p><span className="label">Tipo:</span> <span className="value">{planta.tipo}</span></p>
      <p><span className="label">Fecha de Plantación:</span> <span className="value">{new Date(planta.fechaPlantacion).toLocaleDateString()}</span></p>
      <p><span className="label">¿Necesita Agua?</span> <span className="value">{planta.necesitaAgua ? "Sí" : "No"}</span></p>
      <p><span className="label">Humedad:</span> <span className="value">{planta.humedad}</span></p>
      
      <Link to="/plantas" className="btn-back">Volver a la lista</Link>
    </div>
  );
};

export default PlantaDetail;
