import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#eaeaea',
    padding: 20,
  },
  pointsContainer: {
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
    marginBottom: 20,
    overflow: 'hidden',
  },
  backgroundImageZoom: {
    transform: [{ scale: 2.5 }],
  },
  pointsTitle: {
    fontSize: 18,
    color: '#FFF',
    fontWeight: 'bold',
  },
  pointsValue: {
    fontSize: 40,
    color: '#FFF',
    fontWeight: 'bold',
  },
  pointsSubText: {
    fontSize: 14,
    color: '#E0E0E0',
    textAlign: 'center',
    marginTop: 10,
  },
//   tickets
  couponsList: {
    flex: 1,
  },
  couponContainer: {
    marginBottom: 15,
    width: '100%',
    alignItems: 'center',
  },
  bordeContenedor: {
    borderWidth: 2, // Grosor del borde
    borderColor: '#CCC', // Color gris del borde
    borderRadius: 15, // Bordes redondeados
    overflow: 'hidden',
  },
  ticketBackground: {
    width: '107%',
    height: 135,
    justifyContent: 'center',
    padding: 15,
    resizeMode: 'cover',
  },
  ticketImageStyle: {
    borderRadius: 15,
  },
  couponContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    paddingHorizontal: 10,
  },
  couponImage: {
    width: 85,
    height: 85,
    resizeMode: 'contain',
    marginRight: 1,
  },
  couponDetails: {
    flex: 2,
    paddingLeft: 5,
  },
  dashContainer: {
    flexDirection: 'column',
    justifyContent: 'space-between', // Spacing between dashes
    height: '80%',  // Adjust the height for the vertical dashed line
    marginHorizontal: 10,
  },
  dash: {
    width: 1,
    height: 10,  // Height of each dash
    backgroundColor: '#9f9f9f',  // Color of the dash
  },
  couponStore: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  discountRow: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    marginVertical: 5,
  },
  discountNumber: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#4CAF50',
  },
  discountPercent: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#4CAF50',
    marginLeft: 5,
  },
  couponDescription: {
    fontSize: 12,
    color: '#888',
  },
//   modal
modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',  // Fondo semitransparente para el modal
  },
  modalContent: {
    width: '80%',
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
    elevation: 5,  // Sombra para el modal
  },
  modalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  modalImage: {
    width: 100,
    height: 100,
    marginRight: 15,
    resizeMode: 'contain',
  },
  modalDetails: {
    flex: 1,
  },
 // Estilos para el separador horizontal con dashes
 modalSeparator: {
    flexDirection: 'row',  // Alineamos los dashes en fila (horizontalmente)
    justifyContent: 'space-between',  // Distribuimos los dashes con espacio uniforme
    alignItems: 'center',
    width: '100%',  // Asegura que ocupe el 100% del ancho disponible
    marginVertical: 10,  // Espacio arriba y abajo del separador
    padding: 10
  },
  modaldash: {
    width: 8,  // Ancho de cada dash (horizontal)
    height: 1,  // Altura pequeña de cada dash
    backgroundColor: '#9f9f9f',  // Color gris del dash
    marginHorizontal: 2,  // Espacio entre cada dash
  },
  
  modalStoreName: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  modalDiscount: {
    fontSize: 20,
    color: '#4CAF50',
    marginBottom: 5,
  },
  modalDescription: {
    fontSize: 14,
    color: '#888',
    marginBottom: 2,
  },
  qrCodeContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: 20,
  },
  useButton: {
    backgroundColor: '#619537',  // Verde para el botón de utilizar
    padding: 10,
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 5,
    marginRight: 10,
  },
  usedCoupon: {
    opacity: 0.5,  // Cupones utilizados aparecerán con menor opacidad
  },
  usedText: {
    color: 'red',
    fontWeight: 'bold',
    marginTop: 5,
  },
  closeButton: {
    backgroundColor: '#2196F3',
    padding: 10,
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 5,
  },
  closeButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  validUntilText: {
    fontSize: 14,
    color: '#888',
    textAlign: 'center',
    marginVertical: 1,
  },
  buttonText: {
    color: '#fff',  // Color blanco para el texto
    fontWeight: 'bold',
    marginLeft: 10,  // Espacio entre el ícono y el texto
  },
});

export default styles;