import React, { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { getRecetasMejorValoradas } from '../../services/gestionService';

const RecetasValoradas = ({ rango }) => {
  const [recetasData, setRecetasData] = useState(null);

  useEffect(() => {
    const fetchRecetas = async () => {
      try {
        const response = await getRecetasMejorValoradas(rango); // Llamada a la API con el rango
        // Preparamos los datos para el gráfico: solo necesitamos nombre y valoración promedio
        const dataForChart = response.map((receta) => ({
          nombre: receta.nombre,             // Nombre de la receta
          averageRating: receta.promedioValoracion // Promedio de valoración
        }));
        setRecetasData(dataForChart); // Guardamos los datos procesados para el gráfico
      } catch (error) {
        console.error("Error al obtener las recetas mejor valoradas:", error);
      }
    };

    fetchRecetas();
  }, [rango]);

  return (
    <div style={{ width: '100%', height: 400 }}>
      {recetasData ? (
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={recetasData}
            margin={{
              top: 20,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="nombre" />  {/* Usamos 'nombre' como clave en el eje X */}
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="averageRating" fill="#8884d8" /> {/* Promedio de valoración en el gráfico */}
          </BarChart>
        </ResponsiveContainer>
      ) : (
        <p>Cargando las mejores recetas valoradas...</p>
      )}
    </div>
  );
};

export default RecetasValoradas;
