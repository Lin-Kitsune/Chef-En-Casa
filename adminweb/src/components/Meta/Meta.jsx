import React, { useState } from 'react';
import { Bar, Doughnut } from 'react-chartjs-2';
import Select from 'react-select';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, ArcElement, Title, Tooltip, Legend } from 'chart.js';
import Fondo2 from '../../images/Fondo2.png'; 

ChartJS.register(CategoryScale, LinearScale, BarElement, ArcElement, Title, Tooltip, Legend);

const Meta = () => {
  // Datos simulados para cada usuario por períodos de tiempo (semana, mes, año)
  const [userData] = useState({
    users: ['Juan', 'Ana', 'Pedro', 'Sofía', 'Laura'],
    dataByTime: {
      week: {
        labels: ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'],
        usedIngredients: [10, 20, 15, 25, 20, 30, 35],
        wastedIngredients: [2, 3, 1, 5, 4, 2, 1],
      },
      month: {
        labels: ['Semana 1', 'Semana 2', 'Semana 3', 'Semana 4'],
        usedIngredients: [80, 100, 75, 90],
        wastedIngredients: [10, 12, 8, 10],
      },
      year: {
        labels: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'],
        usedIngredients: [120, 140, 130, 160, 170, 150, 180, 190, 175, 165, 155, 160],
        wastedIngredients: [12, 15, 10, 14, 13, 12, 11, 9, 10, 11, 14, 12],
      },
      total: {
        usedIngredients: [1250],
        wastedIngredients: [125],
      },
    },
  });

  // Estado para controlar los filtros
  const [selectedUser, setSelectedUser] = useState({ value: 'Todos', label: 'Todos' }); // Controla el usuario seleccionado
  const [selectedTime, setSelectedTime] = useState('total'); // Controla el período de tiempo (semana, mes, año, total)

  // Opciones para el selector de usuarios
  const userOptions = [
    { value: 'Todos', label: 'Todos' },
    { value: 'Juan', label: 'Juan' },
    { value: 'Ana', label: 'Ana' },
    { value: 'Pedro', label: 'Pedro' },
    { value: 'Sofía', label: 'Sofía' },
    { value: 'Laura', label: 'Laura' },
  ];

  // Función para filtrar datos por usuario y período
  const getFilteredData = () => {
    const { usedIngredients, wastedIngredients, labels } = userData.dataByTime[selectedTime];

    if (selectedUser.value === 'Todos') {
      // Si se selecciona "Todos", mostrar los totales sumados para la semana/mes/año
      const totalUsed = usedIngredients.reduce((a, b) => a + b, 0);
      const totalWasted = wastedIngredients.reduce((a, b) => a + b, 0);
      return {
        labels: selectedTime === 'total' ? ['Total'] : labels, // Mostrar días/meses/semanas si no es total
        datasets: [
          {
            label: 'Ingredientes Utilizados',
            data: selectedTime === 'total' ? [totalUsed] : usedIngredients, // Mostrar total o por período
            backgroundColor: '#4CAF50',
          },
          {
            label: 'Ingredientes Desperdiciados',
            data: selectedTime === 'total' ? [totalWasted] : wastedIngredients, // Mostrar total o por período
            backgroundColor: '#FF5733',
          },
        ],
      };
    } else {
      // Buscar el índice del usuario seleccionado y mostrar sus datos
      const userIndex = userData.users.findIndex(user => user.toLowerCase() === selectedUser.value.toLowerCase());
      return {
        labels: [selectedUser.label],
        datasets: [
          {
            label: 'Ingredientes Utilizados',
            data: [usedIngredients[userIndex]],
            backgroundColor: '#4CAF50',
          },
          {
            label: 'Ingredientes Desperdiciados',
            data: [wastedIngredients[userIndex]],
            backgroundColor: '#FF5733',
          },
        ],
      };
    }
  };

  // Obtener datos del gráfico Doughnut (circular)
  // Datos del gráfico Doughnut con colores personalizados
 // Datos del gráfico Doughnut con colores personalizados y bordes redondeados
const getPercentageData = () => {
    const { usedIngredients, wastedIngredients } = userData.dataByTime[selectedTime];
    const totalUsed = usedIngredients.reduce((a, b) => a + b, 0);
    const totalWasted = wastedIngredients.reduce((a, b) => a + b, 0);
    const total = totalUsed + totalWasted;
  
    return {
      labels: ['Utilizados', 'Desperdiciados'],
      datasets: [
        {
          data: [totalUsed, totalWasted],
          backgroundColor: ['#FFFFFF', 'rgba(255, 255, 255, 0.5)'], // Blanco sólido y blanco con opacidad
          hoverBackgroundColor: ['#FFFFFF', 'rgba(255, 255, 255, 0.7)'], // Colores en hover
          borderRadius: [10, 0], // Para redondear los extremos de la dona
          borderWidth: 0, // Eliminar bordes alrededor del gráfico
          spacing: 2,
        },
      ],
      percentageUsed: ((totalUsed / total) * 100).toFixed(2), // Cálculo del porcentaje de uso
    };
  };
  
  

  // Opciones de configuración para el gráfico
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: `Progreso de Reducción del Desperdicio (${selectedTime.charAt(0).toUpperCase() + selectedTime.slice(1)})`,
      },
    },
  };

  // Opciones para Doughnut Chart
  const doughnutOptions = {
    cutout: '70%', // Hacer más grande el "cutout" para que el gráfico se vea más abierto
    plugins: {
      legend: {
        display: true,
        position: 'top',
        labels: {
          color: '#FFFFFF', // Color blanco para las etiquetas
        },
      },
    },
  };

  const percentageData = getPercentageData();

  // Función para manejar cambios en el select
  const handleUserChange = (selectedOption) => {
    setSelectedUser(selectedOption);
  };

  return ( 
    <div className="p-5">
      <h1 className="text-2xl font-bold mb-6">Monitoreo de Meta</h1>
      <p className="text-lg mb-4">
        Aquí puedes ver cómo está progresando la reducción del desperdicio de alimentos en base a los ingredientes utilizados al preparar recetas.
      </p>
  
      {/* Filtros */}
      <div className="flex flex-wrap items-center gap-4 mb-4">
        
        {/* Selector de período (Total) con el mismo diseño que el dropdown de usuarios */}
        <div className="relative z-20 w-full sm:w-64">
            <select
            className="w-full border border-gray-300 rounded-lg py-2 px-4 pr-10 bg-white appearance-none outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
            value={selectedTime}
            onChange={(e) => setSelectedTime(e.target.value)}
            >
            <option value="week">Semana</option>
            <option value="month">Mes</option>
            <option value="year">Año</option>
            <option value="total">Total</option>
            </select>

            {/* Icono de flecha para el dropdown */}
            <span className="absolute right-4 top-1/2 transform -translate-y-1/2 pointer-events-none">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g opacity="0.8">
                <path fillRule="evenodd" clipRule="evenodd" d="M5.29289 8.29289C5.68342 7.90237 6.31658 7.90237 6.70711 8.29289L12 13.5858L17.2929 8.29289C17.6834 7.90237 18.3166 7.90237 18.7071 8.29289C19.0976 8.68342 19.0976 9.31658 18.7071 9.70711L12.7071 15.7071C12.3166 16.0976 11.6834 16.0976 11.2929 15.7071L5.29289 9.70711C4.90237 9.31658 4.90237 8.68342 5.29289 8.29289Z" fill="#637381"></path>
                </g>
            </svg>
            </span>
        </div>
  
        {/* Dropdown con búsqueda de usuarios */}
        <div className="w-full sm:w-64">
            <Select
            options={userOptions}   // Lista de usuarios simulada
            value={selectedUser}     // Usuario actualmente seleccionado
            onChange={handleUserChange}  // Maneja el cambio de usuario
            placeholder="Todos"  // Placeholder dentro del select
            className="w-full border-gray-300 rounded-lg"  // Ajuste de tamaño del select
            
            // Estilos personalizados para limitar la altura del menú y añadir scroll
            styles={{
                menu: (provided) => ({
                ...provided,
                zIndex: 9999,  // Para asegurarnos que el menú esté siempre encima
                }),
                menuList: (provided) => ({
                ...provided,
                maxHeight: '150px',  // Limitar la altura máxima del menú
                overflowY: 'auto',   // Habilitar el scroll cuando excede la altura
                }),
            }}
            />
        </div>
  
        {/* Botón para ver todos los usuarios */}
        <div className="w-full sm:w-auto">
          <button
            className={`bg-verde-chef text-white py-2 px-4 rounded-full font-bold ${selectedUser?.value === 'Todos' ? 'opacity-50' : ''}`}
            onClick={() => setSelectedUser({ value: 'Todos', label: 'Todos' })}
          >
            Ver Todos
          </button>
        </div>
      </div>
  
      {/* Gráfico */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <Bar data={getFilteredData()} options={options} />
      </div>
      {/* Gráfico Doughnut */}
      <div 
        className="mt-8 text-white p-4 rounded-lg shadow-lg w-full max-w-xs text-center"
        style={{
            backgroundImage: `url(${Fondo2})`, // Ruta de la imagen de fondo
            backgroundSize: 'cover', // Ajuste para que la imagen cubra el contenedor
            backgroundPosition: 'center', // Centrado de la imagen
        }}
        >
            <h3 className="text-lg font-bold mb-2">Resultado Semanal</h3> {/* Texto cambiado a español */}
        
            {/* Gráfico Doughnut */}
            <Doughnut data={percentageData} options={doughnutOptions} />
            
            {/* Porcentaje al centro */}
            <div className="flex items-center justify-center mt-4">
                <span className="text-4xl font-bold">{percentageData.percentageUsed}%</span>
            </div>
            
            {/* Descripción final en español */}
            <p className="text-sm text-center mt-1">Informe semanal</p>
        </div>


    </div>
  );  
};

export default Meta;
