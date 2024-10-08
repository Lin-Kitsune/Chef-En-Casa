import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Image, Animated, Easing } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const SplashScreen = () => {
  const navigation = useNavigation();
  const [fadeAnim] = useState(new Animated.Value(0));  // Valor inicial de opacidad

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 2000,
      useNativeDriver: true,
      easing: Easing.inOut(Easing.ease),
    }).start();
  }, [fadeAnim]);

  const navigateToRegister = () => {
    navigation.navigate('Register'); // Aquí navegas a la pantalla de registro
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#619537' }}>
      <Animated.View style={{ opacity: fadeAnim }}>
        <Image source={require('../../assets/images/Chef-En-Casa.png')} style={{ width: 200, height: 200 }} />
      </Animated.View>
      <TouchableOpacity onPress={navigateToRegister} style={{ marginTop: 50 }}>
        <View style={{ backgroundColor: '#ffcc00', padding: 20, borderRadius: 50 }}>
          <Text style={{ color: '#fff', fontWeight: 'bold' }}>Continuar</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default SplashScreen;
