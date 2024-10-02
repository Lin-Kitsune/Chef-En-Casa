const express = require('express');
const { MongoClient, ServerApiVersion } = require('mongodb');
const dotenv = require('dotenv');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const axios = require('axios');

const cors = require('cors'); 

/*
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const Joi = require('joi');
const morgan = require('morgan');
const winston = require('winston');
const NodeCache = require('node-cache');
*/


// Cargar las variables de entorno desde el archivo .env
dotenv.config();
const app = express();
app.use(cors()); 
app.use(express.json());

/*
// Límite de peticiones por IP (Rate Limiting)
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutos
  max: 100 // Límite de 100 solicitudes por ventana de tiempo
});
app.use(limiter);

// Configurar Winston para los logs
const logger = winston.createLogger({
  level: 'info',
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json()
  ),
  transports: [
    new winston.transports.File({ filename: 'logs/combined.log' }),
    new winston.transports.Console()
  ]
});
app.use(morgan('combined', { stream: { write: message => logger.info(message) }}));
*/

// Puerto y MongoDB URI
const PORT = process.env.PORT || 4000;
const uri = process.env.MONGO_URI;
const JWT_SECRET = process.env.JWT_SECRET || 'secretKey';  // Asegúrate de que JWT_SECRET esté en el archivo .env

// Configurar el cliente MongoDB
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },

/*
// Configurar el cliente MongoDB
const client = new MongoClient(uri, {
  ssl: process.env.NODE_ENV !== 'test',  // Deshabilitar SSL solo en modo de prueba
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});
*/

});

let db;
async function connectToDatabase() {
  if (db) return db;
  try {
    await client.connect();
    console.log("Conexión exitosa a MongoDB");
    db = client.db('chefencasa');  // Base de datos 'chefencasa'
    return db;
  } catch (error) {
    console.error('Error al conectar a MongoDB:', error);
    throw error;  // Lanzar el error si no se puede conectar
  }
}

/*
// Swagger configuración
// Sirve para obtener la documentacion de la api mediante la App
const swaggerOptions = {
  swaggerDefinition: {
    info: {
      title: "Chef en Casa API",
      description: "Documentación de la API",
      version: "1.0.0"
    },
    servers: ["http://localhost:4000"]
  },
  apis: ["index.js"]
};
const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));
*/

// Middleware para autenticar el token JWT
function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; // Extraer el token después de 'Bearer'
  if (!token) return res.status(403).json({ message: 'Token requerido' });

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) return res.status(403).json({ message: 'Token inválido o expirado' });
    req.user = user;
    next(); // Continua a la siguiente función
  });
}

/*
// Middleware para verificar roles
function checkRole(role) {
  return (req, res, next) => {
    if (req.user.role !== role) {
      return res.status(403).json({ message: 'Acceso denegado' });
    }
    next();
  };
}
*/

/*
// Caché para solicitudes a Spoonacular
const cache = new NodeCache({ stdTTL: 600 });
*/

