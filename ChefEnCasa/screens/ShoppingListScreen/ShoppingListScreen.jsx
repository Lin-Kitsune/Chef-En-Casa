import React, { useState, useEffect } from 'react';
import { View, ScrollView, Text, TouchableOpacity, FlatList, Modal, Image, TextInput, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import axios from 'axios';  // Asegúrate de tener Axios instalado
import styles from './ShoppingListScreenStyles';
import { fetchIngredients } from '../../services/ingredients';
import { useNavigation } from '@react-navigation/native';

const ShoppingList = () => {
  const navigation = useNavigation();
  const [items, setItems] = useState([
    { id: 1, text: 'Papas', checked: false },
    { id: 2, text: 'Frutilla', checked: false },
    { id: 3, text: 'Plátano', checked: false },
    { id: 4, text: 'Palta', checked: false },
    { id: 5, text: 'Kiwi', checked: false },
    { id: 6, text: 'Carne de Vacuno', checked: false },
    { id: 7, text: 'Truto Pollo', checked: false },
    { id: 8, text: 'Carne Molida', checked: false },
  ]);
  const [isModalVisible, setModalVisible] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [ingredientModalVisible, setIngredientModalVisible] = useState(false);
  const [availableIngredients, setAvailableIngredients] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  // Función para obtener ingredientes desde el servicio
  const fetchIngredientsList = async () => {
    try {
      const ingredients = await fetchIngredients();  // Llama a la API desde el servicio
      setAvailableIngredients(ingredients);  // Actualizar el estado con los ingredientes
    } catch (error) {
      Alert.alert("Error", "No se pudo obtener los ingredientes.");
      console.error('Error al obtener los ingredientes:', error);
    }
  };

  const toggleCheck = (id) => {
    setItems(items.map(item => (item.id === id ? { ...item, checked: !item.checked } : item)));
  };

  const addItem = (ingredient) => {
    const newItem = { id: items.length + 1, text: ingredient.name, checked: false };
    setItems([...items, newItem]);
    setIngredientModalVisible(false);  // Cierra el modal de ingredientes después de seleccionar
  };

  const deleteSelectedItems = () => {
    setItems(items.filter(item => !item.checked));
  };

  const openModal = () => {
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  const openIngredientModal = (category) => {
    setSearchTerm('');  // Limpiar el buscador cada vez que se abra el modal
    setSelectedCategory(category);
    setModalVisible(false);  // Cierra el modal principal
    fetchIngredientsList();  // Llama a la API para obtener los ingredientes según la categoría
    setIngredientModalVisible(true);  // Abre el modal de ingredientes
  };

  // Función de paginación para cambiar de página
  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  // Ingredientes filtrados según el término de búsqueda
  const filteredIngredients = availableIngredients.filter((ingredient) =>
    ingredient.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Calcular los ingredientes que se muestran en la página actual
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentIngredients = filteredIngredients.slice(indexOfFirstItem, indexOfLastItem);

  // Generar botones de paginación
  const totalPages = Math.ceil(filteredIngredients.length / itemsPerPage);
  const paginationButtons = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <View style={styles.container}>
      <View style={styles.buttonsContainer}>
        <TouchableOpacity style={styles.addButton} onPress={openModal}>
          <View style={styles.buttonContent}>
            <Icon name="plus-circle" size={24} color="white" />
            <Text style={styles.buttonText}>Agregar Ingrediente</Text> 
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={styles.deleteButton} onPress={deleteSelectedItems}>
          <View style={styles.buttonContent}>
            <Icon name="minus-circle" size={24} color="white" />
            <Text style={styles.buttonText}>Eliminar Ingrediente</Text> 
          </View>
        </TouchableOpacity>
      </View>

      <FlatList
        data={items}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => toggleCheck(item.id)} style={styles.itemContainer}>
            <Icon
              name={item.checked ? 'check-square' : 'square-o'}
              size={20}
              color={item.checked ? '#619537' : '#888'}
              style={styles.checkIcon}
            />
            <Text style={item.checked ? styles.ingredientChecked : styles.itemText}>
              {item.text}
            </Text>
          </TouchableOpacity>
        )}
        keyExtractor={(item) => item.id.toString()}
      />

      {/* Modal para seleccionar categoría */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={isModalVisible}
        onRequestClose={closeModal}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>¿Qué desea agregar?</Text>
            <View style={styles.modalOptions}>
              <TouchableOpacity style={styles.modalOption} onPress={() => openIngredientModal('Frutas / Verduras')}>
                <Image source={require('../../assets/images/Frutas.png')} style={styles.modalIcon} />
                <Text style={styles.modalOptionText}>Frutas / Verduras</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.modalOption} onPress={() => openIngredientModal('Carne')}>
                <Image source={require('../../assets/images/Carne.png')} style={styles.modalIcon} />
                <Text style={styles.modalOptionText}>Carne</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.modalOption} onPress={() => openIngredientModal('Almacén')}>
                <Image source={require('../../assets/images/Harina.png')} style={styles.modalIcon} />
                <Text style={styles.modalOptionText}>Almacén</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.modalOption} onPress={() => openIngredientModal('Lácteos')}>
                <Image source={require('../../assets/images/Lacteos.png')} style={styles.modalIcon} />
                <Text style={styles.modalOptionText}>Lácteos</Text>
              </TouchableOpacity>
            </View>
            <TouchableOpacity style={styles.modalCloseButton} onPress={closeModal}>
              <Text style={styles.modalCloseButtonText}>Cerrar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Modal para seleccionar ingrediente con búsqueda, paginación y diseño mejorado */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={ingredientModalVisible}
        onRequestClose={() => setIngredientModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Selecciona un {selectedCategory}</Text>
            <TextInput
              style={styles.searchInput}
              placeholder="Buscar ingrediente..."
              value={searchTerm}
              onChangeText={(text) => setSearchTerm(text)}
            />
            {/* Ingredientes filtrados con imágenes y nombres */}
            <View style={styles.modalOptions}>
              {currentIngredients.map((ingredient, index) => (
                <TouchableOpacity 
                  key={index} 
                  style={styles.modalIngredientOption} 
                  onPress={() => addItem(ingredient)}
                >
                  {/* Mostrar la imagen del ingrediente */}
                  <Image 
                    source={{ uri: `https://spoonacular.com/cdn/ingredients_100x100/${ingredient.image}` }} 
                    style={styles.ingredientImage} 
                  />
                  {/* Mostrar el nombre del ingrediente */}
                  <Text style={styles.modalOptionText}>{ingredient.name}</Text>
                </TouchableOpacity>
              ))}
            </View>

            {/* Botones de paginación */}
            <View style={styles.paginationContainer}>
              {paginationButtons.map((page) => (
                <TouchableOpacity
                  key={page}
                  style={[styles.pageButton, currentPage === page && styles.activePageButton]}
                  onPress={() => handlePageChange(page)}
                >
                  <Text style={styles.pageButtonText}>{page}</Text>
                </TouchableOpacity>
              ))}
            </View>

            <TouchableOpacity style={styles.modalCloseButton} onPress={() => setIngredientModalVisible(false)}>
              <Text style={styles.modalCloseButtonText}>Cerrar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default ShoppingList;