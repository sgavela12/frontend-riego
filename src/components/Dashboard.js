import React, { useState, useEffect } from "react";
import socket from "../services/websocket"; // Importamos WebSocket

const Dashboard = () => {
  // Estado para almacenar los datos recibidos
  const [data, setData] = useState([]);

  useEffect(() => {
    // Manejar mensajes recibidos
    socket.onmessage = (event) => {
      try {
        // Parsear el JSON recibido
        const jsonData = JSON.parse(event.data);
        // Actualizar el estado con los datos parseados
        setData(jsonData);
      } catch (error) {
        console.error("Error al parsear JSON:", error);
      }
    };

    // Limpiar el listener al desmontar el componente
    return () => {
      socket.onmessage = null;
    };
  }, []);

  return (
    <div>
      <h2>Datos en tiempo real</h2>
      {data.length > 0 ? (
        <ul>
          {data.map((item, index) => (
            <li key={index}>
              <strong>{item.tipoParametro}:</strong> {item.valor} {item.unidad} (Medido el {item.fechaHora})
            </li>
          ))}
        </ul>
      ) : (
        <p>No hay datos disponibles.</p>
      )}
    </div>
  );
};

export default Dashboard;