import axios from 'axios';
import { getToken } from './auth';  // Importamos la función para obtener el token

const API_URL = 'http://10.0.2.2:4000'; // Cambia esto según corresponda

// Obtener los ingredientes del almacén
export const fetchAlmacen = async () => {
  try {
    const token = await getToken();
    const response = await axios.get(`${API_URL}/almacen`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    throw new Error('Error al obtener el almacén');
  }
};

// Agregar ingredientes al almacén
export const addIngredientsToAlmacen = async (ingredientes) => {
  try {
    const token = await getToken();
    const response = await axios.post(
      `${API_URL}/almacen/registro`,
      { ingredientes },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error('Error al agregar ingredientes al almacén:', error.response ? error.response.data : error.message);
    throw new Error('Error al agregar ingredientes al almacén');
  }
};

// Función para reducir cantidad de ingrediente
export const reduceIngredientFromAlmacen = async (nombreIngrediente, cantidadReducir) => {
    const token = await getToken(); // Autenticar al usuario con JWT
    return axios.put(`${API_URL}/almacen/reducir`, {
      nombreIngrediente,
      cantidadReducir
    }, {
      headers: { Authorization: `Bearer ${token}` }
    });
  };
  
  // Función para aumentar cantidad de ingrediente
  export const increaseIngredientInAlmacen = async (nombreIngrediente, cantidadAumentar) => {
    const token = await getToken(); // Autenticar al usuario con JWT
    return axios.put(`${API_URL}/almacen/aumentar`, {
      nombreIngrediente,
      cantidadAumentar
    }, {
      headers: { Authorization: `Bearer ${token}` }
    });
  };

// Eliminar ingrediente del almacén
export const deleteIngredientFromAlmacen = async (nombreIngrediente) => {
  try {
    const token = await getToken();
    const response = await axios.delete(`${API_URL}/almacen/eliminar`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      data: {
        nombreIngrediente,
      },
    });
    return response.data;
  } catch (error) {
    throw new Error('Error al eliminar ingrediente del almacén');
  }
};

export const eliminarIngrediente = async (nombreIngrediente) => {
  try {
    const token = await getToken();  // Obtener el token del usuario
    const response = await axios.delete(`${API_URL}/almacen/eliminar`, {
      headers: { Authorization: `Bearer ${token}` },
      data: { nombreIngrediente }
    });
    return response.data;
  } catch (error) {
    throw new Error('Error al eliminar el ingrediente');
  }
};
