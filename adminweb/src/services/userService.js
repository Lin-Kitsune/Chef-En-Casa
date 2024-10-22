import axios from 'axios';
import { getToken } from './authService'; // Asegúrate de que esta función retorne una promesa si es async

const API_URL = 'http://localhost:4000'; // Reemplaza con la URL correcta del backend

// Obtener todos los usuarios
export const getAllUsers = async () => {
  try {
    const response = await axios.get(`${API_URL}/api/admin/usuarios`);
    return response.data;
  } catch (error) {
    console.error('Error fetching users:', error);
    throw error;
  }
};

// Crear usuario
export const createUser = async (userData) => {
  try {
    const token = await getToken();  // Asegúrate de usar await para obtener el token
    const response = await axios.post(`${API_URL}/api/admin/usuarios`, userData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error creating user:', error);
    throw error;
  }
};

// Actualizar usuario
export const updateUser = async (id, userData) => {
  try {
    const token = await getToken();  // Asegúrate de usar await aquí también
    const response = await axios.put(`${API_URL}/api/admin/usuarios/${id}`, userData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error updating user:', error);
    throw error;
  }
};

// Eliminar usuario
export const deleteUser = async (id) => {
  try {
    const token = await getToken();  // Usa await para obtener el token correctamente
    const response = await axios.delete(`${API_URL}/api/admin/usuarios/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`, // Asegúrate de que el token esté en formato 'Bearer'
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error deleting user:', error);
    throw error;
  }
};

// Obtener estadísticas generales
export const getStatistics = async () => {
  try {
    const token = await getToken();  // Usa await aquí también
    const response = await axios.get(`${API_URL}/api/admin/estadisticas`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching statistics:', error);
    throw error;
  }
};
