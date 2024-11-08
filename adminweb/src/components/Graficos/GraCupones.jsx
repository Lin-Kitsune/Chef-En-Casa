// components/Graficos/Cupones.js
import React from 'react';
import CuponesFidelizacion from './CuponesFidelizacion';

const GraCupones = () => {
  return (
    <div className="p-5">
      <h1 className="text-3xl font-bold mb-8">Dashboard de Cupones y Fidelización</h1>
      <CuponesFidelizacion />
    </div>
  );
};

export default GraCupones;
