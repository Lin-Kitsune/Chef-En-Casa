const bcrypt = require('bcryptjs');
const { ObjectId } = require('mongodb');

// Definir el esquema de usuario
const UserSchema = {
  _id: ObjectId,
  nombre: String,
  email: String,
  password: String,
  healthData: {
    weight: Number,  // Peso en kg
    height: Number,  // Altura en cm
    imc: Number,     // IMC calculado
    dietRecommendation: String, // Recomendación de dieta
  },
  fechaRegistro: {
    type: Date,      // Fecha de registro
    default: new Date(), // Valor por defecto: fecha actual
  },
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
