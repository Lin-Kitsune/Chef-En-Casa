const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { MongoClient, ObjectId } = require('mongodb');
const dotenv = require('dotenv');
const { authenticateToken, checkRole } = require('./middleware/authMiddleware'); 
const multer = require('multer'); // Middleware para manejar archivos
const fs = require('fs');
const path = require('path');
const connectToDatabase = require('./index');
const mongoose = require('mongoose'); // models/Notificacion.js (solo si usas Mongoose)
const { crearNotificacion } = require('./models/Notificaciones'); // Importa la función de crear notificación
const Convenio = require('./models/Convenio');
const Cupon = require('./models/Cupon');
const QRCode = require('qrcode');
const Actividades = require('./models/Actividades');


const NotificacionSchema = new mongoose.Schema({
  mensaje: { type: String, required: true },
  tipo: { type: String, enum: ['ingrediente', 'receta'], required: true },
  fecha: { type: Date, default: Date.now },
  visto: { type: Boolean, default: false }
});

module.exports = mongoose.model('Notificacion', NotificacionSchema);

const cuponSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  descripcion: { type: String },
  descuento: { type: Number, required: true },
  puntos_necesarios: { type: Number, required: true },
  fecha_expiracion: { type: Date, required: true },
  tienda: { type: String, required: true },
  qr_code: { type: String }
});

module.exports = mongoose.model('Cupon', cuponSchema);

dotenv.config();
const router = express.Router();
const uri = process.env.MONGO_URI;
const client = new MongoClient(uri);
const JWT_SECRET = process.env.JWT_SECRET || 'supersecretkey'; 

// Ruta para login de Admin
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    await client.connect();
    const db = client.db('chefencasa');
    const usersCollection = db.collection('usuarios');

    // Buscar al usuario administrador por email
    const adminUser = await usersCollection.findOne({ email, role: 'admin' });

    if (!adminUser) {
      return res.status(404).json({ error: 'Administrador no encontrado' });
    }

    // Verificar la contraseña
    const isMatch = await bcrypt.compare(password, adminUser.password);
    if (!isMatch) {
      return res.status(400).json({ error: 'Contraseña incorrecta' });
    }

    // Generar un token JWT para el Admin
    const token = jwt.sign({ id: adminUser._id, role: adminUser.role }, process.env.JWT_SECRET, {
      expiresIn: '2h',
    });

    // Enviar el token al cliente (admin frontend)
    res.json({ token, message: 'Inicio de sesión exitoso como administrador' });
  } catch (error) {
    console.error('Error en login de admin:', error);
    res.status(500).json({ error: 'Error en el servidor' });
  } finally {
    await client.close();
  }
});

// Ruta para obtener todos los usuarios
router.get('/usuarios', async (req, res) => {
  try {
    await client.connect();
    const db = client.db('chefencasa');
    const usersCollection = db.collection('usuarios');
    const usuarios = await usersCollection.find({}).toArray();
    res.status(200).json(usuarios);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener usuarios', error: error.message });
  } finally {
    await client.close();
  }
});

// Ruta para actualizar un usuario
router.put('/usuarios/:id', authenticateToken, checkRole('admin'), async (req, res) => {
  const { id } = req.params;
  const { nombre, email, password } = req.body;

  if (!nombre || !email) {
    return res.status(400).json({ message: 'El nombre y el email son obligatorios' });
  }

  try {
    await client.connect();
    const db = client.db('chefencasa');
    const usersCollection = db.collection('usuarios');

    const updateFields = { nombre, email };

    if (password) {
      const hashedPassword = await bcrypt.hash(password, 10);
      updateFields.password = hashedPassword;
    }

    const result = await usersCollection.updateOne(
      { _id: new ObjectId(id) },
      { $set: updateFields }
    );

    if (result.modifiedCount === 0) {
      return res.status(404).json({ message: 'Usuario no encontrado o sin cambios' });
    }

    res.status(200).json({ message: 'Usuario actualizado con éxito' });
  } catch (error) {
    console.error('Error al actualizar usuario:', error.message);
    res.status(500).json({ message: 'Error al actualizar usuario', error: error.message });
  } finally {
    await client.close();
  }
});

// Ruta para eliminar un usuario
router.delete('/usuarios/:id', authenticateToken, checkRole('admin'), async (req, res) => {
  const { id } = req.params;

  try {
    await client.connect();
    const db = client.db('chefencasa');
    const usersCollection = db.collection('usuarios');

    const result = await usersCollection.deleteOne({ _id: new ObjectId(id) });

    if (result.deletedCount === 0) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    res.status(200).json({ message: 'Usuario eliminado con éxito' });
  } catch (error) {
    console.error('Error al eliminar usuario:', error.message);
    res.status(500).json({ message: 'Error al eliminar usuario', error: error.message });
  } finally {
    await client.close();
  }
});

// Ruta para obtener estadísticas
router.get('/estadisticas', authenticateToken, checkRole('admin'), async (req, res) => {
  try {
    await client.connect();
    const db = client.db('chefencasa');

    const totalUsuarios = await db.collection('usuarios').countDocuments();
    const totalRecetas = await db.collection('recetas').countDocuments();
    const totalIngredientes = await db.collection('almacen').aggregate([
      { $unwind: '$ingredientes' },
      { $count: 'totalIngredientes' }
    ]).toArray();

    const ingredientesCount = totalIngredientes.length > 0 ? totalIngredientes[0].totalIngredientes : 0;

    res.status(200).json({
      totalUsuarios,
      totalRecetas,
      totalIngredientes: ingredientesCount
    });
  } catch (error) {
    console.error('Error al obtener estadísticas:', error.message);
    res.status(500).json({ message: 'Error al obtener estadísticas', error: error.message });
  } finally {
    await client.close();
  }
});

