import React, { useState, useEffect } from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';
import { getDailyUserActivity, getMonthlyUserActivity } from '../../services/dashboardService';

// Registrar los elementos de Chart.js necesarios para un gráfico de barras
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const ActividadDiaria = () => {
  const [data, setData] = useState([]);
  const [periodo, setPeriodo] = useState('Diario'); // Estado para controlar el periodo (Diario o Mensual)
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      if (periodo === 'Diario') {
        const dailyData = await getDailyUserActivity();
        setData(dailyData);
      } else {
        const monthlyData = await getMonthlyUserActivity();
        setData(monthlyData);
      }
      setLoading(false);
    };

    fetchData();
  }, [periodo]);

  const chartData = {
    labels: ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'],
    datasets: [
      {
        label: 'Usuarios Activos',
        data: data,
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
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
        <h2 className="text-xl font-semibold">Actividad de Usuarios ({periodo})</h2>
        <div>
          {/* Selector Diario/Mensual */}
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
          <Bar data={chartData} options={options} />
        </div>
      )}
    </div>
  );
};

export default ActividadDiaria;
