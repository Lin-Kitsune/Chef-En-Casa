import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, FlatList, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';
import axios from 'axios';
import styles from './BuscadorStyles';

const BuscadorScreen = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [servings, setServings] = useState('');
  const [time, setTime] = useState('');
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();

  // Función para manejar la búsqueda con filtros
  const handleSearch = async () => {
    if (searchQuery.trim() === '') {
      Alert.alert('Error', 'Por favor ingresa un término de búsqueda.');
      return;
    }
  
    setLoading(true);
    console.log('Parámetros enviados:', { searchQuery, servings, time });
  
    try {
      const token = await AsyncStorage.getItem('userToken'); 
      const response = await axios.get('http://10.0.2.2:4000/api/recetas', {
        params: { 
          q: searchQuery, 
          maxServings: servings || null, 
          time: time || null 
        }, 
        headers: {
          Authorization: `Bearer ${token}`,
        }
      });
      
      console.log('Respuesta de la API en el cliente:', response.data);
  
      if (response.data && response.data.results) {
        setRecipes(response.data.results);
      } else {
        Alert.alert('Sin resultados', 'No se encontraron recetas con los filtros proporcionados.');
      }
    } catch (error) {
      console.error('Error de la API:', error);
      Alert.alert('Error', 'No se pudieron obtener las recetas.');
    } finally {
      setLoading(false);
    }
  };

  const renderRecipeItem = ({ item }) => (
    <View style={styles.card}>
      <Image source={{ uri: item.image }} style={styles.image} />
      <Text style={styles.cardText}>{item.title}</Text>
      <Text style={styles.cardText}>
        🍽️ {item.servings || 'No disponible'} personas ⏱️ {item.readyInMinutes || 'No disponible'} minutos
      </Text>
      <TouchableOpacity 
        style={styles.prepareButton} 
        onPress={() => navigation.navigate('RecipeDetail', { recipeId: item.id })}
      >
        <Text style={styles.buttonText}>Ver Detalles</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <Icon name="search-outline" size={20} color="#888" style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder="¿Qué quieres preparar?"
          value={searchQuery}
          onChangeText={setSearchQuery}
          onSubmitEditing={handleSearch}
        />
      </View>

      <View style={styles.filtersContainer}>
        <TextInput
          style={styles.filterInput}
          placeholder="Porciones"
          value={servings}
          onChangeText={setServings}
          keyboardType="numeric"
        />
        <TextInput
          style={styles.filterInput}
          placeholder="Tiempo (minutos)"
          value={time}
          onChangeText={setTime}
          keyboardType="numeric"
        />
        <TouchableOpacity style={styles.searchButton} onPress={handleSearch}>
          <Text style={styles.searchButtonText}>Buscar</Text>
        </TouchableOpacity>
      </View>

      {loading ? (
        <Text style={styles.loadingText}>Cargando recetas...</Text>
      ) : (
        <FlatList
          data={recipes}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderRecipeItem}
          contentContainerStyle={styles.listContent}
        />
      )}
    </View>
  );
};

export default BuscadorScreen;
