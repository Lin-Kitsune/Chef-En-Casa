import React from 'react';
import RankingIngredientes from './RankingIngredientes';
import AnalisisConsumoIngredientes from './AnalisisConsumoIngredientes';

const GraIngredientes = () => {
  return (
    <div className="p-5">
      <h1 className="text-3xl font-bold mb-8">Gráficos de Ingredientes</h1>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <RankingIngredientes />
        <AnalisisConsumoIngredientes />
      </div>
    </div>
  );
};

export default GraIngredientes;
