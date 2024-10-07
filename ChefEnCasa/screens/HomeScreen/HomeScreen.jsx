import React from 'react';
import { View, Text, TextInput, TouchableOpacity, Image } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import styles from './HomeScreenStyles'; // Importa los estilos
import { useNavigation } from '@react-navigation/native';  

const HomeScreen = () => {
  const navigation = useNavigation();  // Hook para la navegación
  
  return (
    <View style={styles.container}>
      {/* Encabezado */}
      <View style={styles.header}>
        {/* Icono de menú */}
        <TouchableOpacity style={styles.menuButton}>
          <Icon name="bars" size={24} color="#fff" />
        </TouchableOpacity>
        <View style={styles.userInfoContainer}>
          <Image source={require('../../assets/images/user-avatar.png')} style={styles.avatar} />
          <View style={styles.userInfo}>
            {/* Texto envuelto en un componente <Text> */}
            <Text style={styles.userName}>User</Text>
            <Text style={styles.dietText}>Dieta equilibrada</Text>
          </View>
        </View>
      </View>

      {/* Barra de búsqueda */}
      <View style={styles.searchContainer}>
        <Icon name="search" size={20} color="#619537" style={styles.searchIcon} />
        <TextInput 
            style={styles.searchInput} 
            placeholder="¿Qué quieres preparar?" 
            placeholderTextColor="#619537"
            autoCorrect={false}  
            autoCapitalize="none" 
        />
        <TouchableOpacity>
          <Icon name="times" size={20} color="#619537" style={styles.searchCloseIcon} />
        </TouchableOpacity>
      </View>

      {/* Botones de Almacén y Lista */}
      <View style={styles.topButtonsContainer}>
        <View style={{ alignItems: 'center' }}>
          <TouchableOpacity style={styles.topButton} onPress={() => navigation.navigate('Almacen')}>
            <Image source={require('../../assets/icons/almacen.png')} style={styles.buttonIcon} />
          </TouchableOpacity>
          {/* Asegúrate de que el texto esté dentro de un <Text> */}
          <Text style={styles.topButtonText}>Almacén</Text>
        </View>
        
        <View style={{ alignItems: 'center' }}>
          <TouchableOpacity 
            style={styles.topButton}
            onPress={() => navigation.navigate('ShoppingList')}  // Navegar a la pantalla de "Lista de Compras"
          >
            <Image source={require('../../assets/icons/lista.png')} style={styles.buttonIcon} />
          </TouchableOpacity>
          <Text style={styles.topButtonText}>Lista</Text>
        </View>

        <View style={{ alignItems: 'center' }}>
          <TouchableOpacity 
            style={styles.topButton}
            onPress={() => navigation.navigate('Meta')}  // Navegar a la pantalla de "Meta"
          >
            <Image source={require('../../assets/icons/Grafico.png')} style={styles.buttonIcon} />
          </TouchableOpacity>
          <Text style={styles.topButtonText}>Meta</Text>
        </View>
      </View>

      {/* Categorías */}
      <View style={styles.categoriesContainer}>
      <TouchableOpacity 
        style={[styles.categoryButton, { backgroundColor: '#fae19c' }]}
        onPress={() => navigation.navigate('Desayuno')}  // Esto navega a la pantalla de Desayuno
      >
        <Image source={require('../../assets/images/desayuno.png')} style={styles.categoryImage} />
        <Text style={styles.categoryText}>DESAYUNO</Text> 
      </TouchableOpacity>


        <TouchableOpacity style={[styles.categoryButton, { backgroundColor: '#d2afdf' }]}>
          <Image source={require('../../assets/images/almuerzo.png')} style={styles.categoryImage} />
          <Text style={styles.categoryText}>ALMUERZO</Text>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.categoryButton, { backgroundColor: '#fdd499' }]}>
          <Image source={require('../../assets/images/cena.png')} style={styles.categoryImage} />
          <Text style={styles.categoryText}>CENA</Text>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.categoryButton, { backgroundColor: '#7fd7bb' }]}>
          <Image source={require('../../assets/images/reposteria.png')} style={styles.categoryImage} />
          <Text style={styles.categoryText}>REPOSTERIA</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default HomeScreen;
