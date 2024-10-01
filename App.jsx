import 'react-native-gesture-handler';
import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator, CardStyleInterpolators } from '@react-navigation/stack';
import SplashScreen from './screens/SplashScreen/SplashScreen';  // Pantalla de Splash
import LoginScreen from './screens/LoginScreen/LoginScreen';  // Pantalla de Login
import RegisterScreen from './screens/RegisterScreen/RegisterScreen';  // Pantalla de Registro
import BottomTabNavigator from './navigation/BottomTabNavigator';  // Navegación principal

const Stack = createStackNavigator();

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false); // Estado de autenticación

  const handleLoginSuccess = () => {
    setIsAuthenticated(true); // Marcar como autenticado cuando el login sea exitoso
  };

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
          cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,  // Estilo de animación deslizante
        }}
      >
        {!isAuthenticated ? (
          <>
            <Stack.Screen name="Splash" component={SplashScreen} />
            <Stack.Screen name="Register" component={RegisterScreen} />
            <Stack.Screen name="Login">
              {props => <LoginScreen {...props} onLoginSuccess={handleLoginSuccess} />}
            </Stack.Screen>
          </>
        ) : (
          <Stack.Screen name="MainApp" component={BottomTabNavigator} options={{ headerShown: false }} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
