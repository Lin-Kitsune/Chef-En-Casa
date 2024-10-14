// Importar dependencias necesarias
const express = require('express');
const { MongoClient, ServerApiVersion } = require('mongodb');
const dotenv = require('dotenv');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const axios = require('axios');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const Joi = require('joi');
const morgan = require('morgan');
const winston = require('winston');
const NodeCache = require('node-cache');
const { ObjectId } = require('mongodb');
const fs = require('fs'); // Importar el módulo de sistema de archivos (fs)
const Almacen = require('./models/Almacen');
const { crearOActualizarAlmacen } = require('./models/Almacen'); // Importar las funciones actualizadas de Almacen.js
const { getNoticias } = require('./models/newsService'); 
require('dotenv').config();


// Cargar el archivo JSON de ingredientes
let ingredientesMap = {};

// Leer el archivo JSON de manera síncrona al iniciar el servidor
fs.readFile('./ingredientes.json', 'utf8', (err, data) => {
  if (err) {
    console.error('Error al leer el archivo de ingredientes:', err);
    return;
  }
  ingredientesMap = JSON.parse(data); // Parsear el contenido del archivo JSON
  console.log('Archivo de ingredientes cargado correctamente');
});

const convertirIngredienteAEspanol = (ingrediente) => {
  return ingredientesMap[ingrediente.toLowerCase()] || ingrediente;
};

// Cargar las variables de entorno desde el archivo .env
dotenv.config();

// Inicializar la aplicación Express
const app = express();
app.use(express.json());

// Usar Helmet para aumentar la seguridad agregando encabezados HTTP seguros
app.use(helmet());

// Límite de peticiones por IP (Rate Limiting) para prevenir ataques de fuerza bruta
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutos
  max: 100 // Límite de 100 solicitudes por IP cada 15 minutos
});
app.use(limiter);

// Configuración de Winston para el manejo de logs
const logger = winston.createLogger({
  level: 'info',
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json()
  ),
  transports: [
    new winston.transports.File({ filename: 'logs/combined.log' }), // Guardar logs en un archivo
    new winston.transports.Console() // Mostrar logs en la consola
  ]
});

// Usar Morgan para generar logs de las solicitudes HTTP
app.use(morgan('combined', { stream: { write: message => logger.info(message) }}));

// Configuración de puerto y URI de MongoDB
const PORT = process.env.PORT || 4000;
const uri = process.env.MONGO_URI;
const JWT_SECRET = process.env.JWT_SECRET || 'secretKey';  // Clave secreta para JWT

// Configuración de cliente de MongoDB para conectar a la base de datos
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

let db; // Variable para almacenar la conexión a la base de datos

let usersCollection; // Definir usersCollection como una variable global

async function connectToDatabase() {
  if (db) return db; // Si ya hay una conexión, devolverla
  try {
    await client.connect(); // Conectar a MongoDB
    console.log("Conexión exitosa a MongoDB");
    db = client.db('chefencasa'); // Seleccionar la base de datos 'chefencasa'
    return db;
  } catch (error) {
    console.error('Error al conectar a MongoDB:', error);
    throw error; // Lanzar el error si no se puede conectar
  }
}

// Configuración de Swagger para la documentación de la API
const swaggerOptions = {
  swaggerDefinition: {
    info: {
      title: "Chef en Casa API",
      description: "Documentación de la API",
      version: "1.0.0"
    },
    servers: ["http://localhost:4000"] // URL del servidor local
  },
  apis: ["index.js"] // Archivo que contiene las rutas de la API
};
const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs)); // Servir la documentación de Swagger en /api-docs

// Middleware para autenticar el token JWT
function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization']; // Obtener el token desde el encabezado
  const token = authHeader && authHeader.split(' ')[1]; // Extraer el token después de 'Bearer'
  if (!token) return res.status(403).json({ message: 'Token requerido' });

  jwt.verify(token, JWT_SECRET, (err, user) => { // Verificar el token con la clave secreta
    if (err) return res.status(403).json({ message: 'Token inválido o expirado' });
    req.user = user; // Añadir los datos del usuario al objeto request
    next(); // Continuar con la siguiente función
  });
}

