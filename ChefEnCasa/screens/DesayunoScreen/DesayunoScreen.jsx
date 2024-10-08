import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Image, FlatList, Modal } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import styles from './DesayunoScreenStyles';  

const data = [
  {
    id: '1',
    title: 'Bol con Fruta',
    rating: 4.5,
    reviews: 12,
    time: '5 minutos',
    servings: 2,  
    image: require('../../assets/images/bol-fruta.jpg'),
  },
  {
    id: '2',
    title: 'Smoothie Bowl',
    rating: 5,
    reviews: 9,
    time: '5 minutos',
    servings: 1,
    image: require('../../assets/images/smoothie-bowl.jpg'),
  },
  {
    id: '3',
    title: 'Tostadas de Tomate y Mozzarella',
    rating: 4.5,
    reviews: 15,
    time: '5 minutos',
    servings: 2,
    image: require('../../assets/images/tostadas-tomate.jpg'),
  },
  {
    id: '4',
    title: 'Omelet',
    rating: 5,
    reviews: 7,
    time: '5 minutos',
    servings: 1,
    image: require('../../assets/images/omelet.jpg'),
  },
];
const durations = ['5 minutos', '10 minutos', '15 minutos', '20 minutos', '30 minutos', '40 minutos'];
const portions = ['1 porción', '2 porciones', '3 porciones', '4 porciones'];

const DesayunoScreen = ({ navigation }) => {
  const [filterVisible, setFilterVisible] = useState(false);
  const [selectedDuration, setSelectedDuration] = useState('Selecciona duración');
  const [selectedPortion, setSelectedPortion] = useState('Selecciona porciones');
  const [modalVisible, setModalVisible] = useState(false);
  const [showDurationOptions, setShowDurationOptions] = useState(false);
  const [showPortionOptions, setShowPortionOptions] = useState(false);

  
  const toggleModal = () => {
    setModalVisible(!modalVisible);
  };

  const handleDurationSelect = (duration) => {
    setSelectedDuration(duration);
    setShowDurationOptions(false);
  };

  const handlePortionSelect = (portion) => {
    setSelectedPortion(portion);
    setShowPortionOptions(false);
  };

  const renderItem = ({ item }) => (
    <View style={styles.recipeContainer}>
      <Image source={item.image} style={styles.recipeImage} />
      <View style={styles.recipeInfo}>
        <Text style={styles.recipeTitle}>{item.title}</Text>
        <View style={styles.recipeDetails}>
          <Text style={styles.recipeRating}>
            ⭐ {item.rating} ({item.reviews} reseñas)
          </Text>
          <Text style={styles.recipeServings}>
            <Icon name="cutlery" size={14} color="#888" /> {item.servings}
          </Text>
          <Text style={styles.recipeTime}>⏱ {item.time}</Text>
        </View>
        <TouchableOpacity 
          style={styles.recipeButton}
          onPress={() => navigation.navigate('Recipe', {
            title: item.title,
            image: item.image,
            ingredients: ['1 Mango', '1 Plátano', '150g Yogur natural', '2 Fresas', '4 Arándanos', '1/2 cdt Cúrcuma molida', 'Ralladura limón'],
            instructions: ['Cortar y pelar el mango para sacar la pulpa.', 'Mezclar las frutas en un bol con el yogur.', 'Servir inmediatamente.'],
          })}>
          <Text style={styles.recipeButtonText}>Comenzar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
  
  const clearFilters = () => {
    setSelectedDuration('Selecciona duración');
    setSelectedPortion('Selecciona porciones');
  };

  const applyFilter = () => {
    // Lógica para filtrar las recetas según el tiempo y las porciones seleccionadas
    setFilterVisible(false);
  };

  const renderOption = (option, selectedValue, onSelect) => (
    <TouchableOpacity
      style={option === selectedValue ? styles.selectedOption : styles.filterOption}
      onPress={() => onSelect(option)}>
      <Text style={option === selectedValue ? styles.selectedText : styles.optionText}>{option}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
       {/* Botón para abrir el modal de filtro */}
       <View style={styles.filterContainer}>
        <TouchableOpacity style={styles.filterButton} onPress={toggleModal}>
          <View style={styles.iconAndText}>
            <Icon name="filter" size={16} color="#fff" style={styles.filterIcon} />
            <Text style={styles.filterButtonText}>Filtrar</Text>
          </View>
        </TouchableOpacity>
      </View>

      {/* Modal de Filtros */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={toggleModal}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Filtrar por</Text>

            {/* Selector de duración */}
            <TouchableOpacity
              style={styles.selector}
              onPress={() => setShowDurationOptions(!showDurationOptions)}
            >
              <Text style={styles.selectorText}>{selectedDuration}</Text>
              <Icon name="chevron-down" size={18} color="#619537"/>
            </TouchableOpacity>
            {showDurationOptions && (
              <FlatList
                data={durations}
                renderItem={({ item }) =>
                  renderOption(item, selectedDuration, handleDurationSelect)
                }
                keyExtractor={(item) => item}
                style={styles.optionsContainer}
              />
            )}

            {/* Selector de porciones */}
            <TouchableOpacity
              style={styles.selector}
              onPress={() => setShowPortionOptions(!showPortionOptions)}
            >
              <Text style={styles.selectorText}>{selectedPortion}</Text>
              <Icon name="chevron-down" size={18} color="#619537" />
            </TouchableOpacity>
            {showPortionOptions && (
              <FlatList
                data={portions}
                renderItem={({ item }) =>
                  renderOption(item, selectedPortion, handlePortionSelect)
                }
                keyExtractor={(item) => item}
                style={styles.optionsContainer}
              />
            )}

            {/* Botones de aplicar y cancelar */}
            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={styles.applyButton}
                onPress={applyFilter}
              >
                <Text style={styles.applyButtonText}>Aplicar</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.cancelButton}
                onPress={() => {
                  clearFilters();  // Borrar los filtros seleccionados
                  setModalVisible(false);  // Cerrar el modal
                }}
              >
                <Text style={styles.cancelButtonText}>Cancelar</Text>
              </TouchableOpacity>

            </View>
          </View>
        </View>
      </Modal>

      {/* Lista de recetas */}
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        style={styles.list}
      />
    </View>
  );
};

export default DesayunoScreen;
