import React, { useState, useEffect } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS,
   Title, 
   Tooltip, 
   Legend, 
   BarElement, 
   CategoryScale, 
   LinearScale } from 'chart.js';
import { getRecetasMejorValoradas } from '../../services/gestionService';

// Registro de los componentes de Chart.js
ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale);

const RecetasValoradas = ({ rango }) => {
  const [recetasData, setRecetasData] = useState(null); // Estado para almacenar los datos de las recetas
  const [loading, setLoading] = useState(true); // Estado para el indicador de carga

  useEffect(() => {
    const fetchRecetas = async () => {
      try {
        setLoading(true); // Inicia la carga
        const response = await getRecetasMejorValoradas(rango); // Llama a la API para obtener las recetas
        setRecetasData(response); // Guarda los datos obtenidos
      } catch (error) {
        console.error('Error al obtener las recetas mejor valoradas:', error);
      } finally {
        setLoading(false); // Finaliza la carga
      }
    };

    fetchRecetas(); // Llama a la función al montar el componente
  }, [rango]); // Vuelve a ejecutar cuando el rango cambia

  if (loading) {
    return <p>Cargando gráfico de recetas mejor valoradas...</p>;
  }

  if (!recetasData || recetasData.length === 0) {
    return <p>No hay recetas mejor valoradas para este rango.</p>;
  }

  // Datos para el gráfico de barras
  const data = {
    labels: recetasData.map((receta) => receta.nombre), // Nombre de las recetas
    datasets: [
      {
        label: 'Valoración Promedio', // Título del dataset
        data: recetasData.map((receta) => receta.promedioValoracion), // Promedio de valoraciones por receta
        backgroundColor: 'rgba(0, 166, 81, 0.2)', // Color de fondo de las barras
        borderColor: 'rgba(0, 166, 81, 1)', // Color del borde de las barras
        borderWidth: 1, // Grosor del borde
      },
    ],
  };

  // Opciones del gráfico
  const options = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: 'Recetas Mejor Valoradas', // Título del gráfico
      },
    },
    scales: {
      y: {
        beginAtZero: true, // Asegura que el eje Y comienza en 0
        ticks: {
          stepSize: 1, // Solo números enteros
        },
      },
    },
  };

  return (
    <div className="grafico-container" style={{ width: '80%', margin: '0 auto' }}>
      <Bar data={data} options={options} />
    </div>
  );
};

export default RecetasValoradas;