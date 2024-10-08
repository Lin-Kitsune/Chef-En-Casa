import React from 'react';
import { View, Text, TouchableOpacity, Image, FlatList } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import styles from './CenaStyles';

const data = [
  {
    id: '1',
    title: 'Completos',
    rating: 4.5,
    reviews: 12,
    time: '5 minutos',
    servings: 2,  
    image: require('../../assets/images/completos.png'),
    ingredients: [
      '4 salchichas',
      '4 panes para hot dog',
      '1 tomate picado en cubos',
      '1 palta triturada',
      'Mayonesa al gusto',
      'Mostaza y ketchup (opcional)',
    ],
    instructions: [
      'Cocinar las salchichas en agua hirviendo durante 5 minutos.',
      'Cortar los panes de hot dog y calentarlos ligeramente en el horno o sartén.',
      'Colocar una salchicha dentro de cada pan.',
      'Añadir el tomate picado y la palta triturada encima.',
      'Agregar mayonesa, mostaza y ketchup al gusto.',
      'Servir inmediatamente.'
    ]
  },
  {
    id: '2',
    title: 'Sopaipillas',
    rating: 5,
    reviews: 9,
    time: '10 minutos',
    servings: 1,
    image: require('../../assets/images/sopaipillas.png'),
    ingredients: [
      '500g de harina',
      '250g de zapallo cocido y triturado',
      '1 cucharadita de sal',
      '1 cucharadita de polvo de hornear',
      '50g de manteca o mantequilla derretida',
      'Aceite para freír',
    ],
    instructions: [
      'En un bol, mezclar la harina, la sal y el polvo de hornear.',
      'Añadir el zapallo cocido y triturado a la mezcla de harina.',
      'Incorporar la manteca derretida y amasar hasta formar una masa suave.',
      'Estirar la masa y cortar en círculos.',
      'Freír las sopaipillas en abundante aceite caliente hasta que estén doradas.',
      'Escurrir el exceso de aceite en papel absorbente y servir calientes.'
    ]
  },
  {
    id: '3',
    title: 'Pan Amasado',
    rating: 5,
    reviews: 9,
    time: '1:30 minutos',
    servings: 1,
    image: require('../../assets/images/panamasado.png'),
    ingredients: [
      '500g de harina',
      '250ml de agua tibia',
      '10g de levadura fresca',
      '1 cucharadita de sal',
      '100g de manteca o mantequilla derretida',
    ],
    instructions: [
      'Disolver la levadura en el agua tibia.',
      'En un bol, mezclar la harina y la sal. Añadir la levadura disuelta y la manteca derretida.',
      'Amasar la mezcla hasta formar una masa suave y homogénea.',
      'Dejar reposar la masa tapada durante 30 minutos.',
      'Formar pequeños bollos con la masa y aplanarlos.',
      'Hornear en el horno precalentado a 180°C durante 20-25 minutos o hasta que estén dorados.'
    ]
  },
  {
    id: '4',
    title: 'Pizza',
    rating: 5,
    reviews: 9,
    time: '20 minutos',
    servings: 1,
    image: require('../../assets/images/pizza.png'),
    ingredients: [
      '300g de harina',
      '1 cucharadita de levadura seca',
      '150ml de agua tibia',
      '2 cucharadas de aceite de oliva',
      '1 taza de salsa de tomate',
      '200g de queso mozzarella rallado',
      'Ingredientes al gusto: jamón, pepperoni, champiñones, pimientos, etc.'
    ],
    instructions: [
      'Disolver la levadura en el agua tibia.',
      'En un bol, mezclar la harina con la sal. Añadir la levadura disuelta y el aceite de oliva.',
      'Amasar hasta obtener una masa suave y dejar reposar durante 1 hora.',
      'Estirar la masa sobre una superficie enharinada.',
      'Cubrir la masa con la salsa de tomate, el queso y los ingredientes al gusto.',
      'Hornear a 220°C durante 15-20 minutos o hasta que la pizza esté dorada y crujiente.'
    ]
  },
  // Agregar más platos aquí
];

const CenaScreen = ({ navigation }) => {
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

export default CenaScreen;

