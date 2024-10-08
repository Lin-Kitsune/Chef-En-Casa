import React from 'react';
import { View, Text, TouchableOpacity, Image, FlatList } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import styles from './AlmuerzoStyles';

const data = [
  {
    id: '1',
    title: 'Pastel de Choclo',
    rating: 4.5,
    reviews: 12,
    time: '1 hora',
    servings: 2,  
    image: require('../../assets/images/pasteldechoclo.png'),
    ingredients: [
      '500g de choclo molido',
      '2 huevos',
      '1 cebolla',
      '150g de carne molida',
      'Aceite de oliva',
      'Sal y pimienta',
    ],
    instructions: [
      'Precalentar el horno a 180°C.',
      'Freír la cebolla y la carne molida en una sartén.',
      'Añadir el choclo molido a la mezcla y sazonar.',
      'Batir los huevos y mezclar con el choclo.',
      'Verter en un molde y hornear por 30 minutos.',
    ]
  },
  {
    id: '2',
    title: 'Cazuela',
    rating: 5,
    reviews: 9,
    time: '1 hora',
    servings: 1,
    image: require('../../assets/images/cazuela.png'),
    ingredients: [
      '500g de carne de vacuno',
      '1 choclo',
      '2 papas',
      '1 zanahoria',
      '1 litro de agua',
      'Sal y pimienta',
    ],
    instructions: [
      'Cocinar la carne en agua con sal hasta que esté tierna.',
      'Añadir las papas, zanahoria y choclo cortado.',
      'Dejar cocinar hasta que las verduras estén blandas.',
      'Servir con un poco de perejil picado.',
    ]
  },
  {
    id: '3',
    title: 'Humitas',
    rating: 5,
    reviews: 9,
    time: '45 minutos',
    servings: 1,
    image: require('../../assets/images/humitas.png'),
    ingredients: [
      '6 choclos',
      '1 cebolla picada finamente',
      '100g de manteca o mantequilla',
      '150g de queso fresco',
      'Hojas de choclo para envolver',
      'Sal y pimienta al gusto',
    ],
    instructions: [
      'Desgranar las mazorcas y moler los granos de maíz hasta obtener una masa.',
      'Sofreír la cebolla en manteca o mantequilla hasta que esté transparente.',
      'Mezclar la cebolla con la masa de maíz y sazonar con sal y pimienta.',
      'Cortar el queso en pequeños cubos y agregar a la mezcla.',
      'Tomar las hojas de choclo y colocar una porción de la mezcla en cada una.',
      'Envolver las humitas y cocinar al vapor durante 45 minutos.'
    ]
  },
  {
    id: '4',
    title: 'Chorrillana',
    rating: 5,
    reviews: 9,
    time: '30 minutos',
    servings: 1,
    image: require('../../assets/images/chorrillana.png'),
    ingredients: [
      '500g de carne de res (bistec cortado en tiras)',
      '4 papas medianas',
      '2 cebollas cortadas en tiras',
      '3 huevos',
      'Aceite para freír',
      'Sal y pimienta al gusto',
    ],
    instructions: [
      'Pelar y cortar las papas en bastones. Freírlas en aceite caliente hasta que estén doradas.',
      'Mientras tanto, freír la cebolla en otra sartén con un poco de aceite hasta que esté caramelizada.',
      'En la misma sartén, freír la carne de res cortada en tiras hasta que esté dorada y sazonar con sal y pimienta.',
      'Freír los huevos y mantenerlos enteros o romper la yema, según prefieras.',
      'Colocar las papas fritas en un plato grande, añadir la carne y la cebolla encima, y terminar con los huevos fritos sobre la mezcla.',
      'Servir caliente.'
    ]
  },
  // Agregar más platos aquí
];

const AlmuerzoScreen = ({ navigation }) => {
  const renderItem = ({ item }) => (
    <View style={styles.recipeContainer}>
      <Image source={item.image} style={styles.recipeImage} />
      <View style={styles.recipeInfo}>
        <Text style={styles.recipeTitle}>{item.title}</Text>
        <View style={styles.recipeDetails}>
          <Text style={styles.recipeRating}>
            ⭐ {item.rating} ({item.reviews} reseñas)
          </Text>
          <Text style={styles.recipeServings}>
            <Icon name="cutlery" size={14} color="#888" /> {item.servings}
          </Text>
          <Text style={styles.recipeTime}>⏱ {item.time}</Text>
        </View>

        <TouchableOpacity 
          style={styles.recipeButton}
          onPress={() => navigation.navigate('Recipe', {
            title: item.title,
            image: item.image,
            ingredients: item.ingredients,
            instructions: item.instructions,
          })}>
          <Text style={styles.recipeButtonText}>Comenzar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        style={styles.list}
      />
    </View>
  );
};

export default AlmuerzoScreen;

