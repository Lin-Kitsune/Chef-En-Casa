const { ObjectId } = require('mongodb');
const connectToDatabase = require('../index'); // Asegúrate de que tienes una función de conexión a MongoDB

class Actividades {
  constructor(db) {
    this.collection = db.collection('actividades');
  }

  async registrarActividad(usuarioId, tipo, descripcion) {
    if (!ObjectId.isValid(usuarioId)) {
        throw new Error('El usuarioId proporcionado no es válido.');
      }
      if (!tipo) {
        throw new Error('El tipo de actividad es obligatorio.');
      }

    const nuevaActividad = {
      usuarioId: new ObjectId(usuarioId),
      tipo, // Ejemplo: "login", etc.
      descripcion, // Detalle opcional de la actividad
      fecha: new Date(),
    };
    return await this.collection.insertOne(nuevaActividad);
  }

  async obtenerActividades(filtro = {}, rangoFechas = {}) {
    const { startDate, endDate } = rangoFechas;
  
    // Validar que las fechas son válidas
    if ((startDate && isNaN(new Date(startDate).getTime())) || (endDate && isNaN(new Date(endDate).getTime()))) {
      throw new Error('Las fechas proporcionadas no son válidas.');
    }
  
    const query = {
      ...filtro,
      ...(startDate && endDate
        ? { fecha: { $gte: new Date(startDate), $lte: new Date(endDate) } }
        : {}),
    };
  
    return await this.collection.find(query).toArray();
  }
  
}

module.exports = Actividades;