// Middleware para verificar si el usuario tiene el rol adecuado
function checkRole(role) {
  return (req, res, next) => {
    if (req.user.role !== role) { // Comprobar si el rol del usuario es el requerido
      return res.status(403).json({ message: 'Acceso denegado' });
    }
    next(); // Continuar si el rol es correcto
  };
}

// Función para iniciar el servidor y conectar a la base de datos
async function startServer() {
  try {
    const db = await connectToDatabase(); // Conectar a la base de datos
    usersCollection = db.collection('usuarios'); // Asignar la colección a la variable global
    console.log("Conexión exitosa a la base de datos y colección asignada.");

  } catch (error) {
    console.error("Error al conectar a la base de datos:", error);
  }
}

startServer().catch(console.error);

// Middleware para el manejo centralizado de errores
app.use((err, req, res, next) => {
  console.error(err.stack); // Mostrar el error en la consola
  res.status(500).json({ message: 'Ocurrió un error', error: err.message });
});


  // Ruta de prueba para verificar que el servidor está funcionando
  app.get('/', (req, res) => {
    res.send('API de Chef en Casa funcionando');
  });

  // Ruta de registro de usuarios
  app.post('/register', async (req, res) => {
    const { nombre, email, password, diet, allergies } = req.body; // Obtener los datos del cuerpo de la solicitud

    if (!nombre || !email || !password) { // Verificar si se envían todos los campos
      return res.status(400).json({ message: 'Todos los campos son obligatorios' });
    }

    // Comprobar si el usuario ya existe en la base de datos
    const usuarioExistente = await usersCollection.findOne({ email });
    if (usuarioExistente) {
      return res.status(400).json({ message: 'El usuario ya existe' });
    }

    // Hashear la contraseña antes de guardarla
    const hashedPassword = await bcrypt.hash(password, 10);
    const nuevoUsuario = { 
      nombre, 
      email, 
      password: hashedPassword, 
      diet: diet || null,       // Si se proporciona, asignar; si no, null
      allergies: allergies || [] // Asignar alergias si se proporcionan, o una lista vacía
    }; // Crear el nuevo usuario con la contraseña hasheada

    await usersCollection.insertOne(nuevoUsuario); // Insertar el nuevo usuario en la base de datos

    // Enviar respuesta sin incluir la contraseña
    res.status(201).json({ 
      message: 'Usuario registrado', 
      usuario: { nombre: nuevoUsuario.nombre, email: nuevoUsuario.email }
    });
  });

  // Ruta de login de usuarios
  app.post('/login', async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) { // Verificar si se envían todos los campos
      return res.status(400).json({ message: 'Todos los campos son obligatorios' });
    }

    // Buscar el usuario en la base de datos
    const usuario = await usersCollection.findOne({ email });
    if (!usuario) {
      return res.status(400).json({ message: 'Email o contraseña incorrectos' });
    }

    // Verificar si la contraseña es válida
    const passwordValido = await bcrypt.compare(password, usuario.password);
    if (!passwordValido) {
      return res.status(400).json({ message: 'Email o contraseña incorrectos' });
    }

    // Generar el token JWT
    const token = jwt.sign({ id: usuario._id, email: usuario.email }, JWT_SECRET, { expiresIn: '1h' });

    // Enviar el token de respuesta
    res.status(200).json({ message: 'Login exitoso', token });
  });

  // Ruta protegida para acceder al perfil de usuario solo con token válido
  app.get('/perfil', authenticateToken, (req, res) => {
    res.send(`Accediste al perfil con éxito, usuario: ${req.user.email}`);
  });

  // Ruta solo accesible para administradores
  app.get('/admin', authenticateToken, checkRole('admin'), (req, res) => {
    res.send('Ruta solo para administradores');
  });

