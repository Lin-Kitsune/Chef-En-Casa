const express = require('express');
const axios = require('axios');
const router = express.Router();

router.get('/proxy-image/:imageName', async (req, res) => {
  const { imageName } = req.params;
  const imageUrl = `https://spoonacular.com/cdn/ingredients_100x100/${imageName}`;

  try {
    const response = await axios.get(imageUrl, { responseType: 'arraybuffer' });
    res.setHeader('Content-Type', 'image/jpeg');
    res.send(response.data);
  } catch (error) {
    console.error('Error al obtener imagen:', error.message);
    res.status(500).send('Error al obtener imagen');
  }
});

module.exports = router;
