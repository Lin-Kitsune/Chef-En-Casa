import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';
import { getNewUsersDaily, getNewUsersMonthly } from '../../services/dashboardService';

ChartJS.register(CategoryScale, LinearScale, LineElement, PointElement, Title, Tooltip, Legend);

const NuevosUsuarios = () => {
  const [data, setData] = useState([]);
  const [periodo, setPeriodo] = useState('Diario');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      if (periodo === 'Diario') {
        const dailyData = await getNewUsersDaily();
        setData(dailyData);
      } else {
        const monthlyData = await getNewUsersMonthly();
        setData(monthlyData);
      }
      setLoading(false);
    };

    fetchData();
  }, [periodo]);

  const chartData = {
    labels: ['01/10', '02/10', '03/10', '04/10', '05/10', '06/10', '07/10'],
    datasets: [
      {
        label: 'Nuevos Usuarios',
        data: data,
        fill: false,
        backgroundColor: 'rgba(255,99,132,0.2)',
        borderColor: 'rgba(255,99,132,1)',
      },
    ],
  };

  const options = {
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <div className="flex flex-col items-center">
      <div className="flex justify-between w-full max-w-lg mb-4">
        <h2 className="text-xl font-semibold">Nuevos Usuarios ({periodo})</h2>
        <div>
          <button
            onClick={() => setPeriodo('Diario')}
            className={`mr-2 px-3 py-1 rounded ${periodo === 'Diario' ? 'bg-green-500 text-white' : 'bg-gray-300'}`}
          >
            Diario
          </button>
          <button
            onClick={() => setPeriodo('Mensual')}
            className={`px-3 py-1 rounded ${periodo === 'Mensual' ? 'bg-green-500 text-white' : 'bg-gray-300'}`}
          >
            Mensual
          </button>
        </div>
      </div>
      {loading ? (
        <p>Cargando datos...</p>
      ) : (
        <div className="w-full max-w-xs sm:max-w-md lg:max-w-lg">
          <Line data={chartData} options={options} />
        </div>
      )}
    </div>
  );
};

export default NuevosUsuarios;
