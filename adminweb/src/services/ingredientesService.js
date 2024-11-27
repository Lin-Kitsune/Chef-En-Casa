import axios from 'axios';
import { getToken } from './authService';

const API_URL = 'http://localhost:4000/api/admin/ingredientes';

export const getAllIngredientes = async () => {
  try {
    const token = await getToken();
    const response = await axios.get(`${API_URL}`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    return response.data;
  } catch (error) {
    console.error('Error al obtener ingredientes:', error.response || error.message);
    throw error;
  }
};

export const createIngrediente = async (ingredienteData) => {
  try {
    const token = await getToken();
    const formData = new FormData();
    formData.append('nombre', ingredienteData.nombre);

    if (ingredienteData.imagen) {
      formData.append('imagen', ingredienteData.imagen);
    }

    const response = await axios.post(`${API_URL}`, formData, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'multipart/form-data',
      },
    });

    const { notificacion } = response.data;

    if (notificacion) {
      alert(`Notificación: ${notificacion.mensaje}`);
    }

    return response.data;
  } catch (error) {
    console.error('Error al agregar ingrediente:', error.response || error.message);
    throw error;
  }
};

export const updateIngrediente = async (id, ingredienteData) => {
  try {
    const token = await getToken();
    const formData = new FormData();
    formData.append('nombre', ingredienteData.nombre);
    if (ingredienteData.imagen) {
      formData.append('imagen', ingredienteData.imagen);
    }

    const response = await axios.put(`${API_URL}/${id}`, formData, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'multipart/form-data'
      }
    });

    return response.data;
  } catch (error) {
    console.error('Error al actualizar ingrediente:', error.response || error.message);
    throw error;
  }
};

export const deleteIngrediente = async (id) => {
  try {
    const token = await getToken();
    const response = await axios.delete(`${API_URL}/${id}`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    return response.data;
  } catch (error) {
    console.error('Error al eliminar ingrediente:', error.response || error.message);
    throw error;
  }
};