// INICIAR SERVIDOR Y BASE DE DATOS
async function startServer() {
  const db = await connectToDatabase();
  const usersCollection = db.collection('usuarios');

  /*
  // Validación de entrada usando Joi
  const registerSchema = Joi.object({
    nombre: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(8).pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required(),
    role: Joi.string().valid('admin', 'user').default('user')
  */

  // Ruta de prueba
  app.get('/', (req, res) => {
    res.send('API de Chef en Casa funcionando');
  });

  // REGISTRO DE USUARIOS
  app.post('/register', async (req, res) => {
    const { nombre, email, password } = req.body;

    /*app.post('/register', async (req, res) => {
    const { nombre, email, password, role = 'user' } = req.body;  // Rol por defecto: 'user'
    // Registro de usuario...
    }); // Se agrega un rol en caso de definir admin y usuario para el monitoreo de datos 
    */ //Esto es de Gabriel creo, comentado por el  

    /*
    // Validar entrada
    const { error } = registerSchema.validate({ nombre, email, password, role });
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }
    */

    // Validar si se envían todos los campos
    if (!nombre || !email || !password) {
        return res.status(400).json({ message: 'Todos los campos son obligatorios' });
    }

    // Verificar si el usuario ya existe
    const usuarioExistente = await usersCollection.findOne({ email });
    if (usuarioExistente) {
        return res.status(400).json({ message: 'El usuario ya existe' });
    }

    // Hashear la contraseña
    const hashedPassword = await bcrypt.hash(password, 10);

    // Crear el nuevo usuario
    const nuevoUsuario = { nombre, email, password: hashedPassword };
    await usersCollection.insertOne(nuevoUsuario);

    // Eliminar la contraseña de la respuesta
    res.status(201).json({ 
        message: 'Usuario registrado', 
        usuario: { nombre: nuevoUsuario.nombre, email: nuevoUsuario.email }
    });
  });


  // LOGIN DE USUARIOS
  app.post('/login', async (req, res) => {
    const { email, password } = req.body;

    // Validar si se envían todos los campos
    if (!email || !password) {
      return res.status(400).json({ message: 'Todos los campos son obligatorios' });
    }

    // Buscar el usuario
    const usuario = await usersCollection.findOne({ email });
    if (!usuario) {
      return res.status(400).json({ message: 'Email o contraseña incorrectos' });
    }

    // Verificar la contraseña
    const passwordValido = await bcrypt.compare(password, usuario.password);
    if (!passwordValido) {
      return res.status(400).json({ message: 'Email o contraseña incorrectos' });
    }

    // Generar el token JWT
    const token = jwt.sign({ id: usuario._id, email: usuario.email }, JWT_SECRET, { expiresIn: '1h' });

    res.status(200).json({ message: 'Login exitoso', token });
  });

  // RUTA PROTEGIDA - SOLO ACCESIBLE CON TOKEN VÁLIDO
  app.get('/perfil', authenticateToken, (req, res) => {
    res.send(`Accediste al perfil con éxito, usuario: ${req.user.email}`);
  });

  /*
  // RUTA SOLO PARA ADMINISTRADORES
  app.get('/admin', authenticateToken, checkRole('admin'), (req, res) => {
    res.send('Ruta solo para administradores');
  });
  */

}

// CONFIGURACION API SPOONACULAR
// Definir la URL base de Spoonacular API y la clave API
const SPOONACULAR_API_BASE_URL = 'https://api.spoonacular.com';
const SPOONACULAR_API_KEY = process.env.SPOONACULAR_API_KEY;

// Endpoint para buscar recetas
app.get('/api/recetas', async (req, res) => {
  const query = req.query.q || 'pasta';  // Obtener el término de búsqueda de los query params
  try {
    // Llamar a la API de Spoonacular usando axios
    const response = await axios.get(`${SPOONACULAR_API_BASE_URL}/recipes/complexSearch`, {
      params: {
        apiKey: SPOONACULAR_API_KEY,
        query: query,  // Término de búsqueda (por ejemplo: 'pasta', 'pollo')
        number: 5,     // Número de recetas a devolver
      },
    });

    /*
  // Verificar en caché, va dentro del endpoint
    const cachedData = cache.get(query);
    if (cachedData) {
      return res.json(cachedData);
    }
  */
    /*
    // Guardar la respuesta en caché
      cache.set(query, response.data);
    */
    
    // Devolver los resultados de la búsqueda en formato JSON
    res.json(response.data);
  } catch (error) {
    console.error('Error al buscar recetas:', error.response ? error.response.data : error.message);
    res.status(500).json({ error: 'Error al buscar recetas' });
  }
});

/*const NodeCache = require('node-cache');
const cache = new NodeCache({ stdTTL: 600 });  // TTL de 10 minutos

app.get('/api/recetas', async (req, res) => {
  const query = req.query.q || 'pasta';

  // Verificar en caché
  const cachedData = cache.get(query);
  if (cachedData) {
    return res.json(cachedData);
  }

  try {
    const response = await axios.get(`${SPOONACULAR_API_BASE_URL}/recipes/complexSearch`, {
      params: {
        apiKey: SPOONACULAR_API_KEY,
        query: query,
        number: 5,
      },
    });

    // Guardar la respuesta en caché
    cache.set(query, response.data);
    res.json(response.data);
  } catch (error) {
    console.error('Error al buscar recetas:', error.message);
    res.status(500).json({ error: 'Error al buscar recetas' });
  }
}); // Modificacion de URL de Api para guardar respuestas en cache 
*/

// TERMINO CONSULTA DE API SPOONACULAR


// Iniciar el servidor en el puerto 4000
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});


// Iniciar el servidor y conectar a la base de datos
startServer().catch(console.error);
