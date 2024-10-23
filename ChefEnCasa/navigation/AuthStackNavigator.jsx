import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from '../screens/LoginScreen/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen/RegisterScreen';

const Stack = createStackNavigator();

const AuthStackNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Login"
        component={LoginScreen}
        options={{
            title: 'INICIAR SESION',
            headerStyle: {
              backgroundColor: '#619537',
            },
            headerTintColor: '#fff',
            headerTitleAlign: 'center',
          }}
      />
      <Stack.Screen
        name="Register"
        component={RegisterScreen}
        options={{
            title: 'REGISTRARSE',
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

const handleLogout = async () => {
  try {
    await AsyncStorage.removeItem('userToken'); // Eliminar el token de AsyncStorage
    
    // Cambiar al stack de autenticación
    navigation.dispatch({
      type: 'RESET',
      index: 0,
      routes: [{ name: 'Login' }],  // Asegúrate de que 'Login' está registrado en el AuthStackNavigator
    });
    
  } catch (error) {
    console.error('Error al cerrar sesión:', error);
  }
};

export default AuthStackNavigator;
