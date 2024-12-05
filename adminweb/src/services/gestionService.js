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
    console.log('Rango enviado:', rango); // Verifica qué rango se está enviando
    const token = await getToken(); // Obtener el token
    const response = await axios.get(`${API_URL}/recetas/mejor-valoradas`, {
      headers: {
        Authorization: `Bearer ${token}`, // Pasar el token de autorización
      },
      params: { rango }, // Asegúrate de que 'rango' sea uno de los valores válidos
    });

    // Aquí devolvemos solo el nombre y el promedio de valoraciones
    return response.data.map((receta) => ({
      nombre: receta.nombre,
      promedioValoracion: receta.averageRating, // Asegúrate de que el campo se llama 'averageRating'
    }));
    
  } catch (error) {
    console.error('Error al obtener las recetas mejor valoradas:', error);
    throw error;
  }
};


// Función para obtener las recetas más guardadas por los usuarios según un rango de fechas
export const getRecetasGuardadas = async (rango = 'mensual') => {
  try {
      const token = await getToken(); // Obtener el token de autenticación
      const response = await axios.get(`${API_URL}/recetas/guardadas`, {
          headers: {
              Authorization: `Bearer ${token}`,
          },
          params: { rango }, // Enviar el rango como parámetro en la query string
      });
      return response.data; // Retorna las recetas guardadas
  } catch (error) {
      console.error('Error al obtener las recetas guardadas:', error);
      throw error;
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


// Función para obtener las solicitudes respondidas según el rango de tiempo
export const getSolicitudesRespondidas = async (rango) => {
  try {
    // Realizamos la solicitud GET al backend, pasando el rango de fechas como query
    const response = await axios.get(`${API_URL}/solicitudes-respondidas`, {
      params: { rango }
    });
    return response.data; // Devolvemos la respuesta que contiene las cantidades por tipo de reclamo
  } catch (error) {
    console.error('Error al obtener las solicitudes respondidas:', error);
    throw error; // Lanzamos el error para que sea manejado en el componente
  }
};