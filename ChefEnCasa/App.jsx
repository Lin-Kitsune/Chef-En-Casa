import 'react-native-gesture-handler'; // Necesario para gestos de navegación
import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator, CardStyleInterpolators } from '@react-navigation/stack';
import SplashScreen from './screens/SplashScreen/SplashScreen';  // Pantalla de Splash
import LoginScreen from './screens/LoginScreen/LoginScreen';  // Pantalla de Login
import RegisterScreen from './screens/RegisterScreen/RegisterScreen';  // Pantalla de Registro
import DrawerNavigator from './navigation/DrawerNavigator';  // Navegación con el Drawer

const Stack = createStackNavigator();

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false); // Estado de autenticación

  // Función que se pasa para marcar login exitoso
  const handleLoginSuccess = () => {
    setIsAuthenticated(true);
  };

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
          cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,  // Estilo de animación
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
          // Se renderiza el DrawerNavigator cuando el usuario está autenticado
          <Stack.Screen name="MainApp" component={DrawerNavigator} screenOptions={{ headerShown: false }} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;