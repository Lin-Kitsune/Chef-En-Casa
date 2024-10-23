import 'react-native-gesture-handler'; // Necesario para gestos de navegación
import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator, CardStyleInterpolators } from '@react-navigation/stack';
import SplashScreen from './screens/SplashScreen/SplashScreen';  
import LoginScreen from './screens/LoginScreen/LoginScreen';  
import RegisterScreen from './screens/RegisterScreen/RegisterScreen';  
import DrawerNavigator from './navigation/DrawerNavigator';  

const Stack = createStackNavigator();

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Función para marcar login exitoso
  const handleLoginSuccess = () => {
    setIsAuthenticated(true);
  };

  // Función para manejar el logout
  const handleLogout = () => {
    setIsAuthenticated(false);
  };

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
          cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
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
          
          // Pasar handleLogout al DrawerNavigator para manejar el cierre de sesión
          <Stack.Screen name="MainApp">
            {props => <DrawerNavigator {...props} handleLogout={handleLogout} />}
          </Stack.Screen>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
