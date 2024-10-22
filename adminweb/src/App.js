import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import Sidebar from './components/Sidebar/Sidebar';
import Recetas from './components/Recetas/Recetas';
import Ingredientes from './components/Ingredientes/Ingredientes';
import MainContent from './components/Main/MainContent';
import Meta from './components/Meta/Meta.jsx';
import Login from './components/Login/Login.jsx';  
import PrivateRoute from './components/PrivateRoute/PrivateRoute.jsx'; 

function App() {
  return (
    <Router>
      <Routes>
        {/* Ruta pública para el login */}
        <Route path="/login" element={<Login />} />

        {/* Ruta protegida para toda la aplicación */}
        <Route 
          path="/*" 
          element={
            <PrivateRoute>
              <ProtectedLayout />
            </PrivateRoute>
          } 
        />
      </Routes>
    </Router>
  );
}

// Componente para todo el contenido de la app que estará protegido
const ProtectedLayout = () => {
  return (
    <div className="App">
      {/* Barra de navegación */}
      <Navbar />

      <div className="flex flex-col">
        {/* MainContent siempre visible en la parte superior */}
        <MainContent />

        <div className="app-container flex">
          {/* Sidebar a la izquierda */}
          <Sidebar />

          {/* El contenido principal cambia según la ruta */}
          <div className="flex-1 pl-56 pt-1">
            <Routes>
              <Route path="/recetas" element={<Recetas />} />
              <Route path="/ingredientes" element={<Ingredientes />} />
              <Route path="/meta" element={<Meta />} />
              {/* Puedes añadir más rutas aquí, por ejemplo ingredientes, usuarios, etc. */}
            </Routes>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
