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

app.get('/api/recetas', authenticateToken, async (req, res) => {
  let query = req.query.q || 'recipes';  // Obtener el término de búsqueda

  // Convertir el término de búsqueda al inglés
  query = convertirIngredienteAEspanol(query);

  const time = req.query.time || null;  // Tiempo de preparación (opcional)
  const maxServings = req.query.maxServings || null;  // Máximo de porciones (opcional)
  const diet = req.query.diet || null;   // Dieta (opcional)

  try {
    const usuario = await usersCollection.findOne({ _id: new ObjectId(req.user.id) });

    const params = {
      apiKey: SPOONACULAR_API_KEY,
      query: query,
      number: 5,  // Número de recetas a devolver
      diet: usuario.diet || diet || null,
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

//============================================ALMACEN=============================================
//================================================================================================

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

// Ingresar alimentos en el almacén
app.post('/almacen/registro', authenticateToken, async (req, res) => {
  const { ingredientes } = req.body;
  try {
    const db = await connectToDatabase(); // Conectar a la base de datos
    await crearOActualizarAlmacen(db, req.user.id, ingredientes); // Utilizar la función para crear o actualizar el almacén
    res.status(200).json({ message: 'Alimentos registrados o actualizados en el almacén' });
  } catch (error) {
    console.error('Error al registrar alimentos:', error);
    res.status(500).json({ error: 'Error al registrar alimentos' });
  }
});

// Descontar alimento de almacén al preparar receta
app.post('/preparar-receta', authenticateToken, async (req, res) => {
  const { ingredientesUsados } = req.body; // Ingredientes y cantidades usados
  try {
    const db = await connectToDatabase(); // Conectar a la base de datos
    const almacen = await db.collection('almacen').findOne({ usuarioId: new ObjectId(req.user.id) });
    
    if (!almacen) {
      return res.status(404).json({ message: 'Almacén no encontrado' });
    }

    // Descontar los ingredientes usados
    ingredientesUsados.forEach(ingrediente => {
      const almacenIngrediente = almacen.ingredientes.find(item => item.nombre === ingrediente.nombre);
      if (almacenIngrediente) {
        almacenIngrediente.cantidad -= ingrediente.cantidadUsada;
      }
    });

    // Actualizar los ingredientes en la base de datos
    await db.collection('almacen').updateOne(
      { usuarioId: new ObjectId(req.user.id) },
      { $set: { ingredientes: almacen.ingredientes } }
    );

    res.status(200).json({ message: 'Ingredientes descontados del almacén' });
  } catch (error) {
    res.status(500).json({ error: 'Error al actualizar el almacén' });
  }
});


//============================================DESPERDICIO DE ALIMENTOS=============================================
//Funcion para revisar desperdicio de alimentos en almacen
const cron = require('node-cron');

// Tarea programada para revisar cada semana los alimentos perecederos
cron.schedule('0 0 * * 0', async () => {
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
  } catch (error) {
    console.error('Error al procesar el desperdicio:', error);
  }
});

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
