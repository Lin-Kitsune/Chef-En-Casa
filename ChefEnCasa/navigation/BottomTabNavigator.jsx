import React from 'react';
import { View, StyleSheet } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/FontAwesome';
import HomeStackNavigator from '../navigation/HomeStackNavigator'; 
import ProfileStackNavigator from '../navigation/ProfileStackNavigator'; 
import SavedScreenStackNavigator from '../navigation/SavedScreenStackNavigator'; 
import BuscadorNavigator from '../navigation/BuscadorNavigator';
import NotificacionNavigator from '../navigation/NotificacionNavigator';

const Tab = createBottomTabNavigator();

const BottomTabNavigator = () => {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={({ route }) => ({
        tabBarActiveTintColor: '#ffffff',
        tabBarInactiveTintColor: '#cfcfcf',
        tabBarStyle: ((route) => {
          const routeName = route?.state?.routes[route.state.index]?.name ?? '';
          if (routeName === 'Recipe') {
            return { display: 'none' };  // Oculta el Bottom Tab Navigator en la pantalla de recetas
          }
          return {
            backgroundColor: '#619537',
            height: 70,
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
            position: 'absolute',
            bottom: 10,
            left: 10,
            right: 10,
            elevation: 5,
            paddingBottom: 5,
            paddingTop: 5,
          };
        })(route),        
        headerShown: false,
        tabBarIcon: ({ color }) => {
          let iconName;
          if (route.name === 'Buscar') {
            iconName = 'search';
          } else if (route.name === 'Favoritos') {
            iconName = 'bookmark';
          } else if (route.name === 'Home') {
            iconName = 'home';
          } else if (route.name === 'Notificaciones') {
            iconName = 'bell';
          } else if (route.name === 'Perfil') {
            iconName = 'user';
          }

          return (
            <View style={route.name === 'Home' ? styles.homeIconContainer : null}>
              <Icon name={iconName} size={route.name === 'Home' ? 40 : 24} color={color} />
            </View>
          );
        },
        tabBarLabel: route.name === 'Home' ? () => null : undefined,  // Ocultar el título de Home
      })}
    >
      <Tab.Screen name="Buscar" component={BuscadorNavigator} />
      <Tab.Screen name="Favoritos" component={SavedScreenStackNavigator} />
      <Tab.Screen name="Home" component={HomeStackNavigator} />
      <Tab.Screen name="Notificaciones" component={NotificacionNavigator} />
      <Tab.Screen name="Perfil" component={ProfileStackNavigator} />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  homeIconContainer: {
    backgroundColor: '#619537',
    padding: 10,
    borderRadius: 35,
    borderWidth: 3,
    borderColor: '#ffffff',
    marginTop: -25,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default BottomTabNavigator;
