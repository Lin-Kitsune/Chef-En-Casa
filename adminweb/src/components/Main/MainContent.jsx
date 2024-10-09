import React from 'react';
import './MainContent.css';
import ChefEnCasa from '../../images/Chef-En-Casa.png';
import Fondo from '../../images/Fondo.png';

const MainContent = () => {
  return (
    <div
      className="h-[75vh] flex flex-col lg:flex-row justify-between items-center p-6 lg:p-16"
      style={{
        backgroundImage: `url(${Fondo})`, // Fondo de pantalla
        backgroundSize: 'cover', // Cubre todo el espacio
        backgroundPosition: 'center' // Centrado
      }}
    >
      <div className="text-section text-white lg:w-1/2">
        <h2 className="text-5xl lg:text-6xl font-bold mb-4">Chef en Casa</h2>
        <p className="text-lg lg:text-2xl mb-6">
          Descubre las mejores recetas para cocinar en casa, ingredientes frescos y fáciles de preparar.
        </p>
        <div className="info-button">
          <button className="bg-amarillo-chef text-black py-3 px-6 rounded-full text-lg font-bold hover:bg-yellow-400 transition duration-300">
            Más información
          </button>
        </div>
      </div>
      <div className="logo-section lg:w-1/2 flex justify-center lg:justify-end">
        <img src={ChefEnCasa} alt="Chef en Casa Logo" className="w-3/4 lg:w-1/2" />
      </div>
    </div>
  );
};

export default MainContent;