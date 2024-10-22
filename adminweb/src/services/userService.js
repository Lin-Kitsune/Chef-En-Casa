import axios from 'axios';
import { getToken } from './authService';

const API_URL = 'http://localhost:4000';

// Obtener todos los usuarios
export const getAllUsers = async () => {
    try {
      const response = await axios.get(`${API_URL}/api/admin/usuarios`);  // Ruta debe coincidir con la definida en el backend
      return response.data;
    } catch (error) {
      console.error('Error fetching users:', error);
      throw error;
    }
  };

// Crear usuario
export const createUser = async (userData) => {
    const token = getToken();
    const response = await axios.post(`${API_URL}/admin/usuarios`, userData, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
    return response.data;
};

// Actualizar usuario
export const updateUser = async (id, userData) => {
    const token = await getToken();
    const response = await axios.put(`http://localhost:4000/admin/usuarios/${id}`, userData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  };  

// Eliminar usuario
export const deleteUser = async (id) => {
    const token = getToken();
    const response = await axios.delete(`${API_URL}/admin/usuarios/${id}`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
    return response.data;
};

// Obtener estadísticas generales
export const getStatistics = async () => {
    const token = getToken();
    const response = await axios.get(`${API_URL}/admin/estadisticas`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
    return response.data;
};
