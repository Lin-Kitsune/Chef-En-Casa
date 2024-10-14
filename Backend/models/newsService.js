const axios = require('axios');

const getNoticias = async () => {
  try {
    const response = await axios.get(`https://newsdata.io/api/1/news`, {
      params: {
        apikey: process.env.NEWS_API_KEY, // Usa tu API Key
        q: 'comida OR cocina', // Búsqueda en español
        language: 'es', // Filtrar por noticias en español
        country: 'cl,es,mx,ar', // Puedes elegir países hispanohablantes
      },
    });

    return response.data;
  } catch (error) {
    console.error('Error al obtener noticias:', error);
    throw error;
  }
};

module.exports = { getNoticias };
