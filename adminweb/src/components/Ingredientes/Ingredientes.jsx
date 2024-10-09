import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faPlus, faFilter, faEdit } from '@fortawesome/free-solid-svg-icons'; // Añadir ícono de editar
import leche from '../../images/leche.jpg';
import manzana from '../../images/manzana.jpg';
import espinaca from '../../images/espinaca.jpg';
import pollo from '../../images/pollo.jpeg';
import arroz from '../../images/arroz.jpg';
import './Ingredientes.css';

const Ingredientes = () => {
  const [filterModalVisible, setFilterModalVisible] = useState(false);
  const [addIngredientModalVisible, setAddIngredientModalVisible] = useState(false);
  const [editIngredientModalVisible, setEditIngredientModalVisible] = useState(false); // Estado para modal de editar
  const [selectedIngredient, setSelectedIngredient] = useState(null); // Ingrediente seleccionado para editar
  const [classification, setClassification] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  const ingredientes = [
    { id: 1, name: 'Leche', category: 'Lácteos', image: leche },
    { id: 2, name: 'Manzana', category: 'Frutas', image: manzana },
    { id: 3, name: 'Espinaca', category: 'Verduras', image: espinaca },
    { id: 4, name: 'Pollo', category: 'Carnes', image: pollo },
    { id: 5, name: 'Arroz', category: 'Almacen', image: arroz },
  ];

  const toggleFilterModal = () => setFilterModalVisible(!filterModalVisible);
  const toggleAddIngredientModal = () => setAddIngredientModalVisible(!addIngredientModalVisible);

  // Función para abrir el modal de edición y cargar los datos del ingrediente
  const openEditModal = (ingredient) => {
    setSelectedIngredient(ingredient);
    setEditIngredientModalVisible(true); // Abrir modal de editar
  };

  const closeEditModal = () => setEditIngredientModalVisible(false); // Cerrar modal

  const filteredIngredientes = ingredientes
    .filter((ingrediente) => {
      const matchesSearch = ingrediente.name.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = classification ? ingrediente.category === classification : true;
      return matchesSearch && matchesCategory;
    });

  return (
    <div className="p-5">
      <div className="flex items-center mb-6 space-x-4">
        <div className="relative flex items-center w-full max-w-lg">
          <FontAwesomeIcon icon={faSearch} className="absolute left-3 text-gray-400" />
          <input
            type="text"
            placeholder="Buscar ingredientes..."
            className="w-full py-2 pl-10 pr-3 rounded-full border border-gray-300 focus:outline-none focus:ring focus:ring-green-300"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <button
          onClick={toggleAddIngredientModal}
          className="bg-verde-chef text-white py-2 px-6 rounded-full font-bold hover:bg-green-600 transition duration-300 flex items-center space-x-2"
        >
          <FontAwesomeIcon icon={faPlus} />
          <span>AGREGAR</span>
        </button>

        <button
          onClick={toggleFilterModal}
          className="bg-verde-chef text-white py-2 px-6 rounded-full font-bold hover:bg-green-600 transition duration-300 flex items-center space-x-2"
        >
          <FontAwesomeIcon icon={faFilter} />
          <span>FILTRO</span>
        </button>
      </div>

      {/* Grid de ingredientes */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredIngredientes.map((ingrediente) => (
          <div key={ingrediente.id} className="bg-white rounded-lg shadow-md p-4">
            <img src={ingrediente.image} alt={ingrediente.name} className="rounded-lg mb-4 w-full h-40 object-cover" />
            <div className="ingrediente-info">
              <h3 className="text-lg font-semibold mb-2">{ingrediente.name}</h3>
              <p className="text-gray-600">{ingrediente.category}</p>
              <button
                className="mt-4 bg-verde-chef text-white py-2 px-4 rounded-full font-bold hover:bg-green-600 transition duration-300"
                onClick={() => openEditModal(ingrediente)} // Abrir modal con los datos del ingrediente
              >
                <FontAwesomeIcon icon={faEdit} /> Editar
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Modal de agregar ingrediente */}
      {addIngredientModalVisible && (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h2 className="text-lg font-bold mb-4">Agregar Ingrediente</h2>
            <div className="space-y-4">
              {/* Nombre del ingrediente */}
              <div>
                <label className="block mb-2 font-semibold">Nombre</label>
                <input
                  type="text"
                  className="w-full border border-gray-300 rounded-lg p-2"
                  placeholder="Nombre del ingrediente"
                />
              </div>

              {/* Categoría del ingrediente */}
              <div>
                <label className="block mb-2 font-semibold">Categoría</label>
                <select className="w-full border border-gray-300 rounded-lg p-2">
                  <option value="Lácteos">Lácteos</option>
                  <option value="Frutas">Frutas</option>
                  <option value="Verduras">Verduras</option>
                  <option value="Carnes">Carnes</option>
                  <option value="Almacen">Almacén</option>
                </select>
              </div>

              {/* Imagen del ingrediente */}
              <div>
                <label className="block mb-2 font-semibold">Imagen</label>
                <input
                  type="file"
                  className="w-full cursor-pointer rounded-lg border-[1.5px] border-gray-300 bg-transparent p-2 font-normal outline-none transition file:mr-5 file:cursor-pointer file:border-0 file:border-r file:border-solid file:border-gray-300 file:bg-white file:px-2 file:py-2 file:text-gray-700 file:hover:bg-green-600 file:hover:text-white focus:border-green-500"
                />
              </div>
            </div>

            <div className="flex justify-end mt-4 space-x-4">
              <button className="bg-gray-300 text-black py-2 px-4 rounded-full" onClick={toggleAddIngredientModal}>
                Cancelar
              </button>
              <button
                className="bg-verde-chef text-white py-2 px-4 rounded-full"
                onClick={toggleAddIngredientModal}
              >
                Guardar Ingrediente
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal de editar ingrediente */}
      {editIngredientModalVisible && selectedIngredient && (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h2 className="text-lg font-bold mb-4">Editar Ingrediente</h2>
            <div className="space-y-4">
              {/* Nombre del ingrediente */}
              <div>
                <label className="block mb-2 font-semibold">Nombre</label>
                <input
                  type="text"
                  className="w-full border border-gray-300 rounded-lg p-2"
                  value={selectedIngredient.name}
                  onChange={(e) =>
                    setSelectedIngredient({ ...selectedIngredient, name: e.target.value })
                  }
                />
              </div>

              {/* Categoría del ingrediente */}
              <div>
                <label className="block mb-2 font-semibold">Categoría</label>
                <select
                  className="w-full border border-gray-300 rounded-lg p-2"
                  value={selectedIngredient.category}
                  onChange={(e) =>
                    setSelectedIngredient({ ...selectedIngredient, category: e.target.value })
                  }
                >
                  <option value="Lácteos">Lácteos</option>
                  <option value="Frutas">Frutas</option>
                  <option value="Verduras">Verduras</option>
                  <option value="Carnes">Carnes</option>
                  <option value="Almacen">Almacén</option>
                </select>
              </div>

              {/* Imagen del ingrediente */}
              <div>
                <label className="block mb-2 font-semibold">Imagen</label>
                <input
                  type="file"
                  className="w-full cursor-pointer rounded-lg border-[1.5px] border-gray-300 bg-transparent p-2 font-normal outline-none transition file:mr-5 file:cursor-pointer file:border-0 file:border-r file:border-solid file:border-gray-300 file:bg-white file:px-2 file:py-2 file:text-gray-700 file:hover:bg-green-600 file:hover:text-white focus:border-green-500"
                  onChange={(e) => {
                    setSelectedIngredient({
                      ...selectedIngredient,
                      image: e.target.files[0],
                    });
                  }}
                />
              </div>
            </div>

            <div className="flex justify-end mt-4 space-x-4">
              <button className="bg-gray-300 text-black py-2 px-4 rounded-full" onClick={closeEditModal}>
                Cancelar
              </button>
              <button className="bg-verde-chef text-white py-2 px-4 rounded-full" onClick={closeEditModal}>
                Guardar Cambios
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal de filtro de ingredientes */}
      {filterModalVisible && (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-3xl">
            <h2 className="text-lg font-bold mb-4">Filtrar Ingredientes</h2>

            <div className="grid grid-cols-3 gap-4">
              {/* Filtro de Categoría */}
              <div>
                <h3 className="font-bold mb-2">Categoría</h3>
                <button
                  onClick={() => setClassification('Lácteos')}
                  className={`block py-1 ${classification === 'Lácteos' ? 'text-verde-chef font-bold' : 'text-black'}`}
                >
                  Lácteos
                </button>
                <button
                  onClick={() => setClassification('Frutas')}
                  className={`block py-1 ${classification === 'Frutas' ? 'text-verde-chef font-bold' : 'text-black'}`}
                >
                  Frutas
                </button>
                <button
                  onClick={() => setClassification('Verduras')}
                  className={`block py-1 ${classification === 'Verduras' ? 'text-verde-chef font-bold' : 'text-black'}`}
                >
                  Verduras
                </button>
                <button
                  onClick={() => setClassification('Carnes')}
                  className={`block py-1 ${classification === 'Carnes' ? 'text-verde-chef font-bold' : 'text-black'}`}
                >
                  Carnes
                </button>
                <button
                  onClick={() => setClassification('Almacen')}
                  className={`block py-1 ${classification === 'Almacen' ? 'text-verde-chef font-bold' : 'text-black'}`}
                >
                  Almacen
                </button>
              </div>
            </div>

            <div className="flex justify-end mt-4">
              <button className="bg-gray-300 text-black py-2 px-4 rounded-full mr-2" onClick={toggleFilterModal}>
                Cancelar
              </button>
              <button className="bg-verde-chef text-white py-2 px-4 rounded-full mr-2" onClick={() => {
                setClassification('');
                toggleFilterModal();
              }}>
                Eliminar Filtros
              </button>
              <button className="bg-verde-chef text-white py-2 px-4 rounded-full" onClick={toggleFilterModal}>
                Aplicar Filtro
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Ingredientes;
