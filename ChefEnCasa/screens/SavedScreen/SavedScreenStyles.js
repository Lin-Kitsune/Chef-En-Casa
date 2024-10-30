import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    paddingHorizontal: 20,
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
  recipeList: {
    marginTop: 10,
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
    marginLeft: 10,
  },
  recipeTime: {
    fontSize: 14,
    color: '#888',
    marginLeft: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  recipeButton: {
    backgroundColor: '#619537',  // Asegúrate de usar un color que no parezca deshabilitado
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 5,
    alignItems: 'center',
  },
  recipeButtonText: {
    color: '#fff',  // Asegúrate de que el texto sea visible sobre el color de fondo
    fontWeight: 'bold',
  },
  deleteButton: {
    paddingHorizontal: 10,
  },
  shareButton: {
    paddingHorizontal: 10, // Ajuste de padding para un tamaño similar al botón de borrar
  },
  
});

export default styles;
