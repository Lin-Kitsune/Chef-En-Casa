// components/SelectorRegiones.js
import React from 'react';

const SelectorRegiones = ({ regions, selectedRegions, setSelectedRegions }) => {
  const handleSelectRegion = (region) => {
    setSelectedRegions((prevSelected) =>
      prevSelected.includes(region) ? prevSelected.filter((r) => r !== region) : [...prevSelected, region]
    );
  };

  return (
    <div className="mb-4">
      <h3 className="text-lg font-semibold mb-2">Seleccione las Regiones para Analizar:</h3>
      {regions.map((region) => (
        <div key={region} className="flex items-center mb-1">
          <input
            type="checkbox"
            checked={selectedRegions.includes(region)}
            onChange={() => handleSelectRegion(region)}
            className="mr-2"
          />
          <label>{region}</label>
        </div>
      ))}
    </div>
  );
};

export default SelectorRegiones;
