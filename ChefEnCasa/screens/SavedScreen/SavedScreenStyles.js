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
    width: 90,  // Aumenta el tamaño de la imagen
    height: 90, // Aumenta el tamaño de la imagen
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
    alignItems: 'center',  // Alinea verticalmente los elementos
    marginTop: 10,         // Añade espacio arriba del contenedor
  },
  recipeButton: {
    backgroundColor: '#619537',
    paddingVertical: 5,
    paddingHorizontal: 15,
    borderRadius: 5,
    marginRight: 10,       // Añade espacio entre el botón y la papelera
  },
  recipeButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  deleteButton: {
    paddingHorizontal: 10, // Ajuste de padding para un mejor tamaño
  },
});

export default styles;
