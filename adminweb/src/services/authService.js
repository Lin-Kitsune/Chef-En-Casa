import axios from 'axios';

const API_URL = 'http://localhost:4000/api/admin';  // Ruta base del backend para la administración

// Guardar el token en localStorage
const saveToken = (token) => {
  localStorage.setItem('token', token);  // Guardar token en localStorage
};

// Obtener el token de localStorage
export const getToken = () => {
  return localStorage.getItem('token');  // Retorna el token almacenado
};

// Realizar login del administrador
export const login = async (email, password) => {
  try {
    const response = await axios.post(`${API_URL}/login`, { email, password });
    const { token } = response.data;  // Obtener el token desde la respuesta del servidor
    saveToken(token);  // Guardar el token en localStorage
    return response.data;  // Retornar la respuesta
  } catch (error) {
    console.error('Error en el login de admin:', error);
    throw new Error('Error al iniciar sesión');
  }
};

// Realizar logout (opcional)
export const logout = () => {
  localStorage.removeItem('token');  // Eliminar el token de localStorage
};
