import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  buttonContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  addButton: {
    flexDirection: 'row',
    backgroundColor: '#619537',
    padding: 15, 
    borderRadius: 30,  
    alignItems: 'center',
    justifyContent: 'center',
    width: 150, 
  },
  deleteButton: {
    flexDirection: 'row',
    backgroundColor: '#f44336',
    padding: 15, 
    borderRadius: 30,  
    alignItems: 'center',
    justifyContent: 'center',
    width: 150, 
  },
  buttonText: {
    color: 'white',
    marginLeft: 10, // Deja espacio entre el ícono y el texto
    fontWeight: 'bold',
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderBottomColor: '#ccc',
    borderBottomWidth: 1,
  },
  checkIcon: {
    marginRight: 10,
  },
  itemText: {
    fontSize: 16,
    color: '#333',
  },
  ingredientChecked: {
    fontSize: 16,
    color: '#619537',
    textDecorationLine: 'line-through',
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
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#619537',
    borderRadius: 10,
    marginBottom: 10,
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
  // Estilos para los botones de paginación
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
    backgroundColor: '#619537', // Cambia el color del botón activo
  },
  pageButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  modalIngredientOption: {
    width: '45%',
    height: 120,  // Aumenta el alto para dar espacio a la imagen y al texto
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#619537',
    borderRadius: 10,
    marginBottom: 10,
  },
  ingredientImage: {
    width: 50,  // Tamaño de la imagen
    height: 50,
    marginBottom: 5,  // Espacio entre la imagen y el texto
  },
  modalOptionText: {
    fontSize: 14,
    textAlign: 'center',
    color: 'white',
  },
});

export default styles;
