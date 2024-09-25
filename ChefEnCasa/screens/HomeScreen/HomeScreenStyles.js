import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: '#f5f5f5' 
  },
  header: { 
    padding: 20, 
    backgroundColor: '#619537',  // Cambiado el color a #619537
    flexDirection: 'row', 
    alignItems: 'center' 
  },
  menuIcon: { marginRight: 15 },
  userInfo: { flexDirection: 'row', alignItems: 'center' },
  avatar: { width: 50, height: 50, borderRadius: 25, marginRight: 10 },
  userName: { fontSize: 20, fontWeight: 'bold', color: '#fff' },
  dietText: { fontSize: 16, color: '#fff' },
  searchContainer: { 
    flexDirection: 'row', 
    margin: 20, 
    backgroundColor: '#fff', 
    borderRadius: 10, 
    padding: 10 
  },
  searchInput: { marginLeft: 10, flex: 1 },
  topButtonsContainer: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    marginHorizontal: 20 
  },
  topButton: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    backgroundColor: '#619537',  // Cambiado el color a #619537
    padding: 10, 
    borderRadius: 5 
  },
  topButtonText: { marginLeft: 5, color: '#fff', fontSize: 16 },
  categoriesContainer: { 
    flexDirection: 'row', 
    flexWrap: 'wrap', 
    justifyContent: 'space-around', 
    margin: 20 
  },
  category: { 
    alignItems: 'center', 
    justifyContent: 'center', // Asegura que el contenido esté centrado
    margin: 10,
    width: 120,  // Ajusta el ancho y alto para que sean cuadrados
    height: 120, 
    borderRadius: 10, 
    padding: 10 
  },
  categoryImage: { 
    width: 80, 
    height: 80, 
    borderRadius: 40 // Para que la imagen sea redonda
  },
  categoryText: { 
    marginTop: 10, 
    fontSize: 16, 
    fontWeight: 'bold',
    textAlign: 'center' // Centra el texto dentro del cuadro
  },
  categoryDesayuno: { 
    backgroundColor: '#fae19c', 
    alignItems: 'center',
    justifyContent: 'center', 
    width: 120, 
    height: 120, 
    borderRadius: 10, 
    margin: 10, 
  },
  categoryAlmuerzo: { 
    backgroundColor: '#d2afdf', 
    alignItems: 'center',
    justifyContent: 'center', 
    width: 120, 
    height: 120, 
    borderRadius: 10, 
    margin: 10, 
  },
  categoryCena: { 
    backgroundColor: '#fdd499', 
    alignItems: 'center',
    justifyContent: 'center', 
    width: 120, 
    height: 120, 
    borderRadius: 10, 
    margin: 10, 
  },
  categoryReposteria: { 
    backgroundColor: '#7fd7bb', 
    alignItems: 'center',
    justifyContent: 'center', 
    width: 120, 
    height: 120, 
    borderRadius: 10, 
    margin: 10, 
  },
  bottomNav: { 
    flexDirection: 'row', 
    justifyContent: 'space-around', 
    backgroundColor: '#619537', 
    paddingVertical: 15,  // Ajusta este valor según el tamaño deseado de la barra
  },
  iconStyle: { 
    fontSize: 30,  // Asegura que los íconos sean lo suficientemente grandes
    color: '#fff' 
  }
});

export default styles;
