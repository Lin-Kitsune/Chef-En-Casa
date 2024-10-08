import React from 'react';
import { View, Text, TouchableOpacity, Image, FlatList } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import styles from './ReposteriaStyles';

const data = [
  {
    id: '1',
    title: 'Pie de Limon',
    rating: 4.5,
    reviews: 12,
    time: '25 minutos',
    servings: 2,  
    image: require('../../assets/images/piedelimon.png'),
    ingredients: [
      '200g de galletas molidas (galletas de vainilla o María)',
      '100g de mantequilla derretida',
      '1 lata de leche condensada',
      '3 yemas de huevo',
      '1/2 taza de jugo de limón',
      '3 claras de huevo (para el merengue)',
      '100g de azúcar (para el merengue)'
    ],
    instructions: [
      'Mezclar las galletas molidas con la mantequilla derretida y presionar la mezcla en el fondo de un molde para formar la base.',
      'En un bol, mezclar la leche condensada con las yemas de huevo y el jugo de limón.',
      'Verter la mezcla sobre la base de galleta.',
      'Batir las claras de huevo con el azúcar hasta obtener un merengue firme y cubrir la mezcla de limón.',
      'Hornear a 180°C durante 10 minutos o hasta que el merengue esté dorado.',
      'Enfriar antes de servir.'
    ]
  },
  {
    id: '2',
    title: 'Calzones Rotos',
    rating: 5,
    reviews: 9,
    time: '15 minutos',
    servings: 1,
    image: require('../../assets/images/calzonesrotos.png'),
    ingredients: [
      '400g de harina',
      '2 cucharaditas de polvo de hornear',
      '2 huevos',
      '50g de mantequilla derretida',
      '100g de azúcar',
      '1 cucharadita de ralladura de limón',
      'Aceite para freír',
      'Azúcar flor para espolvorear'
    ],
    instructions: [
      'En un bol, mezclar la harina, el polvo de hornear, el azúcar y la ralladura de limón.',
      'Añadir los huevos y la mantequilla derretida, y amasar hasta obtener una masa suave.',
      'Estirar la masa y cortar rectángulos. Haz un pequeño corte en el centro de cada rectángulo y pasa una esquina por el corte para darles forma.',
      'Freír los calzones rotos en aceite caliente hasta que estén dorados.',
      'Escurrir en papel absorbente y espolvorear con azúcar flor.',
    ]
  },
  {
    id: '3',
    title: 'Brazo de reina',
    rating: 5,
    reviews: 9,
    time: '20 minutos',
    servings: 1,
    image: require('../../assets/images/brazodereina.png'),
    ingredients: [
      '6 huevos',
      '180g de azúcar',
      '120g de harina',
      '1 cucharadita de esencia de vainilla',
      '300g de dulce de leche (manjar)',
      'Azúcar flor para espolvorear'
    ],
    instructions: [
      'Batir los huevos con el azúcar hasta que la mezcla triplique su volumen.',
      'Incorporar la harina tamizada y la vainilla, mezclando suavemente con una espátula.',
      'Verter la mezcla en una bandeja para horno forrada con papel mantequilla.',
      'Hornear a 180°C durante 10-12 minutos o hasta que esté dorado.',
      'Voltear el bizcocho sobre un paño húmedo y retirar el papel.',
      'Untar el dulce de leche sobre el bizcocho y enrollarlo con cuidado.',
      'Espolvorear con azúcar flor antes de servir.'
    ]
  },
  {
    id: '4',
    title: 'Kuchen de Manzana',
    rating: 5,
    reviews: 9,
    time: '45 minutos',
    servings: 1,
    image: require('../../assets/images/kuchendemanzana.png'),
    ingredients: [
      '200g de harina',
      '100g de mantequilla fría',
      '2 cucharadas de azúcar',
      '1 huevo',
      '4 manzanas peladas y cortadas en rodajas',
      '1 taza de azúcar',
      '1 cucharadita de canela en polvo'
    ],
    instructions: [
      'Mezclar la harina con el azúcar y la mantequilla fría cortada en cubos hasta obtener una mezcla arenosa.',
      'Añadir el huevo y amasar hasta formar una masa. Dejar reposar 30 minutos en el refrigerador.',
      'Estirar la masa y colocarla en un molde para tarta.',
      'Colocar las rodajas de manzana sobre la masa.',
      'Espolvorear el azúcar y la canela sobre las manzanas.',
      'Hornear a 180°C durante 35-40 minutos o hasta que la masa esté dorada y las manzanas tiernas.'
    ]
  },
  // Agregar más platos aquí
];

const ReposteriaScreen = ({ navigation }) => {
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

export default ReposteriaScreen;

