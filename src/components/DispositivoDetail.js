import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import "../css/SensorDetail.css";  

const DispositivoDetail = () => {
  const { id } = useParams(); // Obtenemos el id del Dispositivo
  const [dispositivo, setDispositivo] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({
    nombre: '',
    tipo: '',
    ubicacion: '',
    estado: false,
  });

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

  const handleEditClick = () => {
    setEditMode(true);
    setFormData({
      nombre: dispositivo.nombre,
      tipo: dispositivo.tipo,
      ubicacion: dispositivo.ubicacion,
      estado: dispositivo.estado,
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleRadioChange = (e) => {
    setFormData({
      ...formData,
      estado: e.target.value === 'activo',
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://192.168.1.150:8087/api/dispositivos/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        const updatedDispositivo = await response.json();
        setDispositivo(updatedDispositivo);
        setEditMode(false);
      } else {
        console.error('Error al actualizar el dispositivo');
      }
    } catch (error) {
      console.error('Error al enviar la solicitud PUT:', error);
    }
  };

  if (!dispositivo) return <p>Cargando...</p>;

  return (
    <div className="dispositivo-detail">
      <h2>Detalles del Dispositivo</h2>
      {editMode ? (
        <form onSubmit={handleSubmit} className="edit-form">
          <div className="form-group">
            <label>Nombre:</label>
            <input
              type="text"
              name="nombre"
              value={formData.nombre}
              onChange={handleInputChange}
              className="form-control"
            />
          </div>
          <div className="form-group">
            <label>Tipo:</label>
            <input
              type="text"
              name="tipo"
              value={formData.tipo}
              onChange={handleInputChange}
              className="form-control"
            />
          </div>
          <div className="form-group">
            <label>Ubicación:</label>
            <input
              type="text"
              name="ubicacion"
              value={formData.ubicacion}
              onChange={handleInputChange}
              className="form-control"
            />
          </div>
          <div className="form-group">
            <label>Estado:</label>
            <div>
              <label>
                <input
                  type="radio"
                  name="estado"
                  value="activo"
                  checked={formData.estado === true}
                  onChange={handleRadioChange}
                  className="form-check-input"
                />
                Activo
              </label>
              <label className="ml-3">
                <input
                  type="radio"
                  name="estado"
                  value="inactivo"
                  checked={formData.estado === false}
                  onChange={handleRadioChange}
                  className="form-check-input"
                />
                Inactivo
              </label>
            </div>
          </div>
          <button type="submit" className="btn btn-success mt-2">Guardar</button>
          <button type="button" onClick={() => setEditMode(false)} className="btn btn-secondary mt-2">Cancelar</button>
        </form>
      ) : (
        <>
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
                  <li key={index}>{usuario.nombre}</li>
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
                  <li key={index}>{dato.valor}</li>
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
                  <li key={index}>{riego.fecha}</li>
                ))}
              </ul>
            </div>
          )}

          <button onClick={handleEditClick} className="btn btn-primary mt-2">Editar</button>
          <Link to="/dispositivos" className="btn btn-secondary mt-2">Volver a la lista</Link>
        </>
      )}
    </div>
  );
};

export default DispositivoDetail;
