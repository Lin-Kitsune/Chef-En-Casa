import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from '../screens/HomeScreen/HomeScreen';
import DesayunoScreen from '../screens/DesayunoScreen/DesayunoScreen';
import RecipeScreen from '../screens/RecipeScreen/RecipeScreen';
import ShoppingListScreen from '../screens/ShoppingListScreen/ShoppingListScreen';

const Stack = createStackNavigator();

const HomeStackNavigator = () => {
  return (
    <Stack.Navigator>
      {/* Cambiar el nombre de la pantalla "Home" a "HomeScreen" */}
      <Stack.Screen 
        name="HomeScreen"  // Cambia de "Home" a "HomeScreen"
        component={HomeScreen} 
        options={{ 
          headerShown: false 
        }}  
      />
      <Stack.Screen 
        name="Desayuno" 
        component={DesayunoScreen} 
        options={{
          title: 'DESAYUNO',
          headerStyle: {
            backgroundColor: '#619537',
          },
          headerTintColor: '#fff',
          headerTitleAlign: 'center',
        }}
      />
      {/* RecipeScreen con el header oculto */}
      <Stack.Screen 
        name="Recipe" 
        component={RecipeScreen}
        options={{ headerShown: false }}  // Ocultar el header en Recipe
      />
      <Stack.Screen 
        name="ShoppingList" 
        component={ShoppingListScreen} 
        options={{
          title: 'Lista de Compras',
          headerStyle: {
            backgroundColor: '#619537',
          },
          headerTintColor: '#fff',
          headerTitleAlign: 'center',
        }}
      />
    </Stack.Navigator>
  );
};

export default HomeStackNavigator;
