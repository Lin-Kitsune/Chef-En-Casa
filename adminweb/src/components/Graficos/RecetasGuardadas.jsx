import React, { useState, useEffect } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS,
   Title, 
   Tooltip, 
   Legend, 
   BarElement, 
   CategoryScale, 
   LinearScale } from 'chart.js';
import { getRecetasGuardadas } from '../../services/gestionService';

// Registro de los componentes de Chart.js
ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale);

const RecetasGuardadas = ({ rango }) => {
  const [recetasGuardadasData, setRecetasGuardadasData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getRecetasGuardadas(rango); // Llama a la función que obtiene las recetas guardadas
        setRecetasGuardadasData(data); // Setea los datos obtenidos en el estado
      } catch (error) {
        console.error('Error al obtener las recetas guardadas:', error);
      }
    };
    fetchData();
  }, [rango]);

  // Procesar los datos para el gráfico (ajustar según tu respuesta de la API)
  const chartData = {
    labels: recetasGuardadasData.map(receta => receta.title), // Etiquetas con los nombres de las recetas
    datasets: [
      {
        label: 'Recetas Guardadas',
        data: recetasGuardadasData.map(receta => receta.count), // Aquí asumo que 'count' es el número de veces que la receta fue guardada
        backgroundColor: '#00a651', // Color de las barras
      },
    ],
  };

  // Opciones del gráfico
  const options = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: 'Recetas Guardadas', // Título del gráfico
      },
    },
    scales: {
      y: {
        beginAtZero: true, // Asegura que el eje Y comienza en 0
        ticks: {
          stepSize: 1,  // Solo números enteros
          max: 20,      // Establece el valor máximo en 20
        },
      },
    },
  };

  return (
    <div className="grafico-container" style={{ width: '50%', margin: '0 auto' }}>
      <Bar data={chartData} options={options} width={400} height={250} /> {/* Ajusta el tamaño */}
    </div>
  );
};

export default RecetasGuardadas;