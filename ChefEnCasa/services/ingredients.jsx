import axios from 'axios';

const API_URL = 'http://10.0.2.2:4000'; // Cambia esto a localhost o 10.0.2.2

export const fetchIngredients = async () => {
  try {
    const response = await axios.get(`${API_URL}/ingredientes`);
    return response.data.results; // Retorna los ingredientes que has obtenido
  } catch (error) {
    throw new Error('Error al obtener los ingredientes'); // Lanza un error si ocurre algo
  }
};
