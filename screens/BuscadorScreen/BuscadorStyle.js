import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center', // Alinea verticalmente el icono y el input
    backgroundColor: '#E7F3E3',
    padding: 10,
    borderRadius: 10,
    marginBottom: 20,
  },
  searchInput: {
    height: 40,
    flex: 1, // Ocupa el espacio restante
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 10,
    backgroundColor: '#fff',
  },
  searchIcon: {
    marginRight: 10, // Espacio entre el icono y el input
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  card: {
    width: '45%',
    backgroundColor: '#f9f9f9',
    borderRadius: 10,
    padding: 15,
    alignItems: 'center',
    marginBottom: 20,
  },
  cardDesayuno: {
    backgroundColor: '#F7C784',
  },
  cardAlmuerzo: {
    backgroundColor: '#C7B8EA',
  },
  cardCena: {
    backgroundColor: '#FCE29B',
  },
  cardReposteria: {
    backgroundColor: '#A7E8DB',
  },
  cardText: {
    marginTop: 10,
    fontWeight: 'bold',
    fontSize: 16,
    color: '#000', // Asegúrate de que el texto sea legible
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
});

export default styles;
