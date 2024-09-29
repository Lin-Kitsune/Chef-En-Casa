import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import styles from './EditProfileScreenStyles';

const EditProfileScreen = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleConfirm = () => {
    console.log({ username, email, password, confirmPassword });
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.infoText}>
        * Ingrese solo los datos que desea cambiar, los demás espacios déjelos en blanco
      </Text>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Usuario</Text>
        <View style={styles.inputWrapper}>
          <TextInput
            style={styles.input}
            placeholder="Ingresar nombre nuevo"
            value={username}
            onChangeText={setUsername}
          />
          <TouchableOpacity onPress={() => setUsername('')}>
            <Icon name="times" size={18} color="#888" style={styles.clearIcon} />
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Correo Electrónico</Text>
        <View style={styles.inputWrapper}>
          <TextInput
            style={styles.input}
            placeholder="Ingresar correo nuevo"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
          />
          <TouchableOpacity onPress={() => setEmail('')}>
            <Icon name="times" size={18} color="#888" style={styles.clearIcon} />
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Contraseña</Text>
        <View style={styles.inputWrapper}>
          <TextInput
            style={styles.input}
            placeholder="Ingresar contraseña nueva"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />
          <TouchableOpacity onPress={() => setPassword('')}>
            <Icon name="times" size={18} color="#888" style={styles.clearIcon} />
          </TouchableOpacity>
        </View>
        <Text style={styles.passwordHint}>Caracteres: 8-16, una mayúscula, un número</Text>
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Repetir Contraseña</Text>
        <View style={styles.inputWrapper}>
          <TextInput
            style={styles.input}
            placeholder="Repite contraseña nueva"
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            secureTextEntry
          />
          <TouchableOpacity onPress={() => setConfirmPassword('')}>
            <Icon name="times" size={18} color="#888" style={styles.clearIcon} />
          </TouchableOpacity>
        </View>
      </View>

      <TouchableOpacity style={styles.confirmButton} onPress={handleConfirm}>
        <Text style={styles.confirmButtonText}>Confirmar</Text>
      </TouchableOpacity>
    </View>
  );
};

export default EditProfileScreen;
