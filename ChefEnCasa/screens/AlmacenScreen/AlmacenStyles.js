import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#f1f1f1',
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  buttonContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  addButton: {
    flexDirection: 'row',
    backgroundColor: '#619537',  // Mismo color verde
    padding: 15, 
    borderRadius: 30,  
    alignItems: 'center',
    justifyContent: 'center',
    width: 150,  // Mismo ancho que en lista de compras
  },
  removeButton: {
    flexDirection: 'row',
    backgroundColor: '#f44336',  // Mismo color rojo
    padding: 15, 
    borderRadius: 30,  
    alignItems: 'center',
    justifyContent: 'center',
    width: 150,  // Mismo ancho que en lista de compras
  },
  buttonText: {
    color: 'white',
    marginLeft: 10, // Deja espacio entre el ícono y el texto
    fontWeight: 'bold',
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
    minWidth: 100,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  text: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#000',
    textAlign: 'center',
    flexWrap: 'wrap',
  },
  quantity: {
    fontSize: 12,
    color: '#000',
    textAlign: 'center',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContent: {
    width: 300,
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#619537',
  },
  modalOptions: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  modalOption: {
    width: '45%',
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#619537',
    borderRadius: 10,
    marginBottom: 10,
  },
  modalIcon: {
    width: 40,
    height: 40,
    marginBottom: 10,
  },
  modalOptionText: {
    fontSize: 14,
    textAlign: 'center',
    color: 'white',
  },
  modalIngredientOption: {
    width: '45%',
    height: 120, 
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#619537',
    borderRadius: 10,
    marginBottom: 10,
  },
  ingredientImage: {
    width: 50,  
    height: 50,
    marginBottom: 5,
  },
  modalCloseButton: {
    backgroundColor: '#619537',
    padding: 10,
    borderRadius: 5,
    width: '100%',
    alignItems: 'center',
  },
  modalCloseButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  searchInput: {
    width: '100%',
    padding: 10,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 20,
  },
  paginationContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 20,
  },
  pageButton: {
    backgroundColor: '#ccc',
    padding: 10,
    marginHorizontal: 5,
    borderRadius: 5,
  },
  activePageButton: {
    backgroundColor: '#619537',
  },
  pageButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  itemSeleccionado: {
    borderColor: 'red', // Resaltar el borde del ítem seleccionado
    borderWidth: 2,
  },
  cantidadButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: 10,
  },
  trashIconContainer: {
    position: 'absolute',
    top: 5,
    right: 5,
  },
});

export default styles;
