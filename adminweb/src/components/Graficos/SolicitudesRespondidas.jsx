import React, { useState, useEffect } from 'react';
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts'; // Importamos componentes de Recharts
import { getSolicitudesRespondidas } from '../../services/gestionService'; // Importamos la función para obtener las solicitudes respondidas

const SolicitudesRespondidas = ({ rango }) => {
  const [data, setData] = useState([]); // Datos para el gráfico
  const [loading, setLoading] = useState(true); // Estado de carga

  useEffect(() => {
    const fetchSolicitudes = async () => {
      try {
        const response = await getSolicitudesRespondidas(rango); // Llamamos al servicio
        // Preparamos los datos para el gráfico
        setData([
          { name: 'Solicitudes', value: response.solicitudes },
          { name: 'Reclamos', value: response.reclamos },
          { name: 'Sugerencias', value: response.sugerencias },
          { name: 'Nutricionistas', value: response.nutricionistas }
        ]);
      } catch (error) {
        console.error('Error al obtener las solicitudes respondidas:', error);
      } finally {
        setLoading(false); // Cuando la carga termine
      }
    };

    fetchSolicitudes(); // Ejecutar la función para obtener las solicitudes respondidas
  }, [rango]); // Se ejecuta cuando cambia el rango

  if (loading) {
    return <p>Cargando gráfico...</p>; // Mensaje de carga
  }

  // Colores para cada sección del gráfico
  const COLORS = ['#00a651', '#FF8042', '#0088FE', '#FFBB28'];

  return (
    <div>
      <h2>Solicitudes Respondidas</h2>
      <ResponsiveContainer width="100%" height={400}>
        <PieChart>
          <Pie
            data={data} // Los datos del gráfico
            dataKey="value" // Especificamos qué campo usar para los valores
            nameKey="name" // Especificamos qué campo usar para los nombres
            outerRadius={150} // Radio del gráfico
            fill="#8884d8" // Color predeterminado
            labelLine={false}
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip /> {/* Muestra el tooltip al pasar el mouse */}
          <Legend /> {/* Muestra la leyenda */}
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default SolicitudesRespondidas;