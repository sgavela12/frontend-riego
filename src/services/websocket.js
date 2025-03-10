const socket = new WebSocket("ws://192.168.1.150:8080/ws/riego");

socket.onopen = () => {
  console.log("Conectado al WebSocket");
};

socket.onmessage = (event) => {
  console.log("Mensaje recibido:", event.data);
};

socket.onerror = (error) => {
  console.error("WebSocket Error:", error);
};

socket.onclose = () => {
  console.log("Conexión WebSocket cerrada");
};

export default socket;
