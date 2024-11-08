// components/Graficos/SatisfaccionReclamos.js
import React from 'react';
import { Bar, Radar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, RadialLinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, RadialLinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const SatisfaccionReclamos = () => {
  // Datos simulados para el gráfico de reclamos por tipo
  const dataReclamos = {
    labels: ['Funcionalidad', 'Usabilidad', 'Desempeño', 'Soporte', 'Estabilidad'],
    datasets: [
      {
        label: 'Número de Reclamos',
        data: [30, 20, 15, 10, 25], // Datos ficticios
        backgroundColor: 'rgba(255, 99, 132, 0.6)',
        borderColor: 'rgba(255, 99, 132, 1)',
        borderWidth: 1,
      },
    ],
  };

  // Opciones para el gráfico de reclamos por tipo
  const optionsReclamos = {
    responsive: true,
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  // Datos simulados para el gráfico de satisfacción por característica
  const dataSatisfaccion = {
    labels: ['Facilidad de Uso', 'Variedad de Recetas', 'Tiempo de Respuesta', 'Desempeño', 'Calidad de Soporte'],
    datasets: [
      {
        label: 'Nivel de Satisfacción',
        data: [4, 3, 2, 4, 5], // Datos ficticios en una escala de 1 a 5
        backgroundColor: 'rgba(54, 162, 235, 0.2)',
        borderColor: 'rgba(54, 162, 235, 1)',
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="flex flex-col items-center">
      <h2 className="text-2xl font-semibold mb-8">Dashboard de Satisfacción y Reclamos</h2>

      {/* Contenedor de gráficos en una sola fila */}
      <div className="flex flex-col lg:flex-row justify-center gap-8 w-full">
        
        {/* Gráfico de reclamos por tipo */}
        <div className="w-full max-w-xs sm:max-w-md lg:max-w-lg">
          <h3 className="text-xl font-semibold mb-4 text-center">Número de Reclamos por Tipo</h3>
          <Bar data={dataReclamos} options={optionsReclamos} />
        </div>

        {/* Gráfico de satisfacción por característica */}
        <div className="w-full max-w-xs sm:max-w-md lg:max-w-lg">
          <h3 className="text-xl font-semibold mb-4 text-center">Nivel de Satisfacción por Característica</h3>
          <Radar data={dataSatisfaccion} />
        </div>
      </div>
    </div>
  );
};

export default SatisfaccionReclamos;
