import axios from 'axios';
import { getToken } from './auth';  // Importamos la función para obtener el token

const API_URL = 'http://10.0.2.2:4000';

// Valorar una receta
export const rateRecipe = async (recipeId, valoracion) => {
  try {
    const token = await getToken();
    const response = await axios.post(
      `${API_URL}/receta/valorar`,
      { recipeId, valoracion },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    throw new Error('Error al valorar la receta');
  }
};