// Ruta para que los usuarios actualicen su perfil
app.put('/perfil', authenticateToken, async (req, res) => {
  const { diet, allergies } = req.body;  // Obtener dieta y alergias desde el cuerpo de la solicitud

  if (!diet && !allergies) {
    return res.status(400).json({ message: 'Se requiere al menos una de las siguientes propiedades: dieta o alergias' });
  }

  try {
    // Actualizar el perfil del usuario con su dieta y/o alergias
    const result = await usersCollection.updateOne(
      { _id: new ObjectId(req.user.id) }, // Buscar usuario por su ID en el token JWT
      { 
        $set: { 
          ...(diet && { diet }),  // Si existe diet, agregarla al perfil
          ...(allergies && { allergies })  // Si existe allergies, agregarla al perfil
        }
      }
    );

    if (result.modifiedCount === 0) {
      return res.status(404).json({ message: 'Usuario no encontrado o sin cambios' });
    }

    res.status(200).json({ message: 'Perfil actualizado', diet, allergies });
  } catch (error) {
    console.error('Error al actualizar el perfil:', error.message);
    res.status(500).json({ message: 'Error al actualizar el perfil', error: error.message });
  }
});

// Configuración para la API de Spoonacular
const SPOONACULAR_API_BASE_URL = 'https://api.spoonacular.com';
const SPOONACULAR_API_KEY = process.env.SPOONACULAR_API_KEY; // Clave API de Spoonacular

const { Translate } = require('@google-cloud/translate').v2; //CLiente de traduccion de google
const translate = new Translate({ key: process.env.GOOGLE_TRANSLATE_API_KEY });

// Función para traducir texto al español
async function translateText(text, targetLanguage = 'es') {
  try {
    let [translation] = await translate.translate(text, targetLanguage);
    return translation;
  } catch (error) {
    console.error('Error al traducir:', error);
    throw error;
  }
}

//=============================================================BUSCAR RECETAS====================================================
//Ahora busca todas las recetas sin filtro "ingrediente", apareceran todas las recetas a menos que el usuario filtre
//por ingrediente u otro filtro
app.get('/api/recetas', authenticateToken, async (req, res) => {
  let query = req.query.q || '';  // Permitir que 'q' sea opcional, si no hay, no se filtra por un término específico

  // Convertir el término de búsqueda al español (si se provee)
  if (query) {
    query = convertirIngredienteAEspanol(query);
  }

  const time = req.query.time || null;  // Tiempo de preparación (opcional)
  const maxServings = req.query.maxServings || null;  // Máximo de porciones (opcional)
  const diet = req.query.diet || null;   // Dieta (opcional)

  try {
    const usuario = await usersCollection.findOne({ _id: new ObjectId(req.user.id) });

    const params = {
      apiKey: SPOONACULAR_API_KEY,
      query: query || null,  // Si no hay query, el campo query será null y no se filtrará por palabra clave
      number: 10,  // Número de recetas a devolver (puedes ajustar este número según necesidad)
      diet: usuario.diet || diet || null,  // Priorizar la dieta del perfil del usuario
      excludeIngredients: usuario.allergies ? usuario.allergies.join(',') : null,  // Excluir ingredientes por alergias del usuario
    };

    // Añadir el filtro de tiempo de preparación si está presente
    if (time) params.maxReadyTime = time;

    // Añadir el filtro de porciones si está presente
    if (maxServings) params.maxServings = maxServings;

    // Llamada a la API de Spoonacular
    const response = await axios.get(`${SPOONACULAR_API_BASE_URL}/recipes/complexSearch`, { params });

    // Traducir títulos al español
    const recetas = response.data.results;
    const recetasTraducidas = await Promise.all(recetas.map(async receta => {
      const tituloTraducido = await translateText(receta.title, 'es');
      return { ...receta, title: tituloTraducido };
    }));

    res.json({ results: recetasTraducidas });

  } catch (error) {
    console.error('Error al buscar o traducir recetas:', error.message);
    res.status(500).json({ error: 'Error al buscar o traducir recetas' });
  }
});

