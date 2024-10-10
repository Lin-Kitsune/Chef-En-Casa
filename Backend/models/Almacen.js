const { ObjectId } = require('mongodb');

// Definir el esquema del almacén (usando una estructura similar a la del usuario)
const almacenSchema = {
  usuarioId: ObjectId, // ID del usuario que posee este almacén
  ingredientes: [
    {
      nombre: String,      // Nombre del ingrediente
      cantidad: Number,    // Cantidad de ingrediente en el almacén
      fechaIngreso: { type: Date, default: Date.now }, // Fecha de ingreso
      perecedero: Boolean  // Si el ingrediente es perecedero
    }
  ]
};

// Crear una función para insertar un nuevo almacén (o actualizar uno existente)
async function crearOActualizarAlmacen(db, usuarioId, ingredientes) {
  try {
    const almacen = await db.collection('almacen').findOne({ usuarioId: new ObjectId(usuarioId) });

    if (!almacen) {
      // Crear un nuevo almacén
      await db.collection('almacen').insertOne({
        usuarioId: new ObjectId(usuarioId),
        ingredientes
      });
    } else {
      // Actualizar el almacén existente
      await db.collection('almacen').updateOne(
        { usuarioId: new ObjectId(usuarioId) },
        { $set: { ingredientes } }
      );
    }

  } catch (error) {
    throw new Error('Error al crear o actualizar el almacén: ' + error.message);
  }
}

// Exportar las funciones necesarias
module.exports = { almacenSchema, crearOActualizarAlmacen };

