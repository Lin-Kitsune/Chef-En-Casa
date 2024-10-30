import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import SavedScreen from '../screens/SavedScreen/SavedScreen';
import RecipeDetailScreen from '../screens/RecipeDetailScreen/RecipeDetailScreen';

const Stack = createStackNavigator();

const SavedScreenStackNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen 
        name="SavedScreen" 
        component={SavedScreen} 
        options={{ headerShown: false }}
      />
      <Stack.Screen 
        name="RecipeDetail" 
        component={RecipeDetailScreen} 
        options={{ title: 'Detalle de la Receta' }} 
      />
    </Stack.Navigator>
  );
};

export default SavedScreenStackNavigator;
