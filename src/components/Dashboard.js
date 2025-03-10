import React, { useState, useEffect } from "react";
import socket from "../services/websocket"; // Importamos WebSocket

const Dashboard = () => {
  const [data, setData] = useState("");

  useEffect(() => {
    socket.onmessage = (event) => {
      setData(event.data); // Actualizar con el mensaje recibido
    };
  }, []);

  return (
    <div>
      <h2>Datos en tiempo real</h2>
      <p>{data}</p>
    </div>
  );
};

export default Dashboard;
