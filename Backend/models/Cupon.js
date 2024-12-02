const { ObjectId } = require('mongodb');
class Cupon {
  constructor(db) {
    this.db = db;
    this.collection = db.collection('cupones'); // Nombre de la colección en MongoDB
  }

  // Método para crear un nuevo cupón
  async create(cuponData) {
    try {
      const result = await this.collection.insertOne(cuponData);
      // Devuelve el documento insertado directamente
      return result.ops ? result.ops[0] : result;  // Si 'ops' no existe, devolvemos el resultado completo.
    } catch (error) {
      console.error('Error al crear cupón:', error);
      throw error;
    }
  }

  // Método para obtener todos los cupones
  async findAll() {
    try {
      return await this.collection.find().toArray();
    } catch (error) {
      console.error('Error al obtener cupones:', error);
      throw error; // Lanzar error para que lo capture el middleware
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

  // Método para eliminar un cupón por ID
  async delete(id) {
    try {
      if (!ObjectId.isValid(id)) {
        throw new Error('ID inválido');
      }
      const result = await this.collection.deleteOne({ _id: new ObjectId(id) });
      if (result.deletedCount === 0) {
        throw new Error('Cupón no encontrado');
      }
      return result;
    } catch (error) {
      console.error('Error al eliminar cupón:', error);
      throw error;
    }
  }
}

module.exports = Cupon;
