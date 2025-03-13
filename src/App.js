import "bootstrap/dist/css/bootstrap.min.css"; // Importar Bootstrap
import "./App.css";
import PlantasDashboard from "./components/PlantasDashboard";
import Sidebar from "./components/Sidebar";

function App() {
  return (
    <div className="d-flex">
      {/* Sidebar con ancho fijo */}
      <Sidebar />

      {/* Contenido principal ocupando el resto del espacio */}
      <div className="content flex-grow-1 p-4">
        <PlantasDashboard />
      </div>
    </div>
  );
}

export default App;
