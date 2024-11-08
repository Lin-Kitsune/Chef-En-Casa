// components/GraficoBarras.js
import React from 'react';
import { Bar } from 'react-chartjs-2';

const GraficoBarras = ({ data }) => {
  const chartData = {
    labels: Object.keys(data), // Usar los nombres de las regiones como etiquetas
    datasets: [
      {
        label: 'Índice de Consumo por Región',
        data: Object.values(data).map((region) => region.index), // Usar el índice de cada región
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
      },
    ],
  };

  const options = {
    responsive: true,
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'Índice de Consumo',
        },
      },
    },
  };

  return (
    <div>
      <h3 className="text-xl font-semibold mb-4 text-center">Índice de Consumo por Región</h3>
      <Bar data={chartData} options={options} />
    </div>
  );
};

export default GraficoBarras;