// Crear un nuevo usuario
router.post('/usuarios', authenticateToken, checkRole('admin'), async (req, res) => {
  const { nombre, email, password, role = 'user' } = req.body;

  if (!nombre || !email || !password) {
    return res.status(400).json({ message: 'Todos los campos son obligatorios' });
  }

  try {
    // Asegúrate de que la conexión a MongoDB está activa
    await client.connect();
    const db = client.db('chefencasa');
    
    // Definir correctamente la colección de usuarios
    const usersCollection = db.collection('usuarios');

    // Verificar si el usuario ya existe
    const usuarioExistente = await usersCollection.findOne({ email });
    if (usuarioExistente) {
      return res.status(400).json({ message: 'El usuario ya existe' });
    }

    // Hashear la contraseña
    const hashedPassword = await bcrypt.hash(password, 10);

    // Crear el nuevo usuario
    const nuevoUsuario = { nombre, email, password: hashedPassword, role };
    await usersCollection.insertOne(nuevoUsuario);

    res.status(201).json({ message: 'Usuario creado con éxito', usuario: { nombre, email, role } });
  } catch (error) {
    console.error('Error al crear usuario:', error.message);
    res.status(500).json({ message: 'Error al crear usuario', error: error.message });
  } finally {
    await client.close(); // Siempre cierra la conexión con la base de datos
  }
});
module.exports = router;
//========================================RECLAMOS=============================================
// Ruta para obtener todos los reclamos (admin)
router.get('/reclamos', authenticateToken, checkRole('admin'), async (req, res) => {
  try {
    await client.connect();
    const db = client.db('chefencasa');
    const reclamosCollection = db.collection('reclamos');

    // Obtener todos los reclamos
    const reclamos = await reclamosCollection.find({}).toArray();
    
    // Respuesta al frontend
    res.status(200).json(reclamos);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener los reclamos', error: error.message });
  } finally {
    await client.close();
  }
});

// Ruta para actualizar un reclamo (admin)
router.put('/reclamos/:id', authenticateToken, checkRole('admin'), async (req, res) => {
  const { id } = req.params;
  const { estado, respuesta } = req.body;

  if (!estado) {
    return res.status(400).json({ message: 'El estado es obligatorio' });
  }

  try {
    await client.connect();
    const db = client.db('chefencasa');
    const reclamosCollection = db.collection('reclamos');

    const result = await reclamosCollection.updateOne(
      { _id: new ObjectId(id) },
      { $set: { estado, respuesta, fechaRespuesta: new Date() } } // Cambiar estado y agregar respuesta
    );

    if (result.modifiedCount === 0) {
      return res.status(404).json({ message: 'Reclamo no encontrado o sin cambios' });
    }

    res.status(200).json({ message: 'Reclamo actualizado con éxito' });
  } catch (error) {
    res.status(500).json({ message: 'Error al actualizar el reclamo', error: error.message });
  } finally {
    await client.close();
  }
});
//=====================================================================================
// Verificar si la carpeta 'uploads' existe, si no, crearla
const uploadDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}

// Configuración de multer para manejar las imágenes
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    const filename = Date.now() + '-' + file.originalname;
    cb(null, filename); // Guardamos solo el nombre del archivo
  }
});
const upload = multer({ storage });

//===============================================
// CRUD Categorías 
// Se debe verificar las categorias, ya que los ingredientes no la traen, se debe eliminar por recomendacion para evitar inconsistencia en la llamada de los ingredientes 
//===============================================

// Ruta para agregar una nueva categoría
router.post('/categorias', authenticateToken, checkRole('admin'), async (req, res) => {
  const { nombre } = req.body;

  if (!nombre) {
    return res.status(400).json({ message: 'El nombre de la categoría es obligatorio' });
  }

  try {
    await client.connect();
    const db = client.db('chefencasa');
    const categoriasCollection = db.collection('categorias');

    // Verificar si la categoría ya existe
    const categoriaExistente = await categoriasCollection.findOne({ nombre });
    if (categoriaExistente) {
      return res.status(400).json({ message: 'La categoría ya existe' });
    }

    // Crear nueva categoría
    const nuevaCategoria = {
      nombre,
      fechaCreacion: new Date(),
    };

    await categoriasCollection.insertOne(nuevaCategoria);

    res.status(201).json({ message: 'Categoría agregada exitosamente', categoria: nuevaCategoria });
  } catch (error) {
    console.error('Error al agregar categoría:', error);
    res.status(500).json({ message: 'Error al agregar categoría' });
  } finally {
    await client.close();
  }
});

// Ruta para obtener todas las categorías
router.get('/categorias', authenticateToken, async (req, res) => {
  try {
    await client.connect();
    const db = client.db('chefencasa');
    const categoriasCollection = db.collection('categorias');

    const categorias = await categoriasCollection.find().toArray();
    res.status(200).json(categorias);
  } catch (error) {
    console.error('Error al obtener categorías:', error);
    res.status(500).json({ message: 'Error al obtener categorías' });
  } finally {
    await client.close();
  }
});

// Ruta para actualizar una categoría
router.put('/categorias/:id', authenticateToken, checkRole('admin'), async (req, res) => {
  const { id } = req.params;
  const { nombre } = req.body;

  if (!nombre) {
    return res.status(400).json({ message: 'El nombre de la categoría es obligatorio' });
  }

  try {
    await client.connect();
    const db = client.db('chefencasa');
    const categoriasCollection = db.collection('categorias');

    const result = await categoriasCollection.updateOne(
      { _id: new ObjectId(id) },
      { $set: { nombre } }
    );

    if (result.modifiedCount === 0) {
      return res.status(404).json({ message: 'Categoría no encontrada o sin cambios' });
    }

    res.status(200).json({ message: 'Categoría actualizada exitosamente' });
  } catch (error) {
    console.error('Error al actualizar categoría:', error);
    res.status(500).json({ message: 'Error al actualizar categoría' });
  } finally {
    await client.close();
  }
});

