import React, { useState, useEffect } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale } from 'chart.js';
import { getUsuariosNuevos } from '../../services/gestionService'; // Asegúrate de importar el servicio de usuarios nuevos

// Registro de los componentes de Chart.js
ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale);

const NuevosUsuarios = ({ rango }) => {
  const [nuevosUsuariosData, setNuevosUsuariosData] = useState(null);

  useEffect(() => {
    // Obtener la cantidad de usuarios nuevos según el rango
    const fetchNuevosUsuarios = async () => {
      try {
        const response = await getUsuariosNuevos(); // Obtén los datos desde el servicio
        setNuevosUsuariosData(response.usuariosNuevos); // Guarda la cantidad de usuarios nuevos
      } catch (error) {
        console.error("Error al obtener nuevos usuarios:", error);
      }
    };

    fetchNuevosUsuarios(); // Llama a la función para obtener los datos
  }, [rango]); // Se vuelve a ejecutar cada vez que el rango cambia

  // Si no hay datos, muestra un mensaje de carga
  if (nuevosUsuariosData === null) {
    return <p>Cargando gráfico...</p>;
  }

  // Definir los datos para el gráfico de barras
  const data = {
    labels: ['Usuarios Nuevos'], // El eje X tiene solo una categoría: 'Usuarios Nuevos'
    datasets: [
      {
        label: 'Cantidad de Usuarios Nuevos',
        data: [nuevosUsuariosData], // El número de nuevos usuarios
        backgroundColor: '#00a651', // Color de la barra (verde)
      },
    ],
  };

  // Opciones del gráfico
  const options = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: 'Usuarios Activos', // Título del gráfico
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

  return <Bar data={data} options={options} />;
};

export default NuevosUsuarios;