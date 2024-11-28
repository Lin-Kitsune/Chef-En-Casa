const { ObjectId } = require('mongodb');

class SabiasQue {
  constructor(db) {
    this.collection = db.collection('sabiasQue');
  }

  // Crear un nuevo "Sabías Que"
  async create(sabiasQue) {
    try {
      const result = await this.collection.insertOne(sabiasQue);
      return result;
    } catch (error) {
      console.error('Error en create():', error);
      throw new Error('Error al crear Sabías Que');
    }
  }

  // Obtener todos los "Sabías Que"
  async findAll() {
    try {
      return await this.collection.find({}).toArray();
    } catch (error) {
      console.error('Error en findAll():', error);
      throw new Error('Error al obtener Sabías Que');
    }
  }

  // Obtener un "Sabías Que" por ID
  async findById(id) {
    try {
      if (!ObjectId.isValid(id)) {
        throw new Error('ID inválido');
      }
      return await this.collection.findOne({ _id: new ObjectId(id) });
    } catch (error) {
      console.error('Error en findById():', error);
      throw new Error('Error al obtener Sabías Que por ID');
    }
  }

  // Actualizar un "Sabías Que"
  async update(id, data) {
    try {
      if (!ObjectId.isValid(id)) {
        throw new Error('ID inválido');
      }
      const result = await this.collection.updateOne({ _id: new ObjectId(id) }, { $set: data });
      return result;
    } catch (error) {
      console.error('Error en update():', error);
      throw new Error('Error al actualizar Sabías Que');
    }
  }

 // Eliminar un "Sabías Que" por ID
  async delete(id) {
    try {
      if (!ObjectId.isValid(id)) {
        throw new Error('ID inválido');
      }
      const result = await this.collection.deleteOne({ _id: new ObjectId(id) });
      return result;  // Retorna el resultado para verificar la eliminación
    } catch (error) {
      console.error('Error en delete():', error);
      throw new Error('Error al eliminar Sabías Que');
    }
  }
}


module.exports = SabiasQue;
