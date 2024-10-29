import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faStar, faClock, faPlus, faFilter, faTimes, faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import { getAllRecetas, createReceta, updateReceta, deleteReceta } from '../../services/recetaService';
import { getAllIngredientes } from '../../services/ingredientesService';
import './Recetas.css';

// faUtensils

const Recetas = () => {
  const [recetas, setRecetas] = useState([]);
  const [filterModalVisible, setFilterModalVisible] = useState(false);
  const [addRecipeModalVisible, setAddRecipeModalVisible] = useState(false);
  const [classification, setClassification] = useState('');
  const [minRating, setMinRating] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const [durationFilter, setDurationFilter] = useState('');
  const [sortBy, setSortBy] = useState('');
  const [editRecipeModalVisible, setEditRecipeModalVisible] = useState(false);
  const [selectedRecipe, setSelectedRecipe] = useState({
    titulo: '',
    duracion: '',
    ingredientes: [],
    porciones: '',
    imagen: null,
    paso: '',
    valoracion: 0
  });
  
  // Estado para nueva receta
  const [newRecipe, setNewRecipe] = useState({
    titulo: '',         // Nombre de la receta
    duracion: '',       // Duración en minutos
    ingredientes: [],   // Lista de ingredientes, inicializado como un array vacío
    porciones: '',      // Número de porciones
    imagen: null,       // Imagen del plato
    paso: '',           // Pasos de la receta
    valoracion: 0       // Valoración inicial
  });
  

  const [ingredientSearch, setIngredientSearch] = useState('');
  const [selectedIngredient, setSelectedIngredient] = useState({ nombre: '', cantidad: '' });
  const [availableIngredients, setAvailableIngredients] = useState([]);

  // Función para abrir y cerrar el modal de filtro
  const toggleFilterModal = () => {
    setFilterModalVisible(!filterModalVisible);
  };

  // Función para cargar recetas e ingredientes
  const fetchRecetasAndIngredientes = async () => {
    try {
      // Cargar recetas
      const recetasData = await getAllRecetas();
      setRecetas(recetasData);

      // Cargar ingredientes
      const ingredientesData = await getAllIngredientes();
      setAvailableIngredients(ingredientesData.map(ing => ing.nombreEspanol || ing.nombre));
    } catch (error) {
      console.error('Error al cargar datos:', error);
    }
  };

   // Cargar recetas e ingredientes desde el backend al montar el componente
   useEffect(() => {
    fetchRecetasAndIngredientes();
  }, []);

  // Función para manejar cambios en los campos de la receta nueva
  const handleRecipeChange = (field, value) => {
    setNewRecipe({ ...newRecipe, [field]: value });
  };

  // Función para agregar un nuevo ingrediente
  const addIngredient = () => {
    if (selectedIngredient.nombre && selectedIngredient.cantidad) {
      setNewRecipe((prevRecipe) => ({
        ...prevRecipe,
        ingredientes: [...(prevRecipe.ingredientes || []), selectedIngredient]
      }));
      setSelectedIngredient({ nombre: '', cantidad: '' });
    }
  };

  // Función para eliminar un ingrediente de la lista
  const removeIngredient = (index) => {
    const updatedIngredients = newRecipe.ingredientes.filter((_, i) => i !== index);
    setNewRecipe({ ...newRecipe, ingredientes: updatedIngredients });
  };

  // Función para limpiar filtros
  const clearFilters = () => {
    setClassification('');
    setDurationFilter('');
    setSortBy('');
    setMinRating(0);
    setSearchQuery('');
    toggleFilterModal();
  };

    // Función para abrir y cerrar el modal de agregar receta
    const toggleAddRecipeModal = () => {
      setAddRecipeModalVisible(!addRecipeModalVisible);
    };

  // Función para abrir el modal de edición
  const openEditModal = (recipe) => {
    setSelectedRecipe({
      ...recipe,
      ingredientes: recipe.ingredientes || [],  // Asegura que ingredientes siempre es un array
      paso: recipe.paso || '',
      valoracion: recipe.valoracion || 0,
      imagen: recipe.imagen || null,
    });
    setEditRecipeModalVisible(true);
  };

  // Función para cerrar el modal de edición
  const closeEditModal = () => {
    setEditRecipeModalVisible(false);
  };
  
  // Filtrar recetas en base a búsqueda y filtros
const filteredRecetas = recetas
    .filter((receta) => {
      // Verifica que el título exista antes de aplicar toLowerCase()
      const matchesSearch = receta.titulo 
        ? receta.titulo.toLowerCase().includes(searchQuery.toLowerCase()) 
        : false;
        
      const matchesCategory = classification ? receta.categoria === classification : true;
      const matchesRating = receta.valoracion >= minRating;
      const matchesDuration = durationFilter
        ? (durationFilter === 'short' && receta.duracion < 10) ||
          (durationFilter === 'medium' && receta.duracion >= 10 && receta.duracion <= 30) ||
          (durationFilter === 'long' && receta.duracion > 30)
        : true;
        
      return matchesSearch && matchesCategory && matchesRating && matchesDuration;
    })
    .sort((a, b) => {
      if (sortBy === 'ratingAsc') return a.valoracion - b.valoracion;
      if (sortBy === 'ratingDesc') return b.valoracion - a.valoracion;
      return 0;
    });

// Función para agregar una receta nueva
const handleAddRecipe = async () => {
  try {
    const formData = new FormData();

    formData.append('titulo', newRecipe.titulo);
    formData.append('duracion', newRecipe.duracion);
    formData.append('porciones', newRecipe.porciones);
    formData.append('paso', newRecipe.paso);
    formData.append('valoracion', newRecipe.valoracion);
    formData.append('ingredientes', JSON.stringify(newRecipe.ingredientes));

    if (newRecipe.imagen) {
      formData.append('imagen', newRecipe.imagen);
    }

    await createReceta(formData);

    // Volver a cargar las recetas después de agregar una nueva
    await fetchRecetasAndIngredientes();
    setAddRecipeModalVisible(false);
  } catch (error) {
    console.error('Error al agregar receta:', error);
  }
};

 // Función para actualizar una receta
const handleUpdateRecipe = async () => {
  try {
    const formData = new FormData();
    formData.append('titulo', selectedRecipe.titulo);
    formData.append('duracion', selectedRecipe.duracion);
    formData.append('porciones', selectedRecipe.porciones);
    formData.append('paso', selectedRecipe.paso);
    formData.append('valoracion', selectedRecipe.valoracion);
    formData.append('ingredientes', JSON.stringify(selectedRecipe.ingredientes));
    if (selectedRecipe.imagen && selectedRecipe.imagen instanceof File) {
      formData.append('imagen', selectedRecipe.imagen);
    }

    const updatedRecipe = await updateReceta(selectedRecipe._id, formData);
    
    // Reemplaza la receta actualizada en el estado
    setRecetas((prevRecetas) =>
      prevRecetas.map((receta) => (receta._id === updatedRecipe._id ? updatedRecipe : receta))
    );
    
    closeEditModal();
  } catch (error) {
    console.error('Error al actualizar receta:', error);
  }
}; 

 // Función para eliminar una receta
const handleDeleteRecipe = async (id) => {
  try {
    await deleteReceta(id);
    
    // Elimina la receta del estado
    setRecetas((prevRecetas) => prevRecetas.filter((receta) => receta._id !== id));
  } catch (error) {
    console.error('Error al eliminar receta:', error);
  }
};

  // Filtrar ingredientes disponibles según la búsqueda
  const filteredIngredients = availableIngredients.filter((ingredient) =>
    ingredient && ingredient.toLowerCase().includes(ingredientSearch.toLowerCase())
  );

  return (
    <div className="p-5"> {/* padding para la página */} 
      {/* Barra de búsqueda y botones "Agregar" y "Filtro" */}
      <div className="flex items-center mb-6 space-x-4">
        <div className="relative flex items-center w-full max-w-lg">
          <FontAwesomeIcon icon={faSearch} className="absolute left-3 text-gray-400" /> {/* Ícono */}
          <input 
            type="text" 
            placeholder="Buscar recetas..." 
            className="w-full py-2 pl-10 pr-3 rounded-full border border-gray-300 focus:outline-none focus:ring focus:ring-green-300"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)} // Actualiza el valor de búsqueda
          />
        </div>

        {/* Botón "Agregar" con ícono */}
        <button 
          onClick={toggleAddRecipeModal}
          className="bg-verde-chef text-white py-2 px-6 rounded-full font-bold hover:bg-green-600 transition duration-300 flex items-center space-x-2">
          <FontAwesomeIcon icon={faPlus} /> {/* Ícono de agregar */}
          <span>AGREGAR</span>
        </button>

        {/* Botón "Filtro" con ícono */}
        <button 
          onClick={toggleFilterModal} 
          className="bg-verde-chef text-white py-2 px-6 rounded-full font-bold hover:bg-green-600 transition duration-300 flex items-center space-x-2"
        >
          <FontAwesomeIcon icon={faFilter} /> {/* Ícono de filtro */}
          <span>FILTRO</span>
        </button>
      </div>

      {/* Grid de recetas */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredRecetas.map((receta) => (
          <div key={receta._id} className="bg-white rounded-lg shadow-md p-4">
            <img src={`http://localhost:4000/${receta.imagen}`} 
            crossOrigin="anonymous" 
            alt={receta.titulo} 
            className="rounded-lg mb-4 w-full h-40 object-cover" />
            <h3 className="text-lg font-semibold mb-2">{receta.titulo}</h3>
            <p className="text-gray-600">
              <FontAwesomeIcon icon={faStar} className="text-yellow-500 mr-2" /> {receta.valoracion}
              <FontAwesomeIcon icon={faClock} className="mr-2 ml-4" style={{ color: '#619537' }} /> {receta.duracion} min
            </p>
            <div className="mt-4 flex space-x-4">
              <button className="mt-4 bg-verde-chef text-white py-2 px-4 rounded-full font-bold hover:bg-green-600 transition duration-300" onClick={() => openEditModal(receta)}>
                <FontAwesomeIcon icon={faEdit}/> Editar
              </button>
              <button
                    onClick={() => handleDeleteRecipe(receta._id)}
                    className="mt-4 bg-red-500 text-white py-2 px-4 rounded-full font-bold hover:bg-red-600 transition duration-300"
                  >
                    <FontAwesomeIcon icon={faTrash} /> Eliminar
              </button>
            </div>
          </div>
        ))}
      </div>
      {/* Modal de agregar receta */}
      {addRecipeModalVisible && (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-6xl">
            <h2 className="text-lg font-bold mb-4">Agregar Receta</h2>
            <div className="grid grid-cols-4 gap-4"> 
              <div className="col-span-2">
                <label className="block mb-2 font-semibold">Título</label>
                <input 
                  type="text" 
                  className="w-full border border-gray-300 rounded-lg p-2" 
                  placeholder="Nombre de la receta"
                  value={newRecipe.titulo}
                  onChange={(e) => handleRecipeChange('titulo', e.target.value)}
                />
              </div>
              <div>
                <label className="block mb-2 font-semibold">Duración (minutos)</label>
                <input 
                  type="number" 
                  className="w-full border border-gray-300 rounded-lg p-2" 
                  placeholder="Ej: 15"
                  value={newRecipe.duracion}
                  onChange={(e) => handleRecipeChange('duracion', e.target.value)}
                />
              </div>
              <div>
                <label className="block mb-2 font-semibold">Porciones</label>
                <input 
                  type="number" 
                  className="w-full border border-gray-300 rounded-lg p-2" 
                  placeholder="Número de porciones"
                  value={newRecipe.porciones}
                  onChange={(e) => handleRecipeChange('porciones', e.target.value)}
                />
              </div>
              <div>
                <label className="block mb-2 font-semibold">Valoración inicial</label>
                <input 
                  type="number" 
                  className="w-full border border-gray-300 rounded-lg p-2" 
                  placeholder="0"
                  min="0"
                  max="5"
                  value={newRecipe.valoracion}
                  onChange={(e) => handleRecipeChange('valoracion', e.target.value)}
                />
              </div>
              <div className="col-span-2">
                <label className="block mb-2 font-semibold">Imagen</label>
                <input 
                  type="file" 
                  className="w-full cursor-pointer rounded-lg border-[1.5px] border-gray-300 bg-transparent p-2 font-normal outline-none transition file:mr-5 file:cursor-pointer file:border-0 file:border-r file:border-solid file:border-gray-300 file:bg-white file:px-2 file:py-2 file:text-gray-700 file:hover:bg-green-600 file:hover:text-white focus:border-green-500"
                  onChange={(e) => handleRecipeChange('imagen', e.target.files[0])}
                />
              </div>
              <div className="col-span-2">
                <label className="block mb-2 font-semibold">Ingredientes</label>
                <div className="flex space-x-4 mb-2">
                  <input 
                    type="text" 
                    className="w-2/3 border border-gray-300 rounded-lg p-2" 
                    placeholder="Buscar ingredientes..."
                    value={ingredientSearch}
                    onChange={(e) => setIngredientSearch(e.target.value)}
                  />
                  <input 
                    type="text" 
                    className="w-1/3 border border-gray-300 rounded-lg p-2" 
                    placeholder="Cantidad (ej. 1 cdt)"
                    value={selectedIngredient.cantidad}
                    onChange={(e) => setSelectedIngredient({ ...selectedIngredient, cantidad: e.target.value })}
                  />
                  <button 
                    className="bg-verde-chef text-white py-2 px-4 rounded-full"
                    onClick={addIngredient}
                  >
                    Agregar
                  </button>
                </div>
                <ul className="border p-2 rounded-lg max-h-40 overflow-y-scroll">
                  {filteredIngredients.map((ingredient, index) => (
                    <li 
                      key={index} 
                      className="cursor-pointer py-1 hover:bg-gray-200"
                      onClick={() => setSelectedIngredient({ nombre: ingredient, cantidad: '' })}
                    >
                      {ingredient}
                    </li>
                  ))}
                </ul>
                <ul>
                  {newRecipe.ingredientes.map((ingredient, index) => (
                    <li key={index} className="flex justify-between border-b py-2">
                      <span>{ingredient.nombre}</span>
                      <span>{ingredient.cantidad}</span>
                      <button 
                        onClick={() => removeIngredient(index)}
                        className="text-red-500 ml-2"
                      >
                        <FontAwesomeIcon icon={faTimes} />
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="col-span-2">
                <label className="block mb-2 font-semibold">Paso a paso</label>
                <textarea 
                  className="w-full border border-gray-300 rounded-lg p-2"
                  placeholder="Describir los pasos de la receta"
                  value={newRecipe.paso}
                  onChange={(e) => handleRecipeChange('paso', e.target.value)}
                />
              </div>
            </div>
            <div className="flex justify-end mt-4 space-x-4">
              <button 
                className="bg-gray-300 text-black py-2 px-4 rounded-full"
                onClick={toggleAddRecipeModal}
              >
                Cancelar
              </button>
              <button 
                className="bg-verde-chef text-white py-2 px-4 rounded-full"
                onClick={handleAddRecipe}
              >
                Guardar Receta
              </button>
            </div>
          </div>
        </div>
      )}
      {/* Modal de editar receta */}
      {editRecipeModalVisible && selectedRecipe.ingredientes && selectedRecipe.ingredientes.length > 0 && (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-3xl">
            <h2 className="text-lg font-bold mb-4">Editar Receta</h2>
            <div className="space-y-4">
              
              {/* Título de la receta */}
              <div>
                <label className="block mb-2 font-semibold">Título</label>
                <input 
                  type="text" 
                  className="w-full border border-gray-300 rounded-lg p-2" 
                  value={selectedRecipe.titulo}
                  onChange={(e) => setSelectedRecipe({ ...selectedRecipe, titulo: e.target.value })}
                />
              </div>

              {/* Valoración */}
              <div>
                <label className="block mb-2 font-semibold">Valoración</label>
                <input 
                  type="number" 
                  className="w-full border border-gray-300 rounded-lg p-2" 
                  value={selectedRecipe.valoracion}
                  onChange={(e) => setSelectedRecipe({ ...selectedRecipe, valoracion: e.target.value })}
                />
              </div>

              {/* Porciones */}
              <div>
                <label className="block mb-2 font-semibold">Porciones</label>
                <input 
                  type="number" 
                  className="w-full border border-gray-300 rounded-lg p-2" 
                  value={selectedRecipe.porciones}
                  onChange={(e) => setSelectedRecipe({ ...selectedRecipe, porciones: e.target.value })}
                />
              </div>

              {/* Duración */}
              <div>
                <label className="block mb-2 font-semibold">Duración (minutos)</label>
                <input 
                  type="number" 
                  className="w-full border border-gray-300 rounded-lg p-2" 
                  value={selectedRecipe.duracion}
                  onChange={(e) => setSelectedRecipe({ ...selectedRecipe, duracion: e.target.value })}
                />
              </div>

              {/* Imagen */}
              <div className="col-span-2">
                <label className="block mb-2 font-semibold">Imagen</label>
                <input 
                  type="file" 
                  className="w-full cursor-pointer rounded-lg border-[1.5px] border-gray-300 bg-transparent p-2 font-normal outline-none transition file:mr-5 file:cursor-pointer file:border-0 file:border-r file:border-solid file:border-gray-300 file:bg-white file:px-2 file:py-2 file:text-gray-700 file:hover:bg-green-600 file:hover:text-white focus:border-green-500"
                  onChange={(e) => setSelectedRecipe({ ...selectedRecipe, imagen: e.target.files[0] })}
                />
              </div>

              {/* Ingredientes */}
              <div>
                <label className="block mb-2 font-semibold">Ingredientes</label>
                <ul>
                  {selectedRecipe.ingredientes.map((ingredient, index) => (
                    <li key={index} className="flex justify-between border-b py-2">
                      <span>{ingredient.nombre}</span>
                      <span>{ingredient.cantidad}</span>
                      <button 
                        onClick={() => removeIngredient(index)}
                        className="text-red-500 ml-2"
                      >
                        <FontAwesomeIcon icon={faTimes} />
                      </button>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Pasos */}
              <div>
                <label className="block mb-2 font-semibold">Paso a paso</label>
                <textarea 
                  className="w-full border border-gray-300 rounded-lg p-2"
                  value={selectedRecipe.paso}
                  onChange={(e) => setSelectedRecipe({ ...selectedRecipe, paso: e.target.value })}
                />
              </div>
            </div>

            {/* Botones para guardar o cancelar */}
            <div className="flex justify-end mt-4 space-x-4">
              <button 
                className="bg-gray-300 text-black py-2 px-4 rounded-full"
                onClick={closeEditModal}
              >
                Cancelar
              </button>
              <button 
                className="bg-verde-chef text-white py-2 px-4 rounded-full"
                onClick={() => handleUpdateRecipe(selectedRecipe)}
              >
                Guardar Cambios
              </button>
            </div>
          </div>
        </div>
      )}
      {/* Modal de filtro */}
      {filterModalVisible && (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-3xl">
            <h2 className="text-lg font-bold mb-4">Filtrar recetas</h2>

            <div className="grid grid-cols-3 gap-4">
              {/* Columna de Categoría */}
              <div>
                <h3 className="font-bold mb-2">Categoría</h3>
                <button 
                  onClick={() => setClassification('Desayuno')}
                  className={`block py-1 ${classification === 'Desayuno' ? 'text-verde-chef font-bold' : 'text-black'}`}
                >
                  Desayuno
                </button>
                <button 
                  onClick={() => setClassification('Almuerzo')}
                  className={`block py-1 ${classification === 'Almuerzo' ? 'text-verde-chef font-bold' : 'text-black'}`}
                >
                  Almuerzo
                </button>
                <button 
                  onClick={() => setClassification('Cena')}
                  className={`block py-1 ${classification === 'Cena' ? 'text-verde-chef font-bold' : 'text-black'}`}
                >
                  Cena
                </button>
                <button 
                  onClick={() => setClassification('Repostería')}
                  className={`block py-1 ${classification === 'Repostería' ? 'text-verde-chef font-bold' : 'text-black'}`}
                >
                  Repostería
                </button>
              </div>

              {/* Columna de Duración */}
              <div>
                <h3 className="font-bold mb-2">Duración</h3>
                <button 
                  onClick={() => setDurationFilter('short')}
                  className={`block py-1 ${durationFilter === 'short' ? 'text-verde-chef font-bold' : 'text-black'}`}
                >
                  Menos de 10 minutos
                </button>
                <button 
                  onClick={() => setDurationFilter('medium')}
                  className={`block py-1 ${durationFilter === 'medium' ? 'text-verde-chef font-bold' : 'text-black'}`}
                >
                  Entre 10 y 30 minutos
                </button>
                <button 
                  onClick={() => setDurationFilter('long')}
                  className={`block py-1 ${durationFilter === 'long' ? 'text-verde-chef font-bold' : 'text-black'}`}
                >
                  Más de 30 minutos
                </button>
              </div>

              {/* Columna de Ordenar por */}
              <div>
                <h3 className="font-bold mb-2">Ordenar por</h3>
                <button 
                  onClick={() => setSortBy('ratingAsc')}
                  className={`block py-1 ${sortBy === 'ratingAsc' ? 'text-verde-chef font-bold' : 'text-black'}`}
                >
                  Valoración Ascendente
                </button>
                <button 
                  onClick={() => setSortBy('ratingDesc')}
                  className={`block py-1 ${sortBy === 'ratingDesc' ? 'text-verde-chef font-bold' : 'text-black'}`}
                >
                  Valoración Descendente
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
                onClick={clearFilters} // Limpiar filtros y cerrar modal
              >
                Eliminar Filtros
              </button>
              <button 
                className="bg-verde-chef text-white py-2 px-4 rounded-full"
                onClick={toggleFilterModal} // Aplicar filtro y cerrar modal
              >
                Aplicar Filtro
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Recetas;
