import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import BottomTabNavigator from './navigation/BottomTabNavigator'; 

const App = () => {
  return (
    <NavigationContainer>
      <BottomTabNavigator /> 
    </NavigationContainer>
  );
};

export default App;
