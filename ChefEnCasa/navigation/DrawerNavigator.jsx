import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import CustomDrawerContent from '../screens/Sidebar/CustomDrawerContent'; 
import NewsScreen from '../screens/NewsScreen/NewsScreen';
import MetaScreen from '../screens/MetaScreen/MetaScreen';
import BottomTabNavigator from './BottomTabNavigator'; 
import { createStackNavigator } from '@react-navigation/stack';
import PointsStack from './PointsStack'; 
import RecipeDetailScreen from '../screens/RecipeDetailScreen/RecipeDetailScreen'; // Importa RecipeDetailScreen

const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();

// Stack para Home y RecipeDetail
const HomeStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen 
        name="HomeTabs" 
        component={BottomTabNavigator} 
        options={{ headerShown: false }} 
      />
      <Stack.Screen 
        name="RecipeDetail" 
        component={RecipeDetailScreen} 
        options={{ 
          title: 'Detalles de la Receta',
          headerStyle: { backgroundColor: '#619537' },
          headerTintColor: '#fff',
          headerTitleAlign: 'center',
        }} 
      />
    </Stack.Navigator>
  );
};

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

const DrawerNavigator = ({ handleLogout }) => { // Asegúrate de recibir `handleLogout` como prop aquí
  return (
    <Drawer.Navigator
      drawerContent={(props) => <CustomDrawerContent {...props} handleLogout={handleLogout} />} // Pasar `handleLogout` aquí
      screenOptions={{
        headerShown: false,
        drawerStyle: {
          backgroundColor: '#fff',
          width: 240,
        },
      }}
    >
      <Drawer.Screen 
        name="Home" 
        component={HomeStack} // Usa HomeStack que incluye BottomTabNavigator y RecipeDetailScreen
        options={{ 
          headerShown: false,
          title: 'Dashboard' 
        }} 
      />
      
      <Drawer.Screen 
        name="NewsStack" 
        component={NewsStack} 
        options={{
          headerShown: false,
        }}
      />
      
      <Drawer.Screen 
        name="PointsStack" 
        component={PointsStack} 
        options={{ headerShown: false }} 
      />
      {/* Nueva entrada para "Meta" en el menú lateral */}
      <Drawer.Screen 
        name="Meta" 
        component={MetaScreen} 
        options={{
          title: 'Meta',
          headerShown: true,
          headerStyle: { backgroundColor: '#619537' },
          headerTintColor: '#fff',
          headerTitleAlign: 'center',
        }}
      />
    </Drawer.Navigator>
  );
};

export default DrawerNavigator;
