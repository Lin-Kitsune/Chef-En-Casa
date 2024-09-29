const bcrypt = require('bcryptjs');
const { ObjectId } = require('mongodb');

// Definir el esquema de usuario
const UserSchema = {
  _id: ObjectId,
  nombre: String,
  email: String,
  password: String,
};

// Función para hashear la contraseña
async function hashPassword(password) {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(password, salt);
}

// Función para verificar la contraseña
async function comparePassword(plainPassword, hashedPassword) {
  return await bcrypt.compare(plainPassword, hashedPassword);
}

module.exports = { UserSchema, hashPassword, comparePassword };
