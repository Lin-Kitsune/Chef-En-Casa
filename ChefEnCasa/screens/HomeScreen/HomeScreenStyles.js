import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    backgroundColor: '#619537',
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    padding: 20,
    paddingBottom: 60, // Espacio adicional en la parte inferior
  },
  menuButton: {
    alignSelf: 'flex-start',
    marginBottom: 20,  // Espacio debajo del icono del menú
  },
  menuIcon: {
    position: 'absolute',
    left: 20,
    top: 40, // Ajuste del icono para alinearlo bien
  },
  userInfoContainer: {
    flexDirection: 'row', // Coloca el avatar y el texto en una fila
    alignItems: 'center', // Alinea verticalmente en el centro
  },
  userInfo: {
    justifyContent: 'center',
  },
  avatar: {
    width: 70,  // Aumenta el tamaño del avatar
    height: 70,  // Aumenta el tamaño del avatar
    borderRadius: 35,  // Ajusta el radio para mantener el borde redondeado
    marginRight: 10,
  },  
  userName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
  },
  dietText: {
    fontSize: 16,
    color: '#fff',
    marginTop: 5, // Añadir espacio entre el nombre y el tipo de dieta
  },
  searchContainer: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 20,
    paddingVertical: 8,
    paddingHorizontal: 10, // Ajuste en el padding horizontal
    marginHorizontal: 20,
    marginTop: -20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5,
    alignItems: 'center',
  },
  searchIcon: {
    marginRight: 10,
    alignSelf: 'center', // Alinea el ícono en el centro verticalmente
  },
  searchInput: {
    flex: 1,
    fontSize: 16, // Ajusta el tamaño del texto dentro del campo de búsqueda
    color: '#619537', // Color de texto similar al mockup
  },
  searchCloseIcon: {
    marginLeft: 10, // Espacio entre el input y la "X"
    alignSelf: 'center', // Alinea el ícono en el centro verticalmente
  },
  topButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start', // Alinea los botones hacia la izquierda
    alignItems: 'center', // Alinea verticalmente
    marginHorizontal: 20, // Añade un poco de margen desde el borde izquierdo
    marginVertical: 10, // Reduce el margen vertical para reducir el espacio
    gap: 20, // Espacio entre los botones
  }, 
  topButton: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 80,
    height: 80,
    backgroundColor: '#619537',
    borderRadius: 10,
    marginBottom: 5,  // Separación con el texto
  },
  buttonIcon: {
    width: 40,
    height: 40,
  },
  topButtonText: {
    marginTop: 5, // Espacio entre el ícono y el texto
    fontSize: 14,
    fontWeight: 'bold',
    color: '#619537', // El color verde para el texto como en el mockup
  },
  categoriesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',  // Centrar todos los elementos
    alignItems: 'center',
    margin: 10, // Reducido el margen para hacer más espacio para los botones
    gap: 10, // Espacio entre los botones
  },
  categoryDesayuno: {
    backgroundColor: '#fae19c',
    width: 120,
    height: 120,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    margin: 10,
  },
  categoryAlmuerzo: {
    backgroundColor: '#d2afdf',
    width: 120,
    height: 120,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    margin: 10,
  },
  categoryCena: {
    backgroundColor: '#fdd499',
    width: 120,
    height: 120,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    margin: 10,
  },
  categoryReposteria: {
    backgroundColor: '#7fd7bb',
    width: 120,
    height: 120,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    margin: 10,
  },
  categoryImage: {
    width: 120,  // Aumenta el tamaño de la imagen
    height: 120,  // Aumenta el tamaño de la imagen
    borderRadius: 10,  // Mantiene bordes ligeramente redondeados
  },
  categoryText: {
    marginTop: 10,
    fontSize: 18,  // Tamaño del texto ajustado
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#000',
  },
  categoryButton: {
    backgroundColor: '#fae19c',  // Color predeterminado (cambiar según categoría)
    width: 160,  // Aumenta el ancho para coincidir con el mockup
    height: 160,  // Aumenta la altura para coincidir con el mockup
    borderRadius: 20,  // Borde redondeado
    alignItems: 'center',
    justifyContent: 'center',
    margin: 8,  // Ajuste del margen entre los botones
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5,  // Efecto de elevación (sombra)
  },
  bottomNav: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#619537',
    paddingVertical: 15,
    position: 'absolute', // Asegura que esté pegado a la parte inferior
    left: 0,
    right: 0,
    bottom: 0, // Esto lo fija en la parte inferior
  },
  iconStyle: {
    fontSize: 30,
    color: '#fff',
  },
  floatingButton: {
    position: 'absolute',
    bottom: 85,
    right: 20,
    backgroundColor: '#619537',
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
  },
});

export default styles;
