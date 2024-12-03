import axios from 'axios';
import { getToken } from './authService';

const API_URL = 'http://localhost:4000/api/admin';

// Endpoints de gestión de admin

// Función para obtener la cantidad de usuarios activos
export const getUsuariosActivos = async (rango = 'mensual') => {
    try {
      const token = await getToken();
      const response = await axios.get(`${API_URL}/usuarios-activos`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: { rango }, // Pasa el rango como parámetro
      });
      return response.data; // Devuelve la cantidad de usuarios activos
    } catch (error) {
      console.error('Error al obtener los usuarios activos:', error);
      throw error;
    }
};


// Función para obtener la cantidad de usuarios nuevos de manera mensual
export const getUsuariosNuevos = async () => {
  try {
    const token = await getToken(); // Obtener el token de autenticación
    const response = await axios.get(`${API_URL}/usuarios-nuevos`, {
      headers: {
        Authorization: `Bearer ${token}`, // Incluir el token en los headers
      },
      params: { rango: 'mensual' }, // Establecer el parámetro para rango mensual
    });
    return response.data; // Devuelve la cantidad de usuarios nuevos
  } catch (error) {
    console.error('Error al obtener los usuarios nuevos:', error);
    throw error; // Si hay un error, se lanza
  }
};

//Función para obtener las recetas más preparadas por los usuarios de manera mensual.
export const getRecetasPreparadas = async (rango = 'mensual') => {
    try {
      const token = await getToken();
      const response = await axios.get(`${API_URL}/recetas-preparadas`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: { rango },
      });
      return response.data; // Devuelve las recetas preparadas
    } catch (error) {
      console.error('Error al obtener recetas preparadas:', error); // Log para el error
      throw error; // Re-lanzar el error
    }
};

// Función para obtener las recetas mejor valoradas según el rango
export const getRecetasMejorValoradas = async (rango = 'mensual') => {
  try {
    const token = await getToken(); // Obtener el token del usuario
    const response = await axios.get(`${API_URL}/recetas/mejor-valoradas`, {
      headers: {
        Authorization: `Bearer ${token}`, // Pasar el token en la cabecera
      },
      params: { rango }, // Pasar el rango como parámetro en la query string
    });

    console.log('Recetas Mejor Valoradas:', response.data); // Verifica qué datos estás recibiendo
    return response.data; // Retorna las recetas mejor valoradas
  } catch (error) {
    console.error('Error al obtener las recetas mejor valoradas:', error);
    throw error; // Lanza el error para que pueda ser manejado en otro lugar
  }
};


// Función para obtener las recetas más guardadas por los usuarios según un rango de fechas
export const getRecetasGuardadas = async (rango = 'mensual') => {
    try {
      const token = await getToken(); // Obtén el token de autenticación
      const response = await axios.get(`${API_URL}/recetas/guardadas`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: { rango }, // Envía el rango como parámetro
      });
      return response.data; // Devuelve las recetas más guardadas
    } catch (error) {
      console.error('Error al obtener las recetas guardadas:', error); // Muestra el error en consola
      throw error; // Lanza el error para que sea manejado en la interfaz de usuario
    }
};


// Función para obtener los ingredientes más utilizados según el rango
export const getIngredientesMasUtilizados = async (rango = 'mensual') => {
  try {
    const token = await getToken(); // Obtén el token de autenticación
    const response = await axios.get(`${API_URL}/admin/ingredientes-utilizados`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params: {
        rango, // Enviar el rango como parámetro
      },
    });
    return response.data; // Devolver los ingredientes más utilizados
  } catch (error) {
    console.error('Error al obtener los ingredientes más utilizados:', error);
    throw error; // Lanza el error para que lo maneje la interfaz de usuario
  }
};