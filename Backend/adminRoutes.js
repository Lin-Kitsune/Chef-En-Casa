const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { MongoClient, ObjectId } = require('mongodb');
const dotenv = require('dotenv');
const { authenticateToken, checkRole } = require('./middleware/authMiddleware'); 
const multer = require('multer'); // Middleware para manejar archivos
const fs = require('fs');
const path = require('path');
const mongoose = require('mongoose'); // models/Notificacion.js (solo si usas Mongoose)

const NotificacionSchema = new mongoose.Schema({
  mensaje: { type: String, required: true },
  tipo: { type: String, enum: ['ingrediente', 'receta'], required: true },
  fecha: { type: Date, default: Date.now },
  visto: { type: Boolean, default: false }
});

module.exports = mongoose.model('Notificacion', NotificacionSchema);

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
  const { nombre, categoria } = req.body;
  const imagen = req.file ? req.file.path : null;

  if (!nombre || !categoria) {
    return res.status(400).json({ message: 'El nombre y la categoría son obligatorios' });
  }

  try {
    await client.connect();
    const db = client.db('chefencasa');
    const ingredientesCollection = db.collection('ingredientes');
    const notificacionesCollection = db.collection('notificaciones');  // Colección de notificaciones

    // Verificar si el ingrediente ya existe
    const ingredienteExistente = await ingredientesCollection.findOne({ nombre });
    if (ingredienteExistente) {
      return res.status(400).json({ message: 'El ingrediente ya existe' });
    }

    // Verificar si la categoría existe
    const categoriasCollection = db.collection('categorias');
    const categoriaExistente = await categoriasCollection.findOne({ nombre: categoria });
    if (!categoriaExistente) {
      return res.status(400).json({ message: 'La categoría no existe' });
    }

    // Crear el nuevo ingrediente
    const nuevoIngrediente = {
      nombre,
      categoria,
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
  const { nombre, categoria, imagen } = req.body;

  if (!nombre || !categoria) {
    return res.status(400).json({ message: 'Nombre y categoría son obligatorios' });
  }

  try {
    await client.connect();
    const db = client.db('chefencasa');
    const ingredientesCollection = db.collection('ingredientes');

    const resultado = await ingredientesCollection.updateOne(
      { _id: new ObjectId(id) },
      { $set: { nombre, categoria, imagen: imagen || null } }
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
//=====================================================================================
// ======================= CRUD DE RECETAS =======================

// Crear una receta con notificación
router.post('/recetas', authenticateToken, checkRole('admin'), upload.single('imagen'), async (req, res) => {
  const { titulo, duracion, ingredientes, porciones, paso, valoracion } = req.body;
  const imagen = req.file ? req.file.path : null;

  if (!titulo || !duracion || !ingredientes || !paso) {
    return res.status(400).json({ message: 'Todos los campos obligatorios deben ser completados' });
  }

  try {
    await client.connect();
    const db = client.db('chefencasa');
    const ingredientesCollection = db.collection('ingredientes');
    const recetasCollection = db.collection('recetas');
    const notificacionesCollection = db.collection('notificaciones'); // Colección de notificaciones

    // Verificar que todos los ingredientes existen en la base de datos
    const ingredientesArray = JSON.parse(ingredientes); // Convertir el JSON de ingredientes en un array
    const ingredientesValidos = await ingredientesCollection.find({ nombre: { $in: ingredientesArray.map(i => i.nombre) } }).toArray();

    if (ingredientesValidos.length !== ingredientesArray.length) {
      return res.status(400).json({ message: 'Uno o más ingredientes no existen en la base de datos' });
    }

    // Formatear ingredientes con la cantidad
    const ingredientesFinal = ingredientesArray.map(i => {
      const ingredienteValido = ingredientesValidos.find(iv => iv.nombre === i.nombre);
      return {
        nombre: ingredienteValido.nombre,
        cantidad: i.cantidad
      };
    });

    // Crear el objeto de la nueva receta
    const nuevaReceta = {
      titulo,
      duracion: Number(duracion),
      valoracion: valoracion ? Number(valoracion) : 0,  // Valoración predeterminada en 0 si no se especifica
      porciones: porciones ? Number(porciones) : 0,  // Porciones predeterminadas en 0 si no se especifica
      ingredientes: ingredientesFinal,
      imagen,
      paso: paso,
      fechaCreacion: new Date(),
    };

    // Guardar la nueva receta en la base de datos
    await recetasCollection.insertOne(nuevaReceta);

    // Crear una notificación para informar a los usuarios
    const notificacion = {
      mensaje: `Nueva receta agregada: ${titulo}`,
      tipo: 'receta',
      fecha: new Date(),
      visto: false // Este campo indica si la notificación ha sido vista por el usuario
    };
    await notificacionesCollection.insertOne(notificacion);

    res.status(201).json({ message: 'Receta creada y notificación generada', receta: nuevaReceta });
  } catch (error) {
    console.error('Error al crear receta:', error);
    res.status(500).json({ message: 'Error al crear receta', error: error.message });
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
  const { titulo, duracion, ingredientes, porciones, paso, valoracion } = req.body;
  const imagen = req.file ? req.file.path : null;

  if (!titulo || !duracion || !ingredientes || !paso) {
    return res.status(400).json({ message: 'Todos los campos obligatorios deben ser completados' });
  }

  try {
    await client.connect();
    const db = client.db('chefencasa');
    const recetasCollection = db.collection('recetas');
    const ingredientesCollection = db.collection('ingredientes');

    // Verificar que los ingredientes existen en la base de datos
    const ingredientesArray = JSON.parse(ingredientes);
    const ingredientesValidos = await ingredientesCollection.find({ nombre: { $in: ingredientesArray.map(i => i.nombre) } }).toArray();

    if (ingredientesValidos.length !== ingredientesArray.length) {
      return res.status(400).json({ message: 'Uno o más ingredientes no existen en la base de datos' });
    }

    const recetaActualizada = {
      titulo,
      duracion: Number(duracion),
      valoracion: valoracion ? Number(valoracion) : 0,
      porciones: porciones ? Number(porciones) : 0,
      ingredientes: ingredientesArray,
      imagen: imagen || req.body.imagenAnterior,  // Mantener la imagen anterior si no se envía una nueva
      paso: paso,
    };

    const result = await recetasCollection.updateOne(
      { _id: new ObjectId(id) },
      { $set: recetaActualizada }
    );

    if (result.modifiedCount === 0) {
      return res.status(404).json({ message: 'Receta no encontrada o sin cambios' });
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
module.exports = router;