// models/Notificaciones.js
const { ObjectId } = require('mongodb');
const connectToDatabase = require('../index'); // Asegúrate de que tienes una función de conexión a MongoDB

async function crearNotificacion(usuarioId, mensaje, tipo) {
  const db = await connectToDatabase();
  const notificacionesCollection = db.collection('notificaciones');

  const nuevaNotificacion = {
    usuarioId: new ObjectId(usuarioId),
    mensaje,
    tipo,  // 'ingredienteAgotado' o 'recordatorioMensual'
    fecha: new Date()
  };

  await notificacionesCollection.insertOne(nuevaNotificacion);
}

// Obtener todas las notificaciones de un usuario específico
async function obtenerNotificaciones(usuarioId) {
  const db = await connectToDatabase();
  return await db.collection('notificaciones')
    .find({ usuarioId: new ObjectId(usuarioId) })
    .sort({ fecha: -1 })
    .toArray();
}

module.exports = {
  crearNotificacion,
  obtenerNotificaciones
};