// Ruta para eliminar una categoría
router.delete('/categorias/:id', authenticateToken, checkRole('admin'), async (req, res) => {
  const { id } = req.params;

  try {
    await client.connect();
    const db = client.db('chefencasa');
    const categoriasCollection = db.collection('categorias');

    const result = await categoriasCollection.deleteOne({ _id: new ObjectId(id) });

    if (result.deletedCount === 0) {
      return res.status(404).json({ message: 'Categoría no encontrada' });
    }

    res.status(200).json({ message: 'Categoría eliminada exitosamente' });
  } catch (error) {
    console.error('Error al eliminar categoría:', error);
    res.status(500).json({ message: 'Error al eliminar categoría' });
  } finally {
    await client.close();
  }
});
//===============================================
// CRUD Ingredientes
//===============================================

// Ruta para agregar un nuevo ingrediente (asociado a una categoría, con notificación)
router.post('/ingredientes', authenticateToken, checkRole('admin'), upload.single('imagen'), async (req, res) => {
  const { nombre } = req.body;
  const imagen = req.file ? req.file.path : null;

  if (!nombre) {
    return res.status(400).json({ message: 'El nombre es obligatorio' });
  }

  try {
    await client.connect();
    const db = client.db('chefencasa');
    const ingredientesCollection = db.collection('ingredientes');
    const notificacionesCollection = db.collection('notificaciones'); // Colección de notificaciones

    // Verificar si el ingrediente ya existe
    const ingredienteExistente = await ingredientesCollection.findOne({ nombre });
    if (ingredienteExistente) {
      return res.status(400).json({ message: 'El ingrediente ya existe' });
    }

    // Crear el nuevo ingrediente
    const nuevoIngrediente = {
      nombre,
      imagen,
      fechaCreacion: new Date(),
    };
    await ingredientesCollection.insertOne(nuevoIngrediente);

    // Crear una notificación
    const notificacion = {
      mensaje: `Nuevo ingrediente agregado: ${nombre}`,
      tipo: 'ingrediente',
      fecha: new Date(),
      visto: false
    };
    await notificacionesCollection.insertOne(notificacion);

    res.status(201).json({ message: 'Ingrediente agregado y notificación creada', ingrediente: nuevoIngrediente });
  } catch (error) {
    console.error('Error al agregar ingrediente:', error);
    res.status(500).json({ message: 'Error al agregar ingrediente' });
  } finally {
    await client.close();
  }
});


// Obtener todos los ingredientes
router.get('/ingredientes', authenticateToken, async (req, res) => {
  try {
    await client.connect();
    const db = client.db('chefencasa');
    const ingredientesCollection = db.collection('ingredientes');

    const ingredientes = await ingredientesCollection.find({}).toArray();
    res.status(200).json(ingredientes);
  } catch (error) {
    console.error('Error al obtener ingredientes:', error.message);
    res.status(500).json({ message: 'Error al obtener los ingredientes' });
  } finally {
    await client.close();
  }
});

// Obtener un ingrediente por ID
router.get('/ingredientes/:id', authenticateToken, async (req, res) => {
  const { id } = req.params;

  try {
    await client.connect();
    const db = client.db('chefencasa');
    const ingredientesCollection = db.collection('ingredientes');

    const ingrediente = await ingredientesCollection.findOne({ _id: new ObjectId(id) });
    if (!ingrediente) {
      return res.status(404).json({ message: 'Ingrediente no encontrado' });
    }

    res.status(200).json(ingrediente);
  } catch (error) {
    console.error('Error al obtener ingrediente:', error.message);
    res.status(500).json({ message: 'Error al obtener el ingrediente' });
  } finally {
    await client.close();
  }
});

// Actualizar un ingrediente por ID
router.put('/ingredientes/:id', authenticateToken, checkRole('admin'), async (req, res) => {
  const { id } = req.params;
  const { nombre, imagen } = req.body;

  if (!nombre) {
    return res.status(400).json({ message: 'El nombre es obligatorio' });
  }

  try {
    await client.connect();
    const db = client.db('chefencasa');
    const ingredientesCollection = db.collection('ingredientes');

    const resultado = await ingredientesCollection.updateOne(
      { _id: new ObjectId(id) },
      { $set: { nombre, imagen: imagen || null } }
    );

    if (resultado.matchedCount === 0) {
      return res.status(404).json({ message: 'Ingrediente no encontrado' });
    }

    res.status(200).json({ message: 'Ingrediente actualizado con éxito' });
  } catch (error) {
    console.error('Error al actualizar ingrediente:', error.message);
    res.status(500).json({ message: 'Error al actualizar el ingrediente' });
  } finally {
    await client.close();
  }
});

// Eliminar un ingrediente por ID
router.delete('/ingredientes/:id', authenticateToken, checkRole('admin'), async (req, res) => {
  const { id } = req.params;

  try {
    await client.connect();
    const db = client.db('chefencasa');
    const ingredientesCollection = db.collection('ingredientes');

    const resultado = await ingredientesCollection.deleteOne({ _id: new ObjectId(id) });
    if (resultado.deletedCount === 0) {
      return res.status(404).json({ message: 'Ingrediente no encontrado' });
    }

    res.status(200).json({ message: 'Ingrediente eliminado con éxito' });
  } catch (error) {
    console.error('Error al eliminar ingrediente:', error.message);
    res.status(500).json({ message: 'Error al eliminar el ingrediente' });
  } finally {
    await client.close();
  }
});

//Verificar campó Type: aqui se agrega si es dinner, lunch, breakfast o snack. Agregar este campo. 
//=====================================================================================
// ======================= CRUD DE RECETAS =======================

