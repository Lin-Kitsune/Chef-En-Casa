// components/Graficos/RecurrenciaRecetas.js
import React, { useState } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const RecurrenciaRecetas = () => {
  // Estado para controlar el periodo (Diario o Mensual)
  const [period, setPeriod] = useState('Diario');

  // Datos ficticios para el gráfico de barras con recetas distintas para cada periodo
  const data = {
    labels: period === 'Diario' 
      ? ['Ensalada César', 'Pizza Margarita', 'Pasta Alfredo', 'Tacos', 'Sopa de Tomate', 'Brownies', 'Smoothie Verde'] 
      : ['Paella', 'Risotto de Setas', 'Chili con Carne', 'Pollo al Curry', 'Bacalao a la Vizcaína', 'Lasagna', 'Poke Bowl'],
    datasets: [
      {
        label: `Recurrencia de Recetas (${period})`,
        data: period === 'Diario' ? [15, 25, 10, 20, 5, 18, 12] : [320, 450, 200, 380, 250, 400, 300],
        backgroundColor: 'rgba(255, 159, 64, 0.6)',
        borderColor: 'rgba(255, 159, 64, 1)',
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
      <h2 className="text-xl font-semibold mb-4">Análisis de Recurrencia en el Uso de Recetas Favoritas</h2>
      
      {/* Botones para cambiar entre Diario y Mensual */}
      <div className="flex space-x-4 mb-4">
        <button 
          className={`px-4 py-2 rounded ${period === 'Diario' ? 'bg-green-500 text-white' : 'bg-gray-200 text-black'}`} 
          onClick={() => setPeriod('Diario')}
        >
          Diario
        </button>
        <button 
          className={`px-4 py-2 rounded ${period === 'Mensual' ? 'bg-green-500 text-white' : 'bg-gray-200 text-black'}`} 
          onClick={() => setPeriod('Mensual')}
        >
          Mensual
        </button>
      </div>

      {/* Gráfico de barras */}
      <div className="w-full max-w-xs sm:max-w-md lg:max-w-lg">
        <Bar data={data} options={options} />
      </div>
    </div>
  );
};

export default RecurrenciaRecetas;
