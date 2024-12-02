import React, { useEffect, useState } from 'react';
import { getAllConvenios, createConvenio, updateConvenio, deleteConvenio } from '../../services/convenioService';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faEdit, faSearch, faPlus } from '@fortawesome/free-solid-svg-icons';
import CrearConvenio from './CrearConvenio';

const IMAGE_BASE_URL = 'http://localhost:4000';

const Convenios = () => {
  const [convenios, setConvenios] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [addConvenioModalVisible, setAddConvenioModalVisible] = useState(false);
  const [selectedConvenio, setSelectedConvenio] = useState(null);

  // Función para obtener los convenios desde el backend
  const fetchConvenios = async () => {
    try {
      setLoading(true); // Muestra el estado de carga
      const convenioList = await getAllConvenios();
      setConvenios(convenioList);
    } catch (error) {
      console.error('Error fetching convenios:', error);
      alert('Error al cargar convenios. Inténtalo más tarde.');
    } finally {
      setLoading(false); // Oculta el estado de carga
    }
  };

  useEffect(() => {
    fetchConvenios();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm('¿Estás seguro de eliminar este convenio?')) {
      try {
        await deleteConvenio(id);
        fetchConvenios(); // Recarga el listado después de eliminar
      } catch (error) {
        console.error('Error al eliminar convenio:', error);
        alert('Error al eliminar el convenio. Inténtalo nuevamente.');
      }
    }
  };
  
  const openEditModal = (convenio) => {
    setSelectedConvenio(convenio);
    setAddConvenioModalVisible(true);
  };

  const closeAddConvenioModal = () => {
    setSelectedConvenio(null);
    setAddConvenioModalVisible(false);
  };

  const openAddConvenioModal = () => {
    setSelectedConvenio(null);
    setAddConvenioModalVisible(true);
  };

  const handleCreateOrUpdateConvenio = async (convenioData) => {
    try {
      if (selectedConvenio) {
        // Editar convenio
        await updateConvenio(selectedConvenio._id, convenioData);
      } else {
        // Crear convenio
        await createConvenio(convenioData);
      }
      fetchConvenios(); // Recarga el listado después de agregar o editar
    } catch (error) {
      console.error('Error creando/actualizando convenio:', error);
      alert('Error al guardar el convenio. Inténtalo nuevamente.');
    } finally {
      closeAddConvenioModal();
    }
  };

  const filteredConvenios = convenios.filter((convenio) =>
    convenio?.empresa?.toLowerCase().includes(searchQuery.toLowerCase())
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

        <div className="text-lg font-semibold">Total de convenios: {totalConvenios}</div>

        <button
          className="bg-verde-chef text-white py-2 px-6 rounded-full font-bold hover:bg-green-600 transition duration-300 flex items-center space-x-2"
          onClick={openAddConvenioModal}
        >
          <FontAwesomeIcon icon={faPlus} />
          <span>Agregar Convenio</span>
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredConvenios.map((convenio) => (
          <div key={convenio._id} className="bg-white rounded-lg shadow-md p-4 flex flex-col h-full">
            <div className="flex-grow">
              <img 
                src={convenio.imagen ? `${IMAGE_BASE_URL}/${convenio.imagen}` : 'ruta/a/imagen/por/defecto.jpg'}
                alt={convenio.producto}
                className="w-full h-32 object-cover mb-4 rounded-lg"
                crossOrigin="anonymous" 
              />
              <p className="text-lg font-semibold">Empresa: {convenio.empresa}</p>
              <p className="text-gray-600">Producto: {convenio.producto}</p>
              <p className="text-sm text-gray-400">Descripción: {convenio.descripcion}</p>
              <p className="text-sm text-gray-400">Precio: {convenio.precio}</p>
            </div>
            <div className="mt-4 flex space-x-4 justify-between">
              <button className="bg-verde-chef text-white py-2 px-4 rounded-full font-bold hover:bg-blue-600" onClick={() => openEditModal(convenio)}>
                <FontAwesomeIcon icon={faEdit} /> Editar
              </button>
              <button onClick={() => handleDelete(convenio._id)} className="bg-red-500 text-white py-2 px-4 rounded-full font-bold hover:bg-red-600">
                <FontAwesomeIcon icon={faTrash} /> Eliminar
              </button>
            </div>
          </div>
        ))}
      </div>

      {addConvenioModalVisible && (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center z-50">
          <CrearConvenio onClose={closeAddConvenioModal} onSave={handleCreateOrUpdateConvenio} convenio={selectedConvenio} />
        </div>
      )}
    </div>
  );
};

export default Convenios;
