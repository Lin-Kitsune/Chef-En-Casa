import React from 'react';
import { TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { createStackNavigator } from '@react-navigation/stack';
import PointsScreen from '../screens/PointsScreen/PointsScreen'; // Pantalla de puntos

const Stack = createStackNavigator();

const PointsStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen 
        name="PointsScreen" 
        component={PointsScreen} 
        options={({ navigation }) => ({
          title: 'PUNTOS',
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

export default PointsStack;
