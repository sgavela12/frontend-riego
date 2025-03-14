import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import "../css/SensorDetail.css";  

const DispositivoDetail = () => {
  const { id } = useParams(); // Obtenemos el id del Dispositivo
  const [dispositivo, setDispositivo] = useState(null);

  useEffect(() => {
    const fetchDispositivo = async () => {
      try {
        const response = await fetch(`http://192.168.1.150:8087/api/dispositivos/${id}`);
        const data = await response.json();
        setDispositivo(data);
      } catch (error) {
        console.error("Error al obtener los detalles del dispositivo:", error);
      }
    };

    fetchDispositivo();
  }, [id]);

  if (!dispositivo) return <p>Cargando...</p>;

  return (
    <div className="dispositivo-detail">
      <h2>Detalles del Dispositivo</h2>
      <p><strong>Nombre:</strong> {dispositivo.nombre}</p>
      <p><strong>Tipo:</strong> {dispositivo.tipo}</p>
      <p><strong>Ubicación:</strong> {dispositivo.ubicacion}</p>
      <p><strong>Estado:</strong> {dispositivo.estado ? "🟢 Activo" : "🔴 Inactivo"}</p>

      {/* Mostrar los usuarios asociados */}
      {dispositivo.usuarios && dispositivo.usuarios.length > 0 && (
        <div>
          <h4>Usuarios Asociados:</h4>
          <ul>
            {dispositivo.usuarios.map((usuario, index) => (
              <li key={index}>{usuario.nombre}</li> // Asumiendo que el objeto usuario tiene un campo "nombre"
            ))}
          </ul>
        </div>
      )}

      {/* Mostrar los datos de los sensores */}
      {dispositivo.datos && dispositivo.datos.length > 0 && (
        <div>
          <h4>Datos de Sensores:</h4>
          <ul>
            {dispositivo.datos.map((dato, index) => (
              <li key={index}>{dato.valor}</li> // Asumiendo que el objeto dato tiene un campo "valor"
            ))}
          </ul>
        </div>
      )}

      {/* Mostrar los eventos de riego */}
      {dispositivo.riegos && dispositivo.riegos.length > 0 && (
        <div>
          <h4>Eventos de Riego:</h4>
          <ul>
            {dispositivo.riegos.map((riego, index) => (
              <li key={index}>{riego.fecha}</li> // Asumiendo que el objeto riego tiene un campo "fecha"
            ))}
          </ul>
        </div>
      )}

      <Link to="/dispositivos" className="btn btn-secondary mt-2">Volver a la lista</Link>
    </div>
  );
};

export default DispositivoDetail;
