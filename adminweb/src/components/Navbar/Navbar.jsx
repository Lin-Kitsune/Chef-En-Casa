import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserCircle, faSignOutAlt  } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false); // Estado para controlar el menú desplegable
  const navigate = useNavigate();

  const handleLogout = () => {
    // Aquí puedes eliminar el token o cualquier dato almacenado y redirigir al login
    localStorage.removeItem('token');
    navigate('/login'); // Redirigir al login
  };

  return (
    <nav className="bg-amarillo-chef w-[90%] h-14 flex items-center justify-between px-8 rounded-full shadow-lg fixed top-4 left-1/2 transform -translate-x-1/2 z-[100]">
      <div className="navbar-content flex items-center justify-between w-full">
        {/* Título HOME */}
        <h1 className="text-xl lg:text-2xl font-bold text-black tracking-wide">HOME</h1>

        {/* Ícono de usuario */}
        <div className="relative">
          <FontAwesomeIcon
            icon={faUserCircle}
            className="text-black text-3xl cursor-pointer"
            onClick={() => setMenuOpen(!menuOpen)} // Al hacer clic, mostramos o cerramos el menú
          />
          
          {/* Menú desplegable */}
          {menuOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
              <div className="p-3">
                {/* Aquí mostrarías el correo del usuario */}
                <p className="text-sm text-gray-700 font-semibold">Correo:</p>
                <p className="text-sm text-gray-600">admin@chefencasa.com</p>
              </div>
              <hr className="my-2" />
              {/* Botón de Cerrar Sesión */}
              <div className="p-1">
                <button
                  onClick={handleLogout}
                  className="w-full text-left px-2 py-1 text-sm text-red-500 hover:bg-gray-100 rounded-lg"
                >
                  <FontAwesomeIcon icon={faSignOutAlt} className="mr-2" />
                   Cerrar Sesión
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
