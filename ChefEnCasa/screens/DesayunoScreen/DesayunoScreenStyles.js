import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  list: {
    paddingHorizontal: 20,
  },
  recipeContainer: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
    elevation: 3,
  },
  recipeImage: {
    width: 90,  
    height: 90, 
    borderRadius: 10,
  },
  recipeInfo: {
    flex: 1,
    marginLeft: 15,
  },
  recipeTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  recipeDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  recipeRating: {
    fontSize: 14,
    color: '#888',
  },
  recipeServings: {
    fontSize: 14,
    color: '#888',
  },
  recipeTime: {
    fontSize: 14,
    color: '#888',
  },
  recipeButton: {
    marginTop: 10,
    backgroundColor: '#619537',
    paddingVertical: 5,
    paddingHorizontal: 15,
    borderRadius: 5,
    alignSelf: 'center', 
  },
  recipeButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  // Filtro
  filterContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    padding: 10,
    marginRight: 10,
  },
  filterButton: {
    padding: 10,
    backgroundColor: '#619537',
    borderRadius: 5,
    flexDirection: 'row',  // Asegura que el icono y texto estén en la misma línea
    alignItems: 'center',  // Centra verticalmente el texto y el ícono
  },
  iconAndText: {
    flexDirection: 'row',  // Para alinear el icono y texto horizontalmente
    alignItems: 'center',  // Centra verticalmente
  },
  filterIcon: {
    marginRight: 5,  // Espacio entre el ícono y el texto
  },
  filterButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: '#fff',
    padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  filterSubtitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginVertical: 10,
  },
  optionsContainer: {
    marginBottom: 10,
  },
  filterOption: {
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#619537',
    marginBottom: 5,
    textAlign: 'center',
  },
  selectedOption: {
    backgroundColor: '#619537',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 10,
    marginBottom: 5,
    textAlign: 'center',
  },
  selectedText: {
    color: '#fff',
    textAlign: 'center',
  },
  optionText: {
    color: '#619537',
    textAlign: 'center',
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  applyButton: {
    backgroundColor: '#619537',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
  },
  applyButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  cancelButton: {
    backgroundColor: '#ccc',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
  },
  cancelButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  selector: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#619537',
    marginBottom: 10,
  },
  selectorText: {
    fontSize: 16,
    color: '#619537',
  },
});

export default styles;
