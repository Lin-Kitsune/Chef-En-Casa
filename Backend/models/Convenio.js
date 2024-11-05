// models/Convenio.js
const { ObjectId } = require('mongodb');

class Convenio {
  constructor(db) {
    this.collection = db.collection('convenios');
  }

  async create(convenio) {
    return await this.collection.insertOne(convenio);
  }

  async findAll() {
    return await this.collection.find({}).toArray();
  }

  async findById(id) {
    return await this.collection.findOne({ _id: new ObjectId(id) });
  }

  async update(id, data) {
    return await this.collection.updateOne({ _id: new ObjectId(id) }, { $set: data });
  }

  async delete(id) {
    return await this.collection.deleteOne({ _id: new ObjectId(id) });
  }
}

module.exports = Convenio;
