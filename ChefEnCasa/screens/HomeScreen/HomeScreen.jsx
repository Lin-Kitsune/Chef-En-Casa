import React, { useState, useEffect } from 'react'; // Añade useState aquí
import { View, Text, TextInput, TouchableOpacity, Image } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import styles from './HomeScreenStyles'; // Importa los estilos
import { useNavigation } from '@react-navigation/native';  
import { useFocusEffect } from '@react-navigation/native';
import { getUserProfile } from '../../services/auth'; 

const HomeScreen = () => {
  const navigation = useNavigation();  // Hook para la navegación
  const [userName, setUserName] = useState('Usuario');
  const [diet, setDiet] = useState('Sin dieta');   
  
// Efecto para cargar los datos del usuario al montar el componente
useFocusEffect(
  React.useCallback(() => {
    const fetchUserProfile = async () => {
      try {
        const userProfile = await getUserProfile();  // Obtener el perfil del usuario
        
        // Actualizar los datos de nombre y dieta
        setUserName(userProfile.nombre || 'Usuario'); // Si no hay nombre, poner 'Usuario' por defecto
        setDiet(userProfile.healthData?.dietRecommendation || 'Sin dieta'); // Usar la recomendación de dieta o 'Sin dieta'
        
      } catch (error) {
        console.error('Error al obtener el perfil del usuario', error);
      }
    };

    fetchUserProfile(); // Llamar a la función cuando se enfoque la pantalla

  }, []) // El array vacío asegura que esto ocurra cada vez que la pantalla esté enfocada
); // Ejecutar solo una vez al montar el componente

  return (
    <View style={styles.container}>
      {/* Encabezado */}
      <View style={styles.header}>
        {/* Icono de menú */}
        <TouchableOpacity style={styles.menuButton} onPress={() => navigation.openDrawer()}>
          <Icon name="bars" size={24} color="#fff" />
        </TouchableOpacity>
        <View style={styles.userInfoContainer}>
          <Image source={require('../../assets/images/user-avatar.png')} style={styles.avatar} />
          <View style={styles.userInfo}>
             {/* Mostrar el nombre del usuario y la dieta */}
             <Text style={styles.userName}>{userName}</Text>
            <Text style={styles.dietText}>{diet}</Text>
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

        <View style={{ alignItems: 'center' }}>
          <TouchableOpacity 
            style={styles.topButton}
            onPress={() => navigation.navigate('Tendencias')}  // Navigate to "TendenciasScreen"
          >
            <Image source={require('../../assets/icons/tendencias.png')} style={styles.buttonIcon} />
          </TouchableOpacity>
          <Text style={styles.topButtonText}>Tendencias</Text>
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


        <TouchableOpacity style={[styles.categoryButton, { backgroundColor: '#d2afdf' }]} onPress={() => navigation.navigate('Almuerzo')}>
          <Image source={require('../../assets/images/almuerzo.png')} style={styles.categoryImage} />
          <Text style={styles.categoryText}>ALMUERZO</Text>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.categoryButton, { backgroundColor: '#fdd499' }]} onPress={() => navigation.navigate('Cena')}>
          <Image source={require('../../assets/images/cena.png')} style={styles.categoryImage} />
          <Text style={styles.categoryText}>CENA</Text>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.categoryButton, { backgroundColor: '#7fd7bb' }]} onPress={() => navigation.navigate('Reposteria')}>
          <Image source={require('../../assets/images/reposteria.png')} style={styles.categoryImage} />
          <Text style={styles.categoryText}>REPOSTERIA</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default HomeScreen;
