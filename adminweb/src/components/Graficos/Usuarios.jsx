// components/Graficos/Usuarios.js
import React from 'react';
import ActividadDiaria from './ActividadDiaria';
import NuevosUsuarios from './NuevosUsuarios';
import SegmentacionUsuarios from './SegmentacionUsuarios';
import MonitoreoUsuarios from './MonitoreoUsuarios';

const Usuarios = () => {
  return (
    <div className="p-5">
      <h1 className="text-3xl font-bold mb-8">Gráficos de Usuarios</h1>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div><ActividadDiaria /></div>
        <div><NuevosUsuarios /></div>
        <div><SegmentacionUsuarios /></div>
        <div><MonitoreoUsuarios /></div>
      </div>
    </div>
  );
};

export default Usuarios;
