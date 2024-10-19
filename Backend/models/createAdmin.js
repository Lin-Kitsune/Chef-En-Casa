const bcrypt = require('bcryptjs');
const { MongoClient } = require('mongodb');
const dotenv = require('dotenv');

// Cargar las variables de entorno
dotenv.config();

// Conectar a MongoDB
const uri = process.env.MONGO_URI;
const client = new MongoClient(uri);

async function crearAdmin() {
  try {
    await client.connect();
    const db = client.db('chefencasa');
    const usersCollection = db.collection('usuarios');

    // Verificar si ya existe un administrador
    const adminExistente = await usersCollection.findOne({ email: 'admin@chefencasa.com' });
    if (adminExistente) {
      console.log('El administrador ya existe');
      return;
    }

    // Hashear la contraseña
    const hashedPassword = await bcrypt.hash('admin123', 10);

    // Crear el usuario administrador
    const nuevoAdmin = {
      nombre: 'Admin',
      email: 'admin@chefencasa.com',
      password: hashedPassword,
      role: 'admin'
    };

    await usersCollection.insertOne(nuevoAdmin);
    console.log('Administrador creado exitosamente');
  } catch (error) {
    console.error('Error al crear administrador:', error);
  } finally {
    await client.close();
  }
}

crearAdmin();
