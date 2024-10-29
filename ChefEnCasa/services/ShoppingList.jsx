import axios from 'axios';
import { getToken } from './auth';  // Importamos la función para obtener el token

const API_URL = 'http://10.0.2.2:4000';

// Obtener la lista de compras
export const fetchShoppingList = async () => {
  try {
    const token = await getToken();
    const response = await axios.get(`${API_URL}/lista-de-compras`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    throw new Error('Error al obtener la lista de compras');
  }
};

// Marcar ingrediente como comprado
export const markAsBought = async (nombreIngrediente) => {
  try {
    const token = await getToken();
    const response = await axios.put(
      `${API_URL}/lista-de-compras/marcar-comprado`,
      { nombreIngrediente, comprado: true },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    throw new Error('Error al marcar ingrediente como comprado');
  }
};

// Eliminar ingrediente de la lista de compras
export const deleteIngredientFromShoppingList = async (nombreIngrediente) => {
  try {
    const token = await getToken();
    const response = await axios.delete(`${API_URL}/lista-de-compras/eliminar-ingrediente`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      data: {
        nombreIngrediente,
      },
    });
    return response.data;
  } catch (error) {
    throw new Error('Error al eliminar ingrediente de la lista de compras');
  }
};

// Marcar toda la lista como comprada
export const markAllAsBought = async () => {
  try {
    const token = await getToken();
    const response = await axios.put(`${API_URL}/lista-de-compras/marcar-comprado`, null, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    throw new Error('Error al marcar toda la lista de compras como comprada');
  }
};

// Eliminar toda la lista de compras
export const deleteShoppingList = async () => {
  try {
    const token = await getToken();
    const response = await axios.delete(`${API_URL}/lista-de-compras/eliminar-toda`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    throw new Error('Error al eliminar la lista de compras');
  }
};
