import axios from 'axios';
import { getToken } from './authService';

const API_URL = 'http://localhost:4000/api/admin/categorias';

// Obtener todas las categorías
export const getAllCategorias = async () => {
  try {
    const token = await getToken();
    const response = await axios.get(API_URL, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    console.error('Error al obtener categorías:', error.response || error.message);
    throw error;
  }
};

// Crear una nueva categoría
export const createCategoria = async (nombre) => {
  try {
    const token = await getToken();
    const response = await axios.post(API_URL, { nombre }, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    console.error('Error al agregar categoría:', error.response || error.message);
    throw error;
  }
};
