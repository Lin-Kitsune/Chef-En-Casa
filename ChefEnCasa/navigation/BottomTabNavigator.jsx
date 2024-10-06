import React from 'react';
import { View, StyleSheet } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/FontAwesome';
import HomeScreen from '../screens/HomeScreen/HomeScreen';
import HomeStackNavigator from '../navigation/HomeStackNavigator'; 
import ProfileStackNavigator from '../navigation/ProfileStackNavigator'; 
import SavedScreenStackNavigator from '../navigation/SavedScreenStackNavigator'; 
import BuscadorNavigator from '../navigation/BuscadorNavigator';

const Tab = createBottomTabNavigator();

const BottomTabNavigator = () => {
  return (
    <Tab.Navigator
    initialRouteName='Home'
      screenOptions={({ route }) => ({
        tabBarActiveTintColor: '#ffffff',
        tabBarInactiveTintColor: '#cfcfcf',
        tabBarStyle: {
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
        },
        tabBarIcon: ({ color }) => {
          let iconName;
          if (route.name === 'Buscar') {
            iconName = 'search';
          } else if (route.name === 'Marcadores') {
            iconName = 'bookmark';
          } else if (route.name === 'Home') {
            iconName = 'home';
          } else if (route.name === 'Recetas') {
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
        tabBarLabel: () => null,
      })}
    >
      <Tab.Screen name="Buscar" component={BuscadorNavigator} />
      <Tab.Screen name="Marcadores" component={SavedScreenStackNavigator} />
      <Tab.Screen name="Home" component={HomeStackNavigator} />
      <Tab.Screen name="Recetas" component={HomeScreen} />
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
    borderColor: '#ffffff',  // Color del borde alrededor del ícono Home
    marginTop: -25,  // Eleva el ícono Home
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default BottomTabNavigator;
