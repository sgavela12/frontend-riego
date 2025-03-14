import React from "react";

const CameraStream = () => {
  return (
    <div style={{ textAlign: "center" }}>
      <h2>📷 Streaming en Vivo</h2>
      <img
        src="http://192.168.1.145:81/stream"  
        alt="ESP32-CAM Stream"
        style={{ width: "100%", maxWidth: "640px", border: "2px solid black" }}
      />
    </div>
  );
};

export default CameraStream;
