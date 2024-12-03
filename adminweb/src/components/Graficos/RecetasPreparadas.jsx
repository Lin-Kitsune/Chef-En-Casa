// components/Graficos/RecetasPreparadas.js
import React, { useState, useEffect } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

import { getRecetasPreparadas } from '../../services/gestionService';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const RecetasPreparadas = ({ rango }) => {
  const [recetasData, setRecetasData] = useState(null);

  useEffect(() => {
    const fetchRecetas = async () => {
      try {
        const response = await getRecetasPreparadas(rango); // Llamada a la API con el rango
        setRecetasData(response.recetas); // Guarda las recetas
      } catch (error) {
        console.error("Error al obtener recetas preparadas:", error); // Imprime error
      }
    };

    fetchRecetas(); // Llamada a la función al montarse el componente
  }, [rango]); // Se ejecuta cada vez que el rango cambia

  if (recetasData === null) {
    return <p>Cargando gráfico...</p>;
  }

  // Definir los datos para el gráfico
  const data = {
    labels: recetasData.map((receta) => receta._id), // Utilizar el nombre de la receta como etiquetas
    datasets: [
      {
        label: 'Recetas Preparadas',
        data: recetasData.map((receta) => receta.cantidad), // Utilizar la cantidad de recetas preparadas
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
        text: 'Recetas Preparadas', // Título del gráfico
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
      <Bar data={data} options={options} width={400} height={250} /> {/* Ajusta el tamaño */}
    </div>
  );
};

export default RecetasPreparadas;
