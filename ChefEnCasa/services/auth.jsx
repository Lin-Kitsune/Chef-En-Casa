import axios from 'axios';

const API_URL = 'http://10.0.2.2:4000'; 


export const login = async (email, password) => {
    try {
      const response = await axios.post(`${API_URL}/login`, { email, password });
      return response.data;  // Aquí se devuelve el token
    } catch (error) {
      throw new Error('Error al iniciar sesión');
    }
  };
  
export const register = async (nombre, email, password) => {
    try {
        const response = await axios.post(`${API_URL}/register`, { nombre, email, password });
        return response.data;
    } catch (error) {
        throw error;  // No solo retornar un mensaje, permite obtener el detalle de error
    }
};  