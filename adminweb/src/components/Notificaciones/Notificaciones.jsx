import React, { useEffect, useState } from 'react';
import {  getNotificaciones } from '../../services/notificationService';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import CrearNotificacion from './CrearNotificacion'; // Importar el componente de creación

const Notificaciones = () => {
  const [notificaciones, setNotificaciones] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [addNotificationModalVisible, setAddNotificationModalVisible] = useState(false); // Modal de agregar

  // Obtener lista de notificaciones al cargar
  useEffect(() => {
    const fetchNotificaciones = async () => {
      const notificationList = await getNotificaciones();
      setNotificaciones(notificationList);
      setLoading(false);
    };

    fetchNotificaciones();
  }, []);

  // const handleDelete = async (id) => {
  //   if (window.confirm('¿Estás seguro de eliminar esta notificación?')) {
  //     await deleteNotification(id);
  //     setNotificaciones(notificaciones.filter(noti => noti._id !== id));
  //   }
  // };

  // const openAddNotificationModal = () => {
  //   setAddNotificationModalVisible(true);
  // };

  const closeAddNotificationModal = () => {
    setAddNotificationModalVisible(false);
  };

  const handleCreateNotification = (nuevaNotificacion) => {
    // Agregar la nueva notificación al estado local
    setNotificaciones([...notificaciones, nuevaNotificacion]);
    closeAddNotificationModal();
  };

// Filtrar las notificaciones según la búsqueda
const filteredNotificaciones = notificaciones.filter((noti) => {
  const tipo = noti.tipo ? noti.tipo.toLowerCase() : '';
  const mensaje = noti.mensaje ? noti.mensaje.toLowerCase() : '';
  const fecha = noti.fecha ? new Date(noti.fecha).toLocaleDateString().toLowerCase() : '';

  return (
    tipo.includes(searchQuery.toLowerCase()) ||
    mensaje.includes(searchQuery.toLowerCase()) ||
    fecha.includes(searchQuery.toLowerCase())
  );
});


  const totalNotificaciones = notificaciones.length;

  if (loading) return <div>Loading...</div>;

  return (
    <div className="p-5">
      {/* Barra de búsqueda, total de notificaciones y botón "Agregar Notificación" */}
      <div className="flex justify-between items-center mb-6">
        <div className="relative flex items-center w-full max-w-lg">
          <FontAwesomeIcon icon={faSearch} className="absolute left-3 text-gray-400" />
          <input
            type="text"
            placeholder="Buscar notificaciones..."
            className="w-full py-2 pl-10 pr-3 rounded-full border border-gray-300 focus:outline-none focus:ring focus:ring-green-300"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        {/* Mostrar el total de notificaciones */}
        <div className="text-lg font-semibold">
          Total de notificaciones: {totalNotificaciones}
        </div>

        {/* Botón para abrir el modal de agregar notificación */}
        <button
          className="text-white py-2 px-6 rounded-full font-bold"
          // onClick={openAddNotificationModal}
        >
          {/* <FontAwesomeIcon icon={faPlus} />
          <span>Agregar Notificación</span> */}
        </button>
      </div>

      {/* Grid de notificaciones */}
      {/* <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredNotificaciones.map((noti) => (
          <div key={noti._id} className="bg-white rounded-lg shadow-md p-4 flex flex-col h-full">Usar flex para la tarjeta
            <div className="flex-grow"> Para hacer que el contenido crezca
              <p className="text-lg font-semibold">Título: {noti.titulo}</p>
              <p className="text-gray-600">Mensaje: {noti.mensaje}</p>
              <p className="text-sm text-gray-400">Fecha: {noti.fecha}</p>
              <p className="text-sm text-gray-400">Destinatario: {noti.destinatario}</p>
            </div>
            Botón de eliminar colocado al final
            <div className="mt-4 flex justify-end">
              <button
                onClick={() => handleDelete(noti._id)}
                className="bg-red-500 text-white py-2 px-4 rounded-full font-bold hover:bg-red-600 transition duration-300"
              >
                <FontAwesomeIcon icon={faTrash} /> Eliminar
              </button>
            </div>
          </div>
        ))}
      </div> */}

      {/* Modal para agregar notificación */}
      {addNotificationModalVisible && (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center z-50">
          <CrearNotificacion onClose={closeAddNotificationModal} onCreate={handleCreateNotification} />
        </div>
      )}
      {/* Historial de notificaciones */}
      <div className="mt-10">
        <h2 className="text-xl font-bold mb-4">Historial de Notificaciones</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredNotificaciones.map((noti) => (
            <div 
              key={noti._id} 
              className="bg-white rounded-lg shadow-md p-4 flex flex-col h-full"
            >
              <div className="flex-grow">
                <p className="text-lg font-semibold">Título: {noti.tipo}</p>
                <p className="text-gray-600">Mensaje: {noti.mensaje}</p>
                <p className="text-sm text-gray-400">Fecha: {new Date(noti.fecha).toLocaleDateString()}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Notificaciones;
