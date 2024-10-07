import { StyleSheet, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F4F4F4',
    paddingHorizontal: 10,
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingTop: 10,
  },
  progressBox: {
    flexDirection: 'row',
    borderRadius: 15,
    padding: 20,
    alignItems: 'center',
    width: '90%',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 3,
    marginBottom: 20,
    overflow: 'hidden',
  },
  imageStyle: {
    transform: [{ scale: 3 }],
  },
  textContainer: {
    flex: 1,
    paddingRight: 10,
    alignItems: 'flex-start',  // Esto alinea el texto a la izquierda
  },
  metaTitle: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#fafbee',
    marginBottom: 10,
  },
  progressText: {
    fontSize: 40,
    fontWeight: 'bold',
    color: '#fafbee',
  },
  metaDescription: {
    fontSize: 14,
    color: '#fafbee',
  },
  chartContainer: {
    marginTop: 10,
    alignItems: 'flex-start',  // Alinea el gráfico a la izquierda
    width: '100%',
  },
  titleContainer: {
    marginBottom: 10,
    paddingLeft: 10,  // Alinea el título y descripción a la izquierda
  },
  chartTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'left',
  },
  chartDescription: {
    fontSize: 14,
    color: '#666',
    textAlign: 'left',
    marginBottom: 10,
  },
  chart: {
    borderRadius: 10,
    marginVertical: 10,
  },
  tabContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginBottom: 15,
  },
  tabButton: {
    padding: 10,
    borderRadius: 20,
    backgroundColor: '#EDEFFF',
  },
  activeTab: {
    backgroundColor: '#609437',
  },
  tabText: {
    color: '#000',
    fontSize: 16,
  },
  activeTabText: {
    color: '#FFF',
  },
  percentSymbol: {
    fontSize: 25,  // Tamaño más pequeño para el símbolo %
    fontWeight: 'normal',
    color: '#fbfaee',
  },
});

export default styles;
