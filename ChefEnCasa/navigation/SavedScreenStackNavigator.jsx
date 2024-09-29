import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import SavedScreen from '../screens/SavedScreen/SavedScreen';

const Stack = createStackNavigator();

const SavedScreenStackNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="SavedScreen"
        component={SavedScreen}
        options={{
          title: 'GUARDADOS',
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

export default SavedScreenStackNavigator;
