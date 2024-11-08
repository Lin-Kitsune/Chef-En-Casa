// components/Graficos/RetornoInversionPromociones.js
import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const RetornoInversionPromociones = () => {
  // Datos ficticios para el gráfico de retorno de inversión
  const data = {
    labels: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'],
    datasets: [
      {
        label: 'Costo de Promociones ($)',
        data: [1000, 1200, 1100, 1300, 1400, 1250, 1500, 1600, 1450, 1550, 1600, 1700], // Datos ficticios de costos
        backgroundColor: 'rgba(255, 99, 132, 0.6)',
        borderColor: 'rgba(255, 99, 132, 1)',
        borderWidth: 1,
      },
      {
        label: 'Nuevos Registros',
        data: [200, 250, 230, 300, 320, 280, 350, 370, 340, 360, 400, 420], // Nuevos registros como resultado de campañas
        backgroundColor: 'rgba(54, 162, 235, 0.6)',
        borderColor: 'rgba(54, 162, 235, 1)',
        borderWidth: 1,
      },
      {
        label: 'Retención de Usuarios',
        data: [150, 180, 160, 210, 220, 190, 240, 250, 230, 240, 260, 270], // Datos de retención
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
      <h2 className="text-2xl font-semibold mb-8">Gestión de Retornos de Inversión en Promociones y Publicidad</h2>
      <div className="w-full max-w-xs sm:max-w-md lg:max-w-2xl">
        <Bar data={data} options={options} />
      </div>
    </div>
  );
};

export default RetornoInversionPromociones;
