// screens/NotificationsScreen/NotificationsScreenStyles.js
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9F9F9',
    padding: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#619537',
    marginBottom: 10,
    textAlign: 'center',
  },
  notificationList: {
    marginTop: 10,
  },
  notificationCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    padding: 15,
    marginBottom: 10,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 3,
  },
  notificationIcon: {
    marginRight: 15, // Espacio entre el ícono y el texto
  },
  notificationTextContainer: {
    flex: 1,
    flexDirection: 'column',
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  unreadDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#619537',
    marginLeft: 8,
  },
  notificationTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    flex: 1,
  },
  notificationDescription: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  },
  notificationTime: {
    fontSize: 12,
    color: '#AAA',
    marginTop: 4,
  },
  readNotification: {
    backgroundColor: '#F0F0F0',
  },
  unreadNotification: {
    backgroundColor: '#FFFFFF',
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyStateText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 10,
  },
  emptyStateSubText: {
    fontSize: 14,
    color: '#AAA',
  },
});

export default styles;
