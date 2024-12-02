import axios from 'axios';
import { getToken } from './authService';

const API_URL = 'http://localhost:4000/api/admin/cupones';

// Obtener todos los cupones
export const getAllCupones = async () => {
  try {
    const token = await getToken();
    console.log('Llamando a API con token:', token);
    const response = await axios.get(API_URL, {
      headers: { Authorization: `Bearer ${token}` },
    });
    console.log('Respuesta de la API:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error al obtener cupones:', error.response || error.message);
    throw error;
  }
};

// Crear un nuevo cupón
export const createCupon = async (cupon) => {
  try {
    const token = await getToken();
    const response = await axios.post(API_URL, cupon, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });
    console.log('Cupón creado:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error al crear cupón:', error.response?.data || error.message);
    throw error;
  }
};

// Actualizar un cupón por ID
export const updateCupon = async (id, updatedCupon) => {
  try {
    const token = await getToken();
    const response = await axios.put(`${API_URL}/${id}`, updatedCupon, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });
    console.log('Cupón actualizado:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error al actualizar cupón:', error.response?.data || error.message);
    throw error;
  }
};

// Eliminar un cupón por ID
export const deleteCupon = async (id) => {
  try {
    const token = await getToken();
    const response = await axios.delete(`${API_URL}/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log('Cupón eliminado:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error al eliminar cupón:', error.response?.data || error.message);
    throw error;
  }
};