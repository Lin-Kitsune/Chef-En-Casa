// ActividadDiaria.js
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
import { getDailyUserActivity, getMonthlyUserActivity, getHourlyUserActivity } from '../../services/dashboardService';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const ActividadDiaria = () => {
  const [data, setData] = useState([]);
  const [periodo, setPeriodo] = useState('Diario');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      if (periodo === 'Diario') {
        const dailyData = await getDailyUserActivity();
        setData(dailyData);
      } else if (periodo === 'Mensual') {
        const monthlyData = await getMonthlyUserActivity();
        setData(monthlyData);
      } else if (periodo === 'Horario') {
        const hourlyData = await getHourlyUserActivity();
        setData(hourlyData);
      }
      setLoading(false);
    };

    fetchData();
  }, [periodo]);

  const labels = periodo === 'Horario' ? 
    ['0-1 AM', '1-2 AM', '2-3 AM', '3-4 AM', '4-5 AM', '5-6 AM', '6-7 AM', '7-8 AM', '8-9 AM', '9-10 AM', '10-11 AM', '11-12 PM', '12-1 PM', '1-2 PM', '2-3 PM', '3-4 PM', '4-5 PM', '5-6 PM', '6-7 PM', '7-8 PM', '8-9 PM', '9-10 PM', '10-11 PM', '11-12 AM'] 
    : ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'];

  const chartData = {
    labels,
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
        title: {
          display: true,
          text: 'Número de Usuarios',
        },
      },
    },
  };

  return (
    <div className="flex flex-col items-center">
      <div className="flex justify-between w-full max-w-lg mb-4">
        <h2 className="text-xl font-semibold">Actividad de Usuarios ({periodo})</h2>
        <div className="flex space-x-2">
          <button
            onClick={() => setPeriodo('Diario')}
            className={`w-24 h-8 text-sm px-3 py-1 rounded ${periodo === 'Diario' ? 'bg-green-500 text-white' : 'bg-gray-300'}`}
          >
            Diario
          </button>
          <button
            onClick={() => setPeriodo('Mensual')}
            className={`w-24 h-8 text-sm px-3 py-1 rounded ${periodo === 'Mensual' ? 'bg-green-500 text-white' : 'bg-gray-300'}`}
          >
            Mensual
          </button>
          <button
            onClick={() => setPeriodo('Horario')}
            className={`w-24 h-8 text-sm px-3 py-1 rounded ${periodo === 'Horario' ? 'bg-green-500 text-white' : 'bg-gray-300'}`}
          >
            Horas
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
