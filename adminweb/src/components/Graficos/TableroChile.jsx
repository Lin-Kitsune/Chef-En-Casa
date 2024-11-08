// components/TableroChile.js
import React, { useState } from 'react';
import MapaChile from './MapaChile';
import GraficoBarras from './GraficoBarras';
import GraficoDispersion from './GraficoDispersion';
import SelectorRegiones from './SelectorRegiones';

const dataEjemplo = {
  Metropolitana: { index: 86.18, globalIndex: 75 },
  Valparaiso: { index: 90.0, globalIndex: 80 },
  Antofagasta: { index: 46.29, globalIndex: 55 },
  // Agrega más datos ficticios para cada región
};

const TableroChile = () => {
  const [selectedRegions, setSelectedRegions] = useState(Object.keys(dataEjemplo));

  return (
    <div className="p-5">
      <h1 className="text-3xl font-bold mb-8">Dashboard de Consumo Geográfico en Chile</h1>
      <SelectorRegiones
        regions={Object.keys(dataEjemplo)}
        selectedRegions={selectedRegions}
        setSelectedRegions={setSelectedRegions}
      />
      <div className="mt-8">
        <MapaChile selectedRegions={selectedRegions} data={dataEjemplo} />
        <div className="flex justify-around mt-8">
          <GraficoBarras data={dataEjemplo} />
          <GraficoDispersion data={dataEjemplo} />
        </div>
      </div>
    </div>
  );
};

export default TableroChile;
