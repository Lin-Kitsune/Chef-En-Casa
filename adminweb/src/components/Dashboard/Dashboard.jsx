import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTachometerAlt, faListAlt, faHeartbeat, faClipboardList } from '@fortawesome/free-solid-svg-icons';
import RecetasIcon from '../../icons/recetas.png';
import IngredientesIcon from '../../icons/ingredientes.png';
import UsuariosIcon from '../../icons/usuarios.png';
import NotificacionesIcon from '../../icons/notificaciones.png';
import ConveniosIcon from '../../icons/convenio.png';
import CuponesIcon from '../../icons/cupones.png';
import AprendizajeIcon from '../../icons/aprendizaje.png';
import { Link } from 'react-router-dom';
import Gauge from "./Gauge";

const Dashboard = () => {
    const activeUsersPercentage = 75.94; // Porcentaje dinámico (puede venir del backend)

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
        
        {/* Contenedores de los indicadores */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8 mt-5">
            {/* Indicador Reclamos */}
            <div className="flex items-center bg-white rounded-lg shadow-lg">
                {/* Gradiente Izquierdo */}
                <div className="w-6 h-full bg-gradient-to-t from-[#00a651] to-[#8dc63f] rounded-l-lg"></div>
                
                {/* Contenido del Indicador */}
                <div className="flex items-center p-7 space-x-4">
                    {/* Icono */}
                    <div className="flex-shrink-0">
                        <FontAwesomeIcon icon={faClipboardList} className="text-5xl text-red-600" />
                    </div>
                    
                    {/* Texto */}
                    <div className="text-left">
                        <p className="text-sm text-gray-600 font-bold">TOTAL<br />RECLAMOS</p>
                        <p className="text-3xl text-gray-800 font-bold">5</p>
                    </div>
                </div>
            </div>

            {/* Indicador Sugerencias */}
            <div className="flex items-center bg-white rounded-lg shadow-lg">
                {/* Gradiente Izquierdo */}
                <div className="w-6 h-full bg-gradient-to-t from-[#00a651] to-[#8dc63f] rounded-l-lg"></div>
                
                {/* Contenido del Indicador */}
                <div className="flex items-center p-7 space-x-4">
                    {/* Icono */}
                    <div className="flex-shrink-0">
                        <FontAwesomeIcon icon={faListAlt} className="text-5xl text-blue-600" />
                    </div>
                    
                    {/* Texto */}
                    <div className="text-left">
                        <p className="text-sm text-gray-600 font-bold">TOTAL<br />SUGERENCIAS</p>
                        <p className="text-3xl text-gray-800 font-bold">5</p>
                    </div>
                </div>
            </div>

            {/* Indicador Solicitudes */}
            <div className="flex items-center bg-white rounded-lg shadow-lg">
                {/* Gradiente Izquierdo */}
                <div className="w-6 h-full bg-gradient-to-t from-[#00a651] to-[#8dc63f] rounded-l-lg"></div>
                
                {/* Contenido del Indicador */}
                <div className="flex items-center p-7 space-x-4">
                    {/* Icono */}
                    <div className="flex-shrink-0">
                        <FontAwesomeIcon icon={faTachometerAlt} className="text-5xl text-yellow-600" />
                    </div>
                    
                    {/* Texto */}
                    <div className="text-left">
                        <p className="text-sm text-gray-600 font-bold">TOTAL<br />SOLICITUDES</p>
                        <p className="text-3xl text-gray-800 font-bold">5</p>
                    </div>
                </div>
            </div>

            {/* Indicador Nutricional */}
            <div className="flex items-center bg-white rounded-lg shadow-lg">
                {/* Gradiente Izquierdo */}
                <div className="w-6 h-full bg-gradient-to-t from-[#00a651] to-[#8dc63f] rounded-l-lg"></div>
                
                {/* Contenido del Indicador */}
                <div className="flex items-center p-7 space-x-4">
                    {/* Icono */}
                    <div className="flex-shrink-0">
                        <FontAwesomeIcon icon={faHeartbeat} className="text-5xl text-green-600" />
                    </div>
                    
                    {/* Texto */}
                    <div className="text-left">
                        <p className="text-sm text-gray-600 font-bold">TOTAL<br />NUTRICIONAL</p>
                        <p className="text-3xl text-gray-800 font-bold">5</p>
                    </div>
                </div>
            </div>
        </div>
        
        {/* Botones de Funcionalidades */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-7 gap-4 mt-5">
            {/* Recetas */}
            <Link to="/recetas">
                <div className="bg-gradient-to-r from-[#00a651] to-[#8dc63f] w-40 h-40 rounded-3xl shadow-lg flex flex-col items-center justify-center cursor-pointer">
                <img src={RecetasIcon} alt="Recetas Icon" className="w-16 h-16 mb-2" />
                <p className="text-base text-white font-semibold">RECETAS</p>
                </div>
            </Link>

            {/* Ingredientes */}
            <Link to="/ingredientes">
                <div className="bg-gradient-to-r from-[#00a651] to-[#8dc63f] w-40 h-40 rounded-3xl shadow-lg flex flex-col items-center justify-center cursor-pointer">
                <img src={IngredientesIcon} alt="Ingredientes Icon" className="w-16 h-16 mb-2" />
                <p className="text-base text-white font-semibold">INGREDIENTES</p>
                </div>
            </Link>

            {/* Usuarios */}
            <Link to="/usuarios">
                <div className="bg-gradient-to-r from-[#00a651] to-[#8dc63f] w-40 h-40 rounded-3xl shadow-lg flex flex-col items-center justify-center cursor-pointer">
                <img src={UsuariosIcon} alt="Usuarios Icon" className="w-16 h-16 mb-2" />
                <p className="text-base text-white font-semibold">USUARIOS</p>
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
        {/* Medidor de Usuarios Activos */}
        <div className="mt-8">
            <Gauge percentage={activeUsersPercentage} />
        </div>
    </div>
  );
};

export default Dashboard;
