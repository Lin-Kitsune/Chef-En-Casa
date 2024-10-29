import axios from 'axios';
import { getToken } from './auth';  // Importamos la función para obtener el token

const API_URL = 'http://10.0.2.2:4000';

// Compartir receta por WhatsApp
export const shareRecipe = async (recipeId) => {
  try {
    const token = await getToken();
    const response = await axios.get(`${API_URL}/receta/compartir/${recipeId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data.link;  // Devuelve el enlace para compartir
  } catch (error) {
    throw new Error('Error al generar el enlace para compartir');
  }
};
