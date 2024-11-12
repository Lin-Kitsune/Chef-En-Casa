import React, { useState, useEffect } from 'react';

const CrearCupon = ({ onClose, onSave, cupon }) => {
  // Define los estados para los campos del formulario
  const [nombre, setNombre] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [descuento, setDescuento] = useState(0);
  const [puntosNecesarios, setPuntosNecesarios] = useState(0);
  const [fechaExpiracion, setFechaExpiracion] = useState('');
  const [tienda, setTienda] = useState('');

  // Efecto para cargar los datos si estamos editando un cupón
  useEffect(() => {
    if (cupon) {
      setNombre(cupon.nombre || '');
      setDescripcion(cupon.descripcion || '');
      setDescuento(cupon.descuento || 0);
      setPuntosNecesarios(cupon.puntos_necesarios || 0);
      setFechaExpiracion(cupon.fecha_expiracion || '');
      setTienda(cupon.tienda || '');
    }
  }, [cupon]);

  // Maneja el envío del formulario
  const handleSubmit = (e) => {
    e.preventDefault();
    const nuevoCupon = {
      id: cupon ? cupon.id : null,
      nombre,
      descripcion,
      descuento,
      puntos_necesarios: puntosNecesarios,
      fecha_expiracion: fechaExpiracion,
      tienda,
    };
    onSave(nuevoCupon); // Llama a la función onSave para guardar el cupón
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 z-50">
      <div className="bg-white rounded-lg w-11/12 md:w-1/2 lg:w-1/3 p-6">
        <h2 className="text-2xl font-semibold mb-4">{cupon ? 'Editar Cupón' : 'Crear Nuevo Cupón'}</h2>
        <form onSubmit={handleSubmit}>
          {/* Campo de Nombre */}
          <div className="mb-4">
            <label className="block text-gray-700 font-semibold mb-2">Nombre</label>
            <input
              type="text"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:ring-green-300"
              placeholder="Nombre del cupón"
              required
            />
          </div>

          {/* Campo de Descripción */}
          <div className="mb-4">
            <label className="block text-gray-700 font-semibold mb-2">Descripción</label>
            <textarea
              value={descripcion}
              onChange={(e) => setDescripcion(e.target.value)}
              className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:ring-green-300"
              placeholder="Descripción del cupón"
              required
            />
          </div>

          {/* Campo de Descuento */}
          <div className="mb-4">
            <label className="block text-gray-700 font-semibold mb-2">Descuento (%)</label>
            <input
              type="number"
              value={descuento}
              onChange={(e) => setDescuento(Number(e.target.value))}
              className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:ring-green-300"
              min="0"
              max="100"
              placeholder="Porcentaje de descuento"
              required
            />
          </div>

          {/* Campo de Puntos Necesarios */}
          <div className="mb-4">
            <label className="block text-gray-700 font-semibold mb-2">Puntos Necesarios</label>
            <input
              type="number"
              value={puntosNecesarios}
              onChange={(e) => setPuntosNecesarios(Number(e.target.value))}
              className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:ring-green-300"
              min="0"
              placeholder="Puntos requeridos para canjear"
              required
            />
          </div>

          {/* Campo de Fecha de Expiración */}
          <div className="mb-4">
            <label className="block text-gray-700 font-semibold mb-2">Fecha de Expiración</label>
            <input
              type="date"
              value={fechaExpiracion}
              onChange={(e) => setFechaExpiracion(e.target.value)}
              className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:ring-green-300"
              required
            />
          </div>

          {/* Campo de Tienda */}
          <div className="mb-4">
            <label className="block text-gray-700 font-semibold mb-2">Tienda</label>
            <input
              type="text"
              value={tienda}
              onChange={(e) => setTienda(e.target.value)}
              className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:ring-green-300"
              placeholder="Nombre de la tienda"
              required
            />
          </div>

          {/* Botones para Guardar o Cancelar */}
          <div className="flex justify-end space-x-4">
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-300 text-gray-700 px-4 py-2 rounded font-semibold hover:bg-gray-400 transition"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="bg-green-500 text-white px-4 py-2 rounded font-semibold hover:bg-green-600 transition"
            >
              {cupon ? 'Guardar Cambios' : 'Crear Cupón'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CrearCupon;
