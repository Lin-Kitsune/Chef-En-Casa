import React from 'react';
import RankingIngredientes from './RankingIngredientes';
import ActividadDiaria from './ActividadDiaria';
import NuevosUsuarios from './NuevosUsuarios';
import TendenciaRecetas from './TendenciaRecetas';

const GraficosOperativos = () => {
  return (
    <div className="p-5">
      <h1 className="text-3xl font-bold mb-8">Panel de Gráficos Operativos</h1>

      {/* Grid para organizar dos gráficos por fila */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        {/* Gráfico de actividad diaria */}
        <div>
          <ActividadDiaria />
        </div>

        {/* Gráfico de nuevos usuarios */}
        <div>
          <NuevosUsuarios />
        </div>
      </div>

      {/* Gráfico de tendencias de recetas y ranking en otra fila */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        {/* Gráfico de tendencia de recetas */}
        <div>
          <TendenciaRecetas />
        </div>

        {/* Gráfico de ranking de ingredientes */}
        <div>
          <RankingIngredientes />
        </div>
      </div>
    </div>
  );
};

export default GraficosOperativos;