//========================================================INICIAR SERVIDOR========================================
// Iniciar el servidor en el puerto 4000
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});


module.exports = app;

//chefencasa1@chefencasa-437717.iam.gserviceaccount.com
//GOOGLE_APPLICATION_CREDENTIALS=./ruta/al/archivo_de_credenciales.json

// Probar la función de traducción
async function testTranslation() {
  const text = 'The translation is working';
  try {
    const [translation] = await translate.translate(text, 'es');
    console.log('Traducción:', translation);
  } catch (error) {
    console.error('Error en la traducción:', error);
  }
}

testTranslation();

//============================================INFO RECETA=============================================

// Obtener detalles de una receta desde Spoonacular y traducirlos al español
app.get('/receta/:id', authenticateToken, async (req, res) => {
  const recipeId = req.params.id; // Obtener el ID de la receta desde la URL

  try {
    // Llamar a la API de Spoonacular para obtener la información de la receta
    const receta = await obtenerRecetaDeSpoonacular(recipeId);

    // Traducir el título de la receta
    const tituloTraducido = await translateText(receta.title, 'es');

    // Traducir los ingredientes de la receta
    const ingredientesTraducidos = await Promise.all(receta.extendedIngredients.map(async ingrediente => {
      const nombreTraducido = await translateText(ingrediente.name, 'es'); // Traducir el nombre del ingrediente al español
      const descripcionTraducida = await translateText(ingrediente.original, 'es'); // Traducir la descripción completa
      return { 
        ...ingrediente, 
        name: nombreTraducido,  // Sobrescribir el campo 'name' con la traducción
        original: descripcionTraducida  // Sobrescribir la descripción completa
      };
    }));

    // Traducir las instrucciones de la receta si existen
    let instruccionesTraducidas = '';
    if (receta.instructions) {
      instruccionesTraducidas = await translateText(receta.instructions, 'es');
    }

    // Devolver la receta traducida
    res.status(200).json({
      title: tituloTraducido,
      ingredients: ingredientesTraducidos,
      instructions: instruccionesTraducidas || 'No hay instrucciones disponibles',
      readyInMinutes: receta.readyInMinutes,
      servings: receta.servings,
      image: receta.image
    });

  } catch (error) {
    res.status(500).json({ message: 'Error al obtener o traducir la receta de Spoonacular', error: error.message });
  }
});

// Función para obtener detalles de la receta desde Spoonacular
async function obtenerRecetaDeSpoonacular(recipeId) {
  try {
    const response = await axios.get(`https://api.spoonacular.com/recipes/${recipeId}/information`, {
      params: {
        apiKey: process.env.SPOONACULAR_API_KEY
      }
    });

    return response.data;
  } catch (error) {
    throw new Error('Error al obtener la receta de Spoonacular: ' + error.message);
  }
}


// Ruta para obtener todos los ingredientes  
// Modificado para traducirlos al español
app.get('/ingredientes', async (req, res) => {
  try {
    // Configura la solicitud a Spoonacular
    const response = await axios.get('https://api.spoonacular.com/food/ingredients/search', {
      params: {
        apiKey: SPOONACULAR_API_KEY,
        query: req.query.q || 'tomato',  // Puedes cambiar el ingrediente por defecto o pasar uno como query
        number: 100 // Número de ingredientes que deseas obtener
      }
    });

    // Obtener los ingredientes desde la respuesta
    const ingredientes = response.data.results;

    // Traducir el nombre de cada ingrediente al español
    const ingredientesTraducidos = await Promise.all(ingredientes.map(async (ingrediente) => {
      const nombreTraducido = await translateText(ingrediente.name, 'es'); // Traducir el nombre del ingrediente al español
      return {
        ...ingrediente,
        name: nombreTraducido // Reemplazar el nombre por su traducción
      };
    }));

    // Devuelve los datos 
    // Devuelve los ingredientes traducidos
    res.status(200).json({ results: ingredientesTraducidos });
  } catch (error) {
    console.error('Error al obtener la lista de ingredientes:', error.message);
    res.status(500).json({ error: 'Error al obtener la lista de ingredientes' });
  }
});

