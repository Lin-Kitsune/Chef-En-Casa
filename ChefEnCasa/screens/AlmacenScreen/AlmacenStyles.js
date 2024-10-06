import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f1f1f1',
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10,
    backgroundColor: '#FFFFFF', // Fondo blanco detrás de los botones
    marginBottom: 10,
  },
  addButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#8BC34A',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 10,
    marginHorizontal: 10, // Añadimos separación horizontal entre los botones
    flex: 1, // Los botones ocuparán el mismo espacio
  },
  removeButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#8BC34A',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 10,
    marginHorizontal: 10, // Añadimos separación horizontal entre los botones
    flex: 1, // Los botones ocuparán el mismo espacio
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
    marginLeft: 8,
  },
  grid: {
    justifyContent: 'center',
  },
  item: {
    flex: 1,
    margin: 10,
    padding: 15,
    backgroundColor: '#4CAF50', // Fondo verde para la card
    alignItems: 'center',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#388E3C', // Color verde más oscuro para el borde
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 5,
    elevation: 3,
  },
  image: {
    width: 50,
    height: 50,
    marginBottom: 10,
  },
  ovalContainer: {
    backgroundColor: '#FFEB3B', // Fondo amarillo
    borderRadius: 50, // Hace el contenedor ovalado
    paddingVertical: 5,
    paddingHorizontal: 15,
    minWidth: 100, // Aumentamos el ancho mínimo para evitar corte
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  text: {
    fontSize: 14, // Reducimos el tamaño de fuente para evitar corte
    fontWeight: 'bold',
    color: '#000', // Texto en negro para contrastar con el amarillo
    textAlign: 'center',
    flexWrap: 'wrap', // Envoltura de texto para evitar el corte
  },
  quantity: {
    fontSize: 12, // Reducimos el tamaño de fuente para evitar corte
    color: '#000', // Texto de cantidad en negro
    textAlign: 'center', // Centra el texto de la cantidad
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 15,
    backgroundColor: '#4CAF50',
  },
  footerButton: {
    flex: 1,
    alignItems: 'center',
  },
});

export default styles;
