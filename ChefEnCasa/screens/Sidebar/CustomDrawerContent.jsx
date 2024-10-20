import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { DrawerContentScrollView } from '@react-navigation/drawer'; 
import styles from './CustomStyles'; 

const CustomDrawerContent = (props) => {
  const { navigation, state } = props;

  // Función para verificar si un ítem está activo
  const isActive = (routeName) => {
    const currentRoute = state?.routeNames[state?.index];
    return currentRoute === routeName;
  };

  return (
    <DrawerContentScrollView {...props}> 
      <View style={styles.container}>
        {/* Contenido principal del Drawer */}
        <View style={styles.contentContainer}>
          {/* Logo o Encabezado */}
          <View style={styles.header}>
            <View style={styles.logoRow}>
              <Image
                source={require('../../assets/images/Chef-En-Casa.png')}
                style={styles.appIcon}
              />
              <Text style={styles.logoText}>Chef En Casa</Text> 
            </View>
            <View style={styles.divider} />
          </View>

          {/* Enlaces del Drawer */}
          <TouchableOpacity 
            style={[styles.drawerItem, isActive('NewsScreen') ? styles.activeItem : null]} 
            onPress={() => navigation.navigate('NewsStack')}
          >
            <Icon name="newspaper-o" size={24} color={isActive('NewsScreen') ? "#FFF" : "#619537"} />
            <Text style={[styles.drawerText, isActive('NewsScreen') ? styles.activeText : null]}>
              Noticias
            </Text> 
          </TouchableOpacity>

          <TouchableOpacity 
            style={[styles.drawerItem, isActive('PointsStack') ? styles.activeItem : null]} 
            onPress={() => navigation.navigate('PointsStack')}
          >
            <Icon name="star" size={24} color={isActive('Points') ? "#FFF" : "#EFB810"} />
            <Text style={[styles.drawerText, isActive('Points') ? styles.activeText : null]}>
              Puntos
            </Text> 
          </TouchableOpacity>
        </View>
        {/* Botón de cerrar sesión en la parte inferior */}
        <View style={styles.logoutContainer}>
          <TouchableOpacity style={styles.logout} onPress={() => {}}>
            <Icon name="sign-out" size={24} color="#888" />
            <Text style={styles.drawerText}>Cerrar sesión</Text> 
          </TouchableOpacity>
        </View>
      </View>
    </DrawerContentScrollView>
  );
};

export default CustomDrawerContent;
