const { ObjectId } = require('mongodb');

// Mapa de conversiones para normalizar unidades a gramos
const conversiones = {
  'gram': 1,          // Base para gramos
  'ml': 1,            // Base para mililitros
  'kg': 1000,         // 1 kg = 1000 gramos
  'l': 1000,          // 1 litro = 1000 ml
  'tbsp': 15,         // 1 tablespoon = 15 gramos/mililitros
  'tsp': 5,           // 1 teaspoon = 5 gramos/mililitros
  'cup': 240,         // 1 cup = 240 gramos/mililitros
  'oz': 28.35,        // 1 ounce = 28.35 gramos
  'lb': 453.592,      // 1 pound = 453.592 gramos
  'pinche': 0.36,      // 1 pinch (pizca) = 0.36 gramos (aproximado)
  'clove': 5,         // 1 clove = 5 gramos
  'head': 1000,        // 1 head = 1000 gramos
  'ounce': 28.35,      // 1 ounce = 28.35 gramos
  'serving': 0.5,       // 1 serving = 0.5 gramos
  '""' : 1,          // 1 " = 0.5 gramos
  "strip": 5,        // 1 strip = 5 gramos
  "large": 100,       // 1 large = 100 gramos
  "unidad": 100       // 1 unidad = 50 gramos
};

// Función para convertir una cantidad a gramos o mililitros
function convertirMedida(cantidad, unidad) {
  // Verificar si la unidad es una cadena vacía o nula
  if (!unidad || unidad.trim() === '') {
    console.warn(`Unidad vacía para la cantidad ${cantidad}, asignando unidad por defecto.`);
    unidad = 'gram'; // Asignar una unidad por defecto si está vacía, como 'gram'
  }

  // Convertir la unidad a singular si es plural
  if (unidad.endsWith('s')) {
    unidad = unidad.slice(0, -1); // Quitar la 's' final para convertir a singular
  }

  const conversionFactor = conversiones[unidad.toLowerCase()];
  if (!conversionFactor) {
    throw new Error(`Unidad desconocida: ${unidad}`);
  }

  return cantidad * conversionFactor;
}

// Definir el esquema del almacén (usando una estructura similar a la del usuario)
const almacenSchema = {
  usuarioId: ObjectId, // ID del usuario que posee este almacén
  ingredientes: [
    {
      nombre: String,      // Nombre del ingrediente
      cantidad: Number,    // Cantidad de ingrediente en el almacén (en medidas como gramos)
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
      // Crear un nuevo almacén si no existe
      await db.collection('almacen').insertOne({
        usuarioId: new ObjectId(usuarioId),
        ingredientes: ingredientes.map(ing => ({
          nombre: ing.nombre.toLowerCase(),
          cantidad: convertirMedida(ing.cantidad, ing.unidad), // Convertir a gramos o mililitros
          fechaIngreso: new Date(),
          perecedero: ing.perecedero || false
        }))
      });
    } else {
      // Si el almacén existe, actualizamos o añadimos ingredientes
      ingredientes.forEach(ing => {
        const almacenIngrediente = almacen.ingredientes.find(item => item.nombre === ing.nombre.toLowerCase());

        if (almacenIngrediente) {
          // Si el ingrediente ya existe, sumamos la cantidad (convertida)
          almacenIngrediente.cantidad += convertirMedida(ing.cantidad, ing.unidad);
        } else {
          // Si es un nuevo ingrediente, lo añadimos
          almacen.ingredientes.push({
            nombre: ing.nombre.toLowerCase(),
            cantidad: convertirMedida(ing.cantidad, ing.unidad),
            fechaIngreso: new Date(),
            perecedero: ing.perecedero || false
          });
        }
      });

      // Actualizar el almacén en la base de datos
      await db.collection('almacen').updateOne(
        { usuarioId: new ObjectId(usuarioId) },
        { $set: { ingredientes: almacen.ingredientes } }
      );
    }

  } catch (error) {
    throw new Error('Error al crear o actualizar el almacén: ' + error.message);
  }
}

// Función para buscar un ingrediente por su nombre
async function buscarIngredientePorNombre(db, usuarioId, nombreIngrediente) {
  const almacen = await db.collection('almacen').findOne({ usuarioId: new ObjectId(usuarioId) });
  if (!almacen) {
    return null;
  }
  return almacen.ingredientes.find(item => item.nombre === nombreIngrediente.toLowerCase());
}

module.exports = { almacenSchema, crearOActualizarAlmacen, buscarIngredientePorNombre };


