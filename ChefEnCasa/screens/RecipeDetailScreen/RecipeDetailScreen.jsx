import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useState, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity, Alert, ScrollView, ActivityIndicator } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import axios from 'axios';
import styles from './RecipeDetailScreenStyles';
//import { prepareRecipe } from './recipes';

const RecipeDetailScreen = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const { recipeId } = route.params;
  const [recipe, setRecipe] = useState(null);
  const [preparing, setPreparing] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRecipeDetails = async () => {
      try {
        const token = await AsyncStorage.getItem('userToken');
        console.log('Token:', token); // Verificar que el token se obtiene correctamente
        const response = await axios.get(`http://10.0.2.2:4000/receta/${recipeId}`, { // Asegúrate de que la URL es correcta
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        console.log('Respuesta de /receta/:id:', response.data); // Verificar la respuesta
        setRecipe(response.data);
      } catch (error) {
        console.error('Error al obtener la receta:', error);
        Alert.alert('Error', 'No se pudo obtener la receta.');
      } finally {
        setLoading(false);
      }
    };

    fetchRecipeDetails();
  }, [recipeId]);

  const handlePrepareRecipe = async () => {
    setPreparing(true);
    try {
      const token = await AsyncStorage.getItem('userToken');
      console.log('Token para preparar:', token);
      
      const response = await axios.post(
        `http://10.0.2.2:4000/preparar-receta-spoonacular`,
        { recipeId },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
  
      if (response.data.compraNecesaria) {
        Alert.alert(
          'Ingredientes insuficientes',
          'No tienes los ingredientes necesarios. Se ha generado una lista de compras.'
        );
      } else {
        Alert.alert(
          'Éxito',
          'La receta ha sido preparada y los ingredientes han sido descontados.'
        );
      }
    } catch (error) {
      console.error('Error al preparar la receta:', error);
      Alert.alert('Error', 'No se pudo preparar la receta.');
    } finally {
      setPreparing(false);
    }
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#619537" />
        <Text style={styles.loadingText}>Cargando detalles...</Text>
      </View>
    );
  }

  if (!recipe) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>No se pudo cargar la receta.</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 120 }}>
  <Image source={{ uri: recipe.image }} style={styles.recipeImage} />
  <Text style={styles.recipeTitle}>{recipe.title}</Text>
  <Text style={styles.recipeInfo}>🍽️ {recipe.servings || 'No disponible'} personas ⏱️ {recipe.readyInMinutes || 'No disponible'} minutos</Text>
  <Text style={styles.sectionTitle}>Ingredientes</Text>
  {recipe.ingredients.map((ingredient, index) => (
    <Text key={index} style={styles.ingredientText}>{ingredient.original}</Text>
  ))}
  <Text style={styles.sectionTitle}>Instrucciones</Text>
  <Text style={styles.instructionsText}>{recipe.instructions}</Text>

  <TouchableOpacity style={styles.prepareButton} onPress={handlePrepareRecipe} disabled={preparing}>
    <Text style={styles.buttonText}>{preparing ? 'Preparando...' : 'Preparar Receta'}</Text>
  </TouchableOpacity>
</ScrollView>
  );
};

export default RecipeDetailScreen;