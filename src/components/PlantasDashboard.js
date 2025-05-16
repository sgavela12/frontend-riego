import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../css/PlantasDashboard.css";

const API_URL_PLANTAS = "http://192.168.1.150:8087/api/plantas";
const API_URL_HUMEDAD = "http://192.168.1.150:8087/api/plantas/humedad";

const PlantasDashboard = () => {
  const [plantas, setPlantas] = useState([]);
  const [humedades, setHumedades] = useState({});
  const [gotaAnimadaId, setGotaAnimadaId] = useState(null);
  const [showToast, setShowToast] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [busqueda, setBusqueda] = useState("");
  const [filtroEstado, setFiltroEstado] = useState("todos");
  const [mostrarFiltros, setMostrarFiltros] = useState(false);

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
    fetch(`http://192.168.1.150:8087/api/plantas/${id}/regar`, { method: "GET" })
      .then((response) => {
        if (response.ok) {
          setGotaAnimadaId(id); // Activa la animación de la gota
          setShowToast(true);   // Muestra el toast de éxito
          setTimeout(() => setGotaAnimadaId(null), 1200); // Oculta la gota después de la animación
          setTimeout(() => setShowToast(false), 2000);    // Oculta el toast después de 2s
        } else {
          alert(`Hubo un problema al regar la planta con ID ${id}.`);
        }
      })
      .catch(() => alert("No se pudo conectar con el servidor."));
  };

  // Cambia la clase del body cuando cambia el modo
  useEffect(() => {
    document.body.classList.toggle("modo-oscuro", darkMode);
  }, [darkMode]);

  // Estado visual y color según humedad
  const getEstadoHumedad = (humedad) => {
    if (humedad === undefined) return { texto: "Cargando...", color: "#bdbdbd", icon: "💧" };
    if (humedad < 30) return { texto: "Muy seca", color: "#e57373", icon: "🌵" };
    if (humedad > 70) return { texto: "Muy húmeda", color: "#64b5f6", icon: "💧" };
    return { texto: "Okay", color: "#81c784", icon: "✅" };
  };

  // Ejemplo de función para obtener el estado de humedad
  function getEstadoHumedadTexto(humedad) {
    if (humedad < 30) return "Baja";
    if (humedad > 70) return "Alta";
    return "Óptima";
  }

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

  // Filtrado de plantas por búsqueda y estado
  const plantasFiltradas = plantas
    .filter(planta =>
      planta.nombre.toLowerCase().includes(busqueda.toLowerCase())
    )
    .filter(planta => {
      if (filtroEstado === "todos") return true;
      const humedad = humedades[planta.id];
      const estado = getEstadoHumedadTexto(humedad);
      if (filtroEstado === "optima") return estado === "Óptima";
      if (filtroEstado === "baja") return estado === "Baja";
      if (filtroEstado === "alta") return estado === "Alta";
      return true;
    });

  return (
    <div className="plantas-dashboard-container">
      <div className="plantas-titulo-barra">
        <span className="plantas-title">Lista de Plantas</span>
        <button
          className="btn-lupa"
          aria-label="Mostrar filtros"
          onClick={() => setMostrarFiltros(v => !v)}
          style={{
            background: "none",
            border: "none",
            cursor: "pointer",
            fontSize: "1.7rem",
            marginLeft: "12px"
          }}
        >
          🔍
        </button>
      </div>

      {/* Filtros de búsqueda y estado */}
      {mostrarFiltros && (
        <div className="plantas-filtros">
          <input
            type="text"
            placeholder="Buscar planta por nombre..."
            value={busqueda}
            onChange={e => setBusqueda(e.target.value)}
            className="input-busqueda"
          />
          <select
            value={filtroEstado}
            onChange={e => setFiltroEstado(e.target.value)}
            className="select-filtro"
          >
            <option value="todos">Todas</option>
            <option value="optima">Óptima</option>
            <option value="baja">Humedad Baja</option>
            <option value="alta">Humedad Alta</option>
          </select>
        </div>
      )}

      <div className="plantas-resumen">
        <div>
          <strong>Total de plantas:</strong> {plantas.length}
        </div>
        <div>
          <strong>Muy secas:</strong> {plantas.filter(p => {
            const h = humedades[p.id];
            return h !== undefined && h < 30;
          }).length}
        </div>
        <div>
          <strong>Humedad media:</strong> {
            plantas.length > 0
              ? Math.round(
                  plantas.reduce((acc, p) => acc + (humedades[p.id] || 0), 0) / plantas.length
                )
              : 0
          }%
        </div>
      </div>
      <ul className="plantas-lista">
        {plantasFiltradas.map(planta => {
          const humedad = humedades[planta.id];
          const estado = getEstadoHumedad(humedad);
          return (
            <li
              key={planta.id}
              className={`planta-item${humedad < 30 ? ' alerta-parpadeo' : ''}`}
              style={{
                border: `2px solid ${estado.color}`,
                boxShadow: `0 2px 12px ${estado.color}33`,
                transition: "border 0.4s, box-shadow 0.4s"
              }}
            >
              <span className="planta-nombre-tipo">
                🌱 <strong>{planta.nombre}</strong> - {planta.tipo}
                {gotaAnimadaId === planta.id && <span className="gota-animada">💧</span>}
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
      {showToast && <div className="toast-exito">¡Planta regada con éxito! 💧</div>}
    </div>
  );
};

export default PlantasDashboard;
