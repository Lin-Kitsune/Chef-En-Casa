import React, { useState } from 'react';
import RecetasIcon from '../../icons/recetas.png';
import IngredientesIcon from '../../icons/ingredientes.png';
import UsuariosIcon from '../../icons/usuarios.png';
import ReclamosIcon from '../../icons/reclamos.png';
import NotificacionesIcon from '../../icons/notificaciones.png';
import ConveniosIcon from '../../icons/convenio.png';
import CuponesIcon from '../../icons/cupones.png';
import AprendizajeIcon from '../../icons/aprendizaje.png';
import { Link } from 'react-router-dom';

//================Importar funciones de graficos desde la carpeta "GRAFICOS"====================
import UsuariosActivos from '../Graficos/UsuariosActivos'; // Importa el gráfico
import NuevosUsuarios from '../Graficos/NuevosUsuarios'; //Importa el gráfico
import RecetasPreparadas from '../Graficos/RecetasPreparadas'; //Importa el gráfico
import RecetasValoradas from '../Graficos/RecetasValoradas'; // Importa el gráfico
import RecetasGuardadas from '../Graficos/RecetasGuardadas'; //Importa el gráfico
import IngredientesMasUtilizados from '../Graficos/IngredientesMasUtilizados'; // Importa el gráfico

