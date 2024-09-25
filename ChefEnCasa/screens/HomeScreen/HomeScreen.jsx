import React from 'react';
import { View, Text, TextInput, TouchableOpacity, Image } from 'react-native';
import styles from './HomeScreenStyles'; // Importa los estilos
import { useNavigation } from '@react-navigation/native'; 

const HomeScreen = () => {
  const navigation = useNavigation();
  return (
      <View style={styles.container}>
          {/* Encabezado */}
          <View style={styles.header}>
              <TouchableOpacity>
                  <Image source={require('../../assets/icons/menu.png')} style={styles.menuIcon} />
              </TouchableOpacity>
              <View style={styles.userInfo}>
                  <Image source={require('../../assets/images/user-avatar.png')} style={styles.avatar} />
                  <View>
                      <Text style={styles.userName}>User</Text>
                      <Text style={styles.dietText}>Dieta equilibrada</Text>
                  </View>
              </View>
          </View>

          {/* Barra de búsqueda */}
          <View style={styles.searchContainer}>
              <Image source={require('../../assets/icons/buscaverde.png')} style={styles.searchIcon} />
              <TextInput style={styles.searchInput} placeholder="¿Qué quieres preparar?" />
          </View>

          {/* Botones de Almacén y Lista */}
          <View style={styles.topButtonsContainer}>
              <TouchableOpacity style={styles.topButton}>
                  <Image source={require('../../assets/icons/almacen.png')} style={styles.buttonIcon} />
                  <Text style={styles.topButtonText}>Almacén</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.topButton}>
                  <Image source={require('../../assets/icons/lista.png')} style={styles.buttonIcon} />
                  <Text style={styles.topButtonText}>Lista</Text>
              </TouchableOpacity>
          </View>

          {/* Categorías */}
          <View style={styles.categoriesContainer}>
              <TouchableOpacity style={styles.categoryDesayuno}>
                  <Image source={require('../../assets/images/desayuno.png')} style={styles.categoryImage} />
                  <Text style={styles.categoryText}>DESAYUNO</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.categoryAlmuerzo}>
                  <Image source={require('../../assets/images/almuerzo.png')} style={styles.categoryImage} />
                  <Text style={styles.categoryText}>ALMUERZO</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.categoryCena}>
                  <Image source={require('../../assets/images/cena.png')} style={styles.categoryImage} />
                  <Text style={styles.categoryText}>CENA</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.categoryReposteria}>
                  <Image source={require('../../assets/images/reposteria.png')} style={styles.categoryImage} />
                  <Text style={styles.categoryText}>REPOSTERIA</Text>
              </TouchableOpacity>
          </View>

          {/* Barra de Navegación Inferior */}
          <View style={styles.bottomNav}>
              <TouchableOpacity>
                  <Image source={require('../../assets/icons/buscador.png')} style={styles.iconStyle} />
              </TouchableOpacity>
              <TouchableOpacity>
                  <Image source={require('../../assets/icons/fav.png')} style={styles.iconStyle} />
              </TouchableOpacity>
              <TouchableOpacity>
                  <Image source={require('../../assets/icons/tendencias.png')} style={styles.iconStyle} />
              </TouchableOpacity>
              <TouchableOpacity>
                  <Image source={require('../../assets/icons/perfil.png')} style={styles.iconStyle} />
              </TouchableOpacity>
          </View>
      </View>
  );
};

export default HomeScreen;
