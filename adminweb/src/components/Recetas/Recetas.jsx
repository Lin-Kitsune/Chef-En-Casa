import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faStar, faClock, faPlus, faFilter, faTimes, faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import { getAllRecetas, createReceta, updateReceta, deleteReceta } from '../../services/recetaService';
import { getAllIngredientes } from '../../services/ingredientesService';
import './Recetas.css';

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
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  
   // Estado para nueva receta
   const [newRecipe, setNewRecipe] = useState({
    titulo: '',
    duracion: '',
    porciones: '',
    ingredientes: [],
    imagen: null,
    paso: [],
    valoracion: 0,
    dishTypes: [],
    nutrition: { calories: '', fat: '', protein: '', carbs: '' },
  });

  const [ingredientSearch, setIngredientSearch] = useState('');
  const [selectedIngredient, setSelectedIngredient] = useState({ nombre: '', cantidad: '' });
  const [availableIngredients, setAvailableIngredients] = useState([]);

  // Función para abrir y cerrar el modal de filtro
  const toggleFilterModal = () => {
    setFilterModalVisible(!filterModalVisible);
  };

  // Función para cargar recetas e ingredientes desde el backend
  const fetchRecetasAndIngredientes = async () => {
    try {
      const recetasData = await getAllRecetas();
      setRecetas(recetasData);

      const ingredientesData = await getAllIngredientes();
      setAvailableIngredients(ingredientesData.map((ing) => ing.nombreEspanol || ing.nombre));
    } catch (error) {
      console.error('Error al cargar datos:', error);
    }
  };

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
      setNewRecipe((prev) => ({
        ...prev,
        ingredientes: [...prev.ingredientes, selectedIngredient],
      }));
      setSelectedIngredient({ nombre: '', cantidad: '' });
    }
  };

  // Función para eliminar un ingrediente de la lista
  const removeIngredient = (index) => {
    setNewRecipe((prev) => ({
      ...prev,
      ingredientes: prev.ingredientes.filter((_, i) => i !== index),
    }));
  };

  const addStep = () => {
    setNewRecipe((prev) => ({
      ...prev,
      paso: [...prev.paso, { step: '' }],
    }));
  };

  const updateStep = (index, value) => {
    setNewRecipe((prev) => {
      const updatedSteps = [...prev.paso];
      updatedSteps[index].step = value;
      return { ...prev, paso: updatedSteps };
    });
  };

  const removeStep = (index) => {
    setNewRecipe((prev) => ({
      ...prev,
      paso: prev.paso.filter((_, i) => i !== index),
    }));
  };

  const toggleAddDishType = type => {
    setNewRecipe(prev => ({
      ...prev,
      dishTypes: prev.dishTypes.includes(type)
        ? prev.dishTypes.filter(d => d !== type)
        : [...prev.dishTypes, type],
    }));
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
      ingredientes: recipe.ingredientes || [], // Array por defecto
      paso: Array.isArray(recipe.paso) ? recipe.paso : [], // Validar que sea un array
      dishTypes: recipe.dishTypes || [], // Array por defecto
      nutrition: recipe.nutrition || { calories: '', fat: '', protein: '', carbs: '' }, // Objeto por defecto
      imagen: recipe.imagen || null, // Manejo de imagen
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
    // Validar que los campos obligatorios están completos
    if (!newRecipe.titulo || !newRecipe.duracion || !newRecipe.paso.length || !newRecipe.ingredientes.length) {
      alert('Por favor, completa todos los campos obligatorios.');
      return;
    }

    // Preparar datos para el servicio
    const recetaData = {
      ...newRecipe,
      ingredientes: newRecipe.ingredientes.map((ing) => ({
        nombre: ing.nombre,
        cantidad: ing.cantidad,
      })),
      paso: newRecipe.paso.map((step, index) => ({
        step: step.step || `Paso ${index + 1}`,
      })),
    };

    // Llamar al servicio para crear receta
    const createdRecipe = await createReceta(recetaData);
    console.log('Receta creada:', createdRecipe);

    // Actualizar las recetas y cerrar el modal
    fetchRecetasAndIngredientes();
    setAddRecipeModalVisible(false);
  } catch (error) {
    console.error('Error al agregar receta:', error);
    alert('Hubo un error al crear la receta. Verifica los datos e intenta nuevamente.');
  }
};

 // Función para actualizar una receta
 const handleEditRecipe = async () => {
  try {
    // Asegurarnos de que `selectedRecipe` tiene los valores correctos y no `undefined`
    const recetaData = {
      ...selectedRecipe,
      ingredientes: selectedRecipe.ingredientes || [], // Siempre debe ser un array
      paso: selectedRecipe.paso || [], // Siempre debe ser un array
      dishTypes: selectedRecipe.dishTypes || [], // Siempre debe ser un array
      nutrition: selectedRecipe.nutrition || { calories: '', fat: '', protein: '', carbs: '' }, // Objeto con valores por defecto
    };

    // Adjuntar imagen si se seleccionó una nueva
    if (!recetaData.imagen || !(recetaData.imagen instanceof File)) {
      recetaData.imagenAnterior = selectedRecipe.imagen; // Pasar la imagen anterior si no se cambia
    }

    // Llamar al servicio
    await updateReceta(selectedRecipe._id, recetaData);

    // Refrescar los datos y cerrar el modal
    fetchRecetasAndIngredientes();
    setEditRecipeModalVisible(false);
  } catch (error) {
    console.error('Error al actualizar receta:', error);
    alert('Hubo un error al actualizar la receta. Por favor, verifica los datos e inténtalo de nuevo.');
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
            {/* Imagen de la receta */}
            <img
              src={`http://localhost:4000/${receta.imagen}`}
              crossOrigin="anonymous"
              alt={receta.titulo}
              className="rounded-lg mb-4 w-full h-40 object-cover"
            />
            
            {/* Título */}
            <h3 className="text-lg font-semibold mb-2">{receta.titulo}</h3>
            
            {/* Valoración y duración */}
            <p className="text-gray-600">
              <FontAwesomeIcon icon={faStar} className="text-yellow-500 mr-2" /> {receta.valoracion}
              <FontAwesomeIcon icon={faClock} className="mr-2 ml-4" style={{ color: '#619537' }} /> {receta.duracion} min
            </p>

            {/* Tipos de plato */}
            {receta.dishTypes && receta.dishTypes.length > 0 && (
              <div className="mt-2 text-gray-600">
                <span className="font-semibold">Categorías:</span>{' '}
                {receta.dishTypes.map((type, index) => (
                  <span key={index} className="text-green-600 text-sm inline-block mr-2">
                    {type}
                  </span>
                ))}
              </div>
            )}

            {/* Ingredientes */}
            <div className="mt-4">
              <h4 className="text-sm font-semibold text-gray-700 mb-2">Ingredientes:</h4>
              <ul className="text-sm text-gray-600 list-disc pl-5">
                {receta.ingredientes.map((ingrediente, index) => (
                  <li key={index}>
                    {ingrediente.nombre} - {ingrediente.cantidad}
                  </li>
                ))}
              </ul>
            </div>

            {/* Pasos */}
            {receta.paso && receta.paso.length > 0 && (
              <div className="mt-4">
                <h4 className="text-sm font-semibold text-gray-700 mb-2">Pasos:</h4>
                <ol className="list-decimal text-sm text-gray-600 pl-5">
                  {receta.paso.map((step, index) => (
                    <li key={index}>{step.step}</li>
                  ))}
                </ol>
              </div>
            )}

            {/* Información nutricional */}
            {receta.nutrition && (
              <div className="mt-4">
                <h4 className="text-sm font-semibold text-gray-700 mb-2">Información Nutricional:</h4>
                <ul className="text-sm text-gray-600">
                  <li>Calorías: {receta.nutrition.calories} kcal</li>
                  <li>Grasas: {receta.nutrition.fat} g</li>
                  <li>Proteínas: {receta.nutrition.protein} g</li>
                  <li>Carbohidratos: {receta.nutrition.carbs} g</li>
                </ul>
              </div>
            )}

            {/* Botones de acción */}
            <div className="mt-4 flex space-x-4">
              <button
                className="mt-4 bg-verde-chef text-white py-2 px-4 rounded-full font-bold hover:bg-green-600 transition duration-300"
                onClick={() => openEditModal(receta)}
              >
                <FontAwesomeIcon icon={faEdit} /> Editar
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
              {/* Título */}
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

              {/* Duración */}
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

              {/* Porciones */}
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

              {/* Valoración inicial */}
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

              {/* Imagen */}
              <div className="col-span-2">
                <label className="block mb-2 font-semibold">Imagen</label>
                <input
                  type="file"
                  className="w-full cursor-pointer rounded-lg border-[1.5px] border-gray-300 bg-transparent p-2 font-normal outline-none transition file:mr-5 file:cursor-pointer file:border-0 file:border-r file:border-solid file:border-gray-300 file:bg-white file:px-2 file:py-2 file:text-gray-700 file:hover:bg-green-600 file:hover:text-white focus:border-green-500"
                  onChange={(e) => handleRecipeChange('imagen', e.target.files[0])}
                />
              </div>

              {/* Dish Types */}
              <div className="col-span-2">
                <label className="block mb-2 font-semibold">Categorías</label>
                <div className="flex flex-wrap space-x-2">
                  {['Desayuno', 'Almuerzo', 'Cena', 'Repostería'].map((type) => (
                    <button
                      key={type}
                      onClick={() => toggleAddDishType(type)}
                      className={`py-1 px-3 rounded-full ${
                        newRecipe.dishTypes.includes(type)
                          ? 'bg-verde-chef text-white'
                          : 'bg-gray-300 text-black'
                      }`}
                    >
                      {type}
                    </button>
                  ))}
                </div>
              </div>

              {/* Información Nutricional */}
              <div className="col-span-2">
                <label className="block mb-2 font-semibold">Información Nutricional</label>
                <div className="grid grid-cols-2 gap-4">
                  <input
                    type="number"
                    placeholder="Calorías (kcal)"
                    className="w-full border border-gray-300 rounded-lg p-2"
                    value={newRecipe.nutrition.calories}
                    onChange={(e) =>
                      handleRecipeChange('nutrition', {
                        ...newRecipe.nutrition,
                        calories: e.target.value,
                      })
                    }
                  />
                  <input
                    type="number"
                    placeholder="Grasas (g)"
                    className="w-full border border-gray-300 rounded-lg p-2"
                    value={newRecipe.nutrition.fat}
                    onChange={(e) =>
                      handleRecipeChange('nutrition', {
                        ...newRecipe.nutrition,
                        fat: e.target.value,
                      })
                    }
                  />
                  <input
                    type="number"
                    placeholder="Proteínas (g)"
                    className="w-full border border-gray-300 rounded-lg p-2"
                    value={newRecipe.nutrition.protein}
                    onChange={(e) =>
                      handleRecipeChange('nutrition', {
                        ...newRecipe.nutrition,
                        protein: e.target.value,
                      })
                    }
                  />
                  <input
                    type="number"
                    placeholder="Carbohidratos (g)"
                    className="w-full border border-gray-300 rounded-lg p-2"
                    value={newRecipe.nutrition.carbs}
                    onChange={(e) =>
                      handleRecipeChange('nutrition', {
                        ...newRecipe.nutrition,
                        carbs: e.target.value,
                      })
                    }
                  />
                </div>
              </div>

              {/* Ingredientes seleccionados */}
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
                    onChange={(e) =>
                      setSelectedIngredient({
                        ...selectedIngredient,
                        cantidad: e.target.value,
                      })
                    }
                  />
                  <button
                    className="bg-verde-chef text-white py-2 px-4 rounded-full"
                    onClick={addIngredient}
                  >
                    Agregar
                  </button>
                </div>

                {/* Lista de ingredientes filtrados */}
                <ul className="border p-2 rounded-lg max-h-40 overflow-y-scroll">
                  {filteredIngredients.map((ingredient, index) => (
                    <li
                      key={index}
                      className="cursor-pointer py-1 hover:bg-gray-200"
                      onClick={() =>
                        setSelectedIngredient({ nombre: ingredient, cantidad: '' })
                      }
                    >
                      {ingredient}
                    </li>
                  ))}
                </ul>

                {/* Ingredientes añadidos */}
                <h4 className="mt-4 mb-2 font-semibold text-gray-700">Ingredientes añadidos:</h4>
                <ul className="list-disc pl-5 text-gray-600">
                  {newRecipe.ingredientes.map((ingredient, index) => (
                    <li key={index} className="flex justify-between items-center mb-2">
                      <span>{`${ingredient.nombre} - ${ingredient.cantidad}`}</span>
                      <button
                        className="text-red-500 ml-4 hover:text-red-700"
                        onClick={() => removeIngredient(index)}
                      >
                        <FontAwesomeIcon icon={faTimes} />
                      </button>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Pasos */}
              <div className="col-span-2">
                <label className="block mb-2 font-semibold">Paso a paso</label>
                {newRecipe.paso.map((step, index) => (
                  <div key={index} className="flex items-center space-x-4">
                    <input
                      type="text"
                      className="w-full border border-gray-300 rounded-lg p-2"
                      placeholder={`Paso ${index + 1}`}
                      value={step.step}
                      onChange={(e) => updateStep(index, e.target.value)}
                    />
                    <button
                      onClick={() => removeStep(index)}
                      className="text-red-500"
                    >
                      <FontAwesomeIcon icon={faTimes} />
                    </button>
                  </div>
                ))}
                <button
                  onClick={addStep}
                  className="mt-2 bg-verde-chef text-white py-1 px-4 rounded-full"
                >
                  + Agregar Paso
                </button>
              </div>
            </div>

            {/* Botones */}
            <div className="flex justify-end mt-4">
              <button
                onClick={toggleAddRecipeModal}
                className="bg-gray-300 text-black py-2 px-4 rounded-full"
              >
                Cancelar
              </button>
              <button
                onClick={handleAddRecipe}
                className="bg-verde-chef text-white py-2 px-4 rounded-full"
              >
                Guardar Receta
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal de editar receta */}
{editRecipeModalVisible && selectedRecipe && (
  <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center z-50">
    <div className="bg-white rounded-lg p-6 w-full max-w-6xl">
      <h2 className="text-lg font-bold mb-4">Editar Receta</h2>
      <div className="grid grid-cols-4 gap-4">
        {/* Título */}
        <div className="col-span-2">
          <label className="block mb-2 font-semibold">Título</label>
          <input
            type="text"
            className="w-full border border-gray-300 rounded-lg p-2"
            placeholder="Nombre de la receta"
            value={selectedRecipe.titulo}
            onChange={(e) => setSelectedRecipe({ ...selectedRecipe, titulo: e.target.value })}
          />
        </div>

        {/* Duración */}
        <div>
          <label className="block mb-2 font-semibold">Duración (minutos)</label>
          <input
            type="number"
            className="w-full border border-gray-300 rounded-lg p-2"
            placeholder="Ej: 15"
            value={selectedRecipe.duracion}
            onChange={(e) => setSelectedRecipe({ ...selectedRecipe, duracion: e.target.value })}
          />
        </div>

        {/* Porciones */}
        <div>
          <label className="block mb-2 font-semibold">Porciones</label>
          <input
            type="number"
            className="w-full border border-gray-300 rounded-lg p-2"
            placeholder="Número de porciones"
            value={selectedRecipe.porciones}
            onChange={(e) => setSelectedRecipe({ ...selectedRecipe, porciones: e.target.value })}
          />
        </div>

        {/* Valoración */}
        <div>
          <label className="block mb-2 font-semibold">Valoración</label>
          <input
            type="number"
            className="w-full border border-gray-300 rounded-lg p-2"
            placeholder="0"
            min="0"
            max="5"
            value={selectedRecipe.valoracion}
            onChange={(e) => setSelectedRecipe({ ...selectedRecipe, valoracion: e.target.value })}
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

        {/* Categorías */}
        <div className="col-span-2">
          <label className="block mb-2 font-semibold">Categorías</label>
          <div className="flex flex-wrap space-x-2">
            {['Desayuno', 'Almuerzo', 'Cena', 'Repostería'].map((type) => (
              <button
                key={type}
                onClick={() => {
                  const updatedDishTypes = selectedRecipe.dishTypes.includes(type)
                    ? selectedRecipe.dishTypes.filter((dish) => dish !== type)
                    : [...selectedRecipe.dishTypes, type];
                  setSelectedRecipe({ ...selectedRecipe, dishTypes: updatedDishTypes });
                }}
                className={`py-1 px-3 rounded-full ${
                  selectedRecipe.dishTypes.includes(type)
                    ? 'bg-verde-chef text-white'
                    : 'bg-gray-300 text-black'
                }`}
              >
                {type}
              </button>
            ))}
          </div>
        </div>

        {/* Información Nutricional */}
        <div className="col-span-2">
          <label className="block mb-2 font-semibold">Información Nutricional</label>
          <div className="grid grid-cols-2 gap-4">
            <input
              type="number"
              placeholder="Calorías (kcal)"
              className="w-full border border-gray-300 rounded-lg p-2"
              value={selectedRecipe.nutrition?.calories || ''}
              onChange={(e) =>
                setSelectedRecipe({
                  ...selectedRecipe,
                  nutrition: { ...selectedRecipe.nutrition, calories: e.target.value },
                })
              }
            />
            <input
              type="number"
              placeholder="Grasas (g)"
              className="w-full border border-gray-300 rounded-lg p-2"
              value={selectedRecipe.nutrition?.fat || ''}
              onChange={(e) =>
                setSelectedRecipe({
                  ...selectedRecipe,
                  nutrition: { ...selectedRecipe.nutrition, fat: e.target.value },
                })
              }
            />
            <input
              type="number"
              placeholder="Proteínas (g)"
              className="w-full border border-gray-300 rounded-lg p-2"
              value={selectedRecipe.nutrition?.protein || ''}
              onChange={(e) =>
                setSelectedRecipe({
                  ...selectedRecipe,
                  nutrition: { ...selectedRecipe.nutrition, protein: e.target.value },
                })
              }
            />
            <input
              type="number"
              placeholder="Carbohidratos (g)"
              className="w-full border border-gray-300 rounded-lg p-2"
              value={selectedRecipe.nutrition?.carbs || ''}
              onChange={(e) =>
                setSelectedRecipe({
                  ...selectedRecipe,
                  nutrition: { ...selectedRecipe.nutrition, carbs: e.target.value },
                })
              }
            />
          </div>
        </div>

        {/* Ingredientes */}
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
              onChange={(e) =>
                setSelectedIngredient({ ...selectedIngredient, cantidad: e.target.value })
              }
            />
            <button
              className="bg-verde-chef text-white py-2 px-4 rounded-full"
              onClick={() => {
                if (selectedIngredient.nombre && selectedIngredient.cantidad) {
                  setSelectedRecipe((prev) => ({
                    ...prev,
                    ingredientes: [...prev.ingredientes, selectedIngredient],
                  }));
                  setSelectedIngredient({ nombre: '', cantidad: '' });
                }
              }}
            >
              Agregar
            </button>
          </div>

          {/* Lista de ingredientes seleccionados */}
          <ul className="list-disc pl-5 text-gray-600">
            {selectedRecipe.ingredientes.map((ingredient, index) => (
              <li key={index} className="flex justify-between items-center mb-2">
                <span>{`${ingredient.nombre} - ${ingredient.cantidad}`}</span>
                <button
                  className="text-red-500"
                  onClick={() => {
                    const updatedIngredients = selectedRecipe.ingredientes.filter(
                      (_, i) => i !== index
                    );
                    setSelectedRecipe({ ...selectedRecipe, ingredientes: updatedIngredients });
                  }}
                >
                  <FontAwesomeIcon icon={faTimes} />
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* Pasos */}
        <div className="col-span-2">
          <label className="block mb-2 font-semibold">Paso a paso</label>
          {selectedRecipe.paso.map((step, index) => (
            <div key={index} className="flex items-center space-x-4">
              <input
                type="text"
                className="w-full border border-gray-300 rounded-lg p-2"
                placeholder={`Paso ${index + 1}`}
                value={step.step}
                onChange={(e) =>
                  setSelectedRecipe((prev) => {
                    const updatedSteps = [...prev.paso];
                    updatedSteps[index].step = e.target.value;
                    return { ...prev, paso: updatedSteps };
                  })
                }
              />
              <button
                onClick={() =>
                  setSelectedRecipe((prev) => ({
                    ...prev,
                    paso: prev.paso.filter((_, i) => i !== index),
                  }))
                }
                className="text-red-500"
              >
                <FontAwesomeIcon icon={faTimes} />
              </button>
            </div>
          ))}
          <button
            onClick={() =>
              setSelectedRecipe((prev) => ({
                ...prev,
                paso: [...prev.paso, { step: '' }],
              }))
            }
            className="mt-2 bg-verde-chef text-white py-1 px-4 rounded-full"
          >
            + Agregar Paso
          </button>
        </div>
      </div>

      {/* Botones */}
      <div className="flex justify-end mt-4">
        <button
          onClick={closeEditModal}
          className="bg-gray-300 text-black py-2 px-4 rounded-full"
        >
          Cancelar
        </button>
        <button
          onClick={handleEditRecipe}
          className="bg-verde-chef text-white py-2 px-4 rounded-full"
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
          <button
            onClick={() => setSortBy('durationAsc')}
            className={`block py-1 ${sortBy === 'durationAsc' ? 'text-verde-chef font-bold' : 'text-black'}`}
          >
            Duración Ascendente
          </button>
          <button
            onClick={() => setSortBy('durationDesc')}
            className={`block py-1 ${sortBy === 'durationDesc' ? 'text-verde-chef font-bold' : 'text-black'}`}
          >
            Duración Descendente
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
