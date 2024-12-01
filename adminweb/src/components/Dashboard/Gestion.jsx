import React from 'react';
import RecetasIcon from '../../icons/recetas.png';
import IngredientesIcon from '../../icons/ingredientes.png';
import UsuariosIcon from '../../icons/usuarios.png';
import ReclamosIcon from '../../icons/reclamos.png';
import NotificacionesIcon from '../../icons/notificaciones.png';
import ConveniosIcon from '../../icons/convenio.png';
import CuponesIcon from '../../icons/cupones.png';
import AprendizajeIcon from '../../icons/aprendizaje.png';
import { Link } from 'react-router-dom';

const Gestion = () => {
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

            {/* Usuarios */}
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
        {/* GRaficos de gestion */}
    </div>
  );
};

export default Gestion;
