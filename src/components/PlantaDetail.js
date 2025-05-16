import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import "../css/PlantaDetail.css"; 

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const API_URL_HUMEDAD = "http://192.168.1.150:8087/api/plantas/humedad";

const PlantaDetail = () => {
  const { id } = useParams(); // Obtenemos el id de la planta desde la URL
  const [planta, setPlanta] = useState(null);
  const [humedad, setHumedad] = useState(undefined);
  const [registros, setRegistros] = useState([]); // Estado para los registros de la planta
  const [rango, setRango] = useState('2semanas'); // Estado para el rango de fechas seleccionado

  // Función para obtener los detalles de la planta
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

  // Función para obtener la humedad de la planta
  useEffect(() => {
    const fetchHumedad = async () => {
      try {
        const response = await fetch(API_URL_HUMEDAD);
        const data = await response.json();
        const sensor = data.sensores.find((s) => String(s.id) === String(id));
        setHumedad(sensor ? sensor.humedad : undefined);
      } catch (error) {
        console.error("Error al obtener la humedad:", error);
      }
    };

    fetchHumedad();

    // Actualizar la humedad cada 10 segundos
    const interval = setInterval(fetchHumedad, 10000);
    return () => clearInterval(interval); // Limpiar el intervalo al desmontar el componente
  }, [id]);

  // Función para obtener los registros de la planta
  useEffect(() => {
    const fetchRegistros = async () => {
      try {
        const response = await fetch(`http://192.168.1.150:8087/api/plantas/${id}/registros`);
        const data = await response.json();
        setRegistros(data);
      } catch (error) {
        console.error("Error al obtener los registros de la planta:", error);
      }
    };

    fetchRegistros();

    // Actualizar los registros cada 20 segundos
    const interval = setInterval(fetchRegistros, 20000);
    return () => clearInterval(interval); // Limpiar el intervalo al desmontar el componente
  }, [id]);

  if (!planta) return <p>Cargando...</p>;

  const generateDateRange = () => {
    const dates = [];
    const today = new Date();
    let days;

    switch (rango) {
      case 'anual':
        days = 365;
        break;
      case 'mensual':
        days = 30;
        break;
      case 'semanal':
        days = 7;
        break;
      case 'diario':
        return Array.from({ length: 24 }, (_, i) => `${i}:00`); // Rango de 24 horas
      case '2semanas':
      default:
        days = 14;
        break;
    }

    for (let i = days - 1; i >= 0; i--) {
      const date = new Date(today);
      date.setDate(today.getDate() - i);
      dates.push(date.toLocaleDateString());
    }
    return dates;
  };

  const dateRange = generateDateRange();

  // Contar los riegos por fecha u hora
  const riegosPorFecha = registros.reduce((acc, registro) => {
    let key;
    if (rango === 'diario') {
      const hora = new Date(registro.fechaHora).getHours();
      key = `${hora}:00`; // Agrupar por hora
    } else {
      key = new Date(registro.fechaHora).toLocaleDateString(); // Agrupar por fecha
    }
    acc[key] = (acc[key] || 0) + 1;
    return acc;
  }, {});

  const dataPorFecha = dateRange.map((key) => riegosPorFecha[key] || 0);

  const chartData = {
    labels: dateRange, 
    datasets: [
      {
        label: rango === 'diario' ? 'Cantidad de Riegos por Hora' : 'Cantidad de Riegos',
        data: dataPorFecha, // Datos correspondientes a cada fecha/hora
        borderColor: 'rgba(75, 192, 192, 1)',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        tension: 0.4, 
      },
    ],
  };

  const chartOptions = {
    plugins: {
      legend: {
        labels: {
          color: "#fff" // Letras de la leyenda en blanco
        }
      },
      title: {
        display: true,
        text: "Histórico de humedad",
        color: "#fff" // Título en blanco
      }
    },
    scales: {
      x: {
        ticks: { color: "#fff" }, // Eje X en blanco
        grid: { color: "#444" }
      },
      y: {
        ticks: { color: "#fff" }, // Eje Y en blanco
        grid: { color: "#444" }
      }
    },
  };

  // Función para determinar el estado de la humedad
  const getEstadoHumedad = (humedad) => {
    if (humedad === undefined || humedad === null) return "Cargando...";
    if (humedad < 30) return "🌵 Muy seca";
    if (humedad > 70) return "💧 Muy húmeda";
    return "✅ Okay";
  };

  return (
    <div className="planta-detail">
      <h2>Detalles de la Planta</h2>
      <p><span className="label">Nombre:</span> <span className="value">{planta.nombre}</span></p>
      <p><span className="label">Tipo:</span> <span className="value">{planta.tipo}</span></p>
      <p>
        <span className="label">Último Riego:</span> 
        <span className="value">
          {planta.ultimoRiego 
            ? new Date(planta.ultimoRiego).toLocaleString()
            : "Sin registro"}
        </span>
      </p>
      <p>
        <span className="label">Estado de Humedad: </span>
        <span className="value">{getEstadoHumedad(humedad)}</span>
      </p>
      <p>
        <span className="label">Humedad: </span>
        <span className="value">{humedad !== undefined ? `${humedad}%` : "Cargando..."}</span>
      </p>

      {/* Selector de rango */}
      <div className="rango-selector" style={{ marginBottom: '20px' }}>
        <label htmlFor="rango">Seleccionar rango:</label>
        <select
          id="rango"
          value={rango}
          onChange={(e) => setRango(e.target.value)}
          className="custom-select"
        >
          <option value="anual">Último Año</option>
          <option value="mensual">Último Mes</option>
          <option value="2semanas">Últimas 2 Semanas</option>
          <option value="semanal">Última Semana</option>
          <option value="diario">Hoy por Horas</option>
        </select>
      </div>

      {/* Gráfico */}
      <div className="chart-container" style={{ marginTop: '20px' }}>
        <Line data={chartData} options={chartOptions} />
      </div>

      <Link to="/plantas" className="btn-back">Volver a la lista</Link>
    </div>
  );
};

export default PlantaDetail;
