import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import "../css/SensorDetail.css";  // Crea un archivo de estilos para los detalles

const DispositivoDetail = () => {
  const { id } = useParams(); // Obtenemos el id del sensor
  const [sensor, setSensor] = useState(null);

  useEffect(() => {
    const fetchSensor = async () => {
      try {
        const response = await fetch(`http://192.168.1.150:8087/api/sensores/${id}`);
        const data = await response.json();
        setSensor(data);
      } catch (error) {
        console.error("Error al obtener los detalles del sensor:", error);
      }
    };

    fetchSensor();
  }, [id]);

  if (!sensor) return <p>Cargando...</p>;

  return (
    <div className="sensor-detail">
      <h2>Detalles del Sensor</h2>
      <p><strong>Nombre:</strong> {sensor.nombre}</p>
      <p><strong>Tipo:</strong> {sensor.tipo}</p>
      <p><strong>Estado:</strong> {sensor.estado ? "🟢 Activo" : "🔴 Inactivo"}</p>
      <p><strong>Fecha de Instalación:</strong> {new Date(sensor.fechaInstalacion).toLocaleDateString()}</p>
      {/* Agrega más detalles según sea necesario */}
      <Link to="/sensores" className="btn btn-secondary mt-2">Volver a la lista</Link>
    </div>
  );
};

export default DispositivoDetail;
