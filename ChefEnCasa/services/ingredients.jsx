import axios from 'axios';
import { getToken } from './auth';  // Importamos la función para obtener el token

const API_URL = 'http://10.0.2.2:4000'; // Cambia esto a localhost o 10.0.2.2

export const fetchIngredients = async () => {
  try {
    const token = await getToken();
    const response = await axios.get(`${API_URL}/ingredientes`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    console.log('Respuesta de la API de ingredientes:', response.data);

    if (!response.data || !response.data.results) {
      throw new Error('Formato de respuesta no válido');
    }

    return response.data.results;
  } catch (error) {
    console.error('Error al obtener los ingredientes:', error);
    throw new Error('Error al obtener los ingredientes');
  }
};

export const eliminarIngrediente = async (nombreIngrediente) => {
  try {
    const token = await getToken();  // Obtener el token del usuario
    const response = await axios.delete(`${API_URL}/almacen/eliminar`, {
      headers: { Authorization: `Bearer ${token}` },
      data: { nombreIngrediente }
    });
    return response.data;
  } catch (error) {
    throw new Error('Error al eliminar el ingrediente');
  }
};
