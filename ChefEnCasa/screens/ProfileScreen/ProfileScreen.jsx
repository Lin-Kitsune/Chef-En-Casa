import React, { useState, useEffect } from 'react'; // Añade useState aquí
import { View, Text, TouchableOpacity, Image, FlatList, Modal, TextInput } from 'react-native';
import { Picker } from '@react-native-picker/picker'; 
import Icon from 'react-native-vector-icons/FontAwesome';
import styles from './ProfileScreenStyles';
import healthStyles from './healthStyles';
import { fetchIngredients } from '../../services/ingredients';

const recentRecipes = [
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
    title: 'Omelet',
    rating: 5,
    reviews: 7,
    time: '5 minutos',
    servings: 1,
    image: require('../../assets/images/omelet.jpg'),
  },
];

const ProfileScreen = ({ navigation }) => {
  // Estado para los modales
  const [allergyModalVisible, setAllergyModalVisible] = useState(false);
  const [healthModalVisible, setHealthModalVisible] = useState(false);
  const [allergySearch, setAllergySearch] = useState('');
  const [selectedAllergies, setSelectedAllergies] = useState([]);
  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');
  const [fc, setFC] = useState('');  // Frecuencia cardíaca
  const [imc, setIMC] = useState(null);
  const [availableIngredients, setAvailableIngredients] = useState([]);
  const [currentPage, setCurrentPage] = useState(1); 
  const itemsPerPage = 6; 
  const ingredients = ['Leche', 'Huevo', 'Nueces', 'Gluten', 'Pescado', 'Mariscos'];
  const [dietRecommendation, setDietRecommendation] = useState(''); // Estado para la recomendación de dieta
  const [selectedDiet, setSelectedDiet] = useState('Equilibrada');

  const toggleAllergyModal = () => setAllergyModalVisible(!allergyModalVisible);
  const toggleHealthModal = () => setHealthModalVisible(!healthModalVisible);

  // Función para obtener ingredientes desde la API
  const fetchIngredientsList = async () => {
    try {
      const ingredients = await fetchIngredients();  // Llama a la API desde el servicio
      setAvailableIngredients(ingredients);  // Actualiza el estado con los ingredientes
    } catch (error) {
      Alert.alert("Error", "No se pudo obtener los ingredientes.");
      console.error('Error al obtener los ingredientes:', error);
    }
  };

  useEffect(() => {
    fetchIngredientsList();  
  }, []);

  const handlePageChange = (newPage) => setCurrentPage(newPage);

  const filteredIngredients = availableIngredients.filter((ingredient) =>
    ingredient?.name?.toLowerCase().includes(allergySearch.toLowerCase())
  );

  const handleSelectIngredient = (ingredientId) => {
    if (selectedAllergies.includes(ingredientId)) {
      setSelectedAllergies(selectedAllergies.filter(id => id !== ingredientId));
    } else {
      setSelectedAllergies([...selectedAllergies, ingredientId]);
    }
  };  

  const totalPages = Math.ceil(filteredIngredients.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentIngredients = filteredIngredients.slice(indexOfFirstItem, indexOfLastItem);

  const renderIngredient = ({ item }) => (
    <TouchableOpacity style={styles.ingredientOption} onPress={() => setSelectedAllergies([...selectedAllergies, item])}>
      <Image source={{ uri: `https://spoonacular.com/cdn/ingredients_100x100/${item.image}` }} style={styles.ingredientImage} />
      <Text style={styles.ingredientText}>{item.name}</Text>
    </TouchableOpacity>
  );

  const calculateIMC = () => {
    if (weight && height) {
      const heightInMeters = height / 100;
      const calculatedIMC = (weight / (heightInMeters * heightInMeters)).toFixed(1);
      setIMC(calculatedIMC);
      recommendDiet(calculatedIMC);  // Llamamos a la función para recomendar una dieta
    }
  };

  const recommendDiet = (imcValue) => {
    let recommendation = '';
    if (imcValue < 18.5) {
      recommendation = 'Subir masa muscular';
    } else if (imcValue >= 18.5 && imcValue < 24.9) {
      recommendation = 'Dieta equilibrada';
    } else {
      recommendation = 'Bajar de peso';
    }
    setDietRecommendation(recommendation);
    setSelectedDiet(recommendation);  // Asignamos la recomendación como valor predeterminado
  };
  ///Nuevo
  const calculateWeightRange = (height) => {
    if (!height) return '';
    const heightInMeters = height / 100;
    const minWeight = (18.5 * Math.pow(heightInMeters, 2)).toFixed(1);
    const maxWeight = (24.9 * Math.pow(heightInMeters, 2)).toFixed(1);
    return `${minWeight} kg a ${maxWeight} kg`;
  };  

  const renderRecipeItem = ({ item }) => (
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
        <TouchableOpacity style={styles.recipeButton}>
          <Text style={styles.recipeButtonText}>Comenzar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Información del usuario */}
      <View style={styles.profileInfoContainer}>
        <Image
          source={require('../../assets/images/user-avatar.png')}
          style={styles.profileImage}
        />
        <Text style={styles.profileName}>USUARIO</Text>
        <TouchableOpacity 
            style={styles.editButton} 
            onPress={() => navigation.navigate('EditProfile')} // Navegar a la pantalla de edición de perfil
            >
            <Icon name="edit" size={16} color="#fff" />
            <Text style={styles.editButtonText}>EDITAR DATOS CUENTA</Text>
        </TouchableOpacity>
      </View>
      {/* Botones para Alergia y Salud */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.allergyButton} onPress={toggleAllergyModal}>
          <View style={styles.iconAndText}>
            <Icon name="exclamation-triangle" size={20} color="#fff" style={styles.icon} />
            <Text style={styles.allergyButtonText}>Alergia</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={styles.healthButton} onPress={toggleHealthModal}>
          <View style={styles.iconAndText}>
            <Icon name="heartbeat" size={20} color="#fff" style={styles.icon} />
            <Text style={styles.healthButtonText}>Salud</Text>
          </View>
        </TouchableOpacity>
      </View>

      {/* Modal para Alergia con imágenes y paginación */}
      <Modal visible={allergyModalVisible} transparent={true} animationType="slide">
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>¿A qué ingredientes le tienes alergia?</Text>
            
            <TextInput
              placeholder="Buscar ingredientes"
              value={allergySearch}
              onChangeText={setAllergySearch}
              style={styles.searchInput}
            />
            
            <FlatList
              data={currentIngredients}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={[
                    styles.modalIngredientOption,
                    selectedAllergies.includes(item.id) && styles.ingredientSelected
                  ]}
                  onPress={() => handleSelectIngredient(item.id)}
                >
                  <Image
                    source={{ uri: `https://spoonacular.com/cdn/ingredients_100x100/${item.image}` }}
                    style={styles.ingredientImage}
                  />
                  <Text style={styles.modalOptionText}>{item.name}</Text>
                </TouchableOpacity>
              )}
              keyExtractor={(item) => item.id.toString()}
              numColumns={2}  // Mostrar en 2 columnas
            />

            {/* Paginación */}
            <View style={styles.paginationContainer}>
              {Array.from({ length: totalPages }).map((_, pageIndex) => (
                <TouchableOpacity key={pageIndex} onPress={() => handlePageChange(pageIndex + 1)}>
                  <Text style={styles.pageButtonText}>{pageIndex + 1}</Text>
                </TouchableOpacity>
              ))}
            </View>

            <TouchableOpacity style={styles.modalCloseButton} onPress={() => setAllergyModalVisible(false)}>
              <Text style={styles.modalCloseButtonText}>Aceptar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Modal para Salud */}
      <Modal visible={healthModalVisible} transparent={true} animationType="slide">
        <View style={healthStyles.modalContainer}>
          <View style={healthStyles.modalContent}>
            <Text style={healthStyles.modalTitle}>Datos de Salud</Text>

            <TextInput
              placeholder="Peso (kg)"
              value={weight}
              onChangeText={setWeight}
              style={healthStyles.input}
              keyboardType="numeric"
            />
            <TextInput
              placeholder="Altura (cm)"
              value={height}
              onChangeText={setHeight}
              style={healthStyles.input}
              keyboardType="numeric"
            />

            <TouchableOpacity onPress={calculateIMC} style={healthStyles.calculateButton}>
              <Text style={healthStyles.calculateButtonText}>Calcular IMC</Text>
            </TouchableOpacity>

            {imc && (
              <>
                <Text style={healthStyles.imcResult}>Tu IMC es: {imc}</Text>
                <Text style={healthStyles.recommendationText}>
                  Recomendación de dieta: {dietRecommendation}
                </Text>

                {/* Rango de peso saludable */}
                <View style={healthStyles.imcRangeContainer}>
                  <Text style={healthStyles.imcRangeText}>Rango de peso saludable sugerido:</Text>
                  <Text style={healthStyles.imcRangeValue}>
                    {calculateWeightRange(height)}
                  </Text>
                </View>

                {/* Picker para seleccionar la dieta */}
                <Picker
                  selectedValue={selectedDiet}
                  onValueChange={(itemValue) => setSelectedDiet(itemValue)}
                  style={healthStyles.picker}
                >
                  <Picker.Item label="Dieta equilibrada" value="Equilibrada" />
                  <Picker.Item label="Subir masa muscular" value="Subir masa muscular" />
                  <Picker.Item label="Bajar de peso" value="Bajar de peso" />
                </Picker>
              </>
            )}

            <TouchableOpacity style={healthStyles.closeModalButton} onPress={() => setHealthModalVisible(false)}>
              <Text style={healthStyles.closeModalButtonText}>Aceptar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Recent Recipes */}
      <Text style={styles.recentRecipesTitle}>RECETAS VISTAS RECIENTEMENTE</Text>
      <FlatList
        data={recentRecipes}
        renderItem={renderRecipeItem}
        keyExtractor={(item) => item.id}
        style={styles.recentRecipesList}
      />
    </View>
  );
};

export default ProfileScreen;
