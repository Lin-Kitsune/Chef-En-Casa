import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f5f5f5' },
  header: { 
    padding: 20, 
    backgroundColor: '#4CAF50', 
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
    backgroundColor: '#4CAF50', 
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
  category: { alignItems: 'center', margin: 10 },
  categoryImage: { 
    width: 80, 
    height: 80, 
    borderRadius: 40 
  },
  categoryText: { 
    marginTop: 10, 
    fontSize: 16, 
    fontWeight: 'bold' 
  },
  bottomNav: { 
    flexDirection: 'row', 
    justifyContent: 'space-around', 
    backgroundColor: '#4CAF50', 
    paddingVertical: 15 
  },
});

export default styles;
