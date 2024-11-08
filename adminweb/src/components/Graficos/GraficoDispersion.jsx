// components/GraficoDispersion.js
import React from 'react';
import { Scatter } from 'react-chartjs-2';

const GraficoDispersion = ({ data }) => {
  const chartData = {
    datasets: [
      {
        label: 'Índice de Dimensiones por Región',
        data: Object.keys(data).map((region) => ({
          x: data[region].index,       // Índice de consumo
          y: data[region].globalIndex, // Índice global
          label: region,               // Nombre de la región
        })),
        backgroundColor: 'rgba(153, 102, 255, 0.6)',
      },
    ],
  };

  const options = {
    responsive: true,
    scales: {
      x: {
        title: {
          display: true,
          text: 'Índice de Consumo',
        },
      },
      y: {
        title: {
          display: true,
          text: 'Índice Global',
        },
      },
    },
  };

  return (
    <div>
      <h3 className="text-xl font-semibold mb-4 text-center">Comparación de Índices de Consumo y Global</h3>
      <Scatter data={chartData} options={options} />
    </div>
  );
};

export default GraficoDispersion;
