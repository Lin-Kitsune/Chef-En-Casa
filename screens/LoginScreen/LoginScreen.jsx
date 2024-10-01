import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, Switch } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { login } from '../../services/auth';
import styles from './LoginScreenStyles';

const LoginScreen = ({ navigation, onLoginSuccess }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleLogin = async () => {
    try {
      const response = await login(email, password);
      if (response.token) {
        await AsyncStorage.setItem('userToken', response.token);
        onLoginSuccess();
      } else {
        setErrorMessage('Error en el login');
      }
    } catch (error) {
      setErrorMessage(error.message);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <Image source={require('../../assets/images/logo.png')} style={styles.logo} />
        <Text style={styles.title}>INICIAR SESIÓN</Text>
      </View>
      {errorMessage ? <Text style={styles.error}>{errorMessage}</Text> : null}
      <Text style={styles.label}>Correo Electrónico</Text>
      <TextInput
        style={styles.input}
        placeholder="Ingresar correo"
        value={email}
        onChangeText={setEmail}
      />
      <Text style={styles.label}>Contraseña</Text>
      <TextInput
        style={styles.input}
        placeholder="Ingresar contraseña"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />

      <View style={styles.rememberMeContainer}>
        <Switch value={rememberMe} onValueChange={setRememberMe} />
        <Text style={styles.rememberMeText}>Recordarme</Text>
      </View>

      <TouchableOpacity onPress={() => navigation.navigate('ForgotPassword')}>
        <Text style={styles.forgotPassword}>¿Olvidaste tu contraseña?</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Iniciar</Text>
      </TouchableOpacity>

      <Text style={styles.dividerText}>o continuar con</Text>

      <View style={styles.socialLoginContainer}>
        <TouchableOpacity>
          <Image source={require('../../assets/images/google-icon.png')} style={styles.socialIcon} />
        </TouchableOpacity>
        <TouchableOpacity>
          <Image source={require('../../assets/images/apple-icon.png')} style={styles.socialIcon} />
        </TouchableOpacity>
      </View>

      <Text style={styles.registerText}>
        ¿No tienes cuenta?{' '}
        <Text style={styles.registerLink} onPress={() => navigation.navigate('Register')}>
          Regístrate
        </Text>
      </Text>
    </View>
  );
};

export default LoginScreen;
