const { ObjectId } = require('mongodb');

const reclamoSchema = {
  nombre: { type: String, required: true }, 
  email: { type: String, required: true },
  titulo: { type: String, required: true },
  destinatario: { type: String, required: true }, // admin o nutricionista
  comentario: { type: String, required: true },
  tipo: { type: String, required: true, enum: ['Solicitud', 'Reclamo', 'Sugerencia', 'Nutricionista'] }, // Nuevo campo para clasificar el tipo
  estado: { type: String, default: 'En espera' }, 
  fechaCreacion: { type: Date, default: Date.now }
};

module.exports = reclamoSchema;
