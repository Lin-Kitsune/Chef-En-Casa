import React, { useState, useEffect } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS,
   Title, 
   Tooltip, 
   Legend, 
   BarElement, 
   CategoryScale, 
   LinearScale } from 'chart.js';
import { getUsuariosActivos } from '../../services/gestionService';

// Registro de los componentes de Chart.js
ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale);

const UsuariosActivos = ({ rango }) => {
  const [usuariosActivosData, setUsuariosActivosData] = useState(null);

  useEffect(() => {
    // Obtener la cantidad de usuarios activos según el rango
    const fetchUsuariosActivos = async () => {
      try {
        const response = await getUsuariosActivos(rango); // Obtén los datos desde el servicio
        setUsuariosActivosData(response.usuariosActivos); // Guarda la cantidad de usuarios activos
      } catch (error) {
        console.error("Error al obtener usuarios activos:", error);
      }
    };

    fetchUsuariosActivos(); // Llama a la función para obtener los datos
  }, [rango]); // Se vuelve a ejecutar cada vez que el rango cambia

  // Si no hay datos, muestra un mensaje de carga
  if (usuariosActivosData === null) {
    return <p>Cargando gráfico...</p>;
  }

  // Definir los datos para el gráfico de barras
  const data = {
    labels: ['Usuarios Activos'], // El eje X tiene solo una categoría: 'Usuarios Activos'
    datasets: [
      {
        label: 'Cantidad de Usuarios Activos',
        data: [usuariosActivosData], // El número de usuarios activos
        backgroundColor: '#00a651', // Color de la barra
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

export default UsuariosActivos;
