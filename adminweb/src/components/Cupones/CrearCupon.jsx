import React, { useState, useEffect } from 'react';

const CrearCupon = ({ onClose, onSave, cupon }) => {
  const [nombre, setNombre] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [descuento, setDescuento] = useState(0);
  const [puntosNecesarios, setPuntosNecesarios] = useState(0);
  const [fechaExpiracion, setFechaExpiracion] = useState('');
  const [tienda, setTienda] = useState('');

  useEffect(() => {
    if (cupon) {
      setNombre(cupon.nombre || '');
      setDescripcion(cupon.descripcion || '');
      setDescuento(cupon.descuento || 0);
      setPuntosNecesarios(cupon.puntos_necesarios || 0);
      setFechaExpiracion(cupon.fecha_expiracion ? cupon.fecha_expiracion.split('T')[0] : '');
      setTienda(cupon.tienda || '');
    }
  }, [cupon]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const nuevoCupon = {
      nombre,
      descripcion,
      descuento,
      puntos_necesarios: puntosNecesarios,
      fecha_expiracion: fechaExpiracion,
      tienda,
    };

    onSave(nuevoCupon);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 z-50">
      <div className="bg-white rounded-lg w-11/12 md:w-3/4 lg:w-1/2 p-8">
        <h2 className="text-2xl font-semibold mb-6 text-center">
          {cupon ? 'Editar Cupón' : 'Crear Nuevo Cupón'}
        </h2>
        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Nombre */}
          <div className="col-span-2 md:col-span-1">
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
  
          {/* Descuento */}
          <div className="col-span-2 md:col-span-1">
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
  
          {/* Puntos Necesarios */}
          <div className="col-span-2 md:col-span-1">
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
  
          {/* Fecha de Expiración */}
          <div className="col-span-2 md:col-span-1">
            <label className="block text-gray-700 font-semibold mb-2">Fecha de Expiración</label>
            <input
              type="date"
              value={fechaExpiracion}
              onChange={(e) => setFechaExpiracion(e.target.value)}
              className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:ring-green-300"
              required
            />
          </div>
  
          {/* Tienda */}
          <div className="col-span-2">
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
  
          {/* Descripción */}
          <div className="col-span-2">
            <label className="block text-gray-700 font-semibold mb-2">Descripción</label>
            <textarea
              value={descripcion}
              onChange={(e) => setDescripcion(e.target.value)}
              className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:ring-green-300"
              placeholder="Descripción del cupón"
              rows="2"
              required
            />
          </div>
  
          {/* Botones */}
          <div className="col-span-2 flex justify-end space-x-4 mt-4">
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-300 text-gray-700 px-6 py-2 rounded font-semibold hover:bg-gray-400 transition"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="bg-green-500 text-white px-6 py-2 rounded font-semibold hover:bg-green-600 transition"
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