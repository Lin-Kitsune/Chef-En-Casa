import axios from 'axios';
import { getToken } from './authService';

const API_URL = 'http://localhost:4000/api/admin/recetas';

// Obtener todas las recetas
export const getAllRecetas = async () => {
  try {
    const token = await getToken();
    const response = await axios.get(API_URL, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    console.error('Error al obtener recetas:', error.response || error.message);
    throw error;
  }
};

// Crear una receta
export const createReceta = async (recetaData) => {
  try {
    const token = await getToken();
    const response = await axios.post(API_URL, recetaData, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'multipart/form-data', // Asegúrate de tener este encabezado
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error al crear receta:', error.response?.data || error.message);
    throw error;
  }
};


// Actualizar una receta
// recetaService.js
export const updateReceta = async (id, formData) => {
  try {
    const token = await getToken();
    const response = await axios.put(`${API_URL}/${id}`, formData, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error al actualizar receta:', error.response || error.message);
    throw error;
  }
};


// Eliminar una receta
export const deleteReceta = async (id) => {
  try {
    const token = await getToken();
    const response = await axios.delete(`${API_URL}/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    console.error('Error al eliminar receta:', error.response || error.message);
    throw error;
  }
};

// Obtener una receta por su ID
export const getRecetaById = async (id) => {
  try {
    const token = await getToken();
    const response = await axios.get(`${API_URL}/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    console.error('Error al obtener receta:', error.response || error.message);
    throw error;
  }
};
