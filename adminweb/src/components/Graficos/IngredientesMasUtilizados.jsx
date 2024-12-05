import React, { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { getIngredientesMasUtilizados } from '../../services/gestionService';

const IngredientesMasUtilizados = ({ rango }) => {
  const [ingredientesData, setIngredientesData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchIngredientes = async () => {
      try {
        const data = await getIngredientesMasUtilizados(rango); // Llamada al servicio
        setIngredientesData(data); // Establecer los datos
      } catch (error) {
        console.error('Error al obtener los ingredientes más utilizados:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchIngredientes();
  }, [rango]);

  // Si no hay datos, mostrar mensaje de carga o error
  if (loading) {
    return <p>Cargando gráfico...</p>;
  }

  if (!ingredientesData || ingredientesData.length === 0) {
    return <p>No hay ingredientes más utilizados en este rango.</p>;
  }

  // Datos para el gráfico de barras
  const data = ingredientesData.map((item) => ({
    name: item.nombre, // Nombre del ingrediente
    cantidad: item.cantidad, // Cantidad utilizada
  }));

  // Función personalizada para mostrar el tooltip
  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const { name, cantidad } = payload[0].payload;
      return (
        <div className="custom-tooltip">
          <p className="label">{`Ingrediente: ${name}`}</p>
          <p className="desc">{`Cantidad utilizada: ${cantidad}`}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <ResponsiveContainer width="100%" height={400}>
      <BarChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip content={<CustomTooltip />} />
        <Legend />
        <Bar dataKey="cantidad" fill="#00a651" />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default IngredientesMasUtilizados;