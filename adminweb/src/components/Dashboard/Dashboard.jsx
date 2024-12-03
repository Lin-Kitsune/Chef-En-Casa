import React, { useState, useEffect } from 'react';
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
import { getCantidadPorTipo } from '../../services/OperativeService'; // Importar Funcion de Categorias de Reclamos
import { getUsuariosActivos } from '../../services/OperativeService';  // Importar Funcion de Usuarios Activos

const Dashboard = () => {
    const [usuariosActivos, setUsuariosActivos] = useState(0);
    const [loading, setLoading] = useState(true);
    const [solicitudes, setSolicitudes] = useState({
      solicitud: 0,
      reclamo: 0,
      sugerencia: 0,
      nutricionista: 0,
    });

    useEffect(() => {
        const fetchData = async () => {
          try {
            // Llamar a la función para obtener la cantidad de cada tipo de solicitud
            const solicitudData = await getCantidadPorTipo('Solicitud');
            const reclamoData = await getCantidadPorTipo('Reclamo');
            const sugerenciaData = await getCantidadPorTipo('Sugerencia');
            const nutricionistaData = await getCantidadPorTipo('Nutricionista');
  
            // Actualizamos el estado con los valores recibidos
            setSolicitudes({
              solicitud: solicitudData.count,
              reclamo: reclamoData.count,
              sugerencia: sugerenciaData.count,
              nutricionista: nutricionistaData.count,
            });
  
            // Obtener los usuarios activos
            const usuariosActivosData = await getUsuariosActivos('diario'); // Aquí se debe pasar el rango
            setUsuariosActivos(usuariosActivosData.usuariosActivos); // Actualizamos el número de usuarios activos
            setLoading(false); // Una vez que se obtienen los datos, dejamos de mostrar "Cargando..."
          } catch (error) {
            console.error('Error al obtener los datos:', error);
            setLoading(false);
          }
        };
  
        fetchData();
    }, []); // Este useEffect solo se ejecuta una vez al cargar el componente
  
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

          {/* Indicadores de solicitudes */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8 mt-5">
            {/* Indicador de Solicitudes */}
            <div className="flex items-center bg-white rounded-lg shadow-lg">
              <div className="w-6 h-full bg-gradient-to-t from-[#00a651] to-[#8dc63f] rounded-l-lg"></div>
              <Link to= "/reclamos">
                <div className="flex items-center p-7 space-x-4">
                  <div className="flex-shrink-0">
                    <FontAwesomeIcon icon={faClipboardList} className="text-5xl text-blue-600" />
                  </div>
                  <div className="text-left">
                    <p className="text-sm text-gray-600 font-bold">TOTAL SOLICITUDES</p>
                    <p className="text-2xl font-extrabold text-gray-900">{solicitudes.solicitud}</p>
                  </div>
                </div>
              </Link>
            </div>
    
            {/* Indicador de Reclamos */}
            <div className="flex items-center bg-white rounded-lg shadow-lg">
              <div className="w-6 h-full bg-gradient-to-t from-[#00a651] to-[#8dc63f] rounded-l-lg"></div>
              <Link to= "/reclamos">
                <div className="flex items-center p-7 space-x-4">
                  <div className="flex-shrink-0">
                    <FontAwesomeIcon icon={faListAlt} className="text-5xl text-red-600" />
                  </div>
                  <div className="text-left">
                    <p className="text-sm text-gray-600 font-bold">TOTAL RECLAMOS</p>
                    <p className="text-2xl font-extrabold text-gray-900">{solicitudes.reclamo}</p>
                  </div>
                </div>
              </Link>
            </div>
  
            {/* Indicador de Sugerencias */}
            <div className="flex items-center bg-white rounded-lg shadow-lg">
              <div className="w-6 h-full bg-gradient-to-t from-[#00a651] to-[#8dc63f] rounded-l-lg"></div>
              <Link to= "/reclamos">
                <div className="flex items-center p-7 space-x-4">
                  <div className="flex-shrink-0">
                    <FontAwesomeIcon icon={faTachometerAlt} className="text-5xl text-yellow-600" />
                  </div>
                  <div className="text-left">
                    <p className="text-sm text-gray-600 font-bold">TOTAL SUGERENCIAS</p>
                    <p className="text-2xl font-extrabold text-gray-900">{solicitudes.sugerencia}</p>
                  </div>
                </div>
              </Link>
            </div>
  
            {/* Indicador Nutricionista */}
            <div className="flex items-center bg-white rounded-lg shadow-lg">
              <div className="w-6 h-full bg-gradient-to-t from-[#00a651] to-[#8dc63f] rounded-l-lg"></div>
              <Link to= "/reclamos">
                <div className="flex items-center p-7 space-x-4">
                  <div className="flex-shrink-0">
                    <FontAwesomeIcon icon={faHeartbeat} className="text-5xl text-green-600" />
                  </div>
                  <div className="text-left">
                    <p className="text-sm text-gray-600 font-bold">NUTRICIONISTA</p>
                    <p className="text-2xl font-extrabold text-gray-900">{solicitudes.nutricionista}</p>
                  </div>
                </div>
              </Link>
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
            {loading ? (
              <div className="text-2xl font-semibold">Cargando...</div>  // Muestra "Cargando..." mientras se obtiene la data
            ) : (
              <Gauge percentage={usuariosActivos} />  // Pasa el número de usuarios activos al velocímetro
            )}
          </div>
    </div>
  );
};

export default Dashboard;
