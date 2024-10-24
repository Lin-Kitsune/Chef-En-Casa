import React, { useState } from 'react';

const CrearNotificacion = ({ onClose, onCreate }) => {
  const [tipo, setTipo] = useState('general');
  const [destinatario, setDestinatario] = useState('Todos');
  const [mensaje, setMensaje] = useState('');
  const [titulo, setTitulo] = useState('');

  const enviarNotificacion = () => {
    const nuevaNotificacion = {
      titulo,
      tipo,
      destinatario,
      mensaje,
      fecha: new Date().toISOString().split('T')[0], // Fecha actual
    };
    onCreate(nuevaNotificacion); // Llama a la función de creación que se pasa como prop
    alert('Notificación enviada con éxito');
    onClose(); // Cerrar el formulario después de enviar
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-lg mb-1 max-w-lg w-full mx-auto"> {/* Limitar ancho y centrar */}
      <h2 className="text-xl font-bold mb-4">Crear Nueva Notificación</h2>

      {/* Título de la Notificación */}
      <div className="mb-4">
        <label className="block text-lg font-semibold mb-2">Título de Notificación</label>
        <input
          className="w-full border border-gray-300 rounded-lg p-2"
          type="text"
          value={titulo}
          onChange={(e) => setTitulo(e.target.value)}
          placeholder="Escribe el título..."
        />
      </div>

      {/* Tipo de Notificación */}
      <div className="mb-4">
        <label className="block text-lg font-semibold mb-2">Tipo de Notificación</label>
        <select
          className="w-full border border-gray-300 rounded-lg p-2"
          value={tipo}
          onChange={(e) => setTipo(e.target.value)}
        >
          <option value="general">General</option>
          <option value="promocion">Promoción</option>
          <option value="recetas">Nueva Receta</option>
          <option value="ingredientes">Nuevo Ingrediente</option>
        </select>
      </div>

      {/* Destinatario */}
      <div className="mb-4">
        <label className="block text-lg font-semibold mb-2">Destinatario</label>
        <select
          className="w-full border border-gray-300 rounded-lg p-2"
          value={destinatario}
          onChange={(e) => setDestinatario(e.target.value)}
        >
          <option value="Todos">Todos</option>
          <option value="Premium">Usuarios Premium</option>
          <option value="Basico">Usuarios Básico</option>
        </select>
      </div>

      {/* Mensaje */}
      <div className="mb-4">
        <label className="block text-lg font-semibold mb-2">Mensaje</label>
        <textarea
          className="w-full border border-gray-300 rounded-lg p-2"
          rows="3"
          value={mensaje}
          onChange={(e) => setMensaje(e.target.value)}
          placeholder="Escribe el mensaje de la notificación..."
        ></textarea>
      </div>

      {/* Botones */}
      <div className="flex justify-end space-x-4">
        <button
          className="bg-gray-300 text-black py-2 px-4 rounded-full hover:bg-gray-400"
          onClick={onClose}
        >
          Cancelar
        </button>
        <button
          className="bg-verde-chef text-white py-2 px-4 rounded-full hover:bg-green-600"
          onClick={enviarNotificacion}
        >
          Enviar Notificación
        </button>
      </div>
    </div>
  );
};

export default CrearNotificacion;
