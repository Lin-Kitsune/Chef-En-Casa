import React, { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { getUsuariosNuevos } from '../../services/gestionService'; // Asegúrate de importar el servicio de usuarios nuevos

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
  const data = [
    {
      name: 'Usuarios Nuevos', // Etiqueta para el gráfico
      usuarios: nuevosUsuariosData, // Número de usuarios nuevos
    },
  ];

  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="usuarios" fill="#00a651" />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default NuevosUsuarios;
