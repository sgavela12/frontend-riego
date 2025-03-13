// src/index.js
import React from 'react';
import ReactDOM from 'react-dom/client';  // Importa react-dom/client
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import './index.css';

// Usar createRoot en lugar de render
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);
