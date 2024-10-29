import React, { useState } from 'react';
import { View, Text, TouchableOpacity, FlatList, Image, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import styles from './TendenciaScreenStyle'; 

const tendenciaData = [
  { id: '1', title: 'Sushi', rating: 4.8, reviews: 50, time: '15 minutos', servings: 2, image: require('../../assets/images/sushi.png'), ingredients: ['Arroz', 'Pescado', 'Alga'] },
  { id: '2', title: 'Smoothie', rating: 4.9, reviews: 45, time: '5 minutos', servings: 4, image: require('../../assets/images/smoothie.jpg'), ingredients: ['Frutilla', 'Arandano'] },
  { id: '3', title: 'Tacos', rating: 4.7, reviews: 80, time: '30 minutos', servings: 3, image: require('../../assets/images/tacos.jpg'), ingredients: ['Tortillas', 'Carne', 'Cebolla'] },
  // Agregar más recetas
];

// Simular ingredientes en el almacén del usuario
const ingredientesEnAlmacen = ['Harina', 'Tomate'];  // El usuario tiene estos ingredientes

const TendenciaScreen = ({ navigation }) => {
  const [data, setData] = useState(tendenciaData);
  const [isAscending, setIsAscending] = useState(true);

  const sortData = () => {
    const sortedData = [...data].sort((a, b) => {
      return isAscending ? a.rating - b.rating : b.rating - a.rating;
    });
    setIsAscending(!isAscending);
    setData(sortedData);
  };

  const verificarIngredientes = (receta) => {
    // Verificar los ingredientes faltantes
    const ingredientesFaltantes = receta.ingredients.filter(ingrediente => !ingredientesEnAlmacen.includes(ingrediente));

    if (ingredientesFaltantes.length > 0) {
      Alert.alert("Faltan Ingredientes", `Te faltan estos ingredientes: ${ingredientesFaltantes.join(', ')}`);
    } else {
      // Si tiene todos los ingredientes, navegar a la receta
      navigation.navigate('Recipe', {
        title: receta.title,
        image: receta.image,
        ingredients: receta.ingredients,
        instructions: receta.instructions,
      });
    }
  };

  const renderItem = ({ item }) => (
    <View style={styles.recipeContainer}>
      <Image source={item.image} style={styles.recipeImage} />
      <View style={styles.recipeInfo}>
        <Text style={styles.recipeTitle}>{item.title}</Text>
        <View style={styles.recipeDetails}>
          <Text style={styles.recipeRating}>⭐ {item.rating} ({item.reviews} reseñas)</Text>
          <Text style={styles.recipeTime}>⏱ {item.time}</Text>
          <Text style={styles.recipeServings}><Icon name="cutlery" size={14} color="#888" /> {item.servings}</Text>
        </View>
        {/* Botón de comenzar */}
        <TouchableOpacity style={styles.recipeButton} onPress={() => verificarIngredientes(item)}>
          <Text style={styles.recipeButtonText}>Comenzar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Botón para ordenar */}
      <TouchableOpacity style={styles.sortButton} onPress={sortData}>
        <Text style={styles.sortButtonText}>
          {isAscending ? 'Ordenar: Descendente' : 'Ordenar: Ascendente'}
        </Text>
        <Icon name={isAscending ? 'arrow-down' : 'arrow-up'} size={16} color="#fff" />
      </TouchableOpacity>

      {/* Lista de recetas */}
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
};

export default TendenciaScreen;
