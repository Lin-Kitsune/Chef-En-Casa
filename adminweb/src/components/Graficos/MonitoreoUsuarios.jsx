// components/Graficos/MonitoreoUsuarios.js
import React from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

const MonitoreoUsuarios = () => {
  const data = {
    labels: ['Usuarios Activos', 'Usuarios Inactivos'],
    datasets: [
      {
        data: [70, 30],  // Datos ficticios
        backgroundColor: ['#4BC0C0', '#FF6384'],
        hoverBackgroundColor: ['#4BC0C0', '#FF6384'],
      },
    ],
  };

  return (
    <div className="flex flex-col items-center">
      <h2 className="text-xl font-semibold mb-4">Monitoreo de Usuarios Activos vs. Inactivos</h2>
      <div className="w-full max-w-xs sm:max-w-md lg:max-w-lg">
        <Pie data={data} />
      </div>
    </div>
  );
};

export default MonitoreoUsuarios;
