import React from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native'; // Importa el hook
import styles from './BuscadorStyles';
import Icon from 'react-native-vector-icons/Ionicons'; // Importa la biblioteca de iconos

const BuscadorScreen = () => {
  const navigation = useNavigation();  // Hook para la navegación
  
  return (
    <View style={styles.container}>
      {/* Barra de búsqueda */}
      <View style={styles.searchContainer}>
        <Icon name="search-outline" size={20} color="#888" style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder="¿Qué quieres preparar?"
        />
      </View>

      {/* Botones de categorías */}
      <View style={styles.grid}>
        <TouchableOpacity style={[styles.card, styles.cardDesayuno]} onPress={() => navigation.navigate('Desayuno')}>
          <Image source={require('../../assets/images/desayuno.png')} style={styles.image} />
          <Text style={styles.cardText}>DESAYUNO</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={[styles.card, styles.cardAlmuerzo]} onPress={() => navigation.navigate('Almuerzo')}>
          <Image source={require('../../assets/images/almuerzo.png')} style={styles.image} />
          <Text style={styles.cardText}>ALMUERZO</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={[styles.card, styles.cardCena]} onPress={() => navigation.navigate('Cena')}>
          <Image source={require('../../assets/images/cena.png')} style={styles.image} />
          <Text style={styles.cardText}>CENA</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={[styles.card, styles.cardReposteria]} onPress={() => navigation.navigate('Reposteria')}>
          <Image source={require('../../assets/images/reposteria.png')} style={styles.image} />
          <Text style={styles.cardText}>REPOSTERÍA</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default BuscadorScreen;