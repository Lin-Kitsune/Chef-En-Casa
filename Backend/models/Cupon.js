const { ObjectId } = require('mongodb');

class Cupon {
  constructor(db) {
    this.collection = db.collection('cupones');
  }

  async create(cupon) {
    try {
      const result = await this.collection.insertOne(cupon);
      return result;
    } catch (error) {
      console.error('Error en create():', error);
      throw new Error('Error al crear cupón');
    }
  }

  async findAll() {
    try {
      return await this.collection.find({}).toArray();
    } catch (error) {
      console.error('Error en findAll():', error);
      throw new Error('Error al obtener cupones');
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
      throw new Error('Error al obtener cupón por ID');
    }
  }

  async update(id, data) {
    try {
      if (!ObjectId.isValid(id)) {
        throw new Error('ID inválido');
      }
      const result = await this.collection.updateOne(
        { _id: new ObjectId(id) },
        { $set: data }
      );
      return result;
    } catch (error) {
      console.error('Error en update():', error);
      throw new Error('Error al actualizar cupón');
    }
  }

  async delete(id) {
    try {
      if (!ObjectId.isValid(id)) {
        throw new Error('ID inválido');
      }
      const result = await this.collection.deleteOne({ _id: new ObjectId(id) });
      return result;
    } catch (error) {
      console.error('Error en delete():', error);
      throw new Error('Error al eliminar cupón');
    }
  }
}

module.exports = Cupon;
