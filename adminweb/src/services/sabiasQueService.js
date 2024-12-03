import axios from 'axios';
import { getToken } from './authService';

const API_URL = 'http://localhost:4000/api/admin/sabias-que';

// Obtener todos los Sabías Que
export const getAllSabiasQue = async () => {
  try {
    const token = await getToken();
    const response = await axios.get(API_URL, {
      headers: { Authorization: `Bearer ${token}` },
    });

    // Asegúrate de revisar la estructura de la respuesta
    console.log('Sabías Que obtenidos:', response.data);
    return response.data.sabiasQue;  // Asegúrate de devolver solo los datos de los Sabías Que
  } catch (error) {
    console.error('Error al obtener Sabías Que:', error.response || error.message);
    throw error;
  }
};

// Crear un nuevo Sabías Que
export const createSabiasQue = async (sabiasQue) => {
    try {
        const token = await getToken();
        const formData = new FormData();
        formData.append('titulo', sabiasQue.titulo);
        formData.append('descripcion', sabiasQue.descripcion);
        formData.append('beneficio', sabiasQue.beneficio);
        
        if (sabiasQue.imagen) {
            formData.append('imagen', sabiasQue.imagen);
        }
        
        const response = await axios.post(API_URL, formData, {
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'multipart/form-data',
            },
        });

        return response.data;  // Asegúrate de que la API responda con el objeto completo
    } catch (error) {
        console.error('Error al crear Sabías Que:', error);
        throw error;  // Propagar el error para que sea manejado por el componente
    }
};

// Actualizar un Sabías Que por ID
export const updateSabiasQue = async (id, sabiasQue) => {
    try {
      const token = await getToken();
      const formData = new FormData();
      formData.append('titulo', sabiasQue.titulo);
      formData.append('descripcion', sabiasQue.descripcion);
      formData.append('beneficio', sabiasQue.beneficio);
      if (sabiasQue.imagen) {
        formData.append('imagen', sabiasQue.imagen);
      }
  
      const response = await axios.put(`${API_URL}/${id}`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      });
      return response.data;
    } catch (error) {
      console.error('Error al actualizar Sabías Que:', error);
      throw error;
    }
  };

// Eliminar un Sabías Que por ID
export const deleteSabiasQue = async (id) => {
  try {
    const token = await getToken();
    const response = await axios.delete(`${API_URL}/sabias-que/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    console.error('Error al eliminar Sabías Que:', error.response?.data || error.message);
    throw error;  // Propaga el error para manejarlo en el frontend
  }
};

