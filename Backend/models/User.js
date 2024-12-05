const bcrypt = require('bcryptjs');
const { ObjectId } = require('mongodb');

// Definir el esquema de usuario
const UserSchema = {
  _id: ObjectId,
  nombre: String,
  email: String,
  password: String,
  telefono: {
    prefijo: String, // Prefijo del país
    numero: String, // Número de teléfono
  },
  healthData: {
    weight: Number,
    height: Number,
    imc: Number,
    dietRecommendation: String,
    caloricNeeds: Number, // Calorías diarias recomendadas
    tmb: Number,          // Tasa Metabólica Basal
  },
  policiesAccepted: {
    type: Boolean,
    default: false,
  },
  premium: {
    status: {
      type: Boolean,
      default: false, // No premium por defecto
    },
    fechaInicio: {
      type: Date,
      default: null, // Fecha de inicio del premium
    },
    fechaFin: {
      type: Date,
      default: null, // Fecha de vencimiento del premium
    },
  },
  fechaRegistro: {
    type: Date,
    default: new Date(), // Fecha de registro
  },
  fechaUltimaSesion: {
    type: Date,
    default: null, // Inicialmente null hasta el primer inicio de sesión
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