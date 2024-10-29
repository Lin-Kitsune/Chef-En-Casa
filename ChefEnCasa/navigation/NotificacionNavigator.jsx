// navigation/NotificacionNavigator.js
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import NotificationsScreen from '../screens/NotificationsScreen/NotificationsScreen';

const Stack = createStackNavigator();

const NotificacionNavigator = () => {
  return ( // Asegúrate de que Stack.Navigator esté dentro de un "return"
    <Stack.Navigator>
      <Stack.Screen 
        name="Notifications" 
        component={NotificationsScreen} 
        options={{
            title: 'NOTIFICACIONES',
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

export default NotificacionNavigator;
