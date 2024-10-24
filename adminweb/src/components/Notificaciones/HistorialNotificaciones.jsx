import React from 'react';

const HistorialNotificaciones = ({ notificaciones }) => {
  if (notificaciones.length === 0) {
    return <p>No hay notificaciones enviadas aún.</p>;
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg">
      <h2 className="text-xl font-bold mb-4">Historial de Notificaciones</h2>
      <ul className="space-y-4">
        {notificaciones.map((noti) => (
          <li key={noti.id} className="border-b pb-4">
            <p className="text-lg font-semibold">{noti.titulo}</p>
            <p className="text-gray-700">{noti.mensaje}</p>
            <p className="text-sm text-gray-500">{noti.fecha}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default HistorialNotificaciones;
