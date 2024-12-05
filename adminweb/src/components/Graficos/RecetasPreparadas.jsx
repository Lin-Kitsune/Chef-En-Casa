import React, { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { getRecetasPreparadas } from '../../services/gestionService'; // Asegúrate de importar el servicio de recetas preparadas

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

  // Definir los datos para el gráfico de barras
  const data = recetasData.map((receta) => ({
    name: receta._id, // Etiqueta interna, que no se mostrará en el eje X
    cantidad: receta.cantidad, // Cantidad de recetas preparadas
    recetaNombre: receta.nombre, // El nombre de la receta
  }));

  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" hide /> {/* Se oculta el eje X */}
        <YAxis />
        <Tooltip 
          formatter={(value, name, props) => (
            <>
              <p><strong>{props.payload.recetaNombre}</strong></p> {/* Nombre de la receta */}
              <p>{value} recetas preparadas</p> {/* Cantidad de recetas */}
            </>
          )}
        />
        <Legend />
        <Bar dataKey="cantidad" fill="#00a651" />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default RecetasPreparadas;
