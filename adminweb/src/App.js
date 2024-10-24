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
import UserList from './components/Usuarios/UserList.jsx';   // Importar UserList
import Consultas from './components/Consultas/Consultas.jsx';
import Notificaciones from './components/Notificaciones/Notificaciones.jsx';
import Convenios from './components/Convenios/Convenios.jsx';
import GraficosOperativos from './components/Graficos/GraficosOperativos.jsx';

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
          <div className="flex-1 pl-1 pt-1">
            <Routes>
              <Route path="/recetas" element={<Recetas />} />
              <Route path="/ingredientes" element={<Ingredientes />} />
              <Route path="/meta" element={<Meta />} />
              <Route path="/usuarios" element={<UserList />} />  {/* Lista de usuarios */}
              <Route path="/reclamos" element={<Consultas/>} />
              <Route path="/notificaciones" element={<Notificaciones/>} />
              <Route path="/convenios" element={<Convenios/>} />
              <Route path="/graficos" element={<GraficosOperativos/>} />
              {/* Puedes añadir más rutas aquí, por ejemplo ingredientes, usuarios, etc. */}
            </Routes>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