// Crear una receta con notificación
router.post('/recetas', authenticateToken, checkRole('admin'), upload.single('imagen'), async (req, res) => {
  const { titulo, duracion, ingredientes, porciones, paso, valoracion, dishTypes, nutrition } = req.body;
  const imagen = req.file ? req.file.path : null;

  // Validar campos obligatorios
  if (!titulo || !duracion || !ingredientes || !paso) {
    return res.status(400).json({ message: 'Todos los campos obligatorios deben ser completados' });
  }

  try {
    // Validar y convertir datos recibidos
    let ingredientesArray = [];
    let pasosFinal = [];
    let dishTypesArray = [];
    let nutritionData = {};

    try {
      ingredientesArray = JSON.parse(ingredientes);
      pasosFinal = JSON.parse(paso);
      dishTypesArray = dishTypes ? JSON.parse(dishTypes) : [];
      nutritionData = nutrition ? JSON.parse(nutrition) : {};
    } catch (err) {
      return res.status(400).json({ 
        message: 'Error en el formato de los datos enviados',
        error: err.message,
      });
    }

    // Validar que ingredientes y pasos no estén vacíos
    if (!ingredientesArray.length || !pasosFinal.length) {
      return res.status(400).json({
        message: 'Los campos de ingredientes y pasos no pueden estar vacíos',
      });
    }

    await client.connect();
    const db = client.db('chefencasa');
    const ingredientesCollection = db.collection('ingredientes');
    const recetasCollection = db.collection('recetas');
    const notificacionesCollection = db.collection('notificaciones'); // Colección de notificaciones

    // Validar que todos los ingredientes existen en la base de datos
    const ingredientesValidos = await ingredientesCollection.find({
      nombre: { $in: ingredientesArray.map(i => i.nombre) }
    }).toArray();

    if (ingredientesValidos.length !== ingredientesArray.length) {
      const ingredientesInvalidos = ingredientesArray.filter(
        i => !ingredientesValidos.find(iv => iv.nombre === i.nombre)
      );
      return res.status(400).json({
        message: 'Uno o más ingredientes no existen en la base de datos',
        detalles: ingredientesInvalidos.map(i => i.nombre),
      });
    }

    // Formatear ingredientes con la cantidad
    const ingredientesFinal = ingredientesArray.map(i => {
      const ingredienteValido = ingredientesValidos.find(iv => iv.nombre === i.nombre);
      return {
        id: ingredienteValido._id, // Asociar el ID del ingrediente
        nombre: ingredienteValido.nombre,
        cantidad: i.cantidad,
      };
    });

    // Crear el objeto de la nueva receta
    const nuevaReceta = {
      titulo,
      duracion: Number(duracion),
      valoracion: valoracion ? Number(valoracion) : 0,
      porciones: porciones ? Number(porciones) : 0,
      ingredientes: ingredientesFinal,
      pasos: pasosFinal,
      dishTypes: dishTypesArray,
      nutrition: nutritionData,
      imagen,
      fechaCreacion: new Date(),
    };

    // Guardar en la base de datos
    const resultado = await recetasCollection.insertOne(nuevaReceta);

    // Crear una notificación
    const notificacion = {
      mensaje: `Nueva receta agregada: ${titulo}`,
      tipo: 'receta',
      fecha: new Date(),
      visto: false,
    };
    await notificacionesCollection.insertOne(notificacion);

    res.status(201).json({
      message: 'Receta creada y notificación generada',
      receta: nuevaReceta,
      recetaId: resultado.insertedId,
    });
  } catch (error) {
    console.error('Error al crear receta:', error);
    res.status(500).json({ 
      message: 'Error al crear receta',
      error: error.message,
    });
  } finally {
    await client.close();
  }
});

// Obtener todas las recetas
router.get('/recetas', authenticateToken, async (req, res) => {
  try {
    await client.connect();
    const db = client.db('chefencasa');
    const recetasCollection = db.collection('recetas');
    
    const recetas = await recetasCollection.find({}).toArray();
    res.status(200).json(recetas);
  } catch (error) {
    console.error('Error al obtener recetas:', error);
    res.status(500).json({ message: 'Error al obtener recetas', error: error.message });
  } finally {
    await client.close();
  }
});

// Obtener una receta por su ID
router.get('/recetas/:id', authenticateToken, async (req, res) => {
  const { id } = req.params;

  try {
    await client.connect();
    const db = client.db('chefencasa');
    const recetasCollection = db.collection('recetas');
    
    const receta = await recetasCollection.findOne({ _id: new ObjectId(id) });
    if (!receta) {
      return res.status(404).json({ message: 'Receta no encontrada' });
    }

    res.status(200).json(receta);
  } catch (error) {
    console.error('Error al obtener receta:', error);
    res.status(500).json({ message: 'Error al obtener receta', error: error.message });
  } finally {
    await client.close();
  }
});

