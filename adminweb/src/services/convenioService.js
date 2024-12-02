import axios from 'axios';
import { getToken } from './authService';

const API_URL = 'http://localhost:4000/api/admin/convenios';

// Obtener todos los convenios
export const getAllConvenios = async () => {
  try {
    const token = await getToken();
    console.log('Llamando a API con token:', token);
    const response = await axios.get(API_URL, {
      headers: { Authorization: `Bearer ${token}` },
    });
    console.log('Respuesta de la API:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error al obtener convenios:', error.response || error.message);
    throw error;
  }
};


// Crear un nuevo convenio
export const createConvenio = async (convenio) => {
  try {
    const token = await getToken();
    const formData = new FormData();
    formData.append('empresa', convenio.empresa);
    formData.append('producto', convenio.producto);
    formData.append('descripcion', convenio.descripcion);
    formData.append('precio', convenio.precio); // Agregar el precio aquí
    if (convenio.imagenProducto) {
      formData.append('imagen', convenio.imagenProducto); // Agrega la imagen si existe
    }

    const response = await axios.post(API_URL, formData, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error al crear convenio:', error.response || error.message);
    throw error;
  }
};


// Actualizar un convenio por ID
export const updateConvenio = async (id, updatedConvenio) => {
  try {
    const token = await getToken();
    const formData = new FormData();
    formData.append('empresa', updatedConvenio.empresa);
    formData.append('producto', updatedConvenio.producto);
    formData.append('descripcion', updatedConvenio.descripcion);
    formData.append('precio', updatedConvenio.precio); // Agregar el precio aquí
    if (updatedConvenio.imagenProducto) {
      formData.append('imagen', updatedConvenio.imagenProducto);
    }

    formData.forEach((value, key) => {
      console.log(`${key}: ${value}`); // Imprime los datos del FormData
    });

    const response = await axios.put(`${API_URL}/${id}`, formData, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error al actualizar convenio:', error.response || error.message);
    throw error;
  }
};

// Eliminar un convenio por ID
export const deleteConvenio = async (id) => {
  try {
    const token = await getToken();
    await axios.delete(`${API_URL}/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
  } catch (error) {
    console.error('Error al eliminar convenio:', error.response || error.message);
    throw error;
  }
};
