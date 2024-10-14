import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { TouchableOpacity } from 'react-native'; 
import Icon from 'react-native-vector-icons/FontAwesome';  
import CustomDrawerContent from '../screens/Sidebar/CustomDrawerContent'; // Importa el Drawer personalizado
import NewsScreen from '../screens/NewsScreen/NewsScreen';
import BottomTabNavigator from './BottomTabNavigator'; // Importa el BottomTabNavigator
import { createStackNavigator } from '@react-navigation/stack';  // Importa Stack Navigator para manejar el header con flecha

const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();

const NewsStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen 
        name="NewsScreen" 
        component={NewsScreen} 
        options={({ navigation }) => ({
          title: 'NOTICIAS',
          headerStyle: {
            backgroundColor: '#619537',
          },
          headerTintColor: '#fff',
          headerTitleAlign: 'center',
          // Mostrar la flecha de retroceso
          headerLeft: () => (
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Icon name="arrow-left" size={24} color="#fff" style={{ marginLeft: 10 }} />
            </TouchableOpacity>
          ),
        })}
      />
    </Stack.Navigator>
  );
};

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
          title: 'Dashboard' 
        }} 
      />
      
      {/* Usa NewsStack para manejar la pantalla de noticias */}
      <Drawer.Screen 
        name="NewsStack" 
        component={NewsStack} 
        options={{
          headerShown: false, // El header se maneja en el NewsStack
        }}
      />
    </Drawer.Navigator>
  );
};

export default DrawerNavigator;
