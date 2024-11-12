import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Sidebar.css';

const Sidebar = () => {
  const [active, setActive] = useState('Recetas');
  const [showGraphicsDropdown, setShowGraphicsDropdown] = useState(false);

  return (
    <div className="relative w-50 bg-white border-t-8 border-[#619537] p-5 z-50 mt-4 lg:mt-0">
      <h2 className="text-2xl font-bold mb-5 text-black text-center">MENÚ</h2>
      <ul className="space-y-5">
        <li
          className={`${
            active === 'Recetas' ? 'bg-[#619537] text-white' : 'text-black'
          } font-bold text-lg py-2 px-4 rounded-lg cursor-pointer transition-colors duration-300`}
          onClick={() => setActive('Recetas')}
        >
          <Link to="/recetas">Recetas</Link>
        </li>
        <li
          className={`${
            active === 'Ingredientes' ? 'bg-[#619537] text-white' : 'text-black'
          } font-bold text-lg py-2 px-4 rounded-lg cursor-pointer transition-colors duration-300`}
          onClick={() => setActive('Ingredientes')}
        >
          <Link to="/ingredientes">Ingredientes</Link>
        </li>
        <li
          className={`${
            active === 'Usuarios' ? 'bg-[#619537] text-white' : 'text-black'
          } font-bold text-lg py-2 px-4 rounded-lg cursor-pointer transition-colors duration-300`}
          onClick={() => setActive('Usuarios')}
        >
          <Link to="/usuarios">Usuarios</Link> 
        </li>
        {/* Nueva opción Reclamos */}
        <li
          className={`${
            active === 'Reclamos' ? 'bg-[#619537] text-white' : 'text-black'
          } font-bold text-lg py-2 px-4 rounded-lg cursor-pointer transition-colors duration-300`}
          onClick={() => setActive('Reclamos')}
        >
          <Link to="/reclamos">Reclamos</Link> {/* Agregar enlace a Reclamos */}
        </li>
        {/* Nueva Opción: Notificaciones */}
        <li
          className={`${
            active === 'Notificaciones' ? 'bg-[#619537] text-white' : 'text-black'
          } font-bold text-lg py-2 px-4 rounded-lg cursor-pointer transition-colors duration-300`}
          onClick={() => setActive('Notificaciones')}
        >
          <Link to="/notificaciones">Notificaciones</Link>
        </li>
        <li
          className={`${
            active === 'Convenios' ? 'bg-[#619537] text-white' : 'text-black'
          } font-bold text-lg py-2 px-4 rounded-lg cursor-pointer transition-colors duration-300`}
          onClick={() => setActive('Convenios')}
        >
          <Link to="/convenios">Convenios (Socios)</Link>
        </li>
         {/* Nueva opción: Cupones */}
         <li
          className={`${
            active === 'Cupones' ? 'bg-[#619537] text-white' : 'text-black'
          } font-bold text-lg py-2 px-4 rounded-lg cursor-pointer transition-colors duration-300`}
          onClick={() => setActive('Cupones')}
        >
          <Link to="/cupones">Cupones</Link>
        </li>

        <li
          className={`${
            active === 'Meta' ? 'bg-[#619537] text-white' : 'text-black'
          } font-bold text-lg py-2 px-4 rounded-lg cursor-pointer transition-colors duration-300`}
          onClick={() => setActive('Meta')}
        >
          <Link to="/meta">Meta</Link> {/* Agregar enlace a Meta */}
        </li>
        {/* Menú desplegable: Gráficos Operativos */}
        <li
          className={`${
            active === 'Graficos' ? 'bg-[#619537] text-white' : 'text-black'
          } font-bold text-lg py-2 px-4 rounded-lg cursor-pointer transition-colors duration-300`}
          onClick={() => {
            setActive('Graficos');
            setShowGraphicsDropdown(!showGraphicsDropdown);
          }}
        >
          Gráficos Operativos
        </li>
        {showGraphicsDropdown && (
          <ul className="pl-5 space-y-2">
            <li className="text-black font-bold text-lg py-2 px-4 cursor-pointer hover:bg-gray-200 rounded-lg">
              <Link to="/graficos/usuarios">Usuarios</Link>
            </li>
            <li className="text-black font-bold text-lg py-2 px-4 cursor-pointer hover:bg-gray-200 rounded-lg">
              <Link to="/graficos/ingredientes">Ingredientes</Link>
            </li>
            <li className="text-black font-bold text-lg py-2 px-4 cursor-pointer hover:bg-gray-200 rounded-lg">
              <Link to="/graficos/recetas">Recetas</Link>
            </li>
            <li className="text-black font-bold text-lg py-2 px-4 cursor-pointer hover:bg-gray-200 rounded-lg">
              <Link to="/graficos/reclamos">Reclamos</Link>
            </li>
            <li className="text-black font-bold text-lg py-2 px-4 cursor-pointer hover:bg-gray-200 rounded-lg">
              <Link to="/graficos/convenios">Convenios</Link>
            </li>
            <li className="text-black font-bold text-lg py-2 px-4 cursor-pointer hover:bg-gray-200 rounded-lg">
              <Link to="/graficos/cupones">Cupones y Fidelización</Link>
            </li>
            <li className="text-black font-bold text-lg py-2 px-4 cursor-pointer hover:bg-gray-200 rounded-lg">
              <Link to="/graficos/promociones">Promociones y Publicidad</Link>
            </li>
            <li className="text-black font-bold text-lg py-2 px-4 cursor-pointer hover:bg-gray-200 rounded-lg">
              <Link to="/graficos/geografia">Geografía</Link>
            </li>
            <li className="text-black font-bold text-lg py-2 px-4 cursor-pointer hover:bg-gray-200 rounded-lg">
              <Link to="/graficos/premium">Funcionalidades Premium</Link>
            </li>
          </ul>
        )}
      </ul>
    </div>
  );
};

export default Sidebar;