//============================================MEDIDAS NORMALIZACION===============================
//================================================================================================

// Mapa de conversiones para normalizar unidades a gramos
const conversiones = {
  'gram': 1,          // Base para gramos
  'ml': 1,            // Base para mililitros
  'kg': 1000,         // 1 kg = 1000 gramos
  'l': 1000,          // 1 litro = 1000 ml
  'tbsp': 15,         // 1 tablespoon = 15 gramos/mililitros
  'tsp': 5,           // 1 teaspoon = 5 gramos/mililitros
  'cup': 240,         // 1 cup = 240 gramos/mililitros
  'oz': 28.35,        // 1 ounce = 28.35 gramos
  'lb': 453.592,      // 1 pound = 453.592 gramos
  'pinche': 0.36,      // 1 pinch (pizca) = 0.36 gramos (aproximado)
  'clove': 5,         // 1 clove = 5 gramos
  'head': 1000,        // 1 head = 1000 gramos
  'ounce': 28.35,      // 1 ounce = 28.35 gramos
  'serving': 0.5,       // 1 serving = 0.5 gramos
  '""' : 1,          // 1 " = 0.5 gramos
  "strip": 5,        // 1 strip = 5 gramos
  "large": 100,       // 1 large = 100 gramos
  "unidad": 100       // 1 unidad = 50 gramos
};

// Función para convertir una cantidad a gramos o mililitros
function convertirMedida(cantidad, unidad) {
  // Verificar si la unidad es una cadena vacía o nula
  if (!unidad || unidad.trim() === '') {
    console.warn(`Unidad vacía para la cantidad ${cantidad}, asignando unidad por defecto.`);
    unidad = 'gram'; // Asignar una unidad por defecto si está vacía, como 'gram'
  }

  // Convertir la unidad a singular si es plural
  if (unidad.endsWith('s')) {
    unidad = unidad.slice(0, -1); // Quitar la 's' final para convertir a singular
  }

  const conversionFactor = conversiones[unidad.toLowerCase()];
  if (!conversionFactor) {
    throw new Error(`Unidad desconocida: ${unidad}`);
  }

  return cantidad * conversionFactor;
}

//============================================ALMACEN=============================================
//================================================================================================

// Traducción de ingredientes ingresados por el usuario en español a inglés
const traducirIngredienteAIngles = (ingrediente) => {
  // Buscar el nombre en el archivo ingredientes.json, si no está, se mantiene en español
  for (const [espanol, ingles] of Object.entries(ingredientesMap)) {
    if (espanol.toLowerCase() === ingrediente.toLowerCase()) {
      return ingles;
    }
  }
  return ingrediente;  // Si no hay traducción, devolver el mismo nombre
};

// Revisar almacén
app.get('/almacen', authenticateToken, async (req, res) => {
  try {
    const db = await connectToDatabase(); // Asegúrate de que db esté conectado
    const almacen = await db.collection('almacen').findOne({ usuarioId: new ObjectId(req.user.id) });
    
    if (!almacen) {
      return res.status(404).json({ message: 'Almacén no encontrado' });
    }
    res.status(200).json(almacen);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener el almacén' });
  }
});

// Agregar ingredientes al almacen
app.post('/almacen/registro', authenticateToken, async (req, res) => {
  const { ingredientes } = req.body;

  try {
    const db = await connectToDatabase(); // Conectar a la base de datos
    const ingredientesTraducidos = ingredientes.map(ing => ({
      nombre: traducirIngredienteAIngles(ing.nombre),  // Traducir el ingrediente a inglés
      cantidad: convertirMedida(ing.cantidad, ing.unidad), // Convertir la cantidad a gramos o mililitros
      fechaIngreso: new Date(),
      perecedero: ing.perecedero || false
    }));

    await crearOActualizarAlmacen(db, req.user.id, ingredientesTraducidos); // Usar los ingredientes traducidos
    res.status(200).json({ message: 'Alimentos registrados o actualizados en el almacén' });
  } catch (error) {
    console.error('Error al registrar alimentos:', error);
    res.status(500).json({ error: 'Error al registrar alimentos' });
  }
});

