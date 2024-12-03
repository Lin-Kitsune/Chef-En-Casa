import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import { getRecipeTrends } from '../../services/OperativeService';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const TendenciaRecetas = () => {
  const [data, setData] = useState({ labels: [], datasets: [] });
  const [period, setPeriod] = useState('daily'); // Controla si es diario o mensual

  useEffect(() => {
    const fetchData = async () => {
      const recipeTrends = await getRecipeTrends(period); // Llama los datos según el periodo
      setData({
        labels: recipeTrends.labels,
        datasets: [
          {
            label: 'Veces Preparada',
            data: recipeTrends.data,
            backgroundColor: 'rgba(153, 102, 255, 0.6)',
            borderColor: 'rgba(153, 102, 255, 1)',
            borderWidth: 1,
          },
        ],
      });
    };
    fetchData();
  }, [period]);

  const options = {
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <div className="flex flex-col items-center">
      <h2 className="text-xl font-semibold mb-4">Tendencia de Recetas Más Populares</h2>
      
      {/* Botones para cambiar entre Diario y Mensual */}
      <div className="flex space-x-4 mb-4">
        <button 
          className={`px-4 py-2 rounded ${period === 'daily' ? 'bg-green-500 text-white' : 'bg-gray-200 text-black'}`} 
          onClick={() => setPeriod('daily')}
        >
          Diario
        </button>
        <button 
          className={`px-4 py-2 rounded ${period === 'monthly' ? 'bg-green-500 text-white' : 'bg-gray-200 text-black'}`} 
          onClick={() => setPeriod('monthly')}
        >
          Mensual
        </button>
      </div>

      <div className="w-full max-w-xs sm:max-w-md lg:max-w-lg">
        <Bar data={data} options={options} />
      </div>
    </div>
  );
};

export default TendenciaRecetas;
