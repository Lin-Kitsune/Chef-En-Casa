import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    paddingHorizontal: 10,
    paddingTop: 20,
  },
  sortButton: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#619537',
    paddingVertical: 2, 
    paddingHorizontal: 15, 
    borderRadius: 5,
    marginTop: 0,  
    marginBottom: 5,
    alignSelf: 'flex-end',  
},
sortButtonText: {
    color: '#fff',
    fontSize: 14, 
    marginRight: 5,
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
});

export default styles;
