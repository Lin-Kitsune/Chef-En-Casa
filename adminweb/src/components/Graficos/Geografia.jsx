// components/Graficos/Geografia.js
import React, {  } from 'react';
import MapaChile from './MapaChile'; // Cambiar el nombre del componente
import GraficoBarras from './GraficoBarras';
import GraficoDispersion from './GraficoDispersion';

// Datos ficticios de ejemplo
const dataEjemplo = {
  Metropolitana: { index: 86.18, globalIndex: 75 },
  Valparaiso: { index: 90.0, globalIndex: 80 },
  Antofagasta: { index: 46.29, globalIndex: 55 },
  Biobio: { index: 23.77, globalIndex: 45 },
  // Agrega más datos ficticios para otras regiones
};

const Geografia = () => {

  return (
    <div className="p-5">
      <h1 className="text-3xl font-bold mb-8">Dashboard de Consumo Geográfico</h1>

      {/* Mapa de Consumo Geográfico */}
      <div className="mt-8">
        <MapaChile data={dataEjemplo} /> {/* Cambiado a MapaChile */}
      </div>

      {/* Gráficos de Datos */}
      <div className="flex flex-col lg:flex-row justify-around mt-8">
        <div className="w-full lg:w-1/2 p-4">
          <GraficoBarras data={dataEjemplo} />
        </div>
        <div className="w-full lg:w-1/2 p-4">
          <GraficoDispersion data={dataEjemplo} />
        </div>
      </div>
    </div>
  );
};

export default Geografia;
