// RecipeScreenStyles.js
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  scrollViewContent: {
    flexGrow: 1,
  },
  imageContainer: {
    position: 'relative',
    width: '100%',
  },
  recipeImage: {
    width: '100%',
    height: 300,
    resizeMode: 'cover',
  },
  backButton: {
    position: 'absolute',
    top: 20,
    left: 20,
    backgroundColor: '#619537',
    padding: 10,
    borderRadius: 30,
    elevation: 5,
  },
  favoriteButton: {
    position: 'absolute',
    top: 260,  // Ajusta este valor para que esté más abajo
    right: 20,
    backgroundColor: '#fff',
    padding: 8,
    borderRadius: 30,
    elevation: 5,
    zIndex: 10,  // Asegura que el botón esté en el frente
  },
  overlayContainer: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    marginTop: -30,
    paddingHorizontal: 20,
    paddingVertical: 20,
    elevation: 5,
  },
  recipeTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 10,
    color: '#333',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 10,
    color: '#619537',
  },
  ingredientItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  checkIcon: {
    marginRight: 10,
  },
  ingredientText: {
    fontSize: 16,
    color: '#333',
  },
  ingredientChecked: {
    fontSize: 16,
    color: '#619537',
    textDecorationLine: 'line-through',
  },
  instructionItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 15,
  },
  instructionNumber: {
    width: 30,
    height: 30,
    backgroundColor: '#619537',
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  instructionNumberText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  instructionsText: {
    fontSize: 16,
    color: '#333',
    lineHeight: 24,
    flex: 1,  // Para ocupar el resto del espacio disponible
  },
  shareButton: {
    position: 'absolute',
    top: 15,
    right: 15,
    backgroundColor: '#619537',  
    padding: 10,
    borderRadius: 100,
    elevation: 5,  // Sombra para dar un efecto de botón flotante
  },
});

export default styles;
