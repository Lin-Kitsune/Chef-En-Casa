// components/Graficos/Recetas.js
import React from 'react';
import TendenciaRecetas from './TendenciaRecetas';
import RecurrenciaRecetas from './RecurrenciaRecetas';

const GraRecetas = () => {
  return (
    <div className="p-5">
      <h1 className="text-3xl font-bold mb-8">Gráficos de Recetas</h1>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div><TendenciaRecetas /></div>
        <div><RecurrenciaRecetas /></div>
      </div>
    </div>
  );
};

export default GraRecetas;
