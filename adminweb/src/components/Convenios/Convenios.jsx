import React, { useEffect, useState } from 'react';
import { getAllConvenios, createConvenio, updateConvenio, deleteConvenio } from '../../services/convenioService';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faEdit, faSearch, faPlus } from '@fortawesome/free-solid-svg-icons';
import CrearConvenio from './CrearConvenio';  // Componente para crear/editar convenio

const Convenios = () => {
  const [convenios, setConvenios] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [addConvenioModalVisible, setAddConvenioModalVisible] = useState(false);
  const [selectedConvenio, setSelectedConvenio] = useState(null);

  // Obtener lista de convenios al cargar
  useEffect(() => {
    const fetchConvenios = async () => {
      const convenioList = await getAllConvenios();
      setConvenios(convenioList);
      setLoading(false);
    };

    fetchConvenios();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm('¿Estás seguro de eliminar este convenio?')) {
      await deleteConvenio(id);
      setConvenios(convenios.filter(conv => conv._id !== id));
    }
  };

  const openEditModal = (convenio) => {
    setSelectedConvenio(convenio);  // Selecciona el convenio para editar
    setAddConvenioModalVisible(true);  // Abre el modal de edición
  };

  const closeAddConvenioModal = () => {
    setSelectedConvenio(null);  // Resetea el convenio seleccionado
    setAddConvenioModalVisible(false);  // Cierra el modal
  };

  const openAddConvenioModal = () => {
    setSelectedConvenio(null);  // Reset para crear nuevo convenio
    setAddConvenioModalVisible(true);  // Abre el modal de creación
  };

  const handleCreateOrUpdateConvenio = async (convenio) => {
    if (selectedConvenio) {
      // Actualizar convenio existente
      await updateConvenio(convenio._id, convenio);
      setConvenios(convenios.map(c => (c._id === convenio._id ? convenio : c)));
    } else {
      // Crear nuevo convenio
      const createdConvenio = await createConvenio(convenio);
      setConvenios([...convenios, createdConvenio]);
    }
    closeAddConvenioModal();  // Cierra el modal después de crear/editar
  };

  // Filtrar convenios por búsqueda
  const filteredConvenios = convenios.filter(convenio =>
    convenio.empresa.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const totalConvenios = convenios.length;

  if (loading) return <div>Loading...</div>;

  return (
    <div className="p-5">
      {/* Barra de búsqueda y botón "Agregar Convenio" */}
      <div className="flex justify-between items-center mb-6">
        <div className="relative flex items-center w-full max-w-lg">
          <FontAwesomeIcon icon={faSearch} className="absolute left-3 text-gray-400" />
          <input
            type="text"
            placeholder="Buscar convenios..."
            className="w-full py-2 pl-10 pr-3 rounded-full border border-gray-300 focus:outline-none focus:ring focus:ring-green-300"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        {/* Mostrar el total de convenios */}
        <div className="text-lg font-semibold">
          Total de convenios: {totalConvenios}
        </div>

        {/* Botón para abrir el modal de agregar convenio */}
        <button
          className="bg-verde-chef text-white py-2 px-6 rounded-full font-bold hover:bg-green-600 transition duration-300 flex items-center space-x-2"
          onClick={openAddConvenioModal}
        >
          <FontAwesomeIcon icon={faPlus} />
          <span>Agregar Convenio</span>
        </button>
      </div>

      {/* Grid de convenios */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredConvenios.map((convenio) => (
          <div key={convenio._id} className="bg-white rounded-lg shadow-md p-4 flex flex-col h-full">
            <div className="flex-grow">
              <img src={convenio.imagenProducto} alt={convenio.producto} className="w-full h-32 object-cover mb-4 rounded-lg" />
              <p className="text-lg font-semibold">Empresa: {convenio.empresa}</p>
              <p className="text-gray-600">Producto: {convenio.producto}</p>
              <p className="text-sm text-gray-400">Descripción: {convenio.descripcion}</p>
            </div>
            <div className="mt-4 flex space-x-4 justify-between">
              <button
                className="bg-verde-chef text-white py-2 px-4 rounded-full font-bold hover:bg-blue-600 transition duration-300"
                onClick={() => openEditModal(convenio)}
              >
                <FontAwesomeIcon icon={faEdit} /> Editar
              </button>
              <button
                onClick={() => handleDelete(convenio._id)}
                className="bg-red-500 text-white py-2 px-4 rounded-full font-bold hover:bg-red-600 transition duration-300"
              >
                <FontAwesomeIcon icon={faTrash} /> Eliminar
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Modal para agregar o editar convenio */}
      {addConvenioModalVisible && (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center z-50">
          <CrearConvenio 
            onClose={closeAddConvenioModal} 
            onSave={handleCreateOrUpdateConvenio} 
            convenio={selectedConvenio} 
          />
        </div>
      )}
    </div>
  );
};

export default Convenios;
