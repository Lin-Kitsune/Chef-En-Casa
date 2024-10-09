import React from 'react';
import './Navbar.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserCircle } from '@fortawesome/free-solid-svg-icons';

const Navbar = () => {
  return (
    <nav className="bg-amarillo-chef w-[90%] h-14 flex items-center justify-between px-8 rounded-full shadow-lg fixed top-4 left-1/2 transform -translate-x-1/2 z-50">
      <div className="navbar-content flex items-center justify-between w-full">
        {/* Título HOME */}
        <h1 className="text-xl lg:text-2xl font-bold text-black tracking-wide">HOME</h1>

        {/* Icono de usuario */}
        <FontAwesomeIcon icon={faUserCircle} className="text-black text-3xl cursor-pointer" />
      </div>
    </nav>
  );
};

export default Navbar;