// Eliminar un ingrediente completo del almacén
app.delete('/almacen/eliminar', authenticateToken, async (req, res) => {
  const { nombreIngrediente } = req.body; // El nombre del ingrediente que se quiere eliminar

  if (!nombreIngrediente) {
    return res.status(400).json({ message: 'Debe proporcionar el nombre del ingrediente' });
  }

  try {
    const db = await connectToDatabase();
    const usuarioId = new ObjectId(req.user.id);

    // Buscar y eliminar el ingrediente del almacén del usuario
    const result = await db.collection('almacen').updateOne(
      { usuarioId },
      { $pull: { ingredientes: { nombre: nombreIngrediente.toLowerCase() } } }
    );

    if (result.modifiedCount === 0) {
      return res.status(404).json({ message: 'Ingrediente no encontrado en el almacén' });
    }

    res.status(200).json({ message: `Ingrediente ${nombreIngrediente} eliminado correctamente` });
  } catch (error) {
    console.error('Error al eliminar el ingrediente:', error.message);
    res.status(500).json({ error: 'Error al eliminar el ingrediente del almacén' });
  }
});

// Reducir la cantidad de un ingrediente en el almacén
app.put('/almacen/reducir', authenticateToken, async (req, res) => {
  const { nombreIngrediente, cantidadReducir } = req.body; // El nombre del ingrediente y la cantidad a reducir

  if (!nombreIngrediente || !cantidadReducir) {
    return res.status(400).json({ message: 'Debe proporcionar el nombre del ingrediente y la cantidad a reducir' });
  }

  try {
    const db = await connectToDatabase();
    const usuarioId = new ObjectId(req.user.id);

    // Buscar el ingrediente en el almacén del usuario
    const almacen = await db.collection('almacen').findOne({ usuarioId });
    if (!almacen) {
      return res.status(404).json({ message: 'Almacén no encontrado' });
    }

    // Buscar el ingrediente en el almacén del usuario
    const ingrediente = almacen.ingredientes.find(item => item.nombre === nombreIngrediente.toLowerCase());

    if (!ingrediente) {
      return res.status(404).json({ message: `Ingrediente ${nombreIngrediente} no encontrado en el almacén` });
    }

    // Verificar si se puede reducir la cantidad
    if (ingrediente.cantidad < cantidadReducir) {
      return res.status(400).json({ message: 'La cantidad a reducir es mayor que la cantidad disponible' });
    }

    // Reducir la cantidad del ingrediente
    ingrediente.cantidad -= cantidadReducir;

    // Si la cantidad llega a 0, eliminar el ingrediente del almacén
    if (ingrediente.cantidad === 0) {
      await db.collection('almacen').updateOne(
        { usuarioId },
        { $pull: { ingredientes: { nombre: nombreIngrediente.toLowerCase() } } }
      );
      return res.status(200).json({ message: `Ingrediente ${nombreIngrediente} eliminado ya que llegó a 0` });
    } else {
      // Actualizar la cantidad del ingrediente en el almacén
      await db.collection('almacen').updateOne(
        { usuarioId, 'ingredientes.nombre': nombreIngrediente.toLowerCase() },
        { $set: { 'ingredientes.$.cantidad': ingrediente.cantidad } }
      );
    }

    res.status(200).json({ message: `Cantidad de ${nombreIngrediente} reducida correctamente` });
  } catch (error) {
    console.error('Error al reducir la cantidad del ingrediente:', error.message);
    res.status(500).json({ error: 'Error al reducir la cantidad del ingrediente' });
  }
});

