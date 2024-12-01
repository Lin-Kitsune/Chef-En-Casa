import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import 'leaflet/dist/leaflet.css';

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
import Cupones from './components/Cupones/Cupones.jsx';
import SabiasQuePage from './components/SabiasQue/SabiasQuePage.jsx';
import Dashboard from './components/Dashboard/Dashboard.jsx'; 
import Gestion from './components/Dashboard/Gestion.jsx'; 

import Usuarios from './components/Graficos/Usuarios.jsx';
import GraIngredientes from './components/Graficos/GraIngredientes.jsx';
import GraRecetas from './components/Graficos/GraRecetas.jsx';
import Reclamos from './components/Graficos/Reclamos.jsx';
import GraConvenios from './components/Graficos/GraConvenios.jsx';
import GraCupones from './components/Graficos/GraCupones.jsx';
import Promociones from './components/Graficos/Promociones.jsx';
import Geografia from './components/Graficos/Geografia.jsx';
import Premium from './components/Graficos/Premium.jsx';


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
              <Route path="/" element={<Dashboard />} /> {/* Página de inicio/dashboard */}
              <Route path="/gestion" element={<Gestion />} /> {/* Ruta Gestión */}
              <Route path="/recetas" element={<Recetas />} />
              <Route path="/ingredientes" element={<Ingredientes />} />
              <Route path="/meta" element={<Meta />} />
              <Route path="/usuarios" element={<UserList />} />  {/* Lista de usuarios */}
              <Route path="/reclamos" element={<Consultas/>} />
              <Route path="/notificaciones" element={<Notificaciones/>} />
              <Route path="/convenios" element={<Convenios/>} />
              <Route path="/cupones" element={<Cupones/>} />
              <Route path="/sabias-que" element={<SabiasQuePage />} />
              {/* Rutas de cada sección de gráficos */}
              <Route path="/graficos/usuarios" element={<Usuarios />} />
              <Route path="/graficos/ingredientes" element={<GraIngredientes />} />
              <Route path="/graficos/recetas" element={<GraRecetas />} />
              <Route path="/graficos/reclamos" element={<Reclamos />} />
              <Route path="/graficos/convenios" element={<GraConvenios />} />
              <Route path="/graficos/cupones" element={<GraCupones />} />
              <Route path="/graficos/promociones" element={<Promociones />} />
              <Route path="/graficos/geografia" element={<Geografia />} />
              <Route path="/graficos/premium" element={<Premium />} />
            </Routes>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
