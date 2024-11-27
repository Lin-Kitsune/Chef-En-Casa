import React, { useState, useEffect } from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { getUsuariosActivos } from '../../services/dashboardService';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const ActividadDiaria = () => {
  const [chartData, setChartData] = useState(null); // Datos del gráfico
  const [loading, setLoading] = useState(true); // Estado de carga
  const [rango, setRango] = useState('diario'); // Rango predeterminado
  const [mes, setMes] = useState(null); // Mes (opcional)
  const [anio, setAnio] = useState(null); // Año (opcional)

  // Obtener datos desde el servicio
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const data = await getUsuariosActivos(rango, mes, anio);
  
        const labels = data.map((item) => item._id); // Fechas (días)
        const counts = data.map((item) => item.cantidadUsuarios); // Cantidad de usuarios activos
  
        setChartData({
          labels,
          datasets: [
            {
              label: 'Usuarios Activos',
              data: counts,
              backgroundColor: 'rgba(75, 192, 192, 0.6)',
              borderColor: 'rgba(75, 192, 192, 1)',
              borderWidth: 1,
            },
          ],
        });
      } catch (error) {
        console.error('Error al cargar datos del gráfico:', error.message);
      } finally {
        setLoading(false);
      }
    };
  
    fetchData();
  }, [rango, mes, anio]);
  

  // Opciones de configuración del gráfico
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Actividad Diaria de Usuarios',
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'Cantidad de Usuarios',
        },
      },
      x: {
        title: {
          display: true,
          text: 'Fecha',
        },
      },
    },
  };

  return (
    <div className="chart-container">
      <h2 className="text-xl font-semibold mb-4">Actividad Diaria de Usuarios</h2>

      {/* Filtros */}
      <div className="filters mb-4 flex space-x-4">
        <button
          onClick={() => setRango('diario')}
          className={`px-4 py-2 rounded ${rango === 'diario' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
        >
          Diario
        </button>
        <button
          onClick={() => setRango('semanal')}
          className={`px-4 py-2 rounded ${rango === 'semanal' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
        >
          Semanal
        </button>
        <button
          onClick={() => setRango('mensual')}
          className={`px-4 py-2 rounded ${rango === 'mensual' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
        >
          Mensual
        </button>
      </div>

      {/* Gráfico o mensaje de carga */}
      {loading ? (
        <p>Cargando datos...</p>
      ) : chartData ? (
        <Bar data={chartData} options={options} />
      ) : (
        <p>Error al cargar datos del gráfico</p>
      )}
    </div>
  );
};

export default ActividadDiaria;
