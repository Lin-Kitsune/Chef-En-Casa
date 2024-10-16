import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from '../screens/HomeScreen/HomeScreen';
import DesayunoScreen from '../screens/DesayunoScreen/DesayunoScreen';
import RecipeScreen from '../screens/RecipeScreen/RecipeScreen';
import ShoppingListScreen from '../screens/ShoppingListScreen/ShoppingListScreen';
import AlmacenScreen from '../screens/AlmacenScreen/AlmacenScreen';
import MetaScreen from '../screens/MetaScreen/MetaScreen';
import AlmuerzoScreen from '../screens/AlmuerzoScreen/AlmuerzoScreen';
import CenaScreen from '../screens/CenaScreen/CenaScreen';
import ReposteriaScreen from '../screens/ReposteriaScreen/ReposteriaScreen';
import TendenciaScreen from '../screens/TendenciaScreen/TendenciaScreen';

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
      <Stack.Screen 
        name="Almuerzo" 
        component={AlmuerzoScreen} 
        options={{
          title: 'ALMUERZO',
          headerStyle: {
            backgroundColor: '#619537',
          },
          headerTintColor: '#fff',
          headerTitleAlign: 'center',
        }}
      />
      <Stack.Screen 
        name="Cena" 
        component={CenaScreen} 
        options={{
          title: 'CENA',
          headerStyle: {
            backgroundColor: '#619537',
          },
          headerTintColor: '#fff',
          headerTitleAlign: 'center',
        }}
      />
      <Stack.Screen 
        name="Reposteria" 
        component={ReposteriaScreen} 
        options={{
          title: 'REPOSTERIA',
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
        options={{
          headerShown: false,  // Oculta el header
          tabBarStyle: { display: 'none' }  // Asegura que el Bottom Tab esté oculto
        }}
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
      <Stack.Screen
      name="Almacen"
      component={AlmacenScreen} 
      options={{
        title: 'ALMACÉN',
        headerStyle: {
          backgroundColor: '#619537',
        },
        headerTintColor: '#fff',
        headerTitleAlign: 'center',
      }}/>
      <Stack.Screen
      name="Meta" 
      component={MetaScreen}
      options={{
        title: 'META',
        headerStyle: {
          backgroundColor: '#619537',
        },
        headerTintColor: '#fff',
        headerTitleAlign: 'center',
      }}
      />
      <Stack.Screen 
        name="Tendencias" 
        component={TendenciaScreen} 
        options={{
          title: 'TENDENCIAS',
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
