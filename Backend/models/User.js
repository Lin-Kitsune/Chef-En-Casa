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
  fechaUltimaSesion: { // Campo para almacenar la fecha de la última sesión
    type: Date,
    default: null, // Inicialmente null hasta el primer inicio de sesión
  },
};

module.exports = { UserSchema, hashPassword, comparePassword };
