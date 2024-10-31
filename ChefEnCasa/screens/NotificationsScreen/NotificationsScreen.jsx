import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import Icon from 'react-native-vector-icons/FontAwesome';
import moment from 'moment';
import 'moment/locale/es'; // Configura moment para usar español si deseas
import styles from './NotificationsScreenStyles';
import { useFocusEffect } from '@react-navigation/native';

const NotificationsScreen = () => {
  // Configura el idioma en español
  moment.locale('es');

  // Estado para almacenar las notificaciones
  const [notifications, setNotifications] = useState([]);

  // Función para obtener notificaciones desde el backend
  const fetchNotifications = async () => {
    try {
      const token = await AsyncStorage.getItem('userToken');
      const response = await axios.get('http://10.0.2.2:4000/notificaciones', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setNotifications(response.data.notificaciones);
    } catch (error) {
      Alert.alert('Error', 'No se pudieron cargar las notificaciones');
    }
  };

  // Llama a fetchNotifications al montar la pantalla
  useEffect(() => {
    fetchNotifications();
  }, []);

  // Actualiza las notificaciones cada vez que la pantalla gana el foco
  useFocusEffect(
    React.useCallback(() => {
      fetchNotifications();
    }, [])
  );

  // Función para eliminar una notificación
  const handleDeleteNotification = async (id) => {
    try {
      const token = await AsyncStorage.getItem('userToken');
      await axios.delete(`http://10.0.2.2:4000/notificaciones/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      // Filtrar la notificación eliminada del estado local
      setNotifications((prevNotifications) =>
        prevNotifications.filter((notification) => notification._id !== id)
      );
    } catch (error) {
      Alert.alert('Error', 'No se pudo eliminar la notificación');
    }
  };

  // Función para categorizar notificaciones
  const categorizeNotifications = () => {
    const today = [];
    const yesterday = [];
    const last7Days = [];
    const last30Days = [];

    notifications.forEach(notification => {
      const diffDays = moment().diff(notification.fecha, 'days');
      if (diffDays === 0) {
        today.push(notification);
      } else if (diffDays === 1) {
        yesterday.push(notification);
      } else if (diffDays <= 7) {
        last7Days.push(notification);
      } else if (diffDays <= 30) {
        last30Days.push(notification);
      }
    });

    return { today, yesterday, last7Days, last30Days };
  };

  const { today, yesterday, last7Days, last30Days } = categorizeNotifications();

  return (
    <View style={styles.container}>
      <ScrollView style={styles.notificationList} contentContainerStyle={{ paddingBottom: 45 }}>
        {/* Sección de "Hoy" */}
        {today.length > 0 && (
          <View>
            <Text style={styles.sectionHeader}>Hoy</Text>
            {today.map((notification) => (
              <NotificationCard
                key={notification._id}
                notification={notification}
                onDelete={handleDeleteNotification}  // Pasar la función para eliminar
              />
            ))}
          </View>
        )}

        {/* Sección de "Ayer" */}
        {yesterday.length > 0 && (
          <View>
            <Text style={styles.sectionHeader}>Ayer</Text>
            {yesterday.map((notification) => (
              <NotificationCard
                key={notification._id}
                notification={notification}
                onDelete={handleDeleteNotification}
              />
            ))}
          </View>
        )}

        {/* Sección de "Últimos 7 días" */}
        {last7Days.length > 0 && (
          <View>
            <Text style={styles.sectionHeader}>Últimos 7 días</Text>
            {last7Days.map((notification) => (
              <NotificationCard
                key={notification._id}
                notification={notification}
                onDelete={handleDeleteNotification}
              />
            ))}
          </View>
        )}

        {/* Sección de "Últimos 30 días" */}
        {last30Days.length > 0 && (
          <View>
            <Text style={styles.sectionHeader}>Últimos 30 días</Text>
            {last30Days.map((notification) => (
              <NotificationCard
                key={notification._id}
                notification={notification}
                onDelete={handleDeleteNotification}
              />
            ))}
          </View>
        )}
      </ScrollView>
    </View>
  );
};

// Componente de tarjeta de notificación individual
const NotificationCard = ({ notification, onDelete }) => (
  <TouchableOpacity
    style={[
      styles.notificationCard,
      notification.leido ? styles.readNotification : styles.unreadNotification
    ]}
  >
    {/* Icono principal de la notificación */}
    <Icon name="bell" size={24} color={notification.leido ? '#AAA' : '#619537'} style={styles.notificationIcon} />

    {/* Contenido de la notificación */}
    <View style={styles.notificationTextContainer}>
      <View style={styles.titleRow}>
        <Text style={styles.notificationTitle}>{notification.mensaje}</Text>
        {!notification.leido && <View style={styles.unreadDot} />}
      </View>
      <View style={styles.timeContainer}>
        <Icon name="clock-o" size={12} color="#AAA" style={styles.clockIcon} />
        <Text style={styles.notificationTime}>{moment(notification.fecha).fromNow()}</Text>
      </View>
    </View>

    {/* Botón de eliminación */}
    <TouchableOpacity onPress={() => onDelete(notification._id)}>
      <Icon name="trash" size={20} color="#619537" />
    </TouchableOpacity>
  </TouchableOpacity>
);

export default NotificationsScreen;
