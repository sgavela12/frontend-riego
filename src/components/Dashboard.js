import React, { useState, useEffect } from "react";
import socket from "../services/websocket"; // WebSocket
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from "chart.js";

//componentes de Chart.js 
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const Dashboard = () => {
  const [data, setData] = useState([]);
  const [temperaturaData, setTemperaturaData] = useState([]);
  const [humedadData, setHumedadData] = useState([]);
  const [timestamps, setTimestamps] = useState([]);

  useEffect(() => {
    // Manejar mensajes recibidos
    socket.onmessage = (event) => {
      try {
        // Parsear el JSON recibido
        const jsonData = JSON.parse(event.data);

        // Actualizar el estado con los nuevos datos
        setData(jsonData);

        // Filtrar y actualizar los datos de Temperatura y Humedad
        jsonData.forEach(item => {
          const timestamp = new Date(item.fechaHora[0], item.fechaHora[1] - 1, item.fechaHora[2], item.fechaHora[3], item.fechaHora[4], item.fechaHora[5], item.fechaHora[6]).toLocaleString();
          if (item.tipoParametro === "Temperatura") {
            setTemperaturaData(prev => [...prev, item.valor]);
          } else if (item.tipoParametro === "Humedad") {
            setHumedadData(prev => [...prev, item.valor]);
          }
          setTimestamps(prev => [...prev, timestamp]);
        });
      } catch (error) {
        console.error("Error al parsear JSON:", error);
      }
    };

    // Limpiar el listener al desmontar el componente
    return () => {
      socket.onmessage = null;
    };
  }, []);

  // Configuración del gráfico
  const chartData = {
    labels: timestamps,
    datasets: [
      {
        label: "Temperatura (°C)",
        data: temperaturaData,
        borderColor: "rgba(255, 99, 132, 1)",
        backgroundColor: "rgba(255, 99, 132, 0.2)",
        fill: true,
      },
      {
        label: "Humedad (%)",
        data: humedadData,
        borderColor: "rgba(54, 162, 235, 1)",
        backgroundColor: "rgba(54, 162, 235, 0.2)",
        fill: true,
      },
    ],
  };

  // Opciones para el gráfico
  const options = {
    responsive: true,
    scales: {
      x: {
        title: {
          display: true,
          text: 'Tiempo',
        },
      },
      y: {
        title: {
          display: true,
          text: 'Valor',
        },
        min: -20, //valor mínimo para el eje y
      },
    },
    plugins: {
      title: {
        display: true,
        text: 'Gráfico de Temperatura y Humedad en Tiempo Real',
      },
      tooltip: {
        mode: "index",
        intersect: false,
      },
    },
  };

  return (
    <div>
      <h2>Datos en tiempo real</h2>
      {data.length > 0 ? (
        <div>
          <ul>
            {data.map((item, index) => (
              <li key={index}>
                <strong>{item.tipoParametro}:</strong> {item.valor} {item.unidad} (Medido el {new Date(item.fechaHora[0], item.fechaHora[1] - 1, item.fechaHora[2], item.fechaHora[3], item.fechaHora[4], item.fechaHora[5], item.fechaHora[6]).toLocaleString()})
              </li>
            ))}
          </ul>
          {/* Gráfico de los datos */}
          <div style={{ width: "80%", height: "400px", margin: "auto" }}>
            <Line data={chartData} options={options} />
          </div>
        </div>
      ) : (
        <p>No hay datos disponibles.</p>
      )}
    </div>
  );
};

export default Dashboard;
