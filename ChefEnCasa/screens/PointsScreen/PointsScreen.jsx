import React, { useState } from 'react';
import { View, Text, FlatList, Image, TouchableOpacity, ImageBackground, Modal, Button } from 'react-native';
import QRCode from 'react-native-qrcode-svg';
import styles from './PointsScreenStyles';  // Archivo de estilos
import Icon from 'react-native-vector-icons/FontAwesome';

const PointsScreen = () => {
  const [points, setPoints] = useState(250); // Puntos del usuario
  const [selectedCoupon, setSelectedCoupon] = useState(null); // Estado para el cupón seleccionado
  const [modalVisible, setModalVisible] = useState(false); // Estado del Modal
  const [usedCoupons, setUsedCoupons] = useState([]); // Estado para cupones utilizados

  const coupons = [
    {
      id: '1',
      store: 'JUMBO',
      discount: '10%',
      image: require('../../assets/images/jumbo-logo.png'),
      description: 'Descuento en compras superiores a $30.000',
      barcode: '123456789012',
      validUntil: '31/12/2024' 
    },
    {
      id: '2',
      store: 'SANTA ISABEL',
      discount: '15%',
      image: require('../../assets/images/santa-isabel-logo.png'),
      description: 'Descuento en compras superiores a $24.990',
      barcode: '987654321098',
      validUntil: '31/01/2025'
    },
  ];

  // Función para mostrar el modal al tocar un ticket
  const openCouponModal = (coupon) => {
    setSelectedCoupon(coupon);
    setModalVisible(true);
  };

  // Función para marcar el cupón como utilizado
const useCoupon = (id) => {
    setUsedCoupons([...usedCoupons, id]);
    setModalVisible(false);
  };

  // Renderizar el cupón
  const renderCoupon = ({ item }) => (
    <TouchableOpacity 
      style={[styles.couponContainer, usedCoupons.includes(item.id) && styles.usedCoupon]} 
      onPress={() => !usedCoupons.includes(item.id) && openCouponModal(item)}  // Solo abrir si no ha sido utilizado
    >
      <View style={styles.bordeContenedor}>
        <ImageBackground 
          source={require('../../assets/images/ticket-background.png')} 
          style={styles.ticketBackground} 
          imageStyle={styles.ticketImageStyle} 
        >
          <View style={styles.couponContent}>
            <Image source={item.image} style={styles.couponImage} />

            {/* Línea discontinua */}
            <View style={styles.dashContainer}>
              {Array.from({ length: 5 }).map((_, index) => (
                <View key={index} style={styles.dash}></View>
              ))}
            </View>

            {/* Detalles del cupón */}
            <View style={styles.couponDetails}>
              <Text style={styles.couponStore}>{item.store}</Text>
              <View style={styles.discountRow}>
                <Text style={styles.discountNumber}>{item.discount}</Text>
                <Text style={styles.discountPercent}> de descuento</Text>
              </View>
              <Text style={styles.couponDescription}>{item.description}</Text>
              {usedCoupons.includes(item.id) && (
                <Text style={styles.usedText}>Utilizado</Text>
              )}
            </View>
          </View>
        </ImageBackground>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {/* Mostrar el total de puntos */}
      <ImageBackground 
        source={require('../../assets/images/Fondo2.png')}  
        style={styles.pointsContainer}
        imageStyle={styles.backgroundImageZoom}  
      >
        <Text style={styles.pointsTitle}>Mis Puntos</Text>
        <Text style={styles.pointsValue}>{points} puntos</Text>
        <Text style={styles.pointsSubText}>
          Canjea puntos para obtener descuentos en supermercados o utensilios de cocina.
        </Text>
      </ImageBackground>

      {/* Mostrar la lista de cupones */}
      <FlatList
        data={coupons}
        renderItem={renderCoupon}
        keyExtractor={item => item.id}
        style={styles.couponsList}
      />

      {/* Modal para mostrar el cupón completo */}
      <Modal
        visible={modalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setModalVisible(false)}
      >
        {selectedCoupon && (
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <View style={styles.modalHeader}>
                <Image source={selectedCoupon.image} style={styles.modalImage} />
                <View style={styles.modalDetails}>
                  <Text style={styles.modalStoreName}>{selectedCoupon.store}</Text>
                  <Text style={styles.modalDiscount}>{selectedCoupon.discount} de descuento</Text>
                  <Text style={styles.modalDescription}>{selectedCoupon.description}</Text>
                </View>
              </View>

              {/* Línea separadora */}
              <View style={styles.modalSeparator}>
                {/* Generamos varios dashes para crear el efecto de línea discontinua */}
                {Array.from({ length: 15 }).map((_, index) => (
                    <View key={index} style={styles.modaldash} />
                ))}
              </View>

              {/* Código QR */}
              <View style={styles.qrCodeContainer}>
                <QRCode
                  value={selectedCoupon.barcode}
                  size={150}
                  color="#000"
                  backgroundColor="#fff"
                />
              </View>

              {/* Fecha de validez del cupón */}
              <Text style={styles.validUntilText}>Válido hasta: {selectedCoupon.validUntil}</Text>

              {/* Botones */}
              <View style={styles.modalButtons}>
                <TouchableOpacity onPress={() => handleUseCoupon()} style={styles.useButton}>
                    <Icon name="check-circle" size={24} color="#fff" />
                    <Text style={styles.buttonText}>UTILIZAR</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => setModalVisible(false)} style={styles.closeButton}>
                    <Icon name="times-circle" size={24} color="#fff" />
                    <Text style={styles.buttonText}>CERRAR</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        )}
      </Modal>
    </View>
  );
};

export default PointsScreen;
