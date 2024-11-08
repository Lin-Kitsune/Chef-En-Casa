// components/Graficos/AnalisisConsumoIngredientes.js
import React, { useState } from 'react';
import { Radar } from 'react-chartjs-2';
import { Chart as ChartJS, RadialLinearScale, PointElement, LineElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(RadialLinearScale, PointElement, LineElement, Tooltip, Legend);

const AnalisisConsumoIngredientes = () => {
  const [period, setPeriod] = useState('Diario');

  // Datos ficticios para el gráfico de radar
  const dailyData = {
    labels: ['Pollo', 'Lechuga', 'Tomate', 'Queso', 'Aguacate', 'Arroz', 'Carne'],
    datasets: [
      {
        label: 'Consumo de Ingredientes (Diario)',
        data: [120, 80, 60, 40, 70, 90, 50],
        backgroundColor: 'rgba(54, 162, 235, 0.4)',
        borderColor: 'rgba(54, 162, 235, 1)',
        borderWidth: 1,
      },
    ],
  };

  const monthlyData = {
    labels: ['Pescado', 'Cebolla', 'Zanahoria', 'Papas', 'Espinaca', 'Calabacín', 'Setas'],
    datasets: [
      {
        label: 'Consumo de Ingredientes (Mensual)',
        data: [1000, 900, 850, 650, 500, 1200, 900],
        backgroundColor: 'rgba(75, 192, 192, 0.4)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
    ],
  };

  const data = period === 'Diario' ? dailyData : monthlyData;

  // Opciones del gráfico
  const options = {
    responsive: true,
    scales: {
      r: {
        beginAtZero: true,
        ticks: {
          stepSize: 50,
        },
      },
    },
  };

  return (
    <div className="flex flex-col items-center">
      <h2 className="text-xl font-semibold mb-4">Análisis de Consumo de Ingredientes</h2>

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

      {/* Gráfico de radar */}
      <div className="w-full max-w-xs sm:max-w-md lg:max-w-lg">
        <Radar data={data} options={options} />
      </div>
    </div>
  );
};

export default AnalisisConsumoIngredientes;
