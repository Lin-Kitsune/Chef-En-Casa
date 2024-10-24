import React, { useEffect, useState } from 'react';
import { Pie } from 'react-chartjs-2';
import { getIngredientRankings } from '../../services/dashboardService';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend
} from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

const RankingIngredientes = () => {
  const [data, setData] = useState({ labels: [], datasets: [] });
  const [period, setPeriod] = useState('daily'); // Controla si es diario o mensual

  useEffect(() => {
    const fetchData = async () => {
      const ingredientRankings = await getIngredientRankings(period); // Llama los datos según el periodo
      setData({
        labels: ingredientRankings.labels,
        datasets: [
          {
            data: ingredientRankings.data,
            backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF'],
            hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF'],
          },
        ],
      });
    };
    fetchData();
  }, [period]);

  return (
    <div className="flex flex-col items-center">
      <h2 className="text-xl font-semibold mb-4">Ranking de Ingredientes Más Usados</h2>

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
        <Pie data={data} />
      </div>
    </div>
  );
};

export default RankingIngredientes;
