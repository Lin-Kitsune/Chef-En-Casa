import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import CustomDrawerContent from '../screens/Sidebar/CustomDrawerContent'; // Importa el Drawer personalizado
import BottomTabNavigator from './BottomTabNavigator'; // Importa el BottomTabNavigator
import ProfileStackNavigator from './ProfileStackNavigator'; // Puedes agregar otros stacks como Profile

const Drawer = createDrawerNavigator();

const DrawerNavigator = () => {
  return (
    <Drawer.Navigator
      drawerContent={(props) => <CustomDrawerContent {...props} />} // Sidebar personalizado
      screenOptions={{
        headerShown: false,
        drawerStyle: {
          backgroundColor: '#fff',
          width: 240,
        },
      }}
    >
      {/* El BottomTabNavigator está dentro del Drawer */}
      <Drawer.Screen 
        name="Home" 
        component={BottomTabNavigator} 
        options={{ 
          headerShown: false,
          title: 'Dashboard' }} 
      />
      
      {/* Puedes agregar más pantallas al Drawer si es necesario */}
      <Drawer.Screen 
        name="Profile" 
        component={ProfileStackNavigator} 
        options={{ 
          headerShown: false,
          title: 'Profile' }} 
      />
    </Drawer.Navigator>
  );
};

export default DrawerNavigator;
