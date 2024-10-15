import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  header: {
    marginBottom: 20,
  },
  logoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  appIcon: {
    width: 70,
    height: 70,
    marginRight: 3,
  },
  logoText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#619537',
  },
  divider: {
    height: 1,
    backgroundColor: '#E0E0E0',
    marginVertical: 5,
  },
  drawerItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderRadius: 8,
    marginBottom: 10, // Para darle más separación entre elementos
  },
  drawerText: {
    fontSize: 16,
    color: '#888',
    paddingHorizontal: 10,
  },
  activeItem: {
    backgroundColor: '#619537',  // Verde más oscuro cuando está activo
    borderRadius: 8,
  },
  activeText: {
    color: '#FFF',  // Blanco para el texto activo
  },  
  contentContainer: {
    flexGrow: 1,
  },
  logoutContainer: {
    borderTopColor: '#E0E0E0',
    paddingTop: 560,
  },
  logout: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
  },
});

export default styles;
