import React, { useState } from 'react';
import receta1 from '../../images/receta1.jpg';
import receta2 from '../../images/receta2.jpg';
import receta3 from '../../images/receta3.jpg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faStar, faUtensils, faClock, faPlus, faFilter } from '@fortawesome/free-solid-svg-icons';
import './Recetas.css';

const Recetas = () => {
  const [filterModalVisible, setFilterModalVisible] = useState(false); // Modal visibility
  const [classification, setClassification] = useState(''); // Classification filter
  const [minRating, setMinRating] = useState(0); // Valoración mínima
  const [searchQuery, setSearchQuery] = useState(''); // Valor de búsqueda
  const [durationFilter, setDurationFilter] = useState(''); // Duración seleccionada
  const [sortBy, setSortBy] = useState(''); // Ordenar por valoracion

  const recetas = [
    { id: 1, name: 'Bol con Fruta', rating: 4.5, servings: 2, time: '5 minutos', image: receta1, category: 'Desayuno', duration: 5 },
    { id: 2, name: 'Pizza Margarita', rating: 4.7, servings: 4, time: '20 minutos', image: receta2, category: 'Almuerzo', duration: 20 },
    { id: 3, name: 'Sopa de Verduras', rating: 4.2, servings: 3, time: '30 minutos', image: receta3, category: 'Cena', duration: 30 },
  ];

  // Función para abrir y cerrar el modal
  const toggleFilterModal = () => {
    setFilterModalVisible(!filterModalVisible);
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
        <button className="bg-verde-chef text-white py-2 px-6 rounded-full font-bold hover:bg-green-600 transition duration-300 flex items-center space-x-2">
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
              <button className="mt-4 bg-verde-chef text-white py-2 px-4 rounded-full font-bold hover:bg-green-600 transition duration-300">
                Editar
              </button>
            </div>
          </div>
        ))}
      </div>

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
