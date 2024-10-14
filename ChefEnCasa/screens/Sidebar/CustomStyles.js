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
    width: 70,  // Ajusta el tamaño del icono según lo necesario
    height: 70,
    marginRight: 3,  // Espacio entre el icono y el texto
  },
  logoText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#619537', // Color verde para el texto
  },
  divider: {
    height: 1,
    backgroundColor: '#E0E0E0',  // Línea de separación debajo del logo
    marginVertical: 5,
  },
  drawerItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 3,
    borderRadius: 8,
  },
  drawerText: {
    fontSize: 16,
    color: '#888', // Texto gris por defecto
    paddingHorizontal: 10,
  },
  activeItem: {
    backgroundColor: '#E8F5E9', // Fondo verde claro para el item activo
  },
  activeText: {
    color: '#619537', // Texto verde para el item activo
  },
  contentContainer: {
    flexGrow: 1,  // Esto permite que el contenido crezca y empuje el botón de cerrar sesión hacia abajo
  },
  logoutContainer: {
    borderTopColor: '#E0E0E0',
    paddingTop: 570,
  },
  logout: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
  },
});

export default styles;
