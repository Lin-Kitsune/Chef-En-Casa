import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const API_URL = 'http://10.0.2.2:4000'; 

// Guardar el token después del login
const saveToken = async (token) => {
  try {
    await AsyncStorage.setItem('userToken', token);  // Almacenar el token en AsyncStorage
  } catch (error) {
    console.error('Error al guardar el token', error);
  }
};

// Obtener el token para solicitudes autenticadas
export const getToken = async () => {
  try {
    const token = await AsyncStorage.getItem('userToken');  // Retrieve token from AsyncStorage
    return token;  // Return the token if found
  } catch (error) {
    console.error('Error retrieving token:', error);
    return null;  // Return null if there's an error
  }
};


// Login del usuario, con almacenamiento del token
export const login = async (email, password) => {
  try {
    const response = await axios.post(`${API_URL}/login`, { email, password });
    const { token } = response.data;  // Obtener el token desde la respuesta
    await saveToken(token);  // Guardar el token
    return response.data;  // Retornar los datos de respuesta
  } catch (error) {
    throw new Error('Error al iniciar sesión');
  }
};

// Registro de usuarios
export const register = async (nombre, email, password) => {
  try {
    const response = await axios.post(`${API_URL}/register`, { nombre, email, password });
    return response.data;
  } catch (error) {
    throw error;  // Permitir ver detalles del error
  }
};


// Function to update user's health data
export const updateHealthData = async (weight, height, imc, dietRecommendation) => {
  try {
    const token = await getToken();  // Retrieve token
    
    if (!token) {
      throw new Error('No token available');
    }

    // Send a request to update health data
    const response = await axios.put(`${API_URL}/perfil/health`, 
      { weight, height, imc, dietRecommendation },
      {
        headers: {
          Authorization: `Bearer ${token}`  // Pass token in headers
        }
      }
    );

    return response.data;  // Return the response data
  } catch (error) {
    console.error('Error updating health data', error);
    throw error;
  }
};

// Función para obtener los datos del perfil del usuario

export const getUserProfile = async () => {
  try {
    const token = await getToken(); // Obtener el token desde AsyncStorage
    if (!token) {
      throw new Error('No hay token disponible');
    }

    // Solicitud GET al backend para obtener el perfil
    const response = await axios.get(`${API_URL}/perfil`, {
      headers: {
        Authorization: `Bearer ${token}`  // Enviar el token en los headers
      }
    });

    return response.data;  // Retorna los datos del perfil del usuario
  } catch (error) {
    console.error('Error al obtener el perfil del usuario', error);
    throw error;
  }
};