// Actualizar una receta
router.put('/recetas/:id', authenticateToken, checkRole('admin'), upload.single('imagen'), async (req, res) => {
  const { id } = req.params;
  const { titulo, duracion, ingredientes, porciones, paso, valoracion, dishTypes, nutrition } = req.body;
  const imagen = req.file ? req.file.path : null;

  // Validar campos obligatorios
  if (!titulo || !duracion || !ingredientes || !paso) {
    return res.status(400).json({ message: 'Todos los campos obligatorios deben ser completados' });
  }

  try {
    await client.connect();
    const db = client.db('chefencasa');
    const recetasCollection = db.collection('recetas');
    const ingredientesCollection = db.collection('ingredientes');

    // Validar y procesar datos recibidos
    let ingredientesArray = [];
    let pasosFinal = [];
    let dishTypesArray = [];
    let nutritionData = {};

    try {
      ingredientesArray = JSON.parse(ingredientes);
      pasosFinal = JSON.parse(paso);
      dishTypesArray = dishTypes ? JSON.parse(dishTypes) : [];
      nutritionData = nutrition ? JSON.parse(nutrition) : {};
    } catch (err) {
      return res.status(400).json({ 
        message: 'Error en el formato de los datos enviados',
        error: err.message,
      });
    }

    // Validar que los arrays no estén vacíos
    if (!ingredientesArray.length || !pasosFinal.length) {
      return res.status(400).json({ message: 'Los campos de ingredientes y pasos no pueden estar vacíos' });
    }

    // Validar ingredientes existentes en la base de datos
    const ingredientesValidos = await ingredientesCollection.find({
      nombre: { $in: ingredientesArray.map((i) => i.nombre) },
    }).toArray();

    if (ingredientesValidos.length !== ingredientesArray.length) {
      const ingredientesInvalidos = ingredientesArray.filter(
        (i) => !ingredientesValidos.find((iv) => iv.nombre === i.nombre)
      );
      return res.status(400).json({
        message: 'Uno o más ingredientes no existen en la base de datos',
        detalles: ingredientesInvalidos.map((i) => i.nombre),
      });
    }

    // Formatear ingredientes con los datos correctos
    const ingredientesFinal = ingredientesArray.map((i) => {
      const ingredienteValido = ingredientesValidos.find((iv) => iv.nombre === i.nombre);
      return {
        id: ingredienteValido._id,
        nombre: ingredienteValido.nombre,
        cantidad: i.cantidad,
      };
    });

    // Construir el objeto actualizado de la receta
    const recetaActualizada = {
      titulo,
      duracion: Number(duracion),
      valoracion: valoracion ? Number(valoracion) : 0,
      porciones: porciones ? Number(porciones) : 0,
      ingredientes: ingredientesFinal,
      pasos: pasosFinal,
      dishTypes: dishTypesArray,
      nutrition: nutritionData,
      imagen: imagen || req.body.imagenAnterior, // Usar la imagen anterior si no se envió una nueva
    };

    // Actualizar la receta en la base de datos
    const result = await recetasCollection.updateOne(
      { _id: new ObjectId(id) },
      { $set: recetaActualizada }
    );

    if (result.matchedCount === 0) {
      return res.status(404).json({ message: 'Receta no encontrada' });
    }

    res.status(200).json({ message: 'Receta actualizada con éxito', receta: recetaActualizada });
  } catch (error) {
    console.error('Error al actualizar receta:', error);
    res.status(500).json({ message: 'Error al actualizar receta', error: error.message });
  } finally {
    await client.close();
  }
});

// Eliminar una receta
router.delete('/recetas/:id', authenticateToken, checkRole('admin'), async (req, res) => {
  const { id } = req.params;

  try {
    await client.connect();
    const db = client.db('chefencasa');
    const recetasCollection = db.collection('recetas');

    const result = await recetasCollection.deleteOne({ _id: new ObjectId(id) });
    if (result.deletedCount === 0) {
      return res.status(404).json({ message: 'Receta no encontrada' });
    }

    res.status(200).json({ message: 'Receta eliminada con éxito' });
  } catch (error) {
    console.error('Error al eliminar receta:', error);
    res.status(500).json({ message: 'Error al eliminar receta', error: error.message });
  } finally {
    await client.close();
  }
});
//=====================================================================================
// Endpoint para obtener todas las notificaciones
router.get('/notificaciones', authenticateToken, async (req, res) => {
  try {
    await client.connect();
    const db = client.db('chefencasa');
    const notificacionesCollection = db.collection('notificaciones');

    // Obtiene todas las notificaciones
    const notificaciones = await notificacionesCollection.find().sort({ fecha: -1 }).toArray();
    res.status(200).json(notificaciones);
  } catch (error) {
    console.error('Error al obtener notificaciones:', error);
    res.status(500).json({ message: 'Error al obtener notificaciones' });
  } finally {
    await client.close();
  }
});


//==============================CONVENIOS==========================================
// Crear un convenio
router.post('/convenios', authenticateToken, checkRole('admin'), upload.single('imagen'), async (req, res) => {
  const { empresa, producto, descripcion, precio } = req.body;
  const imagen = req.file ? req.file.path : null;

  // Validar campos obligatorios
  if (!empresa || !producto || !descripcion || !precio) {
    return res.status(400).json({ message: 'Todos los campos son obligatorios, incluyendo el precio' });
  }

  try {
    await client.connect();
    const db = client.db('chefencasa');
    const convenioModel = new Convenio(db);
    const notificacionesCollection = db.collection('notificaciones'); // Para crear notificaciones

    // Crear el convenio
    const nuevoConvenio = {
      empresa,
      producto,
      descripcion,
      precio,  // Aquí se agrega el campo precio
      imagen,
      fechaCreacion: new Date(),
    };

    await convenioModel.create(nuevoConvenio);

    // Crear una notificación
    const notificacion = {
      mensaje: `Nuevo convenio creado: ${empresa} - ${producto}`,
      tipo: 'convenio',
      fecha: new Date(),
      visto: false,
    };
    await notificacionesCollection.insertOne(notificacion);

    res.status(201).json({ message: 'Convenio creado exitosamente', convenio: nuevoConvenio });
  } catch (error) {
    console.error('Error al crear convenio:', error);
    res.status(500).json({ message: 'Error al crear convenio', error: error.message });
  } finally {
    await client.close();
  }
}); 

// Obtener todos los convenios
router.get('/convenios', authenticateToken, async (req, res) => {
  try {
    await client.connect();
    const db = client.db('chefencasa');
    const convenioModel = new Convenio(db);

    const convenios = await convenioModel.findAll();
    res.status(200).json(convenios);
  } catch (error) {
    console.error('Error al obtener convenios:', error);
    res.status(500).json({ message: 'Error al obtener convenios', error: error.message });
  } finally {
    await client.close();
  }
});

// Obtener un convenio por ID
router.get('/convenios/:id', authenticateToken, async (req, res) => {
  const { id } = req.params;

  try {
    if (!ObjectId.isValid(id)) {
      return res.status(400).json({ message: 'ID inválido' });
    }

    await client.connect();
    const db = client.db('chefencasa');
    const convenioModel = new Convenio(db);

    const convenio = await convenioModel.findById(id);
    if (!convenio) {
      return res.status(404).json({ message: 'Convenio no encontrado' });
    }

    res.status(200).json(convenio);
  } catch (error) {
    console.error('Error al obtener convenio:', error);
    res.status(500).json({ message: 'Error al obtener convenio', error: error.message });
  } finally {
    await client.close();
  }
});

