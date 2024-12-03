import { useState, useEffect } from 'react';
import { getIngredientesMasUtilizados } from '../../services/gestionService';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js';

// Registro de los componentes de Chart.js
ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale);

const IngredientesMasUtilizados = ({ rango }) => {
  const [ingredientesData, setIngredientesData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchIngredientes = async () => {
      try {
        const data = await getIngredientesMasUtilizados(rango); // Llamada al servicio
        setIngredientesData(data); // Establecer los datos
      } catch (error) {
        console.error('Error al obtener los ingredientes más utilizados:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchIngredientes();
  }, [rango]);

  // Configuración de los datos del gráfico
  const data = {
    labels: ingredientesData.map(item => item.nombre), // Nombres de los ingredientes
    datasets: [
      {
        label: 'Cantidad Utilizada',
        data: ingredientesData.map(item => item.cantidad), // Cantidad utilizada
        backgroundColor: 'rgba(75, 192, 192, 0.2)', // Color de las barras
        borderColor: 'rgba(75, 192, 192, 1)', // Color de borde
        borderWidth: 1,
      },
    ],
  };

  // Opciones del gráfico
  const options = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: 'Ingredientes Más Utilizados', // Título del gráfico
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          stepSize: 1,  // Solo números enteros
        },
      },
    },
  };

  return (
    <div className="grafico-container" style={{ width: '50%', margin: '0 auto' }}>
      {loading ? (
        <p>Cargando datos...</p>
      ) : ingredientesData.length === 0 ? (
        <p>No hay ingredientes utilizados en este rango.</p>
      ) : (
        <Bar data={data} options={options} width={400} height={250} />
      )}
    </div>
  );
};

export default IngredientesMasUtilizados;