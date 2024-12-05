const { ObjectId } = require('mongodb');

class Convenio {
  constructor(db) {
    this.collection = db.collection('convenios');
  }

  async create(convenio) {
    try {
      const result = await this.collection.insertOne(convenio);
      return result;
    } catch (error) {
      console.error('Error en create():', error);
      throw new Error('Error al crear convenio');
    }
  }  

  async findAll() {
    try {
      return await this.collection.find({}).toArray();
    } catch (error) {
      console.error('Error en findAll():', error);
      throw new Error('Error al obtener convenios');
    }
  }

  async findById(id) {
    try {
      if (!ObjectId.isValid(id)) {
        throw new Error('ID inválido');
      }
      return await this.collection.findOne({ _id: new ObjectId(id) });
    } catch (error) {
      console.error('Error en findById():', error);
      throw new Error('Error al obtener convenio por ID');
    }
  }

  async update(id, data) {
    try {
      if (!ObjectId.isValid(id)) {
        throw new Error('ID inválido');
      }
      const result = await this.collection.updateOne({ _id: new ObjectId(id) }, { $set: data });
      return result;
    } catch (error) {
      console.error('Error en update():', error);
      throw new Error('Error al actualizar convenio');
    }
  }

   // Método para eliminar un convenio por ID
   async delete(id) {
    try {
      if (!ObjectId.isValid(id)) {
        throw new Error('ID inválido');
      }
      const result = await this.collection.deleteOne({ _id: new ObjectId(id) });
      return result; // Devuelve el resultado de la eliminación
    } catch (error) {
      console.error('Error en delete():', error);
      throw new Error('Error al eliminar convenio');
    }
  }
}

module.exports = Convenio;
