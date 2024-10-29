import React from 'react';
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import BuscadorScreen from '../screens/BuscadorScreen/BuscadorScreen';
import RecipeDetailScreen from '../screens/RecipeDetailScreen/RecipeDetailScreen'; // Importa la pantalla de detalles

const Stack = createStackNavigator();

const BuscadorNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="BuscadorScreen"
        component={BuscadorScreen}
        options={{ title: 'Buscar Recetas' }}
      />
      <Stack.Screen
        name="RecipeDetail"
        component={RecipeDetailScreen} // Registra la pantalla de detalles aquí
        options={{ title: 'Detalles de la Receta' }}
      />
    </Stack.Navigator>
  );
};

export default BuscadorNavigator;
