// components/Graficos/PatronesConsumoGeografico.js
import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const PatronesConsumoGeografico = () => {
  // Datos ficticios de consumo de la app por región en Chile
  const data = {
    labels: ['Metropolitana', 'Valparaíso', 'Biobío', 'Araucanía', 'Los Lagos', 'Coquimbo', 'O’Higgins'],
    datasets: [
      {
        label: 'Uso de la App',
        data: [3000, 1800, 1200, 800, 700, 600, 500], // Datos ficticios de uso de la app por región
        backgroundColor: 'rgba(54, 162, 235, 0.6)',
        borderColor: 'rgba(54, 162, 235, 1)',
        borderWidth: 1,
      },
      {
        label: 'Consumo de Recetas',
        data: [2500, 1500, 1100, 700, 650, 500, 450], // Datos ficticios de consumo de recetas por región
        backgroundColor: 'rgba(255, 99, 132, 0.6)',
        borderColor: 'rgba(255, 99, 132, 1)',
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
      <h2 className="text-2xl font-semibold mb-8">Patrones de Consumo por Ubicación Geográfica</h2>
      <div className="w-full max-w-xs sm:max-w-md lg:max-w-2xl">
        <Bar data={data} options={options} />
      </div>
    </div>
  );
};

export default PatronesConsumoGeografico;
