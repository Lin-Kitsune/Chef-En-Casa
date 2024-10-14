import axios from 'axios';

const API_URL = 'http://10.0.2.2:4000'; // Cambia esto a la IP adecuada para tu emulador o localhost.

export const fetchNews = async () => {
  try {
    const response = await axios.get(`${API_URL}/noticias`);
    return response.data.results; // Devuelve las noticias obtenidas
  } catch (error) {
    throw new Error('Error al obtener las noticias');
  }
};
