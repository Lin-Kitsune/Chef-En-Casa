import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faPlus } from '@fortawesome/free-solid-svg-icons';
import { getAllSabiasQue, createSabiasQue, updateSabiasQue, deleteSabiasQue } from '../../services/sabiasQueService';
import SabiasQue from './SabiasQue';
import SabiasQueAgregar from './SabiasQueAgregar';

const SabiasQuePage = () => {
  const [sabiasQueList, setSabiasQueList] = useState([]);
  const [addModalVisible, setAddModalVisible] = useState(false);
  const [editSabiasQue, setEditSabiasQue] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(false); // Estado de carga
  const [error, setError] = useState(null); // Para manejar el error global

  // Función para obtener los "Sabías Que" desde el backend
  const fetchSabiasQue = async () => {
    try {
      setLoading(true);
      const data = await getAllSabiasQue();
      setSabiasQueList(data);
    } catch (error) {
      console.error('Error al cargar los Sabías Que:', error);
      setError('Error al cargar los Sabías Que. Intenta nuevamente.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSabiasQue();
  }, []);
  
  const handleEdit = (sabiasQue) => {
    setEditSabiasQue(sabiasQue);
    setAddModalVisible(true);
  };

  const handleDelete = async (id) => {
    try {
      const result = await deleteSabiasQue(id);
      if (result.message === 'Sabías Que eliminado exitosamente') {
        setSabiasQueList(sabiasQueList.filter(item => item._id !== id));
      }
    } catch (error) {
      alert('Error al eliminar Sabías Que');
    }
  };
  
  const handleSave = async (newSabiasQue) => {
    try {
      if (editSabiasQue) {
        // Editar Sabías Que
        const updatedSabiasQue = await updateSabiasQue(editSabiasQue._id, newSabiasQue);
        setSabiasQueList(prevList =>
          prevList.map(item => (item._id === updatedSabiasQue._id ? updatedSabiasQue : item))
        );
      } else {
        // Crear nuevo Sabías Que
        const createdSabiasQue = await createSabiasQue(newSabiasQue);
        setSabiasQueList(prevList => [...prevList, createdSabiasQue]);
      }
    } catch (error) {
      console.error('Error al guardar Sabías Que:', error);
      setError('Hubo un error al guardar los cambios.');
    } finally {
      setAddModalVisible(false);
      setEditSabiasQue(null);
      fetchSabiasQue(); // Recargar los Sabías Que después de guardar
    }
  };

// Filtro en la lista de "Sabías Que" según el searchQuery
const filteredSabiasQueList = sabiasQueList.filter(sabiasQue => 
  (sabiasQue.titulo?.toLowerCase() ?? '').includes(searchQuery.toLowerCase()) ||
  (sabiasQue.descripcion?.toLowerCase() ?? '').includes(searchQuery.toLowerCase()) ||
  (sabiasQue.beneficio?.toLowerCase() ?? '').includes(searchQuery.toLowerCase())
);

  return (
    <div className="p-6">
      {/* Barra de búsqueda y total */}
      <div className="flex justify-between items-center mb-6">
        <div className="relative flex items-center w-full max-w-lg">
          <FontAwesomeIcon icon={faSearch} className="absolute left-3 text-gray-400" />
          <input
            type="text"
            placeholder="Buscar Sabías Que..."
            className="w-full py-2 pl-10 pr-3 rounded-full border border-gray-300 focus:outline-none focus:ring focus:ring-green-300"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="text-lg font-semibold">Total de Sabías Que: {filteredSabiasQueList.length}</div>

        {/* Botón Agregar Sabías Que */}
        <button
          className="bg-verde-chef text-white py-2 px-6 rounded-full font-bold hover:bg-green-600 transition duration-300 flex items-center space-x-2"
          onClick={() => setAddModalVisible(true)}
        >
          <FontAwesomeIcon icon={faPlus} />
          <span>Agregar Sabías Que</span>
        </button>
      </div>

      {/* Mostrar error si ocurre algún problema */}
      {error && <div className="text-red-500 mb-4">{error}</div>}

      {/* Spinner de carga */}
      {loading && <div className="spinner">Cargando...</div>} {/* Puedes personalizar el spinner */}

  {/* Lista de Sabías Que */}
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredSabiasQueList.map(item => (
          <SabiasQue
            key={item._id}
            data={item}
            onEdit={handleEdit}
            onDelete={() => handleDelete(item._id)}
          />
        ))}
      </div>

      {/* Modal para agregar o editar Sabías Que */}
      {addModalVisible && (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center z-50">
          <SabiasQueAgregar
            onClose={() => setAddModalVisible(false)}
            onSave={handleSave}
            sabiasQue={editSabiasQue}
          />
        </div>
      )}
    </div>
  );
};

export default SabiasQuePage;