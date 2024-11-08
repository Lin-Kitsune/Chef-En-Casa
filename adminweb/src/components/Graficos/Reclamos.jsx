// components/Graficos/Reclamos.js
import React from 'react';
import SatisfaccionReclamos from './SatisfaccionReclamos';

const Reclamos = () => {
  return (
    <div className="p-5">
      <h1 className="text-3xl font-bold mb-8">Dashboard de Satisfacción y Reclamos</h1>
      <SatisfaccionReclamos />
    </div>
  );
};

export default Reclamos;
