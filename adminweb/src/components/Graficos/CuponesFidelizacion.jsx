// components/Graficos/CuponesFidelizacion.js
import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const CuponesFidelizacion = () => {
  // Datos ficticios para el gráfico de uso, canje de cupones y recurrencia durante todo el año
  const data = {
    labels: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'],
    datasets: [
      {
        label: 'Uso de Cupones',
        data: [100, 120, 130, 150, 160, 180, 200, 210, 220, 230, 240, 250],  // Datos de uso de cupones por mes
        backgroundColor: 'rgba(255, 159, 64, 0.6)',
        borderColor: 'rgba(255, 159, 64, 1)',
        borderWidth: 1,
      },
      {
        label: 'Canje de Cupones',
        data: [80, 90, 100, 110, 120, 130, 140, 150, 160, 170, 180, 190],  // Datos de canje de cupones por mes
        backgroundColor: 'rgba(54, 162, 235, 0.6)',
        borderColor: 'rgba(54, 162, 235, 1)',
        borderWidth: 1,
      },
      {
        label: 'Recurrencia de Usuarios Premium',
        data: [50, 55, 60, 65, 70, 75, 80, 85, 90, 95, 100, 105],  // Datos de recurrencia de usuarios premium por mes
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
        borderColor: 'rgba(75, 192, 192, 1)',
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
      <h2 className="text-2xl font-semibold mb-8">Panel de Cupones y Fidelización de Usuarios Premium</h2>
      <div className="w-full max-w-xs sm:max-w-md lg:max-w-2xl">
        <Bar data={data} options={options} />
      </div>
    </div>
  );
};

export default CuponesFidelizacion;