// Actualizar un convenio por ID
router.put('/convenios/:id', authenticateToken, checkRole('admin'), upload.single('imagen'), async (req, res) => {
  const { id } = req.params;
  const { empresa, producto, descripcion } = req.body;
  const imagen = req.file ? req.file.path : null;

  // Validar campos obligatorios
  if (!empresa || !producto || !descripcion) {
    return res.status(400).json({ message: 'Todos los campos son obligatorios' });
  }

  try {
    if (!ObjectId.isValid(id)) {
      return res.status(400).json({ message: 'ID inválido' });
    }

    await client.connect();
    const db = client.db('chefencasa');
    const convenioModel = new Convenio(db);

    const updateData = {
      empresa,
      producto,
      descripcion,
      precio,
      ...(imagen && { imagen }), // Solo incluye imagen si existe
    };

    const result = await convenioModel.update(id, updateData);

    if (result.modifiedCount === 0) {
      return res.status(404).json({ message: 'Convenio no encontrado o sin cambios' });
    }

    res.status(200).json({ message: 'Convenio actualizado exitosamente' });
  } catch (error) {
    console.error('Error al actualizar convenio:', error);
    res.status(500).json({ message: 'Error al actualizar convenio', error: error.message });
  } finally {
    await client.close();
  }
});

// Eliminar un convenio por ID
router.delete('/convenios/:id', authenticateToken, checkRole('admin'), async (req, res) => {
  const { id } = req.params;

  try {
    // Verificar si el ID es válido
    if (!ObjectId.isValid(id)) {
      return res.status(400).json({ message: 'ID inválido' });
    }

    await client.connect();  // Conectar a la base de datos antes de realizar la operación
    const db = client.db('chefencasa'); // Conexión a la base de datos
    const convenioModel = new Convenio(db); // Usar el modelo para interactuar con la colección

    // Intentar eliminar el convenio
    const result = await convenioModel.delete(id);

    // Verificar si el convenio fue encontrado y eliminado
    if (result.deletedCount === 0) {
      return res.status(404).json({ message: 'Convenio no encontrado' });
    }

    // Respuesta exitosa
    res.status(200).json({ message: 'Convenio eliminado exitosamente' });
  } catch (error) {
    console.error('Error al eliminar convenio:', error);
    res.status(500).json({ message: 'Error al eliminar convenio', error: error.message });
  } finally {
    await client.close(); // Cerrar la conexión después de completar la operación
  }
});

//==============================CUPONES==========================================
// Crear un nuevo cupón con QR generado automáticamente
router.post('/cupones', authenticateToken, checkRole('admin'), async (req, res) => {
  const { nombre, descripcion, descuento, puntos_necesarios, fecha_expiracion, tienda } = req.body;

  if (!nombre || !descuento || !puntos_necesarios || !fecha_expiracion || !tienda) {
    return res.status(400).json({ message: 'Todos los campos obligatorios deben completarse' });
  }

  try {
    const db = client.db('chefencasa');
    const cuponModel = new Cupon(db);

    // Generar QR
    const qrData = `${nombre} - Descuento: ${descuento}% - Puntos necesarios: ${puntos_necesarios}`;
    const qrCode = await QRCode.toDataURL(qrData);

    const nuevoCupon = {
      nombre,
      descripcion,
      descuento,
      puntos_necesarios,
      fecha_expiracion: new Date(fecha_expiracion),
      tienda,
      qr_code: qrCode,
    };

    const result = await cuponModel.create(nuevoCupon);
    res.status(201).json({ message: 'Cupón creado exitosamente', cupon: result });
  } catch (error) {
    console.error('Error al crear cupón:', error);
    res.status(500).json({ message: 'Error al crear cupón' });
  }
});

// Obtener todos los cupones
router.get('/cupones', authenticateToken, checkRole('admin'), async (req, res) => {
  try {
    const db = client.db('chefencasa');
    const cuponModel = new Cupon(db);

    const cupones = await cuponModel.findAll();
    res.status(200).json(cupones);
  } catch (error) {
    console.error('Error al obtener cupones:', error);
    res.status(500).json({ message: 'Error al obtener cupones' });
  }
});

// Obtener un cupón por ID
router.get('/cupones/:id', authenticateToken, checkRole('admin'), async (req, res) => {
  const { id } = req.params;

  try {
    const db = client.db('chefencasa');
    const cuponModel = new Cupon(db);

    const cupon = await cuponModel.findById(id);
    if (!cupon) {
      return res.status(404).json({ message: 'Cupón no encontrado' });
    }

    res.status(200).json(cupon);
  } catch (error) {
    console.error('Error al obtener cupón:', error);
    res.status(500).json({ message: 'Error al obtener cupón' });
  }
});

// Actualizar un cupón por ID
router.put('/cupones/:id', authenticateToken, checkRole('admin'), async (req, res) => {
  const { id } = req.params;
  const { nombre, descripcion, descuento, puntos_necesarios, fecha_expiracion, tienda } = req.body;

  if (!nombre || !descuento || !puntos_necesarios || !fecha_expiracion || !tienda) {
    return res.status(400).json({ message: 'Todos los campos obligatorios deben completarse' });
  }

  try {
    const db = client.db('chefencasa');
    const cuponModel = new Cupon(db);

    const updateData = {
      nombre,
      descripcion,
      descuento,
      puntos_necesarios,
      fecha_expiracion: new Date(fecha_expiracion),
      tienda,
    };

    const result = await cuponModel.update(id, updateData);

    if (result.modifiedCount === 0) {
      return res.status(404).json({ message: 'Cupón no encontrado o sin cambios' });
    }

    res.status(200).json({ message: 'Cupón actualizado exitosamente' });
  } catch (error) {
    console.error('Error al actualizar cupón:', error);
    res.status(500).json({ message: 'Error al actualizar cupón' });
  }
});