//============================================PREPARAR RECETA====================================
//================================================================================================

// Descontar ingredientes del almacén al preparar receta desde Spoonacular
app.post('/preparar-receta-spoonacular', authenticateToken, async (req, res) => {
  const { recipeId } = req.body;  // El ID de la receta de Spoonacular que el usuario desea preparar

  try {
    const db = await connectToDatabase(); // Conectar a la base de datos

    // Obtener los ingredientes de la receta desde Spoonacular
    const receta = await obtenerRecetaDeSpoonacular(recipeId);
    const ingredientesReceta = receta.extendedIngredients;

    // Obtener el almacén del usuario
    const usuarioId = new ObjectId(req.user.id);
    const almacen = await db.collection('almacen').findOne({ usuarioId });

    if (!almacen) {
      return res.status(404).json({ message: 'Almacén no encontrado' });
    }

    // Mapa de ingredientes que faltan
    let faltanIngredientes = [];

    // Recorrer los ingredientes de la receta y verificar si están en el almacén del usuario
    for (const ingredienteReceta of ingredientesReceta) {
      // Traducir el nombre del ingrediente de la receta al español usando ingredientes.json
      const nombreTraducido = convertirIngredienteAEspanol(ingredienteReceta.name.toLowerCase());

      // Buscar el ingrediente en el almacén
      const ingredienteEnAlmacen = almacen.ingredientes.find(item => item.nombre === nombreTraducido);

      // Convertir la cantidad del ingrediente de la receta a gramos usando la unidad de Spoonacular
      const cantidadEnGramos = convertirMedida(ingredienteReceta.amount, ingredienteReceta.unit);

      console.log(`Ingrediente de la receta: ${JSON.stringify(ingredienteReceta)}`);
      console.log(`Ingrediente traducido: ${nombreTraducido}`);
      console.log(`Ingrediente en almacén: ${JSON.stringify(ingredienteEnAlmacen)}`);
      console.log(`Cantidad necesaria (gramos): ${cantidadEnGramos}`);

      if (!ingredienteEnAlmacen || ingredienteEnAlmacen.cantidad < cantidadEnGramos) {
        // Si el ingrediente no está o no hay suficiente cantidad, agregarlo a la lista de faltantes
        faltanIngredientes.push(ingredienteReceta.name);
      } else {
        // Descontar la cantidad utilizada de los ingredientes
        ingredienteEnAlmacen.cantidad -= cantidadEnGramos;
        console.log(`Cantidad actualizada en almacén para ${nombreTraducido}: ${ingredienteEnAlmacen.cantidad}`);
      }
    }

    if (faltanIngredientes.length > 0) {
      return res.status(400).json({
        message: `No tienes suficiente de los siguientes ingredientes: ${faltanIngredientes.join(', ')}.`
      });
    }

    // Actualizar el almacén del usuario con los ingredientes descontados
    await db.collection('almacen').updateOne(
      { usuarioId },
      { $set: { ingredientes: almacen.ingredientes } }
    );

    console.log("Ingredientes descontados correctamente.");
    res.status(200).json({ message: 'Ingredientes descontados del almacén al preparar la receta' });
  } catch (error) {
    console.error(`Error al preparar la receta: ${error.message}`);
    res.status(500).json({ error: `Error al preparar la receta de Spoonacular: ${error.message}` });
  }
});

//============================================DESPERDICIO DE ALIMENTOS=============================================
//Funcion para revisar desperdicio de alimentos en almacen
// const cron = require('node-cron');

// // Tarea programada para revisar cada semana los alimentos perecederos
// cron.schedule('0 0 * * 0', async () => {
//   try {
//     const db = await connectToDatabase(); // Conectar a la base de datos
//     const todosLosAlmacenes = await db.collection('almacen').find({}).toArray();
    
