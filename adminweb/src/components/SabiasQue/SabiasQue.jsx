import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';

const IMAGE_BASE_URL = 'http://localhost:4000';

const SabiasQue = ({ data, onEdit, onDelete }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-4 flex flex-col h-full">
      <div className="flex-grow">
        <img
          src={data.imagen ? `${IMAGE_BASE_URL}/${data.imagen}` : 'ruta/a/imagen/por/defecto.jpg'}
          alt={data.titulo}
          className="w-full h-32 object-cover mb-4 rounded-lg"
          crossOrigin="anonymous"
        />
        <p className="text-lg font-semibold">{data.titulo}</p>
        <p className="text-sm text-gray-600">{data.descripcion}</p>
        <p className="text-sm text-gray-500 mt-2">{data.beneficio}</p> {/* Mostramos el beneficio */}
      </div>
      <div className="mt-4 flex space-x-4 justify-between">
        <button
            className="bg-verde-chef text-white py-2 px-4 rounded-full font-bold hover:bg-blue-600"
            onClick={() => onEdit(data)}  // Botón de editar
        >
          <FontAwesomeIcon icon={faEdit} /> Editar
        </button>
        <button
            className="bg-red-500 text-white px-4 py-2 rounded-full"
            onClick={() => onDelete(data._id)} // Asegúrate de pasar _id
        >
          <FontAwesomeIcon icon={faTrash} /> Eliminar
        </button>
      </div>
    </div>
  );
};

export default SabiasQue;
