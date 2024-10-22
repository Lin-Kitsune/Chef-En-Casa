import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Sidebar.css';

const Sidebar = () => {
  const [active, setActive] = useState('Recetas');

  return (
    <div className="w-56 bg-white border-t-8 border-[#619537] p-5 absolute top-[490px] z-50">
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
          Usuarios
        </li>
        <li
          className={`${
            active === 'Meta' ? 'bg-[#619537] text-white' : 'text-black'
          } font-bold text-lg py-2 px-4 rounded-lg cursor-pointer transition-colors duration-300`}
          onClick={() => setActive('Meta')}
        >
          <Link to="/meta">Meta</Link> {/* Agregar enlace a Meta */}
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;