const Gestion = () => {
    // Estado para manejar la visibilidad de los gráficos y el rango
    const [mostrarGrafico, setMostrarGrafico] = useState(false);
    const [mostrarGraficoRecetas, setMostrarGraficoRecetas] = useState(false); // Para recetas preparadas
    const [mostrarGraficoRecetasGuardadas, setMostrarGraficoRecetasGuardadas] = useState(false); // Para recetas guardadas
    const [mostrarGraficoIngredientes, setMostrarGraficoIngredientes] = useState(false);
    const [rango, setRango] = useState('mensual'); //rango por defecto
  
    // Función para manejar el cambio de rango
    const handleRangoChange = (e) => {
      setRango(e.target.value);
    };
  
    // Función para mostrar/ocultar el gráfico de "Usuarios"
    const toggleGraficoUsuarios = () => {
      setMostrarGrafico(!mostrarGrafico);
      setMostrarGraficoRecetas(false); // Ocultar el gráfico de recetas si se está mostrando el de usuarios
    };
  
    // Función para mostrar/ocultar el gráfico de "Recetas"
    const toggleGraficoRecetas = () => {
      setMostrarGraficoRecetas(!mostrarGraficoRecetas); // Alternar visibilidad del gráfico de recetas
      setMostrarGrafico(false); // Ocultar el gráfico de usuarios si se está mostrando el de recetas
      setMostrarGraficoRecetasGuardadas(!mostrarGraficoRecetasGuardadas); // Alternar visibilidad del gráfico de recetas guardadas
    };

    // Función para manejar el cambio de visibilidad del gráfico de ingredientes
    const toggleGraficoIngredientes = () => {
        setMostrarGraficoIngredientes(!mostrarGraficoIngredientes);
        setMostrarGrafico(false); // Ocultar el gráfico de usuarios si se está mostrando el de ingredientes
        setMostrarGraficoRecetas(false); // Ocultar el gráfico de recetas si se está mostrando el de ingredientes
    };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
        {/* Botones Operativa y Gestión */}
        <div className="flex justify-center gap-8 mt-1">
            <Link to="/">
            <button className="min-w-[200px] px-12 py-6 bg-gradient-to-r from-[#00a651] to-[#8dc63f] text-white text-2xl font-bold uppercase rounded-full shadow-lg hover:from-[#007e3a] hover:to-[#6fae34] transition duration-200">
                Operativo
            </button>
            </Link>
            {/* Botón Gestión */}
            <Link to="/gestion">
            <button className="min-w-[200px] px-12 py-6 bg-gradient-to-r from-[#00a651] to-[#8dc63f] text-white text-2xl font-bold uppercase rounded-full shadow-lg hover:from-[#007e3a] hover:to-[#6fae34] transition duration-200">
                Gestión
            </button>
            </Link>
        </div>
        
        {/* Botones de Funcionalidades */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-8 gap-4 mt-5">
            {/* Recetas */}
            <Link to="#" onClick={toggleGraficoRecetas}>
                <div className="bg-gradient-to-r from-[#00a651] to-[#8dc63f] w-40 h-40 rounded-3xl shadow-lg flex flex-col items-center justify-center cursor-pointer">
                    <img src={RecetasIcon} alt="Recetas Icon" className="w-16 h-16 mb-2" />
                    <p className="text-base text-white font-semibold">RECETAS</p>
                </div>
            </Link>

            {/* Ingredientes */}
            <Link to="#" onClick={toggleGraficoIngredientes}>
                <div className="bg-gradient-to-r from-[#00a651] to-[#8dc63f] w-40 h-40 rounded-3xl shadow-lg flex flex-col items-center justify-center cursor-pointer">
                    <img src={IngredientesIcon} alt="Ingredientes Icon" className="w-16 h-16 mb-2" />
                    <p className="text-base text-white font-semibold">INGREDIENTES</p>
                </div>
            </Link>

            {/* Usuarios */}
            <Link to="#" onClick={toggleGraficoUsuarios}>
                <div className="bg-gradient-to-r from-[#00a651] to-[#8dc63f] w-40 h-40 rounded-3xl shadow-lg flex flex-col items-center justify-center cursor-pointer">
                <img src={UsuariosIcon} alt="Usuarios Icon" className="w-16 h-16 mb-2" />
                <p className="text-base text-white font-semibold">USUARIOS</p>
                </div>
            </Link>

            {/* Reclamos */}
            <Link to="/reclamos">
                <div className="bg-gradient-to-r from-[#00a651] to-[#8dc63f] w-40 h-40 rounded-3xl shadow-lg flex flex-col items-center justify-center cursor-pointer">
                <img src={ReclamosIcon} alt="Reclamos Icon" className="w-16 h-16 mb-2" />
                <p className="text-base text-white font-semibold">RECLAMOS</p>
                </div>
            </Link>

            {/* Notificaciones */}
            <Link to="/notificaciones">
                <div className="bg-gradient-to-r from-[#00a651] to-[#8dc63f] w-40 h-40 rounded-3xl shadow-lg flex flex-col items-center justify-center cursor-pointer">
                <img src={NotificacionesIcon} alt="Notificaciones Icon" className="w-14 h-14 mb-2" />
                <p className="text-base text-white font-semibold">NOTIFICACIONES</p>
                </div>
            </Link>

            {/* Convenios */}
            <Link to="/convenios">
                <div className="bg-gradient-to-r from-[#00a651] to-[#8dc63f] w-40 h-40 rounded-3xl shadow-lg flex flex-col items-center justify-center cursor-pointer">
                <img src={ConveniosIcon} alt="Convenios Icon" className="w-16 h-16 mb-2" />
                <p className="text-base text-white font-semibold">CONVENIOS</p>
                </div>
            </Link>

            {/* Cupones */}
            <Link to="/cupones">
                <div className="bg-gradient-to-r from-[#00a651] to-[#8dc63f] w-40 h-40 rounded-3xl shadow-lg flex flex-col items-center justify-center cursor-pointer">
                <img src={CuponesIcon} alt="Cupones Icon" className="w-16 h-16 mb-2" />
                <p className="text-base text-white font-semibold">CUPONES</p>
                </div>
            </Link>

            {/* Aprendizaje */}
            <Link to="/sabias-que">
                <div className="bg-gradient-to-r from-[#00a651] to-[#8dc63f] w-40 h-40 rounded-3xl shadow-lg flex flex-col items-center justify-center cursor-pointer">
                <img src={AprendizajeIcon} alt="Aprendizaje Icon" className="w-16 h-16 mb-2" />
                <p className="text-base text-white font-semibold">APRENDIZAJE</p>
                </div>
            </Link>
        </div>
        {/* Mostrar gráficos de Recetas */}
        {mostrarGraficoRecetas && (
            <div className="mt-8">
                <h2 className="text-2xl font-semibold text-center mb-4">Recetas Preparadas</h2>
                <RecetasPreparadas rango={rango} />
  
                <h2 className="text-2xl font-semibold text-center mb-4 mt-8">Recetas Mejor Valoradas</h2>
                <RecetasValoradas rango={rango} />

                <h2 className="text-2xl font-semibold text-center mb-4 mt-8">Recetas Más Guardadas</h2>
                <RecetasGuardadas rango={rango} />
            </div>
        )}

        {/* Mostrar gráficos de Ingredientes solo cuando se hace clic en el botón "Ingredientes" */}
        {mostrarGraficoIngredientes && (
            <div className="mt-8">
                <h2 className="text-2xl font-semibold text-center mb-4">Ingredientes Más Utilizados</h2>
                <IngredientesMasUtilizados rango={rango} />
            </div>
        )}


        {/* Mostrar los gráficos de Usuarios solo cuando se hace clic en el botón "Usuarios" */}
        {mostrarGrafico && (
        <>
            <div className="mt-8">
            <h2 className="text-2xl font-semibold text-center mb-4">Usuarios Activos</h2>
            {/* Componente de gráfico de Usuarios Activos */}
            <UsuariosActivos rango={rango} onRangoChange={handleRangoChange} />
            </div>

            <div className="mt-8">
            <h2 className="text-2xl font-semibold text-center mb-4">Usuarios Nuevos</h2>
            {/* Componente de gráfico de Nuevos Usuarios */}
            <NuevosUsuarios rango={rango} onRangoChange={handleRangoChange} />
            </div>
        </>
        )}
    </div>
  );
};

export default Gestion;