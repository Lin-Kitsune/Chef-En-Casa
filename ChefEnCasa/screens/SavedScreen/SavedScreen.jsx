import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Image, FlatList, Alert, ActivityIndicator, Linking } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import styles from './SavedScreenStyles';
import { getSavedRecipes, deleteSavedRecipe } from '../../services/recipes';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { shareRecipe } from '../../services/share';

const SavedRecipesScreen = () => {
  const [savedRecipes, setSavedRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();

  // Función para cargar recetas guardadas
  const fetchSavedRecipes = async () => {
    try {
      setLoading(true);
      const data = await getSavedRecipes();
      setSavedRecipes(data.recetas);
    } catch (error) {
      Alert.alert('Error', 'No se pudo cargar las recetas guardadas');
    } finally {
      setLoading(false);
    }
  };

  // Función para eliminar una receta guardada
  const handleDeleteRecipe = async (recipeId) => {
    try {
      await deleteSavedRecipe(recipeId);
      Alert.alert('Éxito', 'La receta ha sido eliminada de tus guardados');
      fetchSavedRecipes();  // Recargar recetas después de eliminar una
    } catch (error) {
      Alert.alert('Error', 'No se pudo eliminar la receta');
    }
  };

  // Función para compartir la receta
  const handleShareRecipe = async (recipeId) => {
    try {
      const link = await shareRecipe(recipeId);  // Llamar a la función de compartir en el servicio
      Linking.openURL(link);  // Abrir WhatsApp o el navegador con el enlace generado
    } catch (error) {
      Alert.alert('Error', 'No se pudo generar el enlace para compartir la receta');
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      fetchSavedRecipes();
    }, [])
  );

  const renderRecipeItem = ({ item }) => (
    <View style={styles.recipeContainer}>
      <Image source={{ uri: item.receta.image || 'default_image_url' }} style={styles.recipeImage} />
      <View style={styles.recipeInfo}>
        <Text style={styles.recipeTitle}>{item.receta.title}</Text>
        <View style={styles.recipeDetails}>
          <Text style={styles.recipeServings}>
            🍽 {item.receta.servings || 'N/A'} personas
          </Text>
          <Text style={styles.recipeTime}>
            ⏱ {item.receta.readyInMinutes || 'N/A'} minutos
          </Text>
        </View>
        <View style={styles.buttonContainer}>

          <TouchableOpacity 
            style={styles.recipeButton} 
            onPress={() => {
              console.log("Navigating to RecipeDetail with recipeId:", item.receta.recipeId);
              navigation.navigate('RecipeDetail', { recipeId: item.receta.recipeId });
            }}
          >
            <Text style={styles.buttonText}>Comenzar</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.shareButton} onPress={() => handleShareRecipe(item.receta.recipeId)}>
            <Icon name="share-alt" size={20} color="#619537" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.deleteButton} onPress={() => handleDeleteRecipe(item.receta.recipeId)}>
            <Icon name="trash" size={20} color="#619537" />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#619537" />
        <Text>Cargando recetas guardadas...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={savedRecipes}
        renderItem={renderRecipeItem}
        keyExtractor={(item) => item.receta.recipeId.toString()}
        style={styles.recipeList}
      />
    </View>
  );
};

export default SavedRecipesScreen;