// Eliminar un cupón por ID
router.delete('/cupones/:id', authenticateToken, checkRole('admin'), async (req, res) => {
  const { id } = req.params;

  try {
    const db = client.db('chefencasa');
    const cuponModel = new Cupon(db);

    const result = await cuponModel.delete(id);

    if (result.deletedCount === 0) {
      return res.status(404).json({ message: 'Cupón no encontrado' });
    }

    res.status(200).json({ message: 'Cupón eliminado exitosamente' });
  } catch (error) {
    console.error('Error al eliminar cupón:', error);
    res.status(500).json({ message: 'Error al eliminar cupón' });
  }
});

// Rutas para gráficos del panel de administración
// ==========================================
// Contabilizar ingredientes más almacenados por los usuarios
router.get('/admin/ingredientes-mas-almacenados', authenticateToken, checkRole('admin'), async (req, res) => {
  const { rango, mes, anio } = req.query; // Recibir rango, mes y año como parámetros
  try {
    const db = await connectToDatabase();
    console.log('Base de datos conectada:', db);

    // Calcular rango de fechas basado en el rango, mes y año proporcionados
    const rangoFechas = calcularRangoFechas(rango, parseInt(mes), parseInt(anio));
    console.log('Rango de fechas:', rangoFechas);

    const ingredientesMasAlmacenados = await db.collection('almacen').aggregate([
      { $unwind: '$ingredientes' }, // Descomponer el array de ingredientes
      { 
        $match: { 
          'ingredientes.fechaIngreso': { $gte: rangoFechas.startDate, $lte: rangoFechas.endDate } 
        } 
      }, // Filtrar por rango de fechas
      {
        $group: {
          _id: '$ingredientes.nombre', // Agrupar por nombre de ingrediente
          totalCantidad: { $sum: '$ingredientes.cantidad' } // Sumar las cantidades
        }
      },
      { $sort: { totalCantidad: -1 } }, // Ordenar de mayor a menor
      { $limit: 10 } // Limitar a los 10 más almacenados
    ]).toArray();

    res.status(200).json(ingredientesMasAlmacenados);
  } catch (error) {
    console.error('Error al obtener ingredientes más almacenados:', error.message);
    res.status(500).json({ message: 'Error al obtener ingredientes más almacenados.', error: error.message });
  }
});

// Contabilizar ingredientes más usados por los usuarios
router.get('/ingredientes-mas-usados', authenticateToken, checkRole('admin'), async (req, res) => {
  const { rango, mes, anio } = req.query;

  try {
    await client.connect();
    const db = client.db('chefencasa');

    // Calcular el rango de fechas
    const { startDate, endDate } = calcularRangoFechas(rango, parseInt(mes), parseInt(anio));

    // Agregar la consulta para la colección IngredientesUsados
    const ingredientesMasUsados = await db.collection('IngredientesUsados').aggregate([
      {
        $match: {
          fecha: { $gte: startDate, $lte: endDate }, // Filtrar por fechas
        },
      },
      {
        $group: {
          _id: '$nombre',  // Agrupar por nombre del ingrediente
          totalCantidad: { $sum: '$cantidad' },  // Sumar la cantidad total usada de cada ingrediente
        },
      },
      { $sort: { totalCantidad: -1 } },  // Ordenar de mayor a menor cantidad usada
      { $limit: 10 },  // Limitar a los 10 ingredientes más usados
    ]).toArray();

    // Verifica que los datos fueron obtenidos correctamente
    if (ingredientesMasUsados.length > 0) {
      res.status(200).json(ingredientesMasUsados);
    } else {
      res.status(404).json({ message: 'No se encontraron ingredientes más usados' });
    }
  } catch (error) {
    console.error('Error al obtener ingredientes más usados:', error.message);
    res.status(500).json({ message: 'Error al obtener ingredientes más usados', error: error.message });
  }
});

/// Obtener la cantidad de usuarios activos por rango de tiempo
router.get('/usuarios-activos', authenticateToken, async (req, res) => {
  try {
    const db = client.db('chefencasa'); // Obtener la base de datos
    const { rango, mes, anio } = req.query;

    if (!rango) {
      return res.status(400).json({ message: 'El parámetro "rango" es requerido' });
    }

    // Calcular el rango de fechas
    const { startDate, endDate } = calcularRangoFechas(rango, parseInt(mes), parseInt(anio));

    const actividades = await db.collection('actividades').aggregate([
      {
        $match: {
          tipo: 'login', // Solo actividades de tipo 'login'
          fecha: { $gte: startDate, $lte: endDate },
        },
      },
      {
        $group: {
          _id: { $dateToString: { format: '%Y-%m-%d', date: '$fecha' } },
          usuarios: { $addToSet: '$usuarioId' }, // Agrupar usuarios únicos
        },
      },
      {
        $project: {
          _id: 1, // Fecha
          cantidadUsuarios: { $size: '$usuarios' }, // Cantidad de usuarios únicos
        },
      },
      { $sort: { _id: 1 } }, // Ordenar por fecha
    ]).toArray();

    res.status(200).json(actividades);
  } catch (error) {
    console.error('Error al obtener usuarios activos:', error.message);
    res.status(500).json({ message: 'Error al obtener usuarios activos', error: error.message });
  }
});

