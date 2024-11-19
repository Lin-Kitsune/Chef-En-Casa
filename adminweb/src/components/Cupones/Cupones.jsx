import React, { useEffect, useState } from 'react';
import { getAllCupones, createCupon, updateCupon, deleteCupon } from '../../services/cuponService';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faEdit, faSearch, faPlus } from '@fortawesome/free-solid-svg-icons';
import CrearCupon from './CrearCupon';

const Cupones = () => {
  const [cupones, setCupones] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [addCuponModalVisible, setAddCuponModalVisible] = useState(false);
  const [selectedCupon, setSelectedCupon] = useState(null);

  // Función centralizada para obtener los cupones
  const fetchCupones = async () => {
    try {
      setLoading(true); // Muestra un estado de carga mientras se obtienen los datos
      const cuponList = await getAllCupones();
      setCupones(cuponList);
    } catch (error) {
      console.error('Error al cargar cupones:', error);
      alert('Error al cargar cupones. Inténtalo más tarde.');
    } finally {
      setLoading(false);
    }
  };

  // Llamada inicial para cargar los cupones
  useEffect(() => {
    fetchCupones();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm('¿Estás seguro de eliminar este cupón?')) {
      try {
        await deleteCupon(id);
        await fetchCupones(); // Actualiza el listado automáticamente
      } catch (error) {
        console.error('Error al eliminar cupón:', error);
        alert('Error al eliminar el cupón. Inténtalo nuevamente.');
      }
    }
  };

  const openEditModal = (cupon) => {
    setSelectedCupon(cupon);
    setAddCuponModalVisible(true);
  };

  const closeAddCuponModal = () => {
    setSelectedCupon(null);
    setAddCuponModalVisible(false);
  };

  const openAddCuponModal = () => {
    setSelectedCupon(null);
    setAddCuponModalVisible(true);
  };

  const handleCreateOrUpdateCupon = async (cuponData) => {
    try {
      if (selectedCupon) {
        await updateCupon(selectedCupon._id, cuponData);
      } else {
        await createCupon(cuponData);
      }
      await fetchCupones(); // Actualiza el listado automáticamente
    } catch (error) {
      console.error('Error al crear/actualizar cupón:', error);
      alert('Error al guardar el cupón. Inténtalo nuevamente.');
    } finally {
      closeAddCuponModal();
    }
  };

  const filteredCupones = cupones.filter((cupon) =>
    cupon?.nombre?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const totalCupones = cupones.length;

  if (loading) return <div>Cargando...</div>;

  return (
    <div className="p-5">
      {/* Barra de búsqueda y botón "Agregar Cupón" */}
      <div className="flex justify-between items-center mb-6">
        <div className="relative flex items-center w-full max-w-lg">
          <FontAwesomeIcon icon={faSearch} className="absolute left-3 text-gray-400" />
          <input
            type="text"
            placeholder="Buscar cupones..."
            className="w-full py-2 pl-10 pr-3 rounded-full border border-gray-300 focus:outline-none focus:ring focus:ring-green-300"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="text-lg font-semibold">Total de cupones: {totalCupones}</div>
        <button
          className="bg-green-500 text-white py-2 px-6 rounded-full font-bold hover:bg-green-600 transition duration-300 flex items-center space-x-2"
          onClick={openAddCuponModal}
        >
          <FontAwesomeIcon icon={faPlus} />
          <span>Agregar Cupón</span>
        </button>
      </div>

      {/* Grid de cupones */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCupones.map((cupon) => (
          <div key={cupon._id} className="bg-white rounded-lg shadow-md p-4 flex flex-col h-full">
            <div className="flex-grow">
              <h3 className="text-lg font-semibold">{cupon.nombre}</h3>
              <p className="text-gray-600">Descuento: {cupon.descuento}%</p>
              <p className="text-gray-600">Puntos: {cupon.puntos_necesarios}</p>
              <p className="text-sm text-gray-400">Expira: {cupon.fecha_expiracion}</p>
            </div>
            <div className="mt-4 flex space-x-4 justify-between">
              <button
                className="bg-green-500 text-white py-2 px-4 rounded-full font-bold hover:bg-blue-600 transition duration-300"
                onClick={() => openEditModal(cupon)}
              >
                <FontAwesomeIcon icon={faEdit} /> Editar
              </button>
              <button
                onClick={() => handleDelete(cupon._id)}
                className="bg-red-500 text-white py-2 px-4 rounded-full font-bold hover:bg-red-600 transition duration-300"
              >
                <FontAwesomeIcon icon={faTrash} /> Eliminar
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Modal para agregar o editar cupón */}
      {addCuponModalVisible && (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center z-50">
          <CrearCupon
            onClose={closeAddCuponModal}
            onSave={handleCreateOrUpdateCupon}
            cupon={selectedCupon}
          />
        </div>
      )}
    </div>
  );
};

export default Cupones;
