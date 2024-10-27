import axios from 'axios';
import { getToken } from './authService';

const API_URL = 'http://localhost:4000/api/admin';

// Obtener todos los reclamos sin simulación
export const getAllReclamos = async () => {
    try {
      const token = await getToken();
      console.log("Token obtenido en el frontend:", token); // <-- Imprime el token para ver si es válido
      const response = await axios.get(`${API_URL}/reclamos`, {
        headers: {
          Authorization: `Bearer ${token}`,
        }
      });
      return response.data;
    } catch (error) {
      if (error.response) {
        console.error('Error en la respuesta del servidor:', error.response.status, error.response.data);
      } else {
        console.error('Error en la solicitud:', error.message);
      }
      throw error;
    }
};

// Actualizar reclamo
export const updateReclamo = async (id, estado, respuesta) => {
  try {
    const token = await getToken();
    const response = await axios.put(
      `${API_URL}/reclamos/${id}`,
      { estado, respuesta },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    console.log("Reclamo actualizado:", response.data); // Confirmar actualización
    return response.data;
  } catch (error) {
    console.error('Error updating reclamo:', error.response || error.message);
    throw error;
  }
};
