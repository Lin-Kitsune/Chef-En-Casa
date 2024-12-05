import React, { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { getUsuariosActivos } from '../../services/gestionService';

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
  const data = [
    {
      name: 'Usuarios Activos', // Etiqueta para el gráfico
      usuarios: usuariosActivosData, // Número de usuarios activos
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

export default UsuariosActivos;
