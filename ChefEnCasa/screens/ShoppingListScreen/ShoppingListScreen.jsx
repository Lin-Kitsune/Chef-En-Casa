import React, { useState, useEffect } from 'react';
import { View, ScrollView, Text, TouchableOpacity, FlatList, Modal, Image, TextInput, Alert, ActivityIndicator } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import axios from 'axios';  // Asegúrate de tener Axios instalado
import AsyncStorage from '@react-native-async-storage/async-storage';  // Para gestionar el token
import styles from './ShoppingListScreenStyles';
import { useNavigation } from '@react-navigation/native';
import {markAllAsBought} from '../../services/shoppingList';

const ShoppingList = () => {
  const navigation = useNavigation();
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalVisible, setModalVisible] = useState(false);
  const [ingredientModalVisible, setIngredientModalVisible] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  // Obtener la lista de compras del backend
  const fetchShoppingList = async () => {
    try {
      const token = await AsyncStorage.getItem('userToken');
      const response = await axios.get('http://10.0.2.2:4000/lista-de-compras', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.data.listaVacia) {
        Alert.alert('Información', response.data.message);
        setItems([]); // Asegurarse de que la lista de items esté vacía
      } else {
        setItems(response.data.ingredientes || []);
      }
    } catch (error) {
      console.error('Error al obtener la lista de compras:', error);
      Alert.alert('Error', 'No se pudo obtener la lista de compras.');
    } finally {
      setLoading(false);
    }
  };

  // Marcar un ingrediente como comprado o no comprado
  const toggleCheck = async (nombreIngrediente, comprado) => {
    try {
      const token = await AsyncStorage.getItem('userToken');
      await axios.put('http://10.0.2.2:4000/lista-de-compras/marcar-comprado', 
        { nombreIngrediente, comprado: !comprado },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      fetchShoppingList();  // Actualizar la lista después de marcar
    } catch (error) {
      console.error('Error al marcar como comprado:', error);
      Alert.alert('Error', 'No se pudo actualizar el estado del ingrediente.');
    }
  };

  // Eliminar un ingrediente de la lista
  const deleteItem = async (nombreIngrediente) => {
    try {
      const token = await AsyncStorage.getItem('userToken');
      await axios.delete('http://10.0.2.2:4000/lista-de-compras/eliminar-ingrediente', {
        data: { nombreIngrediente },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      fetchShoppingList();  // Actualizar la lista
    } catch (error) {
      console.error('Error al eliminar el ingrediente:', error);
      Alert.alert('Error', 'No se pudo eliminar el ingrediente.');
    }
  };

  // Transferir ingredientes comprados al almacén
  const transferToAlmacen = async () => {
    try {
      const token = await AsyncStorage.getItem('userToken');
      await axios.put('http://10.0.2.2:4000/lista-de-compras/transferir-al-almacen', {}, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      Alert.alert('Éxito', 'Los ingredientes han sido transferidos al almacén.');
      fetchShoppingList();  // Actualizar la lista
    } catch (error) {
      console.error('Error al transferir al almacén:', error);
      Alert.alert('Error', 'No se pudo transferir los ingredientes al almacén.');
    }
  };

  // Marcar todos los ingredientes como comprados
const markAllAsBought = async () => {
  try {
    const token = await AsyncStorage.getItem('userToken');
    await axios.put('http://10.0.2.2:4000/lista-de-compras/marcar-todo-comprado', {}, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    Alert.alert('Éxito', 'Todos los ingredientes han sido marcados como comprados.');
    fetchShoppingList();  // Actualizar la lista
  } catch (error) {
    console.error('Error al marcar todos los ingredientes como comprados:', error);
    Alert.alert('Error', 'No se pudo marcar todos los ingredientes como comprados.');
  }
};

  // Eliminar toda la lista de compras
  const deleteShoppingList = async () => {
    try {
      const token = await AsyncStorage.getItem('userToken');
      await axios.delete('http://10.0.2.2:4000/lista-de-compras/eliminar-toda', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      Alert.alert('Éxito', 'La lista de compras ha sido eliminada.');
      fetchShoppingList();  // Actualizar la lista
    } catch (error) {
      console.error('Error al eliminar la lista de compras:', error);
      Alert.alert('Error', 'No se pudo eliminar la lista de compras.');
    }
  };

  useEffect(() => {
    fetchShoppingList();  // Obtener la lista de compras al cargar la pantalla
  }, []);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#619537" />
        <Text style={styles.loadingText}>Cargando lista de compras...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.buttonsContainer}>
        <TouchableOpacity style={styles.addButton} onPress={transferToAlmacen}>
          <View style={styles.buttonContent}>
            <Icon name="check" size={24} color="white" />
            <Text style={styles.buttonText}>Transferir al Almacén</Text> 
          </View>
        </TouchableOpacity>

        <TouchableOpacity style={styles.deleteButton} onPress={deleteShoppingList}>
          <View style={styles.buttonContent}>
            <Icon name="trash" size={24} color="white" />
            <Text style={styles.buttonText}>Eliminar Lista</Text> 
          </View>
        </TouchableOpacity>
      </View>

      <View style={styles.centeredButtonContainer}>
        <TouchableOpacity style={styles.markAllButton} onPress={markAllAsBought}>
          <View style={styles.buttonContent}>
            <Icon name="check-square" size={24} color="white" />
            <Text style={styles.buttonText}>Marcar Todo Comprado</Text>
          </View>
        </TouchableOpacity>
      </View>

      <FlatList
        data={items}
        contentContainerStyle={{ paddingBottom: 60 }} // Agrega padding para que la lista no esté tan pegada a la barra inferior
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => toggleCheck(item.nombre, item.comprado)} style={styles.itemContainer}>
            <Icon
              name={item.comprado ? 'check-square' : 'square-o'}
              size={20}
              color={item.comprado ? '#619537' : '#888'}
              style={styles.checkIcon}
            />
            <Text style={item.comprado ? styles.ingredientChecked : styles.itemText}>
              {item.nombre} - {item.cantidad}g
            </Text>
            <TouchableOpacity onPress={() => deleteItem(item.nombre)} style={styles.deleteIcon}>
              <Icon name="trash" size={20} color="#888" />
            </TouchableOpacity>
          </TouchableOpacity>
        )}
        keyExtractor={(item) => item.nombre}
      />
    </View>
  );
};

export default ShoppingList;
