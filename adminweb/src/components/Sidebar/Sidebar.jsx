import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Sidebar.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faTimes } from '@fortawesome/free-solid-svg-icons';

const Sidebar = () => {
  const [active, setActive] = useState('Recetas');
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div
      className={`relative h-full ${
        isOpen ? 'w-60' : 'w-16'
      } bg-white border-t-8 border-[#619537] transition-width duration-300 p-5 z-50`}
    >
      {/* Botón de menú (hamburguesa) */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="absolute top-4 left-4 text-xl text-[#619537] focus:outline-none"
      >
        <FontAwesomeIcon icon={isOpen ? faTimes : faBars} />
      </button>

      {/* Contenido del Menú */}
      {isOpen && (
        <div>
          <h2 className="text-2xl font-bold mb-5 text-black text-center">
            MENÚ
          </h2>
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
                active === 'Ingredientes'
                  ? 'bg-[#619537] text-white'
                  : 'text-black'
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
            <li
              className={`${
                active === 'Reclamos' ? 'bg-[#619537] text-white' : 'text-black'
              } font-bold text-lg py-2 px-4 rounded-lg cursor-pointer transition-colors duration-300`}
              onClick={() => setActive('Reclamos')}
            >
              <Link to="/reclamos">Reclamos</Link>
            </li>
            <li
              className={`${
                active === 'Notificaciones'
                  ? 'bg-[#619537] text-white'
                  : 'text-black'
              } font-bold text-lg py-2 px-4 rounded-lg cursor-pointer transition-colors duration-300`}
              onClick={() => setActive('Notificaciones')}
            >
              <Link to="/notificaciones">Notificaciones</Link>
            </li>
            <li
              className={`${
                active === 'Convenios'
                  ? 'bg-[#619537] text-white'
                  : 'text-black'
              } font-bold text-lg py-2 px-4 rounded-lg cursor-pointer transition-colors duration-300`}
              onClick={() => setActive('Convenios')}
            >
              <Link to="/convenios">Convenios</Link>
            </li>
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
                active === 'Aprendizaje'
                  ? 'bg-[#619537] text-white'
                  : 'text-black'
              } font-bold text-lg py-2 px-4 rounded-lg cursor-pointer transition-colors duration-300`}
              onClick={() => setActive('Aprendizaje')}
            >
              <Link to="/sabias-que">Aprendizaje</Link>
            </li>
            {/* Nueva opción: Dashboard */}
            <li
              className={`${
                active === 'Dashboard' ? 'bg-[#619537] text-white' : 'text-black'
              } font-bold text-lg py-2 px-4 rounded-lg cursor-pointer transition-colors duration-300`}
              onClick={() => setActive('Dashboard')}
            >
              <Link to="/">Dashboard</Link>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default Sidebar;