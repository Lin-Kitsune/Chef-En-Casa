// components/Graficos/ConversionesFuncionalidadesPremium.js
import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const ConversionesFuncionalidadesPremium = () => {
  // Datos ficticios para el gráfico de conversiones y uso de funciones premium específicas
  const data = {
    labels: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'],
    datasets: [
      {
        label: 'Conversión a Premium',
        data: [50, 60, 70, 80, 90, 100, 110, 120, 130, 140, 150, 160],  // Conversión de usuarios a premium
        backgroundColor: 'rgba(255, 159, 64, 0.6)',
        borderColor: 'rgba(255, 159, 64, 1)',
        borderWidth: 1,
      },
      {
        label: 'Uso de Cálculo de IMC',
        data: [100, 120, 110, 130, 140, 150, 160, 170, 180, 190, 200, 210],  // Uso de la función IMC
        backgroundColor: 'rgba(54, 162, 235, 0.6)',
        borderColor: 'rgba(54, 162, 235, 1)',
        borderWidth: 1,
      },
      {
        label: 'Uso de Gestión de Alergias',
        data: [90, 95, 100, 105, 110, 115, 120, 125, 130, 135, 140, 145],  // Uso de la función de alergias
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
      {
        label: 'Canje de Puntos para Cupones',
        data: [150, 160, 170, 180, 190, 200, 210, 220, 230, 240, 250, 260],  // Canje de cupones
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
      <h2 className="text-2xl font-semibold mb-8">Seguimiento de Conversiones y Uso de Funciones Premium</h2>
      <div className="w-full max-w-xs sm:max-w-md lg:max-w-2xl">
        <Bar data={data} options={options} />
      </div>
    </div>
  );
};

export default ConversionesFuncionalidadesPremium;
