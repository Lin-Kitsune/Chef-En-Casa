// RecipeDetailStyles.js

import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
    paddingBottom: 80, // Asegura que haya espacio suficiente por encima del navbar
  },
  recipeImage: {
    width: '100%',
    height: 200,
    borderRadius: 10,
    marginBottom: 20,
  },
  recipeTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  recipeInfo: {
    color: '#888',
    textAlign: 'center',
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 10,
    color: '#333',
  },
  ingredientText: {
    fontSize: 16,
    marginVertical: 5,
    color: '#555',
  },
  instructionsText: {
    fontSize: 16,
    marginVertical: 10,
    color: '#555',
  },
  prepareButton: {
    backgroundColor: '#619537',
    padding: 15,
    borderRadius: 5,
    marginTop: 20,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  loadingContainer: {
    flex:1,
    justifyContent:'center',
    alignItems:'center',
  },
  loadingText: {
    marginTop:10,
    fontSize:16,
  },
  errorText: {
    textAlign:'center',
    fontSize:16,
    color:'red',
  },
});

export default styles;