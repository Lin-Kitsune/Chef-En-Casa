import React, { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { getRecetasGuardadas } from '../../services/gestionService'; // Asegúrate de importar el servicio

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

  // Si no hay recetas guardadas, muestra un mensaje
  if (!recetasGuardadasData || recetasGuardadasData.length === 0) {
    return <p>No hay Recetas Guardadas en este rango.</p>;
  }

  // Procesar los datos para el gráfico
  const data = recetasGuardadasData.map(receta => ({
    name: receta.title, // Nombre de la receta
    count: receta.count, // Número de veces que fue guardada
  }));

  // Configuración de las opciones del gráfico
  return (
    <ResponsiveContainer width="100%" height={400}>
      <BarChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis
          dataKey="name" // Usamos el nombre de la receta como key
          axisLine={false} // Eliminamos la línea del eje X
          tickLine={false} // Eliminamos las líneas de los ticks del eje X
        />
        <YAxis />
        <Tooltip formatter={(value, name) => `Recetas Guardadas: ${value}`} />
        <Legend />
        <Bar dataKey="count" fill="#00a651" />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default RecetasGuardadas;