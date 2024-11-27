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
    const token = await getToken(); // Obtener el token
    const formData = new FormData();

    // Construir los datos para enviar al backend
    Object.entries(recetaData).forEach(([key, value]) => {
      if (['ingredientes', 'paso', 'dishTypes', 'nutrition'].includes(key)) {
        formData.append(key, JSON.stringify(value)); // Serializar arrays u objetos
      } else if (key === 'imagen' && value instanceof File) {
        formData.append(key, value); // Archivo de imagen
      } else if (value !== undefined && value !== null) {
        formData.append(key, value); // Otros valores simples
      }
    });

    // Realizar la solicitud POST al backend
    const response = await axios.post(`${API_URL}`, formData, {
      headers: {
        Authorization: `Bearer ${token}`, // Autorización con token
        'Content-Type': 'multipart/form-data', // Multipart para incluir archivos
      },
    });

    console.log('Receta creada con éxito:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error al crear receta:', error.response?.data || error.message);
    throw error;
  }
};

// Actualizar receta
export const updateReceta = async (id, recetaData) => {
  try {
    const token = await getToken(); // Obtener token
    const formData = new FormData();

    // Validar y preparar datos antes de enviarlos
    formData.append('titulo', recetaData.titulo || ''); // Valor por defecto si falta
    formData.append('duracion', recetaData.duracion || 0);
    formData.append('porciones', recetaData.porciones || 0);
    formData.append('valoracion', recetaData.valoracion || 0);
    formData.append('ingredientes', JSON.stringify(recetaData.ingredientes || []));
    formData.append('paso', JSON.stringify(recetaData.paso || []));
    formData.append('dishTypes', JSON.stringify(recetaData.dishTypes || []));
    formData.append('nutrition', JSON.stringify(recetaData.nutrition || {}));

    // Adjuntar imagen si es un archivo nuevo
    if (recetaData.imagen instanceof File) {
      formData.append('imagen', recetaData.imagen);
    } else if (recetaData.imagenAnterior) {
      // Si no se actualiza la imagen, enviar referencia de la anterior
      formData.append('imagenAnterior', recetaData.imagenAnterior);
    }

    // Solicitud PUT al backend
    const response = await axios.put(`${API_URL}/${id}`, formData, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'multipart/form-data',
      },
    });

    return response.data;
  } catch (error) {
    console.error('Error al actualizar receta:', error.response?.data || error.message);
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
