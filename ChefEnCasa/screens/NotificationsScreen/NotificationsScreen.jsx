// screens/NotificationsScreen/NotificationsScreen.jsx
import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import styles from './NotificationsScreenStyles';

const NotificationsScreen = () => {
  const [notifications, setNotifications] = useState([
    { id: 1, icon: 'bell', title: 'Actualización de recetas', description: 'Se ha actualizado la receta de pollo.', time: '23 min ago', read: false },
    { id: 2, icon: 'leaf', title: 'Nuevo ingrediente', description: 'El ingrediente "Quinoa" ha sido añadido.', time: '1 day ago', read: false },
    { id: 3, icon: 'heartbeat', title: 'Recordatorio mensual', description: 'Por favor, ingresa tu peso y altura.', time: '2 days ago', read: false },
    { id: 4, icon: 'cutlery', title: 'Nueva receta añadida', description: 'Prueba la nueva receta de "Pasta al pesto".', time: '3 days ago', read: false },
    { id: 5, icon: 'calendar', title: 'Evento programado', description: 'Clase de cocina vegetariana el sábado.', time: '4 days ago', read: false },
    { id: 6, icon: 'exclamation-circle', title: 'Alerta de stock', description: 'El ingrediente "Aguacate" está agotado.', time: '5 days ago', read: false },
    { id: 7, icon: 'trophy', title: 'Meta alcanzada', description: '¡Has completado tu meta semanal de recetas!', time: '1 week ago', read: true },
    { id: 8, icon: 'shopping-cart', title: 'Actualización en tu lista de compras', description: 'El ingrediente "Leche de almendra" ha sido añadido a tu lista.', time: '2 weeks ago', read: true },
  ]);

  return (
    <View style={styles.container}>
      {notifications.length > 0 ? (
        <ScrollView style={styles.notificationList} contentContainerStyle={{ paddingBottom: 45 }}>
          {notifications.map((notification) => (
            <TouchableOpacity
              key={notification.id}
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
              {/* Icono de la notificación */}
              <Icon name={notification.icon} size={24} color={notification.read ? '#AAA' : '#619537'} style={styles.notificationIcon} />

              {/* Contenido de la notificación */}
              <View style={styles.notificationTextContainer}>
                <View style={styles.titleRow}>
                  <Text style={styles.notificationTitle}>{notification.title}</Text>
                  {!notification.read && <View style={styles.unreadDot} />}
                </View>
                <Text style={styles.notificationDescription}>{notification.description}</Text>
                <Text style={styles.notificationTime}>{notification.time}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>
      ) : (
        <View style={styles.emptyState}>
          <Icon name="bell-slash" size={64} color="#619537" />
          <Text style={styles.emptyStateText}>Estás al día</Text>
          <Text style={styles.emptyStateSubText}>No tienes notificaciones por el momento.</Text>
        </View>
      )}
    </View>
  );
};

export default NotificationsScreen;
