import React from 'react';
import { View, Text, TouchableOpacity, Image, FlatList } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import styles from './ProfileScreenStyles';

const recentRecipes = [
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
    title: 'Omelet',
    rating: 5,
    reviews: 7,
    time: '5 minutos',
    servings: 1,
    image: require('../../assets/images/omelet.jpg'),
  },
];

const ProfileScreen = ({ navigation }) => {
  const renderRecipeItem = ({ item }) => (
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
        <TouchableOpacity style={styles.recipeButton}>
          <Text style={styles.recipeButtonText}>Comenzar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* User Information */}
      <View style={styles.profileInfoContainer}>
        <Image
          source={require('../../assets/images/user-avatar.png')}
          style={styles.profileImage}
        />
        <Text style={styles.profileName}>USUARIO</Text>
        <TouchableOpacity 
            style={styles.editButton} 
            onPress={() => navigation.navigate('EditProfile')} // Navegar a la pantalla de edición de perfil
            >
            <Icon name="edit" size={16} color="#fff" />
            <Text style={styles.editButtonText}>EDITAR DATOS CUENTA</Text>
        </TouchableOpacity>

      </View>

      {/* Recent Recipes */}
      <Text style={styles.recentRecipesTitle}>RECETAS VISTAS RECIENTEMENTE</Text>
      <FlatList
        data={recentRecipes}
        renderItem={renderRecipeItem}
        keyExtractor={(item) => item.id}
        style={styles.recentRecipesList}
      />
    </View>
  );
};

export default ProfileScreen;
