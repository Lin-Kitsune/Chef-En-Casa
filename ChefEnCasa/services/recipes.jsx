import axios from 'axios';
import { getToken } from './auth';  // Importamos la función para obtener el token

const API_URL = 'http://10.0.2.2:4000';

// Obtener recetas
export const fetchRecipes = async (query = '', time = null, maxServings = null) => {
  try {
    const token = await getToken();
    const response = await axios.get(`${API_URL}/api/recetas`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params: { q: query, time, maxServings },
    });
    return response.data.results;
  } catch (error) {
    throw new Error('Error al obtener recetas');
  }
};

// Obtener detalles de una receta por ID
export const fetchRecipeDetails = async (recipeId) => {
  try {
    const token = await getToken();
    const response = await axios.get(`${API_URL}/receta/${recipeId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    throw new Error('Error al obtener detalles de la receta');
  }
};

// Guardar receta
export const saveRecipe = async (recipeId) => {
  try {
    const token = await getToken();
    const response = await axios.post(
      `${API_URL}/recetas/guardar`,
      { recipeId },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    throw new Error('Error al guardar la receta');
  }
};

// Eliminar receta guardada
export const deleteSavedRecipe = async (recipeId) => {
  try {
    const token = await getToken();
    const response = await axios.delete(`${API_URL}/receta/eliminar-guardada`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      data: {
        recipeId,
      },
    });
    return response.data;
  } catch (error) {
    throw new Error('Error al eliminar la receta guardada');
  }
};