// ==========================================
// Función auxiliar para calcular rangos de fechas
// ==========================================
function calcularRangoFechas(rango, mes, anio) {
  const ahora = new Date();
  const rangoFechas = {};

  if (rango === 'diario') {
    rangoFechas.startDate = new Date(ahora.setHours(0, 0, 0, 0)); // Inicio del día
    rangoFechas.endDate = new Date(ahora.setHours(23, 59, 59, 999)); // Fin del día
  } else if (rango === 'semanal') {
    const startOfWeek = new Date(ahora.setDate(ahora.getDate() - ahora.getDay())); // Inicio de la semana
    rangoFechas.startDate = new Date(startOfWeek.setHours(0, 0, 0, 0));
    rangoFechas.endDate = new Date(ahora.setHours(23, 59, 59, 999));
  } else if (rango === 'mensual') {
    // Si se proporciona mes y año, usar esos valores
    const year = anio || ahora.getFullYear(); // Por defecto, el año actual
    const month = typeof mes !== 'undefined' ? mes - 1 : ahora.getMonth(); // Por defecto, el mes actual

    rangoFechas.startDate = new Date(year, month, 1); // Inicio del mes especificado
    rangoFechas.endDate = new Date(year, month + 1, 0, 23, 59, 59, 999); // Fin del mes especificado
  } else {
    throw new Error('Rango no válido');
  }

  return rangoFechas;
}

//==============================SabiasQue==========================================
// Crear un "Sabías Que"
router.post('/sabias-que', authenticateToken, checkRole('admin'), upload.single('imagen'), async (req, res) => {
  const { titulo, descripcion, beneficio } = req.body;
  const imagen = req.file ? req.file.path : null;

  // Validar campos obligatorios
  if (!titulo || !descripcion || !beneficio) {
    return res.status(400).json({ message: 'Título, Descripción y Beneficio son obligatorios' });
  }

  try {
    await client.connect();
    const db = client.db('chefencasa');
    const sabiasQueModel = new SabiasQue(db); // Usamos un modelo específico para "Sabías Que"

    // Crear el "Sabías Que"
    const nuevoSabiasQue = {
      titulo,
      descripcion,
      beneficio, // Solo el beneficio relacionado con la salud
      imagen,
      fechaCreacion: new Date(),
    };

    await sabiasQueModel.create(nuevoSabiasQue);

    res.status(201).json({ message: 'Sabías Que creado exitosamente', sabiasQue: nuevoSabiasQue });
  } catch (error) {
    console.error('Error al crear Sabías Que:', error);
    res.status(500).json({ message: 'Error al crear Sabías Que', error: error.message });
  } finally {
    await client.close();
  }
});

// Obtener todos los "Sabías Que"
router.get('/sabias-que', authenticateToken, async (req, res) => {
  try {
    await client.connect();
    const db = client.db('chefencasa');
    const sabiasQueModel = new SabiasQue(db);

    const sabiasQueList = await sabiasQueModel.findAll();
    res.status(200).json(sabiasQueList);
  } catch (error) {
    console.error('Error al obtener Sabías Que:', error);
    res.status(500).json({ message: 'Error al obtener Sabías Que', error: error.message });
  } finally {
    await client.close();
  }
});

// Obtener un "Sabías Que" por ID
router.get('/sabias-que/:id', authenticateToken, async (req, res) => {
  const { id } = req.params;

  try {
    if (!ObjectId.isValid(id)) {
      return res.status(400).json({ message: 'ID inválido' });
    }

    await client.connect();
    const db = client.db('chefencasa');
    const sabiasQueModel = new SabiasQue(db);

    const sabiasQue = await sabiasQueModel.findById(id);
    if (!sabiasQue) {
      return res.status(404).json({ message: 'Sabías Que no encontrado' });
    }

    res.status(200).json(sabiasQue);
  } catch (error) {
    console.error('Error al obtener Sabías Que:', error);
    res.status(500).json({ message: 'Error al obtener Sabías Que', error: error.message });
  } finally {
    await client.close();
  }
});

// Actualizar un "Sabías Que" por ID
router.put('/sabias-que/:id', authenticateToken, checkRole('admin'), upload.single('imagen'), async (req, res) => {
  const { id } = req.params;
  const { titulo, descripcion, beneficio } = req.body;
  const imagen = req.file ? req.file.path : null;

  // Validar campos obligatorios
  if (!titulo || !descripcion || !beneficio) {
    return res.status(400).json({ message: 'Título, Descripción y Beneficio son obligatorios' });
  }

  try {
    if (!ObjectId.isValid(id)) {
      return res.status(400).json({ message: 'ID inválido' });
    }

    await client.connect();
    const db = client.db('chefencasa');
    const sabiasQueModel = new SabiasQue(db);

    const updateData = {
      titulo,
      descripcion,
      beneficio, // Solo el beneficio relacionado con la salud
      ...(imagen && { imagen }), // Solo incluir imagen si existe
    };

    const result = await sabiasQueModel.update(id, updateData);

    if (result.modifiedCount === 0) {
      return res.status(404).json({ message: 'Sabías Que no encontrado o sin cambios' });
    }

    res.status(200).json({ message: 'Sabías Que actualizado exitosamente' });
  } catch (error) {
    console.error('Error al actualizar Sabías Que:', error);
    res.status(500).json({ message: 'Error al actualizar Sabías Que', error: error.message });
  } finally {
    await client.close();
  }
});

// Eliminar un "Sabías Que" por ID
router.delete('/sabias-que/:id', authenticateToken, checkRole('admin'), async (req, res) => {
  const { id } = req.params;

  try {
    // Validar si el ID es válido
    if (!ObjectId.isValid(id)) {
      return res.status(400).json({ message: 'ID inválido' });
    }

    // Conexión directa a la base de datos
    const db = client.db('chefencasa');  // Usa tu cliente global 'client' que está conectado
    const sabiasQueModel = new SabiasQue(db);  // Instanciamos el modelo con la base de datos

    // Intentar eliminar el "Sabías Que"
    const result = await sabiasQueModel.delete(id);

    // Verificar si el "Sabías Que" fue encontrado y eliminado
    if (result.deletedCount === 0) {
      return res.status(404).json({ message: 'Sabías Que no encontrado' });
    }

    // Respuesta exitosa
    res.status(200).json({ message: 'Sabías Que eliminado exitosamente' });
  } catch (error) {
    // Manejo de errores
    console.error('Error al eliminar Sabías Que:', error);
    res.status(500).json({ message: 'Error al eliminar Sabías Que', error: error.message });
  }
});


module.exports = router;
