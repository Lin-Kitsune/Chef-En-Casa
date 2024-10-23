import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { DrawerContentScrollView } from '@react-navigation/drawer';
import AsyncStorage from '@react-native-async-storage/async-storage'; 
import styles from './CustomStyles';

const CustomDrawerContent = (props) => {
  const { navigation, state, handleLogout } = props;  // Recibir `handleLogout` aquí

  const isActive = (routeName) => {
    const currentRoute = state?.routeNames[state?.index];
    return currentRoute === routeName;
  };

  const handleSignOut = async () => {
    try {
      await AsyncStorage.removeItem('userToken');
      handleLogout();  // Llamar a la función que cambia el estado
    } catch (error) {
      console.error('Error al cerrar sesión:', error);
    }
  };

  return (
    <DrawerContentScrollView {...props}>
      <View style={styles.container}>
        <View style={styles.contentContainer}>
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

        <View style={styles.logoutContainer}>
          <TouchableOpacity style={styles.logout} onPress={handleSignOut}>
            <Icon name="sign-out" size={24} color="#888" />
            <Text style={styles.drawerText}>Cerrar sesión</Text>
          </TouchableOpacity>
        </View>
      </View>
    </DrawerContentScrollView>
  );
};

export default CustomDrawerContent;
