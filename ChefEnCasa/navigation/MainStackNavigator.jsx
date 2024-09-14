import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from '../screens/HomeScreen/HomeScreen';

const Stack = createStackNavigator();

const MainStackNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen 
        name="Home" 
        component={HomeScreen} 
        options={{ headerShown: false }}  // Oculta el encabezado predeterminado
      />
      {/* Aquí puedes agregar más pantallas */}
    </Stack.Navigator>
  );
};

export default MainStackNavigator;
