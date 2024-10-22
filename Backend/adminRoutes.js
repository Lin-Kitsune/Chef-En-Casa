const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { MongoClient, ObjectId } = require('mongodb');
const dotenv = require('dotenv');
const { authenticateToken, checkRole } = require('./middleware/authMiddleware'); 

dotenv.config();
const router = express.Router();
const uri = process.env.MONGO_URI;
const client = new MongoClient(uri);
const SECRET_KEY = process.env.SECRET_KEY || 'supersecretkey'; 

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
    const token = jwt.sign({ id: adminUser._id, role: adminUser.role }, SECRET_KEY, {
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
