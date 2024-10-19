import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: 'transparent',
  },
   backgroundImage: {
    flex: 2,  // Asegura que el fondo cubra toda la pantalla
    resizeMode: 'cover',  // Ajusta la imagen para cubrir toda la vista
  },
  mainNewsContainer: {
    marginBottom: 20,
    borderRadius: 10,
    overflow: 'hidden',
    backgroundColor: '#FFF',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
  },
  mainNewsImage: {
    width: '100%',
    height: 200,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  mainNewsTextContainer: {
    padding: 15,
  },
  mainNewsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  mainNewsDate: {
    fontSize: 14,
    color: '#888',
    marginTop: 5,
  },
  newsList: {
    paddingBottom: 20,
  },
  newsItem: {
    flexDirection: 'row',
    backgroundColor: '#FFF',
    borderRadius: 10,
    padding: 10,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
  },
  newsItemImage: {
    width: 80,
    height: 80,
    borderRadius: 8,
    marginRight: 10,
  },
  newsContent: {
    flex: 1,
    justifyContent: 'center',
  },
  newsTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#619537',
  },
  newsDate: {
    fontSize: 12,
    color: '#888',
    marginTop: 5,
  },
});

export default styles;
