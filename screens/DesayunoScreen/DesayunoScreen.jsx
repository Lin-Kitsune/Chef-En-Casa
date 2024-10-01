import React from 'react';
import { View, Text, TouchableOpacity, Image, FlatList } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import styles from './DesayunoScreenStyles';  

const data = [
  {
    id: '1',
    title: 'Bol con Fruta',
    rating: 4.5,
    reviews: 12,
    time: '5 minutos',
    servings: 2,  
    image: require('../../assets/images/bol-fruta.jpg'),
  },
  {
    id: '2',
    title: 'Smoothie Bowl',
    rating: 5,
    reviews: 9,
    time: '5 minutos',
    servings: 1,
    image: require('../../assets/images/smoothie-bowl.jpg'),
  },
  {
    id: '3',
    title: 'Tostadas de Tomate y Mozzarella',
    rating: 4.5,
    reviews: 15,
    time: '5 minutos',
    servings: 2,
    image: require('../../assets/images/tostadas-tomate.jpg'),
  },
  {
    id: '4',
    title: 'Omelet',
    rating: 5,
    reviews: 7,
    time: '5 minutos',
    servings: 1,
    image: require('../../assets/images/omelet.jpg'),
  },
];

const DesayunoScreen = ({ navigation }) => {
  const renderItem = ({ item }) => (
    <View style={styles.recipeContainer}>
      <Image source={item.image} style={styles.recipeImage} />
      <View style={styles.recipeInfo}>
        <Text style={styles.recipeTitle}>{item.title}</Text>
        <View style={styles.recipeDetails}>
          <Text style={styles.recipeRating}>
            ⭐ {item.rating} ({item.reviews} reseñas)
          </Text>
          {/* Ícono de tenedor con número de porciones */}
          <Text style={styles.recipeServings}>
            <Icon name="cutlery" size={14} color="#888" /> {item.servings}
          </Text>
          <Text style={styles.recipeTime}>⏱ {item.time}</Text>
        </View>

        {/* Botón para comenzar y navegar a RecipeScreen */}
        <TouchableOpacity 
          style={styles.recipeButton}
          onPress={() => navigation.navigate('Recipe', {
            title: item.title,
            image: item.image,
            ingredients: [
              '1 Mango',
              '1 Plátano',
              '150g Yogur natural',
              '2 Fresas',
              '4 Arándanos',
              '1/2 cdt Cúrcuma molida',
              'Ralladura limón',
            ], // Ejemplo de ingredientes
            instructions: [
              'Cortar y pelar el mango para sacar la pulpa.',
              'Mezclar las frutas en un bol con el yogur.',
              'Servir inmediatamente.',
            ],  // Aquí el array de instrucciones
          })}>
          <Text style={styles.recipeButtonText}>Comenzar</Text>
        </TouchableOpacity>


      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Lista de recetas */}
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        style={styles.list}
      />
    </View>
  );
};

export default DesayunoScreen;
