import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faFilter } from '@fortawesome/free-solid-svg-icons';

// Simulación de reclamos (mock)
const mockReclamos = [
    {
      _id: '1',
      hora: '10:30 AM',
      titulo: 'Consulta sobre ingrediente',
      nombre: 'Juan Pérez',
      correo: 'juan@example.com',
      comentario: 'Tengo una duda sobre mi ingrediente.',
      estado: 'En espera',
      destinatario: 'Nutricionista', // Nuevo campo
    },
    {
      _id: '2',
      hora: '12:00 PM',
      titulo: 'Problema con la aplicación',
      nombre: 'Ana Martínez',
      correo: 'ana@example.com',
      comentario: 'La aplicación no me deja iniciar sesión.',
      estado: 'Finalizado',
      destinatario: 'Administrador', // Nuevo campo
    },
    {
      _id: '3',
      hora: '3:15 PM',
      titulo: 'Sugerencia de mejora',
      nombre: 'Carlos López',
      correo: 'carlos@example.com',
      comentario: 'Podrían agregar más opciones de pago.',
      estado: 'En espera',
      destinatario: 'Administrador', // Nuevo campo
    },
  ];

const Consultas = () => {
  const [reclamos, setReclamos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [estadoFilter, setEstadoFilter] = useState(''); // Para el filtro de estado
  const [isFilterModalVisible, setIsFilterModalVisible] = useState(false); // Controla visibilidad del modal
  const [selectedReclamo, setSelectedReclamo] = useState(null);
  const [response, setResponse] = useState('');
  const [isModalVisible, setIsModalVisible] = useState(false);

  useEffect(() => {
    const fetchReclamos = async () => {
      setTimeout(() => {
        setReclamos(mockReclamos);
        setLoading(false);
      }, 1000); // Simula un retraso de 1 segundo
    };
    fetchReclamos();
  }, []);

  // Filtrar por búsqueda y por estado
  const filteredReclamos = reclamos.filter((reclamo) => {
    const matchesSearch = reclamo.correo.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesEstado = estadoFilter ? reclamo.estado === estadoFilter : true;
    return matchesSearch && matchesEstado;
  });

  const handleResponder = (reclamoId) => {
    if (!response) return;
    console.log(`Respuesta para reclamo ${reclamoId}:`, response);
    setIsModalVisible(false);
    setResponse('');
  };

  const openModal = (reclamo) => {
    setSelectedReclamo(reclamo);
    setIsModalVisible(true);
  };

  const closeModal = () => {
    setIsModalVisible(false);
    setSelectedReclamo(null);
    setResponse('');
  };

  const toggleFilterModal = () => {
    setIsFilterModalVisible(!isFilterModalVisible); // Alterna el modal de filtro
  };

  // Función para aplicar el filtro de estado
  const applyFilter = (estado) => {
    setEstadoFilter(estado); // Aplica el filtro de estado
    toggleFilterModal(); // Cierra el modal después de aplicar el filtro
  };

  const totalReclamos = reclamos.length;

  if (loading) return <div>Loading...</div>;

  return (
    <div className="p-5">
      {/* Barra de búsqueda, total de reclamos y botón de filtro */}
      <div className="flex justify-between items-center mb-6">
        <div className="relative flex items-center w-full max-w-lg">
          <FontAwesomeIcon icon={faSearch} className="absolute left-3 text-gray-400" />
          <input
            type="text"
            placeholder="Buscar reclamos..."
            className="w-full py-2 pl-10 pr-3 rounded-full border border-gray-300 focus:outline-none focus:ring focus:ring-green-300"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        {/* Mostrar total de reclamos */}
        <div className="text-lg font-semibold">Total Reclamos: {totalReclamos}</div>

        {/* Botón de Filtro */}
        <button
          onClick={toggleFilterModal}
          className="bg-verde-chef text-white py-2 px-6 rounded-full font-bold hover:bg-green-600 transition duration-300 flex items-center space-x-2"
        >
          <FontAwesomeIcon icon={faFilter} />
          <span>FILTRO</span>
        </button>
      </div>

       {/* Reclamos en filas */}
       <div className="flex flex-col space-y-4">
        {filteredReclamos.map((reclamo) => (
          <div key={reclamo._id} className="bg-white rounded-lg shadow-md p-4 w-full flex">
            {/* Sección izquierda: Hora, Nombre, Estado */}
            <div className="w-1/3 pr-4 border-r border-gray-300">
              <p className="text-lg font-semibold">
                <strong>Hora:</strong> {reclamo.hora}
              </p>
              <p className="text-gray-600">
                <strong>Nombre:</strong> {reclamo.nombre}
              </p>
              <p className="text-gray-600">
                <strong>Correo:</strong> {reclamo.correo}
              </p>
              <p className="text-gray-600 mt-2">
                <strong>Estado:</strong> {reclamo.estado}
              </p>
            </div>

            {/* Sección derecha: Título, Comentario, Destinatario, Botón */}
            <div className="w-2/3 pl-4 flex flex-col justify-center">
              <p className="text-lg font-semibold">
                <strong>Título:</strong> {reclamo.titulo}
              </p>
              {/* Mostrar el destinatario */}
              <p className="text-gray-600">
                <strong>Destinatario:</strong> {reclamo.destinatario}
              </p>
              <p className="text-gray-600">
                <strong>Comentario:</strong> {reclamo.comentario}
              </p>
              {/* Botón de Responder */}
              <div className="flex justify-center mt-4">
                <button
                  className="bg-verde-chef text-white py-2 px-6 rounded-full font-bold hover:bg-green-600 transition duration-300"
                  onClick={() => openModal(reclamo)}
                >
                  Responder
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Modal de filtro de estado */}
      {isFilterModalVisible && (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-3xl">
            <h2 className="text-lg font-bold mb-4">Filtrar Reclamos por Estado</h2>

            <div className="grid grid-cols-3 gap-4">
              {/* Filtro de Estado */}
              <div>
                <h3 className="font-bold mb-2">Estado</h3>
                <button
                  onClick={() => applyFilter('En espera')}
                  className={`block py-1 ${estadoFilter === 'En espera' ? 'text-verde-chef font-bold' : 'text-black'}`}
                >
                  En espera
                </button>
                <button
                  onClick={() => applyFilter('Finalizado')}
                  className={`block py-1 ${estadoFilter === 'Finalizado' ? 'text-verde-chef font-bold' : 'text-black'}`}
                >
                  Finalizado
                </button>
                <button
                  onClick={() => applyFilter('')}
                  className="block py-1 text-black"
                >
                  Quitar Filtros
                </button>
              </div>
            </div>

            <div className="flex justify-end mt-4">
              <button
                className="bg-gray-300 text-black py-2 px-4 rounded-full mr-2"
                onClick={toggleFilterModal}
              >
                Cancelar
              </button>
              <button
                className="bg-verde-chef text-white py-2 px-4 rounded-full mr-2"
                onClick={() => {
                  setEstadoFilter(''); // Quitar filtro y cerrar modal
                  toggleFilterModal();
                }}
              >
                Eliminar Filtros
              </button>
              <button
                className="bg-verde-chef text-white py-2 px-4 rounded-full"
                onClick={toggleFilterModal}
              >
                Aplicar Filtro
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal para responder reclamos */}
      {isModalVisible && selectedReclamo && (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-lg mb-4">
            <h2 className="text-lg font-bold mb-4">Responder a {selectedReclamo.nombre}</h2>

            {/* Select para elegir el estado */}
            <div className="mt-4">
              <label htmlFor="estado" className="block text-lg font-bold mb-2">
                Cambiar estado:
              </label>
              <select
                id="estado"
                className="w-full border border-gray-300 rounded-lg p-2 mb-4"
                value={selectedReclamo.estado}
                onChange={(e) => setSelectedReclamo({ ...selectedReclamo, estado: e.target.value })}
              >
                <option value="En espera">En espera</option>
                <option value="Finalizado">Finalizado</option>
              </select>
            </div>

            {/* Textarea para la respuesta */}
            <textarea
              className="w-full border border-gray-300 rounded-lg p-2"
              rows="5"
              value={response}
              onChange={(e) => setResponse(e.target.value)}
              placeholder="Escribe tu respuesta aquí..."
            ></textarea>

            <div className="flex justify-end mt-4 space-x-4">
              <button
                className="bg-gray-300 text-black py-2 px-4 rounded-full hover:bg-gray-400 transition duration-300"
                onClick={closeModal}
              >
                Cancelar
              </button>
              <button
                className="bg-verde-chef text-white py-2 px-4 rounded-full font-bold hover:bg-green-700 transition duration-300"
                onClick={() => handleResponder(selectedReclamo._id)}
              >
                Enviar Respuesta
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Consultas;

