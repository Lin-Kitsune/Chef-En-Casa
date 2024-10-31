import React, { useState, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity, FlatList, Modal, TextInput, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import styles from './AlmacenStyles';
import { fetchIngredients } from '../../services/ingredients';
import { fetchAlmacen, addIngredientsToAlmacen, deleteIngredientFromAlmacen, 
  reduceIngredientFromAlmacen, increaseIngredientInAlmacen } from '../../services/almacen'; 


const AlmacenScreen = () => {
  const [alimentos, setAlimentos] = useState([]);
  const [isModalVisible, setModalVisible] = useState(false);
  const [ingredientModalVisible, setIngredientModalVisible] = useState(false);
  const [availableIngredients, setAvailableIngredients] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  /// Función para obtener los ingredientes del almacén desde la API
const obtenerAlmacen = async () => {
  try {
    const almacenData = await fetchAlmacen(); // Llamada al servicio
    const alimentosConId = almacenData.ingredientes.map((item, index) => ({
      ...item,
      id: item.id || index.toString(), // Asigna un ID temporal si no existe
    }));
    setAlimentos(alimentosConId); // Actualizamos el estado con los ingredientes obtenidos
  } catch (error) {
    Alert.alert('Error', 'No se pudo obtener el almacén');
  }
};

  // Validar si el ingrediente es válido
  const esIngredienteValido = (nombre) => {
    return Object.keys(ingredientesMap).includes(nombre.toLowerCase());
  };

  // Ejemplo de función ajustada para traducir el nombre
const traducirIngredienteAIngles = (nombre) => {
  // Verificar si existe una traducción en el objeto del ingrediente obtenido de la base de datos
  const ingredienteEncontrado = availableIngredients.find(ing => ing.nombreEspanol.toLowerCase() === nombre.toLowerCase());
  return ingredienteEncontrado ? ingredienteEncontrado.nombreOriginal : nombre; // Usar el nombre original si no se encuentra la traducción
};

  // Función para agregar el ingrediente
  const agregarAlimento = async (ingredient) => {
    console.log('Ingrediente seleccionado:', ingredient); // Verificar el contenido del objeto
  
    if (!ingredient || !ingredient.nombreEspanol) {
      Alert.alert('Error', 'El ingrediente seleccionado no es válido');
      return;
    }
  
    const newAlimento = {
      nombre: ingredient.nombreEspanol.toUpperCase(),
      nombreEspanol: ingredient.nombreEspanol,
      cantidad: 1,
      unidad: 'gram',
      img: ingredient.image || 'default_image.jpg', // Usar imagen por defecto si no existe
      perecedero: ingredient.perecedero || false
    };
  
    try {
      await addIngredientsToAlmacen([newAlimento]);
      obtenerAlmacen(); // Actualizar el listado de alimentos
      setIngredientModalVisible(false); // Cerrar el modal
    } catch (error) {
      Alert.alert('Error', 'No se pudo agregar el ingrediente');
      console.error('Error al agregar el ingrediente:', error);
    }
  };

  // Función para eliminar el ingrediente
  const eliminarAlimento = async () => {
    const ingredientesSeleccionados = alimentos.filter(alimento => alimento.seleccionado);

    // Recorre los ingredientes seleccionados y elimina cada uno del backend
    for (const alimento of ingredientesSeleccionados) {
      try {
        await deleteIngredientFromAlmacen(alimento.nombre); // Eliminar en el backend
      } catch (error) {
        Alert.alert('Error', `No se pudo eliminar el ingrediente: ${alimento.nombre}`);
        return;
      }
    }

    // Si la eliminación en el backend fue exitosa, actualiza el estado en el frontend
    setAlimentos(alimentos.filter(alimento => !alimento.seleccionado));
  };

  // Función para seleccionar/deseleccionar alimentos
  const toggleSeleccionado = (id) => {
    setAlimentos(alimentos.map(alimento => alimento.id === id ? { ...alimento, seleccionado: !alimento.seleccionado } : alimento));
  };

  // Función para aumentar la cantidad de un ingrediente en el almacén
  const aumentarCantidad = async (nombreIngrediente, id) => {
    try {
      const cantidadAumentar = 1; // Siempre aumentas de a 1 unidad
      await increaseIngredientInAlmacen(nombreIngrediente, cantidadAumentar); // Llama a tu API para aumentar la cantidad
      setAlimentos(alimentos.map(alimento => 
        alimento.id === id ? { ...alimento, cantidad: alimento.cantidad + 1 } : alimento
      ));
    } catch (error) {
      Alert.alert('Error', 'No se pudo aumentar la cantidad del ingrediente');
      console.error('Error al aumentar la cantidad:', error);
    }
  };

  // Función para reducir la cantidad de un ingrediente
  const disminuirCantidad = async (nombreIngrediente, id) => {
    try {
      const cantidadReducir = 1; // Siempre reduces de a 1 unidad
      const alimento = alimentos.find(alimento => alimento.id === id);
  
      // Verificar si se puede reducir antes de llamar a la API
      if (alimento.cantidad > 1) {
        await reduceIngredientFromAlmacen(nombreIngrediente, cantidadReducir); // Llama a tu API para reducir la cantidad
        setAlimentos(alimentos.map(alimento => 
          alimento.id === id ? { ...alimento, cantidad: alimento.cantidad - 1 } : alimento
        ));
      } else {
        Alert.alert('Error', 'No se puede reducir más la cantidad de este ingrediente.');
      }
    } catch (error) {
      Alert.alert('Error', 'No se pudo reducir la cantidad del ingrediente');
      console.error('Error al reducir la cantidad:', error);
    }
  };

  // Llamada para generar notificaciones de ingredientes agotados
  const generarNotificaciones = async () => {
    try {
      const token = await AsyncStorage.getItem('userToken');
      await axios.post('http://10.0.2.2:4000/notificaciones/generar', {}, {
        headers: { Authorization: `Bearer ${token}` }
      });
    } catch (error) {
      console.error('Error al generar notificación:', error.message);
    }
  };

  useEffect(() => {
    generarNotificaciones(); // Llama a esta función al montar la pantalla
  }, []);

  const openIngredientModal = (category) => {
    setSearchTerm('');
    setSelectedCategory(category);
    fetchIngredientsList();
    setIngredientModalVisible(true);
  };

  const fetchIngredientsList = async () => {
    try {
      const response = await fetchIngredients();
      console.log('Respuesta de la API:', response);
      if (response) {
        setAvailableIngredients(response); // Actualiza para manejar la respuesta directa
      } else {
        throw new Error('Formato de respuesta no válido');
      }
    } catch (error) {
      Alert.alert('Error', 'No se pudo obtener los ingredientes.');
      console.error('Error al obtener los ingredientes:', error);
    }
  };

  // Lógica de paginación y búsqueda
  const handlePageChange = (newPage) => setCurrentPage(newPage);

  // Lógica de filtrado actualizada para usar nombreEspanol
const filteredIngredients = availableIngredients.filter((ingredient) =>
  ingredient.nombreEspanol && ingredient.nombreEspanol.toLowerCase().includes(searchTerm.toLowerCase()) // Verifica que nombreEspanol existe
);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentIngredients = filteredIngredients.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(filteredIngredients.length / itemsPerPage);
  const paginationButtons = Array.from({ length: totalPages }, (_, i) => i + 1);

  // Ejecutar obtenerAlmacen al montar el componente
  useEffect(() => {
    obtenerAlmacen();
  }, []);

  const renderItem = ({ item }) => {
    const nombreMostrar = item.nombreEspanol || item.nombre;
    const imageUrl = item.img 
      ? `https://spoonacular.com/cdn/ingredients_100x100/${item.img}`
      : 'https://example.com/default_image.jpg'; // Usar URL de imagen por defecto
    
    return (
      <View style={[styles.item, item.seleccionado && styles.itemSeleccionado]}>
        <Image 
          source={{ uri: imageUrl }} 
          style={styles.image} 
        />
        <View style={styles.ovalContainer}>
          <Text style={styles.text} numberOfLines={1} ellipsizeMode="tail">{nombreMostrar}</Text>
          <Text style={styles.quantity}>Cantidad: {item.cantidad} gramos</Text>
        </View>
        <View style={styles.cantidadButtonsContainer}>
          <TouchableOpacity onPress={() => disminuirCantidad(item.nombre, item.id)}>
            <Icon name="remove-circle-outline" size={24} color="white" />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => aumentarCantidad(item.nombre, item.id)}>
            <Icon name="add-circle-outline" size={24} color="white" />
          </TouchableOpacity>
        </View>
        <TouchableOpacity onPress={() => toggleSeleccionado(item.id)} style={styles.trashIconContainer}>
          <Icon name="delete" size={24} color={item.seleccionado ? 'red' : 'white'} />
        </TouchableOpacity>
      </View>
    );
  };

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
        keyExtractor={item => item.id ? item.id.toString() : Math.random().toString()}  // Agregar un ID único
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
    <TouchableOpacity 
      key={index} 
      style={styles.modalIngredientOption} 
      onPress={() => agregarAlimento(ingredient)}
    >
      <Image 
        source={{ uri: `https://spoonacular.com/cdn/ingredients_100x100/${ingredient.image}` }} 
        style={styles.ingredientImage} 
      />
      <Text style={styles.modalOptionText}>
        {ingredient.nombreEspanol || ingredient.name || 'Nombre no disponible'}
      </Text>
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
