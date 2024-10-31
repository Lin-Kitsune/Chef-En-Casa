import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { getToken } from './auth'; // Asume que tienes una función para obtener el token

const API_URL = 'http://10.0.2.2:4000';

export const fetchNotifications = async () => {
  try {
    const token = await getToken();
    const response = await axios.get(`${API_URL}/notificaciones`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data.notificaciones;
  } catch (error) {
    throw new Error('Error al obtener las notificaciones');
  }
};

export const deleteNotification = async (notificationId) => {
    try {
      const token = await AsyncStorage.getItem('userToken');
      const response = await axios.delete(`${API_URL}/notificaciones/${notificationId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      throw new Error('Error al eliminar la notificación');
    }
  };
