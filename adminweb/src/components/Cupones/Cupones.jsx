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

  // Obtener lista de cupones al cargar
  useEffect(() => {
    const fetchCupones = async () => {
      const cuponList = await getAllCupones();
      setCupones(cuponList);
      setLoading(false);
    };

    fetchCupones();
  }, []);

  const handleDelete = async (id) => {
    console.log("Eliminando cupón con ID:", id); // Muestra el ID específico en la consola
    if (window.confirm('¿Estás seguro de eliminar este cupón?')) {
      await deleteCupon(id);
      setCupones(cupones.filter(cupon => cupon.id !== id)); // Usar 'id' en lugar de '_id'
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

  const handleCreateOrUpdateCupon = async (cupon) => {
    if (selectedCupon) {
      await updateCupon(cupon.id, cupon); // Usar 'id' en lugar de '_id'
      setCupones(cupones.map(c => (c.id === cupon.id ? cupon : c))); // Usar 'id' en lugar de '_id'
    } else {
      const createdCupon = await createCupon(cupon);
      setCupones([...cupones, createdCupon]);
    }
    closeAddCuponModal();
  };

  const filteredCupones = cupones.filter(cupon =>
    cupon.nombre.toLowerCase().includes(searchQuery.toLowerCase())
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

        {/* Mostrar el total de cupones */}
        <div className="text-lg font-semibold">
          Total de cupones: {totalCupones}
        </div>

        {/* Botón para abrir el modal de agregar cupón */}
        <button
          className="bg-verde-chef text-white py-2 px-6 rounded-full font-bold hover:bg-green-600 transition duration-300 flex items-center space-x-2"
          onClick={openAddCuponModal}
        >
          <FontAwesomeIcon icon={faPlus} />
          <span>Agregar Cupón</span>
        </button>
      </div>

      {/* Grid de cupones */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCupones.map((cupon) => (
          <div key={cupon.id} className="bg-white rounded-lg shadow-md p-4 flex flex-col h-full">
            <div className="flex-grow">
              <h3 className="text-lg font-semibold">{cupon.nombre}</h3>
              <p className="text-gray-600">Descuento: {cupon.descuento}%</p>
              <p className="text-gray-600">Puntos: {cupon.puntos_necesarios}</p>
              <p className="text-sm text-gray-400">Expira: {cupon.fecha_expiracion}</p>
            </div>
            <div className="mt-4 flex space-x-4 justify-between">
              <button
                className="bg-verde-chef text-white py-2 px-4 rounded-full font-bold hover:bg-blue-600 transition duration-300"
                onClick={() => openEditModal(cupon)}
              >
                <FontAwesomeIcon icon={faEdit} /> Editar
              </button>
              <button
                onClick={() => handleDelete(cupon.id)} // Usar 'id' en lugar de '_id'
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
