import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, FlatList } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import styles from './AlmacenStyles';

const AlmacenScreen = () => {
  const [alimentos, setAlimentos] = useState([
    { id: '1', nombre: 'PEPINO', cantidad: 1, img: require('../../assets/images/pepino.png') },
    { id: '2', nombre: 'LECHUGA', cantidad: 1, img: require('../../assets/images/lechuga.png') },
    { id: '3', nombre: 'CEBOLLA', cantidad: 1, img: require('../../assets/images/cebolla.png') },
    { id: '4', nombre: 'COLIFLOR', cantidad: 1, img: require('../../assets/images/coliflor.png') },
    { id: '5', nombre: 'ZANAHORIA', cantidad: 1, img: require('../../assets/images/zanahoria.png') },
    { id: '6', nombre: 'PECHUGA DE POLLO', cantidad: 1, img: require('../../assets/images/pechuga.png') },
    { id: '7', nombre: 'AJO', cantidad: 1, img: require('../../assets/images/ajo.png') },
    { id: '8', nombre: 'CARNE', cantidad: 1, img: require('../../assets/images/carne1.png') },
    { id: '9', nombre: 'HUEVOS', cantidad: 1, img: require('../../assets/images/huevos.png') }
  ]);

  const agregarAlimento = () => {
    // Lógica para agregar alimento
  };

  const eliminarAlimento = () => {
    // Lógica para eliminar alimento
  };

  const renderItem = ({ item }) => (
    <View style={styles.item}>
      <Image source={item.img} style={styles.image} />
      <View style={styles.ovalContainer}>
        <Text style={styles.text} numberOfLines={1} ellipsizeMode="tail">
          {item.nombre}
        </Text>
        <Text style={styles.quantity}>
          Cantidad: {item.cantidad}
        </Text>
      </View>
    </View>
  );
  
  return (
    <View style={styles.container}>
      <View style={styles.buttonsContainer}>
        <TouchableOpacity onPress={agregarAlimento} style={styles.addButton}>
          <Icon name="add-circle-outline" size={24} color="#fff" />
          <Text style={styles.buttonText}>Agregar alimento</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={eliminarAlimento} style={styles.removeButton}>
          <Icon name="remove-circle-outline" size={24} color="#fff" />
          <Text style={styles.buttonText}>Eliminar alimento</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={alimentos}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        numColumns={3}
        contentContainerStyle={styles.grid}
      />

      <View style={styles.footer}>
        <TouchableOpacity style={styles.footerButton}>
          <Icon name="search" size={30} color="#fff" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.footerButton}>
          <Icon name="bookmark" size={30} color="#fff" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.footerButton}>
          <Icon name="home" size={30} color="#fff" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.footerButton}>
          <Icon name="notifications" size={30} color="#fff" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.footerButton}>
          <Icon name="person" size={30} color="#fff" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default AlmacenScreen;