//     todosLosAlmacenes.forEach(almacen => {
//       almacen.ingredientes.forEach(ingrediente => {
//         if (ingrediente.perecedero && new Date() - new Date(ingrediente.fechaIngreso) > 7 * 24 * 60 * 60 * 1000) {
//           // Registrar desperdicio si no fue consumido en una semana
//           console.log(`Ingrediente ${ingrediente.nombre} se considera desperdicio`);
//         }
//       });
//     });
//   } catch (error) {
//     console.error('Error al procesar el desperdicio:', error);
//   }
// });

//============================================TESTING DESPERDICIO DE ALIMENTOS=============================================
app.get('/test-desperdicio', async (req, res) => {
  try {
    const db = await connectToDatabase(); // Conectar a la base de datos
    const todosLosAlmacenes = await db.collection('almacen').find({}).toArray();
    
    todosLosAlmacenes.forEach(almacen => {
      almacen.ingredientes.forEach(ingrediente => {
        if (ingrediente.perecedero && new Date() - new Date(ingrediente.fechaIngreso) > 7 * 24 * 60 * 60 * 1000) {
          // Registrar desperdicio si no fue consumido en una semana
          console.log(`Ingrediente ${ingrediente.nombre} se considera desperdicio`);
        }
      });
    });

    res.status(200).json({ message: 'Revisión de desperdicio completada' });
  } catch (error) {
    console.error('Error al procesar el desperdicio:', error);
    res.status(500).json({ error: 'Error al procesar el desperdicio' });
  }
});

/*
//CALCULAR DESPERDICIO SEMANAL==========================================================================
app.get('/desperdicio-semanal', authenticateToken, async (req, res) => {
  try {
    const almacen = await db.collection('almacen').findOne({ usuarioId: new ObjectId(req.user.id) });
    let desperdicioProteinas = 0, desperdicioCarbohidratos = 0;

    almacen.ingredientes.forEach(ingrediente => {
      if (ingrediente.perecedero && new Date() - new Date(ingrediente.fechaIngreso) > 7 * 24 * 60 * 60 * 1000) {
        desperdicioProteinas += ingrediente.proteinas;
        desperdicioCarbohidratos += ingrediente.carbohidratos;
      }
    });

    await db.collection('registroConsumo').insertOne({
      usuarioId: req.user.id,
      fecha: new Date(),
      proteinas: 0,
      carbohidratos: 0,
      desperdicio: { proteinas: desperdicioProteinas, carbohidratos: desperdicioCarbohidratos }
    });

    res.status(200).json({ message: 'Desperdicio semanal calculado', desperdicioProteinas, desperdicioCarbohidratos });
  } catch (error) {
    res.status(500).json({ error: 'Error al calcular desperdicio semanal' });
  }
});
*/
// Noticias de comida
// Ruta para obtener noticias
app.get('/noticias', async (req, res) => {
  try {
    const noticias = await getNoticias();
    res.json(noticias);
  } catch (error) {
    res.status(500).send('Error al obtener noticias');
  }
});

//============================================NOTIFICACIONES=============================================
//=======================================================================================================
// Se envia una notificacion al usuario con los nombres de los ingredientes que se han agotado en su almacen 
app.get('/notificaciones', authenticateToken, async (req, res) => {
  try {
    const db = await connectToDatabase();
    const usuarioId = new ObjectId(req.user.id);
    const almacen = await db.collection('almacen').findOne({ usuarioId });
    
    const ingredientesAgotados = almacen.ingredientes
      .filter(ingrediente => ingrediente.cantidad === 0)
      .map(ingrediente => ingrediente.nombre);  // Solo nombres

    if (ingredientesAgotados.length > 0) {
      return res.status(200).json({ message: 'Tienes ingredientes agotados', ingredientesAgotados });
    } else {
      return res.status(200).json({ message: 'No tienes ingredientes agotados' });
    }
  } catch (error) {
    console.error('Error al obtener notificaciones:', error.message);
    res.status(500).json({ error: 'Error al obtener notificaciones' });
  }
});
