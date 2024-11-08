// components/Graficos/OptimizacionConvenios.js
import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const OptimizacionConvenios = () => {
  // Datos ficticios para el gráfico de rendimiento de convenios
  const data = {
    labels: ['Convenio A', 'Convenio B', 'Convenio C', 'Convenio D', 'Convenio E'],
    datasets: [
      {
        label: 'Promociones',
        data: [50, 30, 20, 60, 40],  // Número de promociones por convenio
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
      {
        label: 'Interacciones',
        data: [300, 200, 150, 400, 250],  // Número de interacciones generadas
        backgroundColor: 'rgba(153, 102, 255, 0.6)',
        borderColor: 'rgba(153, 102, 255, 1)',
        borderWidth: 1,
      },
    ],
  };

  // Opciones del gráfico
  const options = {
    responsive: true,
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <div className="flex flex-col items-center">
      <h2 className="text-2xl font-semibold mb-8">Optimización del Inventario de Convenios</h2>
      <div className="w-full max-w-xs sm:max-w-md lg:max-w-2xl">
        <Bar data={data} options={options} />
      </div>
    </div>
  );
};

export default OptimizacionConvenios;
