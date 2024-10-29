import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faPlus, faFilter, faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import { getAllIngredientes, createIngrediente, updateIngrediente, deleteIngrediente } from '../../services/ingredientesService'
import { getAllCategorias, createCategoria } from '../../services/categoriasService';
import './Ingredientes.css';

const IMAGE_PROXY_URL = 'http://localhost:4000/api/proxy-image';

const Ingredientes = () => {
  const [ingredientes, setIngredientes] = useState([]);
  const [categorias, setCategorias] = useState([]);
  const [filterModalVisible, setFilterModalVisible] = useState(false);
  const [addIngredientModalVisible, setAddIngredientModalVisible] = useState(false);
  const [addCategoryModalVisible, setAddCategoryModalVisible] = useState(false);
  const [editIngredientModalVisible, setEditIngredientModalVisible] = useState(false);
  const [selectedIngredient, setSelectedIngredient] = useState(null);
  const [classification, setClassification] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [newIngredient, setNewIngredient] = useState({ nombre: '', categoria: '', imagen: null });
  const [newCategory, setNewCategory] = useState(''); // Nueva categoría
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 20;

  useEffect(() => {
    fetchIngredientes();
    fetchCategorias();
  }, []);

  // Función para cargar todos los ingredientes desde el backend
  const fetchIngredientes = async () => {
    try {
      const data = await getAllIngredientes();
      setIngredientes(data);
    } catch (error) {
      console.error('Error al cargar ingredientes:', error);
    }
  };

   // Cargar categorías desde el backend
   const fetchCategorias = async () => {
    try {
      const data = await getAllCategorias();
      setCategorias(data);
    } catch (error) {
      console.error('Error al cargar categorías:', error);
    }
  };

  const toggleAddCategoryModal = () => setAddCategoryModalVisible(!addCategoryModalVisible);

  // Agregar una nueva categoría y actualizar el selector
  const handleAddCategory = async () => {
    if (!newCategory) return;
    try {
      await createCategoria(newCategory);
      setNewCategory(''); // Limpiar el campo de categoría
      setAddCategoryModalVisible(false);
      fetchCategorias(); // Actualizar lista de categorías
    } catch (error) {
      console.error('Error al agregar categoría:', error);
    }
  };

  // Función para manejar la adición de un nuevo ingrediente
  const handleAddIngredient = async () => {
    try {
      await createIngrediente(newIngredient);
      setAddIngredientModalVisible(false);
      setNewIngredient({ nombre: '', categoria: '', imagen: null });
      fetchIngredientes(); // Recargar la lista de ingredientes
    } catch (error) {
      console.error('Error al agregar ingrediente:', error);
    }
  };

// Función para manejar la actualización de un ingrediente existente
const handleUpdateIngredient = async () => {
  try {
    await updateIngrediente(selectedIngredient._id, selectedIngredient);
    setEditIngredientModalVisible(false);
    setSelectedIngredient(null);
    fetchIngredientes(); // Recargar la lista de ingredientes
  } catch (error) {
    console.error('Error al actualizar ingrediente:', error);
  }
};


  // Función para eliminar un ingrediente
  const handleDeleteIngredient = async (id) => {
    try {
      await deleteIngrediente(id);
      fetchIngredientes(); // Recargar la lista de ingredientes
    } catch (error) {
      console.error('Error al eliminar ingrediente:', error);
    }
  };

  const toggleFilterModal = () => setFilterModalVisible(!filterModalVisible);
  const toggleAddIngredientModal = () => setAddIngredientModalVisible(!addIngredientModalVisible);

  // Función para abrir el modal de edición y cargar los datos del ingrediente
  const openEditModal = (ingredient) => {
    setSelectedIngredient(ingredient);
    setEditIngredientModalVisible(true);
  };

  const closeEditModal = () => setEditIngredientModalVisible(false);

  const filteredIngredientes = ingredientes.filter((ingrediente) => {
    // Buscar en `nombreEspanol` y `nombre`
    const matchesSearch = (ingrediente.nombreEspanol && ingrediente.nombreEspanol.toLowerCase().includes(searchQuery.toLowerCase())) ||
                          (ingrediente.nombre && ingrediente.nombre.toLowerCase().includes(searchQuery.toLowerCase()));
  
    // Filtrar por categoría si se ha seleccionado una
    const matchesCategory = classification ? ingrediente.categoria === classification : true;
  
    return matchesSearch && matchesCategory;
  });
  
  
  // Cálculo de ingredientes para la página actual
  const totalPages = Math.ceil(filteredIngredientes.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const ingredientesToDisplay = filteredIngredientes.slice(startIndex, endIndex);

  const goToNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const goToPreviousPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };
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
      {ingredientesToDisplay.map((ingrediente) => (
          <div key={ingrediente._id} className="bg-white rounded-lg shadow-md p-4">
            <div className="relative w-full h-40 bg-gray-100 rounded-lg overflow-hidden flex justify-center items-center">
              <img
                src={ingrediente.imagen ? `http://localhost:4000/${ingrediente.imagen}` : `${IMAGE_PROXY_URL}/${ingrediente.image}`}
                crossOrigin="anonymous" 
                alt={ingrediente.nombreOriginal}
                className="rounded-lg max-h-full max-w-full object-contain"
              />
            </div>
            <div className="ingrediente-info">
              <h3 className="text-lg font-semibold mb-2">{ingrediente.nombreEspanol || ingrediente.nombre}</h3>
              <p className="text-gray-600">{ingrediente.categoria}</p>
              <button
                className="mt-4 bg-verde-chef text-white py-2 px-4 rounded-full font-bold hover:bg-green-600 transition duration-300"
                onClick={() => openEditModal(ingrediente)}
              >
                <FontAwesomeIcon icon={faEdit} /> Editar
              </button>
              <button
                className="mt-4 bg-red-600 text-white py-2 px-4 rounded-full font-bold hover:bg-red-700 transition duration-300 ml-2"
                onClick={() => handleDeleteIngredient(ingrediente._id)}
              >
                <FontAwesomeIcon icon={faTrash} /> Eliminar
              </button>
            </div>
          </div>
        ))}
      </div>
        {/* Paginación */}
      <div className="flex justify-center mt-6">
        <button
          onClick={goToPreviousPage}
          disabled={currentPage === 1}
          className={`py-2 px-4 rounded-l ${currentPage === 1 ? 'bg-gray-300' : 'bg-verde-chef text-white'}`}
        >
          Anterior
        </button>
        <span className="py-2 px-4 bg-gray-200">
          Página {currentPage} de {totalPages}
        </span>
        <button
          onClick={goToNextPage}
          disabled={currentPage === totalPages}
          className={`py-2 px-4 rounded-r ${currentPage === totalPages ? 'bg-gray-300' : 'bg-verde-chef text-white'}`}
        >
          Siguiente
        </button>
      </div>
      {/* Modal para agregar ingrediente */}
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
                  value={newIngredient.nombre}
                  onChange={(e) => setNewIngredient({ ...newIngredient, nombre: e.target.value })}
                />
              </div>

              {/* Selector de categoría con botón de agregar */}
              <div>
                <label className="block mb-2 font-semibold">Categoría</label>
                <div className="flex items-center space-x-2">
                  <select
                    className="w-full border border-gray-300 rounded-lg p-2"
                    value={newIngredient.categoria}
                    onChange={(e) => setNewIngredient({ ...newIngredient, categoria: e.target.value })}
                  >
                    <option value="" disabled>Selecciona una categoría</option>
                    {categorias.map((categoria) => (
                      <option key={categoria._id} value={categoria.nombre}>{categoria.nombre}</option>
                    ))}
                  </select>
                  <button
                    onClick={toggleAddCategoryModal}
                    className="bg-verde-chef text-white px-3 py-1 rounded-full"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Imagen del ingrediente */}
              <div>
                <label className="block mb-2 font-semibold">Imagen</label>
                <input
                  type="file"
                  className="w-full cursor-pointer rounded-lg border-[1.5px] border-gray-300 bg-transparent p-2 font-normal outline-none transition file:mr-5 file:cursor-pointer file:border-0 file:border-r file:border-solid file:border-gray-300 file:bg-white file:px-2 file:py-2 file:text-gray-700 file:hover:bg-green-600 file:hover:text-white focus:border-green-500"
                  onChange={(e) => setNewIngredient({ ...newIngredient, imagen: e.target.files[0] })}
                />
              </div>
            </div>

            <div className="flex justify-end mt-4 space-x-4">
              <button className="bg-gray-300 text-black py-2 px-4 rounded-full" onClick={toggleAddIngredientModal}>
                Cancelar
              </button>
              <button
                className="bg-verde-chef text-white py-2 px-4 rounded-full"
                onClick={handleAddIngredient}
              >
                Guardar Ingrediente
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal para agregar nueva categoría */}
      {addCategoryModalVisible && (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h2 className="text-lg font-bold mb-4">Agregar Categoría</h2>
            <input
              type="text"
              className="w-full border border-gray-300 rounded-lg p-2 mb-4"
              placeholder="Nombre de la nueva categoría"
              value={newCategory}
              onChange={(e) => setNewCategory(e.target.value)}
            />
            <div className="flex justify-end">
              <button onClick={() => setAddCategoryModalVisible(false)} className="bg-gray-300 text-black py-2 px-4 rounded-full mr-2">
                Cancelar
              </button>
              <button onClick={handleAddCategory} className="bg-verde-chef text-white py-2 px-4 rounded-full">
                Guardar Categoría
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
                  value={selectedIngredient.nombre}
                  onChange={(e) =>
                    setSelectedIngredient({ ...selectedIngredient, nombre: e.target.value })
                  }
                />
              </div>

              {/* Categoría del ingrediente */}
              <div>
                <label className="block mb-2 font-semibold">Categoría</label>
                <select
                  className="w-full border border-gray-300 rounded-lg p-2"
                  value={selectedIngredient.categoria}
                  onChange={(e) =>
                    setSelectedIngredient({ ...selectedIngredient, categoria: e.target.value })
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
                      imagen: e.target.files[0],
                    });
                  }}
                />
              </div>
            </div>

            <div className="flex justify-end mt-4 space-x-4">
              <button className="bg-gray-300 text-black py-2 px-4 rounded-full" onClick={closeEditModal}>
                Cancelar
              </button>
              <button
                className="bg-verde-chef text-white py-2 px-4 rounded-full"
                onClick={handleUpdateIngredient}
              >
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
