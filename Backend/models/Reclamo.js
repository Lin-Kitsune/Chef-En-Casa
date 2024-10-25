const { ObjectId } = require('mongodb');

const reclamoSchema = {
  nombre: { type: String, required: true }, 
  email: { type: String, required: true },
  titulo: { type: String, required: true },
  destinatario: { type: String, required: true },
  comentario: { type: String, required: true },
  estado: { type: String, default: 'En espera' }, 
  fechaCreacion: { type: Date, default: Date.now }
};

module.exports = reclamoSchema;
