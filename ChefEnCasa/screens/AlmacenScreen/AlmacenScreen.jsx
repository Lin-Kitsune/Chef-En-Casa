import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, FlatList, Modal, TextInput, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import styles from './AlmacenStyles';
import { fetchIngredients } from '../../services/ingredients';

const AlmacenScreen = () => {
  const [alimentos, setAlimentos] = useState([
    { id: '1', nombre: 'PEPINO', cantidad: 1, img: require('../../assets/images/pepino.png') },
    { id: '2', nombre: 'LECHUGA', cantidad: 1, img: require('../../assets/images/lechuga.png') },
    { id: '3', nombre: 'CEBOLLA', cantidad: 1, img: require('../../assets/images/cebolla.png') },
    { id: '4', nombre: 'COLIFLOR', cantidad: 1, img: require('../../assets/images/coliflor.png') },
    { id: '5', nombre: 'ZANAHORIA', cantidad: 1, img: require('../../assets/images/zanahoria.png') },
    { id: '6', nombre: 'PECHUGA DE POLLO', cantidad: 1, img: require('../../assets/images/pechuga.png') },
    { id: '7', nombre: 'AJO', cantidad: 1, img: require('../../assets/images/ajo.png') },
    { id: '8', nombre: 'CARNE', cantidad: 1, img: require('../../assets/images/carne1.png') },
    { id: '9', nombre: 'HUEVOS', cantidad: 1, img: require('../../assets/images/huevos.png') }
  ]);
  const [isModalVisible, setModalVisible] = useState(false);
  const [ingredientModalVisible, setIngredientModalVisible] = useState(false);
  const [availableIngredients, setAvailableIngredients] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  // Simular el agregar alimento
  const agregarAlimento = (ingredient) => {
    const newAlimento = {
      id: alimentos.length + 1,
      nombre: ingredient.name.toUpperCase(),
      cantidad: 1,
      img: { uri: `https://spoonacular.com/cdn/ingredients_100x100/${ingredient.image}` }
    };
    setAlimentos([...alimentos, newAlimento]);
    setIngredientModalVisible(false);  // Cierra el modal después de agregar
  };

  // Eliminar alimentos seleccionados
  const eliminarAlimento = () => {
    setAlimentos(alimentos.filter(alimento => !alimento.seleccionado));  // Elimina los seleccionados
  };

  // Función para seleccionar/deseleccionar alimentos
  const toggleSeleccionado = (id) => {
    setAlimentos(alimentos.map(alimento => alimento.id === id ? { ...alimento, seleccionado: !alimento.seleccionado } : alimento));
  };

  // Funciones para aumentar/disminuir cantidad
  const aumentarCantidad = (id) => {
    setAlimentos(alimentos.map(alimento => alimento.id === id ? { ...alimento, cantidad: alimento.cantidad + 1 } : alimento));
  };

  const disminuirCantidad = (id) => {
    setAlimentos(alimentos.map(alimento => 
      alimento.id === id && alimento.cantidad > 1 ? { ...alimento, cantidad: alimento.cantidad - 1 } : alimento
    ));
  };

  const openIngredientModal = (category) => {
    setSearchTerm('');
    setSelectedCategory(category);
    fetchIngredientsList();
    setIngredientModalVisible(true);
  };

  const fetchIngredientsList = async () => {
    try {
      const ingredients = await fetchIngredients();
      setAvailableIngredients(ingredients);
    } catch (error) {
      Alert.alert("Error", "No se pudo obtener los ingredientes.");
      console.error('Error al obtener los ingredientes:', error);
    }
  };

  // Lógica de paginación y búsqueda
  const handlePageChange = (newPage) => setCurrentPage(newPage);

  const filteredIngredients = availableIngredients.filter((ingredient) =>
    ingredient.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentIngredients = filteredIngredients.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(filteredIngredients.length / itemsPerPage);
  const paginationButtons = Array.from({ length: totalPages }, (_, i) => i + 1);

  const renderItem = ({ item }) => (
    <View style={[styles.item, item.seleccionado && styles.itemSeleccionado]}>
      <Image source={item.img} style={styles.image} />
      <View style={styles.ovalContainer}>
        <Text style={styles.text} numberOfLines={1} ellipsizeMode="tail">{item.nombre}</Text>
        <Text style={styles.quantity}>Cantidad: {item.cantidad}</Text>
      </View>
      {/* Botones para aumentar/disminuir cantidad */}
      <View style={styles.cantidadButtonsContainer}>
        <TouchableOpacity onPress={() => disminuirCantidad(item.id)}>
          <Icon name="remove-circle-outline" size={24} color="white" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => aumentarCantidad(item.id)}>
          <Icon name="add-circle-outline" size={24} color="white" />
        </TouchableOpacity>
      </View>
      {/* Botón para eliminar un alimento (alternativa al botón general) */}
      <TouchableOpacity onPress={() => toggleSeleccionado(item.id)} style={styles.trashIconContainer}>
        <Icon name="delete" size={24} color={item.seleccionado ? 'red' : 'white'} />
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.buttonsContainer}>
        <TouchableOpacity onPress={() => setModalVisible(true)} style={styles.addButton}>
          <Icon name="add-circle-outline" size={24} color="#fff" />
          <Text style={styles.buttonText}>Agregar alimento</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={eliminarAlimento} style={styles.removeButton}>
          <Icon name="remove-circle-outline" size={24} color="#fff" />
          <Text style={styles.buttonText}>Eliminar alimento</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={alimentos}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        numColumns={3}
        contentContainerStyle={styles.grid}
      />

      {/* Modal de selección de categorías */}
      <Modal animationType="slide" transparent={true} visible={isModalVisible} onRequestClose={() => setModalVisible(false)}>
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
            <TouchableOpacity style={styles.modalCloseButton} onPress={() => setModalVisible(false)}>
              <Text style={styles.modalCloseButtonText}>Cerrar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Modal de ingredientes */}
      <Modal animationType="slide" transparent={true} visible={ingredientModalVisible} onRequestClose={() => setIngredientModalVisible(false)}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Selecciona un {selectedCategory}</Text>
            <TextInput
              style={styles.searchInput}
              placeholder="Buscar ingrediente..."
              value={searchTerm}
              onChangeText={(text) => setSearchTerm(text)}
            />
            <View style={styles.modalOptions}>
              {currentIngredients.map((ingredient, index) => (
                <TouchableOpacity key={index} style={styles.modalIngredientOption} onPress={() => agregarAlimento(ingredient)}>
                  <Image source={{ uri: `https://spoonacular.com/cdn/ingredients_100x100/${ingredient.image}` }} style={styles.ingredientImage} />
                  <Text style={styles.modalOptionText}>{ingredient.name}</Text>
                </TouchableOpacity>
              ))}
            </View>
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

export default AlmacenScreen;