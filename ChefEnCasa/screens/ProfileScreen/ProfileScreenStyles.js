import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  header: {
    backgroundColor: '#619537',
    paddingVertical: 15,
    paddingHorizontal: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerTitle: {
    flex: 1,
    textAlign: 'center',
    fontSize: 18,
    color: '#fff',
    fontWeight: 'bold',
  },
  profileInfoContainer: {
    alignItems: 'center',
    marginVertical: 20,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 10,
  },
  profileName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  editButton: {
    flexDirection: 'row',
    backgroundColor: '#619537',
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 20,
    marginTop: 10,
    alignItems: 'center',
  },
  editButtonText: {
    marginLeft: 5,
    color: '#fff',
    fontWeight: 'bold',
  },
  recentRecipesTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#619537',
    marginHorizontal: 20,
    marginBottom: 10,
  },
  recentRecipesList: {
    paddingHorizontal: 20,
  },
  recipeContainer: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    elevation: 3,
  },
  recipeImage: {
    width: 70,
    height: 70,
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
    alignSelf: 'center', // Centra el botón horizontalmente
  },
  recipeButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  // Filtros
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
    paddingHorizontal: 20,  // Espacio entre los lados de la pantalla
  },
  iconAndText: {
    flexDirection: 'row',   // Alinea el icono y el texto horizontalmente
    alignItems: 'center',   // Centra el contenido verticalmente
  },
  icon: {
    marginRight: 10,        // Espacio entre el icono y el texto
  },
  allergyButton: {
    backgroundColor: '#619537',
    padding: 15,
    borderRadius: 10,
    flex: 1,                // Hace que el botón ocupe el mismo espacio que el otro
    marginRight: 10,        // Espacio entre los botones
    alignItems: 'center',   // Centra el contenido dentro del botón
  },
  allergyButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  healthButton: {
    backgroundColor: '#619537',
    padding: 15,
    borderRadius: 10,
    flex: 1,                // Hace que el botón ocupe el mismo espacio que el otro
    alignItems: 'center',   // Centra el contenido dentro del botón
  },
  healthButtonText: {
    color: '#fff',
    fontWeight: 'bold',
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
  // ingredientes
  searchInput: {
    width: '100%',
    padding: 10,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    borderRadius: 5,
    marginBottom: 20,
  },
  modalOptionText: {
    fontSize: 14,
    textAlign: 'center',
    color: 'white',
  },
  modalIngredientOption: {
    width: '40%',  
    height: 130,   
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#619537',
    borderRadius: 10,
    marginBottom: 20, 
    marginHorizontal: 10,
  },
  ingredientSelected: {
    borderColor: '#FEB415',
    borderWidth: 3,
  },
  ingredientOption: {
    alignItems: 'center',
    marginBottom: 10,
    marginRight: 10,
  },
  ingredientImage: {
    width: 60,  
    height: 60,
    marginBottom: 5,
  },
  ingredientText: {
    textAlign: 'center',
    fontSize: 14,
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
  pageButtonText: {
    paddingHorizontal: 8,
    paddingVertical: 5,
    color: '#619537',
    fontWeight: 'bold',
  },
  ingredientsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  activePageButton: {
    backgroundColor: '#619537',
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
});
export default styles;
