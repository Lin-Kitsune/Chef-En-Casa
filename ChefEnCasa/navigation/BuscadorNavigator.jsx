import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import BuscadorScreen from '../screens/BuscadorScreen/BuscadorScreen';

const Stack = createStackNavigator();

const BuscadorNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="BuscadorScreen"
        component={BuscadorScreen}
        options={{
          title: 'BUSCAR',
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

export default BuscadorNavigator;