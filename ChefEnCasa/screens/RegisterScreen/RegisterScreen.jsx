import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, Switch } from 'react-native';
import { register } from '../../services/auth';  // Servicio de autenticación
import styles from './RegisterScreenStyles';  // Archivo de estilos

const RegisterScreen = ({ navigation }) => {
  const [nombre, setNombre] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [rememberMe, setRememberMe] = useState(false); // Para el switch de "Recordarme"

  const handleRegister = async () => {
    if (password !== confirmPassword) {
      setErrorMessage('Las contraseñas no coinciden');
      return;
    }

    try {
      const response = await register(nombre, email, password);
      if (response.usuario) {
        navigation.navigate('Login');  // Redirigir al login después del registro exitoso
      } else {
        setErrorMessage('Error en el registro');
      }
    } catch (error) {
      if (error.response && error.response.data) {
        console.error("Error en el registro:", error.response.data);
        setErrorMessage(error.response.data.message || 'Error en el registro');
      } else {
        console.error("Error en el registro:", error.message);
        setErrorMessage('Error en el registro');
      }
    }
  };

  return (
    <View style={styles.container}>
      {/* Logo en la parte superior */}
      <View style={styles.logoContainer}>
        <Image source={require('../../assets/images/logo.png')} style={styles.logo} />
        <Text style={styles.title}>REGISTRARTE</Text>
      </View>

      {/* Formulario de registro */}
      {errorMessage ? <Text style={styles.error}>{errorMessage}</Text> : null}
      <Text style={styles.label}>Usuario</Text>
      <TextInput
        style={styles.input}
        placeholder="Ingresar nombre"
        value={nombre}
        onChangeText={setNombre}
      />
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
      <Text style={styles.label}>Repetir Contraseña</Text>
      <TextInput
        style={styles.input}
        placeholder="Repite contraseña"
        secureTextEntry
        value={confirmPassword}
        onChangeText={setConfirmPassword}
      />

      {/* Botón de registro */}
      <TouchableOpacity style={styles.button} onPress={handleRegister}>
        <Text style={styles.buttonText}>Registrar</Text>
      </TouchableOpacity>

      <Text style={styles.dividerText}>o continuar con</Text>

      {/* Botones de Google y Apple */}
      <View style={styles.socialLoginContainer}>
        <TouchableOpacity>
          <Image source={require('../../assets/images/google-icon.png')} style={styles.socialIcon} />
        </TouchableOpacity>
        <TouchableOpacity>
          <Image source={require('../../assets/images/apple-icon.png')} style={styles.socialIcon} />
        </TouchableOpacity>
      </View>

      {/* Enlace para iniciar sesión */}
      <Text style={styles.loginText}>
        ¿Ya tienes cuenta?{' '}
        <Text style={styles.loginLink} onPress={() => navigation.navigate('Login')}>
          Iniciar Sesión
        </Text>
      </Text>
    </View>
  );
};

export default RegisterScreen;
