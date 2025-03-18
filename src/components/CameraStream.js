import React, { useState, useEffect } from 'react';

const CameraStream = () => {
  const [flash, setFlash] = useState(false);
  const [imageSrc, setImageSrc] = useState('');

  // Configurar la fuente del stream al cargar el componente
  useEffect(() => {
    const esp32IP = "http://192.168.1.145"; //IP de ESP32
    setImageSrc(`${esp32IP}:81/stream`);
  }, []);

  // Función para enviar comandos de movimiento
  const sendCommand = (cmd) => {
    fetch(`http://192.168.1.145/action?go=B,${cmd}`)
      .then((response) => response.text())
      .then((data) => console.log('Comando enviado:', data))
      .catch((error) => console.error('Error enviando comando:', error));
  };

  // Función para cambiar el estado del flash
  const toggleFlash = () => {
    const state = flash ? 'off' : 'on';
    setFlash(!flash);
    fetch(`http://192.168.1.145/flash?state=${state}`)
      .then((response) => response.text())
      .then((data) => console.log('Flash cambiado:', data))
      .catch((error) => console.error('Error cambiando flash:', error));
  };

  return (
    <div style={{ textAlign: 'center', backgroundColor: '#212529', color: '#FFFFFF', padding: '20px' }}>
      <h3>📷 Cámara de Seguridad</h3>

      <div style={{ backgroundColor: '#F9F9F9', padding: '20px', borderRadius: '10px', display: 'inline-block' }}>
        {/* Video Stream */}
        <img
          id="vdstream"
          src={imageSrc}
          alt="ESP32 Camera Stream"
          style={{
            width: '90%',
            maxWidth: '500px',
            borderRadius: '10px',
            marginBottom: '15px',
            border: '3px solid #226DDA',
            transform: 'rotate(180deg)', // Aplica la rotación de 180 grados
          }}
        />

        {/* Flash Control */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '15px' }}>
          <span style={{color:"black", fontSize: '18px', marginRight: '10px' }}>💡 Flash</span>
          <label style={{ position: 'relative', display: 'inline-block', width: '50px', height: '25px' }}>
            <input
              type="checkbox"
              checked={flash}
              onChange={toggleFlash}
              style={{ opacity: 0, width: 0, height: 0 }}
            />
            <span
              style={{
                position: 'absolute',
                cursor: 'pointer',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                backgroundColor: '#ccc',
                transition: '0.4s',
                borderRadius: '25px',
              }}
            >
              <span
                style={{
                  position: 'absolute',
                  content: '',
                  height: '18px',
                  width: '18px',
                  left: '4px',
                  bottom: '4px',
                  backgroundColor: 'white',
                  transition: '0.4s',
                  borderRadius: '50%',
                  transform: flash ? 'translateX(25px)' : 'translateX(0)',
                }}
              />
            </span>
          </label>
        </div>

        {/* Control de movimiento */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <button
            className="button"
            style={{
              display: 'inline-block',
              backgroundColor: '#226DDA',
              color: 'white',
              padding: '12px 20px',
              margin: '10px',
              fontSize: '16px',
              borderRadius: '8px',
              border: 'none',
              cursor: 'pointer',
              transition: '0.3s',
              boxShadow: '2px 2px 5px rgba(0, 0, 0, 0.2)',
            }}
            onClick={() => sendCommand('U')}
          >
            ⬆️ Arriba
          </button>
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <button
              className="button"
              style={{
                display: 'inline-block',
                backgroundColor: '#226DDA',
                color: 'white',
                padding: '12px 20px',
                margin: '10px',
                fontSize: '16px',
                borderRadius: '8px',
                border: 'none',
                cursor: 'pointer',
                transition: '0.3s',
                boxShadow: '2px 2px 5px rgba(0, 0, 0, 0.2)',
              }}
              onClick={() => sendCommand('R')}
            >
              ⬅️ Izquierda
            </button>
            <button
              className="button"
              style={{
                display: 'inline-block',
                backgroundColor: '#226DDA',
                color: 'white',
                padding: '12px 20px',
                margin: '10px',
                fontSize: '16px',
                borderRadius: '8px',
                border: 'none',
                cursor: 'pointer',
                transition: '0.3s',
                boxShadow: '2px 2px 5px rgba(0, 0, 0, 0.2)',
              }}
              onClick={() => sendCommand('L')}
            >
              ➡️ Derecha
            </button>
          </div>
          <button
            className="button"
            style={{
              display: 'inline-block',
              backgroundColor: '#226DDA',
              color: 'white',
              padding: '12px 20px',
              margin: '10px',
              fontSize: '16px',
              borderRadius: '8px',
              border: 'none',
              cursor: 'pointer',
              transition: '0.3s',
              boxShadow: '2px 2px 5px rgba(0, 0, 0, 0.2)',
            }}
            onClick={() => sendCommand('D')}
          >
            ⬇️ Abajo
          </button>
        </div>
      </div>
    </div>
  );
};

export default CameraStream;
