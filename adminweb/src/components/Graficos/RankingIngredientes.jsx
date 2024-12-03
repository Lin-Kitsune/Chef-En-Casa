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
import { getIngredientesMasUsados } from '../../services/OperativeService'; // Asegúrate de que esta función esté correctamente implementada

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const RankingIngredientes = () => {
  const [chartData, setChartData] = useState(null); // Estado para los datos del gráfico
  const [loading, setLoading] = useState(true); // Indicador de carga
  const [period, setPeriod] = useState('diario'); // Control del período (diario, semanal, mensual)

  // Cargar los datos desde el backend
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true); // Inicia la carga de datos
      try {
        // Aquí cambiamos la función para llamar a "getIngredientesMasUsados"
        const response = await getIngredientesMasUsados(period);
        
        // Procesamos los datos que vienen del backend
        const labels = response.map((item) => item._id); // Ingredientes
        const data = response.map((item) => item.totalCantidad); // Cantidad total usada

        // Actualizamos el estado de chartData para los gráficos
        setChartData({
          labels,
          datasets: [
            {
              label: 'Cantidad Usada',
              data,
              backgroundColor: 'rgba(75, 192, 192, 0.6)',
              borderColor: 'rgba(75, 192, 192, 1)',
              borderWidth: 1,
            },
          ],
        });
      } catch (error) {
        console.error('Error al cargar datos del gráfico:', error);
        setChartData(null); // Asegúrate de que el gráfico no intente renderizar sin datos
      } finally {
        setLoading(false); // Finaliza el estado de carga
      }
    };

    fetchData(); // Llama a la función para obtener los datos
  }, [period]); // Se ejecuta cada vez que cambia el 'period'

  // Configuración del gráfico
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Ranking de Ingredientes Más Usados',
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'Cantidad Usada',
        },
        ticks: {
          // Aquí agregamos más configuraciones para el eje Y
          stepSize: 20, // Ajusta el tamaño de los pasos del eje Y
          min: 0, // Asegúrate de que comience en 0
        },
      },
      x: {
        title: {
          display: true,
          text: 'Ingredientes',
        },
      },
    },
  };

  return (
    <div className="flex flex-col items-center">
      <h2 className="text-xl font-semibold mb-4">Ranking de Ingredientes Más Usados</h2>

      {/* Botones para seleccionar el periodo */}
      <div className="flex space-x-4 mb-4">
        <button
          className={`px-4 py-2 rounded ${period === 'diario' ? 'bg-green-500 text-white' : 'bg-gray-200 text-black'}`}
          onClick={() => setPeriod('diario')}
        >
          Diario
        </button>
        <button
          className={`px-4 py-2 rounded ${period === 'semanal' ? 'bg-green-500 text-white' : 'bg-gray-200 text-black'}`}
          onClick={() => setPeriod('semanal')}
        >
          Semanal
        </button>
        <button
          className={`px-4 py-2 rounded ${period === 'mensual' ? 'bg-green-500 text-white' : 'bg-gray-200 text-black'}`}
          onClick={() => setPeriod('mensual')}
        >
          Mensual
        </button>
      </div>

      {/* Mostrar el gráfico o un mensaje de carga */}
      {loading ? (
        <p>Cargando datos...</p>
      ) : chartData ? (
        <div className="w-full max-w-2xl">
          <Bar data={chartData} options={options} />
        </div>
      ) : (
        <p>Error al cargar datos del gráfico</p>
      )}
    </div>
  );
};

export default RankingIngredientes;
