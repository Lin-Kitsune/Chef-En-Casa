import React, { useState } from 'react';
import receta1 from '../../images/receta1.jpg';
import receta2 from '../../images/receta2.jpg';
import receta3 from '../../images/receta3.jpg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faStar, faUtensils, faClock, faPlus, faFilter, faTimes, faEdit } from '@fortawesome/free-solid-svg-icons';
import './Recetas.css';

const Recetas = () => {
  const [filterModalVisible, setFilterModalVisible] = useState(false); // Modal de filtro
  const [addRecipeModalVisible, setAddRecipeModalVisible] = useState(false); // Modal de agregar receta
  const [classification, setClassification] = useState(''); // Filtro de clasificación
  const [minRating, setMinRating] = useState(0); // Valoración mínima
  const [searchQuery, setSearchQuery] = useState(''); // Valor de búsqueda
  const [durationFilter, setDurationFilter] = useState(''); // Duración seleccionada
  const [sortBy, setSortBy] = useState(''); // Ordenar por valoración
  const [editRecipeModalVisible, setEditRecipeModalVisible] = useState(false); // Para controlar la visibilidad del modal de edición
  const [selectedRecipe, setSelectedRecipe] = useState(null); // Almacenar la receta seleccionada para editar
  const [newRecipe, setNewRecipe] = useState({
    title: '',
    rating: 0,
    servings: '',
    duration: '',
    image: null,
    ingredients: [],
    steps: ''
  });
  
  const [ingredientSearch, setIngredientSearch] = useState(''); // Búsqueda de ingredientes
  const [selectedIngredient, setSelectedIngredient] = useState({ name: '', quantity: '' }); // Ingrediente seleccionado
  
  const availableIngredients = ['Mango', 'Plátano', 'Yogur', 'Cúrcuma', 'Pimienta negra', 'Fresas']; // Ejemplo de ingredientes disponibles

  const recetas = [
    { id: 1, name: 'Bol con Fruta', rating: 4.5, servings: 2, time: '5 minutos', image: receta1, category: 'Desayuno', duration: 5 },
    { id: 2, name: 'Pizza Margarita', rating: 4.7, servings: 4, time: '20 minutos', image: receta2, category: 'Almuerzo', duration: 20 },
    { id: 3, name: 'Sopa de Verduras', rating: 4.2, servings: 3, time: '30 minutos', image: receta3, category: 'Cena', duration: 30 },
  ];

  // Función para abrir y cerrar el modal
  const toggleFilterModal = () => {
    setFilterModalVisible(!filterModalVisible);
  };

  // Función para eliminar un ingrediente de la lista
  const removeIngredient = (index) => {
    const updatedIngredients = newRecipe.ingredients.filter((_, i) => i !== index);
    setNewRecipe({ ...newRecipe, ingredients: updatedIngredients });
  };

   // Función para abrir y cerrar el modal de agregar receta
   const toggleAddRecipeModal = () => {
    setAddRecipeModalVisible(!addRecipeModalVisible);
  };

  // Función para manejar cambios en los campos de la receta
  const handleRecipeChange = (field, value) => {
    setNewRecipe({ ...newRecipe, [field]: value });
  };

   // Función para agregar ingredientes
   const addIngredient = () => {
    if (selectedIngredient.name && selectedIngredient.quantity) {
      setNewRecipe({
        ...newRecipe,
        ingredients: [...newRecipe.ingredients, selectedIngredient]
      });
      setSelectedIngredient({ name: '', quantity: '' }); // Resetear después de agregar
    }
  };

  // Función para limpiar los filtros
  const clearFilters = () => {
    setClassification('');
    setDurationFilter('');
    setSortBy('');
    setMinRating(0);
    setSearchQuery('');
    toggleFilterModal(); // Cerrar el modal al limpiar
  };

  // Función para abrir el modal y cargar la receta seleccionada
  const openEditModal = (recipe) => {
    setSelectedRecipe(recipe); // Cargamos los datos de la receta seleccionada
    setEditRecipeModalVisible(true); // Mostramos el modal
  };

  // Función para cerrar el modal
  const closeEditModal = () => {
    setEditRecipeModalVisible(false);
  };

  // Función para filtrar las recetas según búsqueda, clasificación, valoración, duración y orden
  const filteredRecetas = recetas
    .filter((receta) => {
      const matchesSearch = receta.name.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = classification ? receta.category === classification : true;
      const matchesRating = receta.rating >= minRating;
      const matchesDuration = durationFilter ? 
        (durationFilter === 'short' && receta.duration < 10) ||
        (durationFilter === 'medium' && receta.duration >= 10 && receta.duration <= 30) ||
        (durationFilter === 'long' && receta.duration > 30) 
        : true;
      return matchesSearch && matchesCategory && matchesRating && matchesDuration;
    })
    .sort((a, b) => {
      if (sortBy === 'ratingAsc') return a.rating - b.rating;
      if (sortBy === 'ratingDesc') return b.rating - a.rating;
      return 0;
    });

  // Filtrar ingredientes disponibles en base a la búsqueda
  const filteredIngredients = availableIngredients.filter(ingredient =>
    ingredient.toLowerCase().includes(ingredientSearch.toLowerCase())
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
          <div key={receta.id} className="bg-white rounded-lg shadow-md p-4">
            <img src={receta.image} alt={receta.name} className="rounded-lg mb-4 w-full h-40 object-cover" />
            <div className="receta-info">
              <h3 className="text-lg font-semibold mb-2">{receta.name}</h3>
              <p className="text-gray-600 flex items-center">
                <FontAwesomeIcon icon={faStar} className="text-yellow-500 mr-2" /> {receta.rating} &nbsp;
                <FontAwesomeIcon icon={faUtensils} className="mr-2" style={{ color: '#619537' }} /> {receta.servings} &nbsp;
                <FontAwesomeIcon icon={faClock} className="mr-2" style={{ color: '#619537' }} /> {receta.time}
              </p>
              <button 
                className="mt-4 bg-verde-chef text-white py-2 px-4 rounded-full font-bold hover:bg-green-600 transition duration-300"
                onClick={() => openEditModal(receta)} // Abrir modal con los datos
              >
                <FontAwesomeIcon icon={faEdit}/> Editar
              </button>
            </div>
          </div>
        ))}
      </div>
      {/* Modal de agregar receta */}
      {addRecipeModalVisible && (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-6xl"> {/* Aumentamos el ancho aquí */}
            <h2 className="text-lg font-bold mb-4">Agregar Receta</h2>
            <div className="grid grid-cols-4 gap-4"> 
              
              {/* Título de la receta */}
              <div className="col-span-2">
                <label className="block mb-2 font-semibold">Título</label>
                <input 
                  type="text" 
                  className="w-full border border-gray-300 rounded-lg p-2" 
                  placeholder="Nombre de la receta"
                  value={newRecipe.title}
                  onChange={(e) => handleRecipeChange('title', e.target.value)}
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
                  value={newRecipe.rating}
                  onChange={(e) => handleRecipeChange('rating', e.target.value)}
                />
              </div>

              {/* Porciones */}
              <div>
                <label className="block mb-2 font-semibold">Porciones</label>
                <input 
                  type="number" 
                  className="w-full border border-gray-300 rounded-lg p-2" 
                  placeholder="Número de porciones"
                  value={newRecipe.servings}
                  onChange={(e) => handleRecipeChange('servings', e.target.value)}
                />
              </div>

              {/* Duración */}
              <div className="col-span-2">
                <label className="block mb-2 font-semibold">Duración</label>
                <input 
                  type="text" 
                  className="w-full border border-gray-300 rounded-lg p-2" 
                  placeholder="Tiempo en minutos"
                  value={newRecipe.duration}
                  onChange={(e) => handleRecipeChange('duration', e.target.value)}
                />
              </div>

              {/* Imagen de la receta */}
              <div className="col-span-2 flex flex-col justify-between">
                <label className="block mb-2 font-semibold">Imagen</label>
                <input 
                  type="file" 
                  className="w-full cursor-pointer rounded-lg border-[1.5px] border-gray-300 bg-transparent p-2 font-normal outline-none transition file:mr-5 file:cursor-pointer file:border-0 file:border-r file:border-solid file:border-gray-300 file:bg-white file:px-2 file:py-2 file:text-gray-700 file:hover:bg-green-600 file:hover:text-white focus:border-green-500"
                  onChange={(e) => handleRecipeChange('image', e.target.files[0])}
                />
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
                    value={selectedIngredient.quantity}
                    onChange={(e) => setSelectedIngredient({ ...selectedIngredient, quantity: e.target.value })}
                  />
                  <button 
                    className="bg-verde-chef text-white py-2 px-4 rounded-full font-bold hover:bg-green-600 transition duration-300"
                    onClick={addIngredient}
                  >
                    Agregar
                  </button>
                </div>
                {/* Mostrar ingredientes filtrados */}
                <ul className="border p-2 rounded-lg max-h-40 overflow-y-scroll">
                  {filteredIngredients.map((ingredient, index) => (
                    <li 
                      key={index} 
                      className="cursor-pointer py-1 hover:bg-gray-200"
                      onClick={() => setSelectedIngredient({ name: ingredient, quantity: '' })}
                    >
                      {ingredient}
                    </li>
                  ))}
                </ul>
                {/* Lista de ingredientes agregados */}
                <ul>
                  {newRecipe.ingredients.map((ingredient, index) => (
                    <li key={index} className="flex justify-between border-b py-2">
                      <span>{ingredient.name}</span>
                      <span>{ingredient.quantity}</span>
                      <button 
                        onClick={() => removeIngredient(index)} // Función para eliminar
                        className="text-red-500 ml-2"
                      >
                        <FontAwesomeIcon icon={faTimes} /> {/* Ícono de "X" */}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Pasos de la receta */}
              <div className="col-span-2">
                <label className="block mb-2 font-semibold">Paso a paso</label>
                <textarea 
                  className="w-full border border-gray-300 rounded-lg p-2"
                  placeholder="Describir los pasos de la receta"
                  value={newRecipe.steps}
                  onChange={(e) => handleRecipeChange('steps', e.target.value)}
                />
              </div>
            </div>

            {/* Botones de acción */}
            <div className="flex justify-end mt-4 space-x-4">
              <button 
                className="bg-gray-300 text-black py-2 px-4 rounded-full"
                onClick={toggleAddRecipeModal}
              >
                Cancelar
              </button>
              <button 
                className="bg-verde-chef text-white py-2 px-4 rounded-full"
                onClick={() => {
                  // Aquí podrías manejar la lógica para guardar la receta
                  console.log(newRecipe);
                  toggleAddRecipeModal();
                }}
              >
                Guardar Receta
              </button>
            </div>
          </div>
        </div>
      )}
      {/* Modal de editar receta */}
      {editRecipeModalVisible && selectedRecipe.ingredients && selectedRecipe.ingredients.length > 0 && (
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
                  value={selectedRecipe.title}
                  onChange={(e) => setSelectedRecipe({ ...selectedRecipe, title: e.target.value })}
                />
              </div>

              {/* Valoración */}
              <div>
                <label className="block mb-2 font-semibold">Valoración inicial</label>
                <input 
                  type="number" 
                  className="w-full border border-gray-300 rounded-lg p-2" 
                  value={selectedRecipe.rating}
                  onChange={(e) => setSelectedRecipe({ ...selectedRecipe, rating: e.target.value })}
                />
              </div>

              {/* Porciones */}
              <div>
                <label className="block mb-2 font-semibold">Porciones</label>
                <input 
                  type="number" 
                  className="w-full border border-gray-300 rounded-lg p-2" 
                  value={selectedRecipe.servings}
                  onChange={(e) => setSelectedRecipe({ ...selectedRecipe, servings: e.target.value })}
                />
              </div>

              {/* Duración */}
              <div>
                <label className="block mb-2 font-semibold">Duración</label>
                <input 
                  type="text" 
                  className="w-full border border-gray-300 rounded-lg p-2" 
                  value={selectedRecipe.duration}
                  onChange={(e) => setSelectedRecipe({ ...selectedRecipe, duration: e.target.value })}
                />
              </div>

              {/* Imagen */}
              <div className="col-span-2">
                <label className="block mb-2 font-semibold">Imagen</label>
                <input 
                  type="file" 
                  className="w-full border border-gray-300 rounded-lg p-2"
                  onChange={(e) => setSelectedRecipe({ ...selectedRecipe, image: e.target.files[0] })}
                />
              </div>

              {/* Ingredientes */}
              <div>
                <label className="block mb-2 font-semibold">Ingredientes</label>
                {/* Aquí cargamos los ingredientes para editarlos */}
                <ul>
                  {selectedRecipe.ingredients.map((ingredient, index) => (
                    <li key={index} className="flex justify-between border-b py-2">
                      <span>{ingredient.name}</span>
                      <span>{ingredient.quantity}</span>
                      <button 
                        onClick={() => removeIngredient(index)} // Usamos la misma función de eliminar ingrediente
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
                  value={selectedRecipe.steps}
                  onChange={(e) => setSelectedRecipe({ ...selectedRecipe, steps: e.target.value })}
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
                onClick={() => {
                  // Aquí puedes manejar la lógica de guardar los cambios de la receta
                  console.log(selectedRecipe);
                  closeEditModal();
                }}
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
