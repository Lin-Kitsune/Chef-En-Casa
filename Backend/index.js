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
  const db = await connectToDatabase(); // Conectar a la base de datos
  const usersCollection = db.collection('usuarios'); // Seleccionar la colección de usuarios

  // Ruta de prueba para verificar que el servidor está funcionando
  app.get('/', (req, res) => {
    res.send('API de Chef en Casa funcionando');
  });

  // Ruta de registro de usuarios
  app.post('/register', async (req, res) => {
    const { nombre, email, password } = req.body; // Obtener los datos del cuerpo de la solicitud

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
    const nuevoUsuario = { nombre, email, password: hashedPassword }; // Crear el nuevo usuario con la contraseña hasheada

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
}

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

// Ruta para buscar recetas y traducirlas al español
app.get('/api/recetas', async (req, res) => {
  const query = req.query.q || 'pasta'; // Obtener el término de búsqueda de los query params
  try {
    // Llamar a la API de Spoonacular para obtener recetas
    const response = await axios.get(`${SPOONACULAR_API_BASE_URL}/recipes/complexSearch`, {
      params: {
        apiKey: SPOONACULAR_API_KEY,
        query: query,
        number: 5,  // Número de recetas a devolver
      },
    });

    // Traducir el título de cada receta al español
    const recetas = response.data.results;
    const recetasTraducidas = await Promise.all(recetas.map(async receta => {
      const tituloTraducido = await translateText(receta.title, 'es'); // Traducir el título al español
      return {
        ...receta,
        title: tituloTraducido // Reemplazar el título por su traducción
      };
    }));

    // Enviar las recetas traducidas como respuesta
    res.json({ results: recetasTraducidas });
  } catch (error) {
    console.error('Error al buscar o traducir recetas:', error.message);
    res.status(500).json({ error: 'Error al buscar o traducir recetas' });
  }
});

// Iniciar el servidor en el puerto 4000
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});

// Iniciar el servidor y conectar a la base de datos
startServer().catch(console.error);

// Middleware para el manejo centralizado de errores
app.use((err, req, res, next) => {
  console.error(err.stack); // Mostrar el error en la consola
  res.status(500).json({ message: 'Ocurrió un error', error: err.message });
});

module.exports = app;

// Joi Schema para validar el registro de usuario
const registerSchema = Joi.object({
  nombre: Joi.string().required(),
  email: Joi.string().email().required(), // Validar formato de email
  password: Joi.string().min(8).pattern(new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])[a-zA-Z0-9!@#\$%\^&\*]{8,}$')).required(), // Validar contraseña con criterios mínimos
});

app.post('/register', async (req, res) => {
  const { nombre, email, password } = req.body; // Obtener los datos del cuerpo de la solicitud

  // Validar los datos usando Joi
  const { error } = registerSchema.validate({ nombre, email, password });
  if (error) {
      return res.status(400).json({ message: error.details[0].message });
  }

  // Verificar si el usuario ya existe en la base de datos
  const usuarioExistente = await usersCollection.findOne({ email });
  if (usuarioExistente) {
      return res.status(400).json({ message: 'El usuario ya existe' });
  }

  // Hashear la contraseña antes de guardarla
  const hashedPassword = await bcrypt.hash(password, 10);
  const nuevoUsuario = { nombre, email, password: hashedPassword }; // Crear el nuevo usuario con la contraseña hasheada

  await usersCollection.insertOne(nuevoUsuario); // Insertar el nuevo usuario en la base de datos

  // Enviar respuesta sin incluir la contraseña
  res.status(201).json({ 
    message: 'Usuario registrado', 
    usuario: { nombre: nuevoUsuario.nombre, email: nuevoUsuario.email }
  });
});

//chefencasa1@chefencasa-437717.iam.gserviceaccount.com
//GOOGLE_APPLICATION_CREDENTIALS=./ruta/al/archivo_de_credenciales.json

// Probar la función de traducción
async function testTranslation() {
  const text = 'Hello World, the translation is working';
  try {
    const [translation] = await translate.translate(text, 'es');
    console.log('Traducción:', translation);
  } catch (error) {
    console.error('Error en la traducción:', error);
  }
}

testTranslation();

