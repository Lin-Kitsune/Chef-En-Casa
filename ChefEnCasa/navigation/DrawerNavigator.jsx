import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import CustomDrawerContent from '../screens/Sidebar/CustomDrawerContent'; 
import NewsScreen from '../screens/NewsScreen/NewsScreen';
import BottomTabNavigator from './BottomTabNavigator'; 
import { createStackNavigator } from '@react-navigation/stack';
import PointsStack from './PointsStack'; 

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
        component={BottomTabNavigator} 
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
    </Drawer.Navigator>
  );
};

export default DrawerNavigator;
