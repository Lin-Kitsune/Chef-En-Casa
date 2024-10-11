import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Image, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import styles from './RecipeScreenStyles';  // Los estilos actualizados

const RecipeScreen = ({ route, navigation }) => {
  const { title, image, ingredients, instructions } = route.params;
  
  // Verifica si instructions está llegando como array
  console.log('Instructions received:', instructions);

  const [checkedIngredients, setCheckedIngredients] = useState(Array(ingredients.length).fill(false));

  const toggleCheck = (index) => {
    const newCheckedIngredients = [...checkedIngredients];
    newCheckedIngredients[index] = !newCheckedIngredients[index];
    setCheckedIngredients(newCheckedIngredients);
  };

   // Función para compartir la receta
   const onShare = async () => {
    try {
      const result = await Share.share({
        message: `Mira esta increíble receta de ${title}!`,
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          console.log('Compartido con éxito con actividad: ', result.activityType);
        } else {
          console.log('Compartido con éxito');
        }
      } else if (result.action === Share.dismissedAction) {
        console.log('Compartir descartado');
      }
    } catch (error) {
      console.error('Error al compartir: ', error.message);
    }
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

          {/* Floating Share Button - Botón flotante de compartir */}
          <TouchableOpacity style={styles.shareButton} onPress={onShare}>
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
        </View>
      </ScrollView>
    </View>
  );
};
export default RecipeScreen;
