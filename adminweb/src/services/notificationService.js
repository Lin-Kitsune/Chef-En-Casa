import axios from 'axios';
import { getToken } from './authService';

const API_URL = 'http://localhost:4000/api/admin';
// Mock de notificaciones
let mockNotifications = [
    { _id: '1', titulo: 'Actualización de recetas', mensaje: 'Se ha actualizado la receta de pollo.', fecha: '2024-10-01' },
    { _id: '2', titulo: 'Nuevo ingrediente', mensaje: 'El ingrediente "Quinoa" ha sido añadido.', fecha: '2024-10-02' },
    { _id: '3', titulo: 'Recordatorio mensual', mensaje: 'Por favor, ingresa tu peso y altura.', fecha: '2024-10-03' }
  ];
  
// Servicio para obtener todas las notificaciones
export const getNotificaciones = async () => {
  try {
    const token = await getToken();
    const response = await axios.get(`${API_URL}/notificaciones`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error al obtener notificaciones:', error.response?.data || error.message);
    throw error;
  }
};

 // Simular función para obtener todas las notificaciones
 export const getAllNotifications = async () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(mockNotifications);
    }, 500); // Simulamos un retraso de 500ms
  });
};

  // Simular función para eliminar una notificación
  export const deleteNotification = async (id) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        mockNotifications = mockNotifications.filter(noti => noti._id !== id);
        resolve();
      }, 500); // Simulamos un retraso de 500ms
    });
  };
  
  // Simular función para crear una nueva notificación
  export const createNotification = async (newNotification) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const newNoti = { ...newNotification, _id: (mockNotifications.length + 1).toString() };
        mockNotifications.push(newNoti);
        resolve(newNoti);
      }, 500); // Simulamos un retraso de 500ms
    });
  };
  