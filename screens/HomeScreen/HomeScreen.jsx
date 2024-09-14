import React from 'react';
import { View, Text, TextInput, TouchableOpacity, Image } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import styles from './HomeScreenStyles'; // Importa los estilos

// Cambios 3
const HomeScreen = () => {
    const navigation = useNavigation();
  return (
    <View style={styles.container}>
      {/* Encabezado */}
      <View style={styles.header}>
        <Icon name="bars" size={25} color="#fff" style={styles.menuIcon} />
        <View style={styles.userInfo}>
          <Image source={require('../../assets/images/user-avatar.png')} style={styles.avatar} />
          <View>
            <Text style={styles.userName}>User</Text>
            <Text style={styles.dietText}>Dieta equilibrada</Text>
          </View>
        </View>
      </View>
{/*  */}
      {/* Barra de búsqueda */}
      <View style={styles.searchContainer}>
        <Icon name="search" size={20} color="#000" />
        <TextInput style={styles.searchInput} placeholder="¿Qué quieres preparar?" />
      </View>

      {/* Botones de Almacén y Lista */}
      <View style={styles.topButtonsContainer}>
        <TouchableOpacity style={styles.topButton}>
          <Icon name="shopping-basket" size={20} color="#fff" />
          <Text style={styles.topButtonText}>Almacén</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.topButton}>
          <Icon name="list-alt" size={20} color="#fff" />
          <Text style={styles.topButtonText}>Lista</Text>
        </TouchableOpacity>
      </View>

      {/* Categorías */}
      <View style={styles.categoriesContainer}>
        <TouchableOpacity style={styles.category}>
          <Image source={require('../../assets/images/desayuno.png')} style={styles.categoryImage} />
          <Text style={styles.categoryText}>DESAYUNO</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.category}>
          <Image source={require('../../assets/images/almuerzo.png')} style={styles.categoryImage} />
          <Text style={styles.categoryText}>ALMUERZO</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.category}>
          <Image source={require('../../assets/images/cena.png')} style={styles.categoryImage} />
          <Text style={styles.categoryText}>CENA</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.category}>
          <Image source={require('../../assets/images/reposteria.png')} style={styles.categoryImage} />
          <Text style={styles.categoryText}>REPOSTERIA</Text>
        </TouchableOpacity>
      </View>

      {/* Barra de Navegación Inferior */}
      <View style={styles.bottomNav}>
        <TouchableOpacity>
          <Icon name="search" size={25} color="#fff" />
        </TouchableOpacity>
        <TouchableOpacity>
          <Icon name="home" size={25} color="#fff" />
        </TouchableOpacity>
        <TouchableOpacity>
          <Icon name="bell" size={25} color="#fff" />
        </TouchableOpacity>
        <TouchableOpacity>
          <Icon name="user" size={25} color="#fff" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default HomeScreen;
