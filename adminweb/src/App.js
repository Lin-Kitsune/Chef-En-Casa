import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import Sidebar from './components/Sidebar/Sidebar';
import Recetas from './components/Recetas/Recetas';
import MainContent from './components/Main/MainContent'; // Importar el MainContent

function App() {
  return (
    <Router>
      <div className="App">
        {/* Barra de navegación, ahora flotante y fija */}
        <Navbar />

        <div className="flex flex-col">
          {/* MainContent siempre visible en la parte superior */}
          <MainContent />

          <div className="flex flex-row">
            {/* Sidebar siempre visible */}
            <Sidebar />

            {/* El contenido principal cambia según la ruta */}
            <div className="flex-1 pl-56 pt-1">
              <Routes>
                <Route path="/recetas" element={<Recetas />} />
                {/* Puedes añadir más rutas aquí, por ejemplo ingredientes, usuarios, etc. */}
              </Routes>
            </div>
          </div>
        </div>
      </div>
    </Router>
  );
}

export default App;