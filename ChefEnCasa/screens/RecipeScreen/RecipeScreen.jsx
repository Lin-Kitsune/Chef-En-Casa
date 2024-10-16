import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Image, ScrollView, Modal } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import styles from './RecipeScreenStyles';

const RecipeScreen = ({ route, navigation }) => {
  const { title, image, ingredients, instructions } = route.params;

  // Estado para ingredientes seleccionados
  const [checkedIngredients, setCheckedIngredients] = useState(Array(ingredients.length).fill(false));

  // Estado para el modal de calificación
  const [modalVisible, setModalVisible] = useState(false);
  const [rating, setRating] = useState(0);  // Valoración seleccionada

  const toggleCheck = (index) => {
    const newCheckedIngredients = [...checkedIngredients];
    newCheckedIngredients[index] = !newCheckedIngredients[index];
    setCheckedIngredients(newCheckedIngredients);
  };

  // Función para manejar la calificación por estrellas
  const handleRating = (star) => {
    setRating(star);
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        {/* Image Container */}
        <View style={styles.imageContainer}>
          <Image source={image} style={styles.recipeImage} />
          
          {/* Floating Back Button */}
          <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
            <Icon name="arrow-left" size={24} color="#fff" />
          </TouchableOpacity>

          {/* Floating Favorite Button */}
          <TouchableOpacity style={styles.favoriteButton}>
            <Icon name="heart" size={24} color="#f44336" />
          </TouchableOpacity>

          {/* Floating Share Button */}
          <TouchableOpacity style={styles.shareButton} onPress={() => { /* lógica de compartir */ }}>
            <Icon name="share-alt" size={24} color="#fff" />
          </TouchableOpacity>
        </View>

        {/* Content Overlay */}
        <View style={styles.overlayContainer}>
          <Text style={styles.recipeTitle}>{title}</Text>

          {/* Ingredients Section */}
          <Text style={styles.sectionTitle}>Ingredientes:</Text>
          {ingredients.map((ingredient, index) => (
            <TouchableOpacity
              key={index}
              style={styles.ingredientItem}
              onPress={() => toggleCheck(index)}
            >
              <Icon
                name={checkedIngredients[index] ? "check-square" : "square-o"}
                size={20}
                color={checkedIngredients[index] ? "#619537" : "#888"}
                style={styles.checkIcon}
              />
              <Text style={checkedIngredients[index] ? styles.ingredientChecked : styles.ingredientText}>
                {ingredient}
              </Text>
            </TouchableOpacity>
          ))}

          {/* Instructions Section */}
          <Text style={styles.sectionTitle}>Cómo hacer {title.toLowerCase()}:</Text>
          {Array.isArray(instructions) && instructions.map((step, index) => (
            <View key={index} style={styles.instructionItem}>
              <View style={styles.instructionNumber}>
                <Text style={styles.instructionNumberText}>{index + 1}</Text>
              </View>
              <Text style={styles.instructionsText}>{step}</Text>
            </View>
          ))}
            <TouchableOpacity style={styles.finishButton} onPress={() => setModalVisible(true)}>
              <Text style={styles.finishButtonText}>RECETA TERMINADA</Text>
            </TouchableOpacity>
            {/* Espacio en blanco adicional */}
             <View style={{ height: 30 }} />
        </View>

        {/* Modal para la calificación */}
        <Modal
          visible={modalVisible}
          transparent={true}
          animationType="slide"
          onRequestClose={() => setModalVisible(false)}
        >
          <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>Califica la receta</Text>
              
              <View style={styles.starsContainer}>
                {Array.from({ length: 5 }, (_, index) => (
                  <TouchableOpacity key={index} onPress={() => handleRating(index + 1)}>
                    <Icon 
                      name={index < rating ? "star" : "star-o"} 
                      size={32} 
                      color="#FFD700" 
                      style={styles.starIcon}
                    />
                  </TouchableOpacity>
                ))}
              </View>

              <TouchableOpacity 
                style={styles.submitRatingButton} 
                onPress={() => {
                  // Lógica para enviar la calificación al backend
                  setModalVisible(false);
                  alert(`Calificaste con ${rating} estrellas`);
                }}
              >
                <Text style={styles.submitRatingText}>Enviar Calificación</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </ScrollView>
    </View>
  );
};

export default RecipeScreen;

