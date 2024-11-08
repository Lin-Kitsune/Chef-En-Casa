// components/Graficos/SegmentacionUsuarios.js
import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

const SegmentacionUsuarios = () => {
  const data = {
    labels: ['Recetas Vegetarianas', 'Comida Rápida', 'Alta Cocina', 'Postres', 'Comida Saludable'],
    datasets: [
      {
        data: [25, 20, 15, 25, 15],  // Datos ficticios
        backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF'],
        hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF'],
      },
    ],
  };

  return (
    <div className="flex flex-col items-center">
      <h2 className="text-xl font-semibold mb-4">Segmentación de Usuarios para Campañas</h2>
      <div className="w-full max-w-xs sm:max-w-md lg:max-w-lg">
        <Doughnut data={data} />
      </div>
    </div>
  );
};

export default SegmentacionUsuarios;
