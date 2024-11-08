// components/Graficos/Promociones.js
import React from 'react';
import RetornoInversionPromociones from './RetornoInversionPromociones';

const Promociones = () => {
  return (
    <div className="p-5">
      <h1 className="text-3xl font-bold mb-8">Dashboard de Promociones y Publicidad</h1>
      <RetornoInversionPromociones />
    </div>
  );
};

export default Promociones;
