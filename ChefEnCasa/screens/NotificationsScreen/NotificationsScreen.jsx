// screens/NotificationsScreen/NotificationsScreen.jsx
import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import moment from 'moment';
import 'moment/locale/es'; // Configura moment para usar español si deseas
import styles from './NotificationsScreenStyles';

const NotificationsScreen = () => {
  // Configura el idioma en español
  moment.locale('es');

  const [notifications, setNotifications] = useState([
    { id: 1, icon: 'bell', title: 'Actualización de recetas', description: 'Se ha actualizado la receta de pollo.', time: moment().subtract(23, 'minutes'), read: false },
    { id: 2, icon: 'leaf', title: 'Nuevo ingrediente', description: 'El ingrediente "Quinoa" ha sido añadido.', time: moment().subtract(1, 'days'), read: false },
    { id: 3, icon: 'heartbeat', title: 'Recordatorio mensual', description: 'Por favor, ingresa tu peso y altura.', time: moment().subtract(2, 'days'), read: false },
    { id: 4, icon: 'cutlery', title: 'Nueva receta añadida', description: 'Prueba la nueva receta de "Pasta al pesto".', time: moment().subtract(3, 'days'), read: false },
    { id: 5, icon: 'exclamation-circle', title: 'Alerta de stock', description: 'El ingrediente "Aguacate" está agotado.', time: moment().subtract(5, 'days'), read: false},
    { id: 6, icon: 'trophy', title: 'Meta alcanzada', description: '¡Has completado tu meta semanal de recetas!', time: moment().subtract(1, 'weeks'), read: true },
    { id: 7, icon: 'shopping-cart', title: 'Actualización en tu lista de compras', description: 'El ingrediente "Leche de almendra" ha sido añadido a tu lista.', time: moment().subtract(2, 'weeks'), read: true },
  ]);

  // Función para categorizar notificaciones
  const categorizeNotifications = () => {
    const today = [];
    const yesterday = [];
    const last7Days = [];
    const last30Days = [];

    notifications.forEach(notification => {
      const diffDays = moment().diff(notification.time, 'days');
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
                key={notification.id}
                notification={notification}
                setNotifications={setNotifications}
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
                key={notification.id}
                notification={notification}
                setNotifications={setNotifications}
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
                key={notification.id}
                notification={notification}
                setNotifications={setNotifications}
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
                key={notification.id}
                notification={notification}
                setNotifications={setNotifications}
              />
            ))}
          </View>
        )}
      </ScrollView>
    </View>
  );
};

// Componente de tarjeta de notificación individual
const NotificationCard = ({ notification, setNotifications }) => (
  <TouchableOpacity
    style={[
      styles.notificationCard,
      notification.read ? styles.readNotification : styles.unreadNotification
    ]}
    onPress={() => {
      setNotifications((prevNotifications) =>
        prevNotifications.map((item) =>
          item.id === notification.id ? { ...item, read: true } : item
        )
      );
    }}
  >
    {/* Icono principal de la notificación */}
    <Icon name={notification.icon} size={24} color={notification.read ? '#AAA' : '#619537'} style={styles.notificationIcon} />

    {/* Contenido de la notificación */}
    <View style={styles.notificationTextContainer}>
      <View style={styles.titleRow}>
        <Text style={styles.notificationTitle}>{notification.title}</Text>
        {!notification.read && <View style={styles.unreadDot} />}
      </View>
      <Text style={styles.notificationDescription}>{notification.description}</Text>
      
      {/* Icono de reloj y tiempo */}
      <View style={styles.timeContainer}>
        <Icon name="clock-o" size={12} color="#AAA" style={styles.clockIcon} />
        <Text style={styles.notificationTime}>{notification.time.fromNow()}</Text>
      </View>
    </View>
  </TouchableOpacity>
);

export default NotificationsScreen;
