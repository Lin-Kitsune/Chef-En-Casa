import React, { useState } from 'react';
import { View, Text, TouchableOpacity, FlatList, Image, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import styles from './RecomendacionesStyles';

// Datos de recetas
const recomendacionData = [
    { 
      id: '1', 
      title: 'Sushi', 
      rating: 4.8, 
      reviews: 50, 
      time: '15 minutos', 
      servings: 2, 
      image: require('../../assets/images/sushi.png'), 
      ingredients: [
        { name: 'Arroz', amount: 100 }, 
        { name: 'Pescado', amount: 50 }, 
        { name: 'Alga', amount: 10 }
      ] 
    },
    { 
      id: '2', 
      title: 'Ensalada César', 
      rating: 4.6, 
      reviews: 70, 
      time: '5 minutos', 
      servings: 1, 
      image: require('../../assets/images/ensalada.jpg'), 
      ingredients: [
        { name: 'Lechuga', amount: 50 }, 
        { name: 'Pollo', amount: 60 }, 
        { name: 'Crutones', amount: 15 }, 
        { name: 'Queso Parmesano', amount: 10 }
      ] 
    },
    { 
      id: '3', 
      title: 'Pasta al Pesto', 
      rating: 4.5, 
      reviews: 90, 
      time: '20 minutos', 
      servings: 2, 
      image: require('../../assets/images/pasta.jpg'), 
      ingredients: [
        { name: 'Pasta', amount: 100 }, 
        { name: 'Albahaca', amount: 10 }, 
        { name: 'Aceite de Oliva', amount: 20 }, 
        { name: 'Queso Parmesano', amount: 15 }, 
        { name: 'Nueces', amount: 10 }
      ] 
    },
    { 
      id: '4', 
      title: 'Hamburguesa', 
      rating: 4.3, 
      reviews: 150, 
      time: '15 minutos', 
      servings: 1, 
      image: require('../../assets/images/hamburguesa.jpg'), 
      ingredients: [
        { name: 'Pan de Hamburguesa', amount: 1 }, 
        { name: 'Carne de Res', amount: 80 }, 
        { name: 'Queso', amount: 20 }, 
        { name: 'Lechuga', amount: 10 }, 
        { name: 'Tomate', amount: 10 }
      ] 
    },
    { 
      id: '5', 
      title: 'Sopa de Verduras', 
      rating: 4.2, 
      reviews: 60, 
      time: '25 minutos', 
      servings: 3, 
      image: require('../../assets/images/sopa.jpg'), 
      ingredients: [
        { name: 'Zanahoria', amount: 30 }, 
        { name: 'Apio', amount: 20 }, 
        { name: 'Cebolla', amount: 10 }, 
        { name: 'Papa', amount: 50 }
      ] 
    },
    { 
      id: '6', 
      title: 'Falafel', 
      rating: 4.4, 
      reviews: 40, 
      time: '20 minutos', 
      servings: 2, 
      image: require('../../assets/images/falafel.jpg'), 
      ingredients: [
        { name: 'Garbanzos', amount: 100 }, 
        { name: 'Cebolla', amount: 20 }, 
        { name: 'Perejil', amount: 5 }, 
        { name: 'Comino', amount: 2 }
      ] 
    },
    { 
      id: '7', 
      title: 'Panqueques', 
      rating: 4.8, 
      reviews: 95, 
      time: '10 minutos', 
      servings: 2, 
      image: require('../../assets/images/panqueques.jpg'), 
      ingredients: [
        { name: 'Harina', amount: 100 }, 
        { name: 'Leche', amount: 100 }, 
        { name: 'Huevo', amount: 1 }, 
        { name: 'Azúcar', amount: 10 }
      ] 
    },
  ];  

// Ingredientes en el almacén del usuario con gramaje
const ingredientesEnAlmacen = {
  Harina: 190,
  Tomate: 100,
  Queso: 50,
  Tortillas: 3,
  Carne: 50,
  Cebolla: 10,
};

const RecomendacionScreen = ({ navigation }) => {
  const [data, setData] = useState(recomendacionData);
  const [isAscending, setIsAscending] = useState(true);

  // Función para ordenar la lista
  const sortData = () => {
    const sortedData = [...data].sort((a, b) => {
      return isAscending ? a.rating - b.rating : b.rating - a.rating;
    });
    setIsAscending(!isAscending);
    setData(sortedData);
  };

  // Verificar coincidencias de ingredientes
  const verificarIngredientes = (receta) => {
    const ingredientesFaltantes = receta.ingredients.filter(ingrediente => {
      const cantidadEnAlmacen = ingredientesEnAlmacen[ingrediente.name] || 0;
      return cantidadEnAlmacen < ingrediente.amount;  // Si falta cantidad, lo consideramos faltante
    });

    if (ingredientesFaltantes.length > 0) {
      const faltantesText = ingredientesFaltantes.map(ingrediente => `${ingrediente.name} (${ingrediente.amount - (ingredientesEnAlmacen[ingrediente.name] || 0)}g faltantes)`).join(', ');
      Alert.alert("Faltan Ingredientes", `Te faltan estos ingredientes en pequeñas cantidades: ${faltantesText}`);
    } else {
      // Si tiene todos los ingredientes, navegar a la receta
      navigation.navigate('Recipe', {
        title: receta.title,
        image: receta.image,
        ingredients: receta.ingredients,
      });
    }
  };

  // Renderizar cada receta en la lista
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
        {/* Botón para verificar ingredientes */}
        <TouchableOpacity style={styles.recipeButton} onPress={() => verificarIngredientes(item)}>
          <Text style={styles.recipeButtonText}>Verificar Ingredientes</Text>
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
        ListFooterComponent={<View style={{ height: 80 }} />}
      />
    </View>
  );
};

export default RecomendacionScreen;
