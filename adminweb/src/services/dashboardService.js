import axios from 'axios';
import { getToken } from './authService';

const API_URL = 'http://localhost:4000/api/admin';

// Obtener usuarios activos
export const getUsuariosActivos = async (rango = 'diario', mes = null, anio = null) => {
  try {
    const token = await getToken();
    const params = { rango, mes, anio };
    const response = await axios.get(`${API_URL}/usuarios-activos`, {
      headers: { Authorization: `Bearer ${token}` },
      params,
    });
    return response.data;
  } catch (error) {
    console.error('Error al obtener usuarios activos:', error.response?.data || error.message);
    throw error;
  }
};



// Obtener ingredientes más almacenados
export const getIngredientesMasAlmacenados = async (rango, mes = null, anio = null) => {
  try {
    const token = await getToken();
    const params = { rango, mes, anio };
    const response = await axios.get(`${API_URL}/ingredientes-mas-almacenados`, {
      headers: { Authorization: `Bearer ${token}` },
      params,
    });
    return response.data;
  } catch (error) {
    console.error('Error al obtener ingredientes más almacenados:', error.response?.data || error.message);
    throw error;
  }
};

// Obtener ingredientes más usados
// Obtener ingredientes más usados
export const getIngredientesMasUsados = async (rango, mes = null, anio = null) => {
  try {
    const token = await getToken();
    const params = { rango, mes, anio }; // Parámetros de consulta
    const response = await axios.get(`${API_URL}/ingredientes-mas-usados`, {
      headers: { Authorization: `Bearer ${token}` },
      params,
    });
    return response.data;
  } catch (error) {
    console.error('Error al obtener ingredientes más usados:', error.response?.data || error.message);
    throw error;
  }
};

//FUNCIONES ANTIGUAS
// Nuevos Usuarios Simulados
export const getNewUsersDaily = async () => {
  return [5, 10, 8, 6, 12, 15, 20];
};

export const getNewUsersMonthly = async () => {
  return [50, 60, 70, 80, 90, 110, 120];
};

// Tendencias de Recetas Simuladas
export const getRecipeTrends = async (period = 'daily') => {
  if (period === 'daily') {
    return {
      labels: ['Ensalada César', 'Tacos de Pollo', 'Pizza Margarita', 'Sushi de Salmón', 'Hamburguesas'],
      data: [50, 45, 40, 35, 30],
    };
  } else {
    return {
      labels: ['Ensalada César', 'Paella', 'Sopa de Lentejas', 'Pizza Margarita', 'Tacos de Camarón'],
      data: [500, 480, 460, 450, 420],
    };
  }
};

// Ranking de Ingredientes Simulado
export const getIngredientRankings = async (period = 'daily') => {
  if (period === 'daily') {
    return {
      labels: ['Pollo', 'Lechuga', 'Aguacate', 'Tomate', 'Aceite de Oliva'],
      data: [400, 350, 300, 200, 150],
    };
  } else {
    return {
      labels: ['Pollo', 'Carne de Res', 'Espinaca', 'Tomate', 'Aceite'],
      data: [3000, 2800, 2600, 2400, 2200],
    };
  }
};