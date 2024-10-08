import { StyleSheet } from 'react-native';
const healthStyles = StyleSheet.create({
    modalContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
      width: 300,
      backgroundColor: 'white',
      borderRadius: 10,
      padding: 20,
      alignItems: 'center',
    },
    modalTitle: {
      fontSize: 18,
      fontWeight: 'bold',
      marginBottom: 20,
      color: '#619537',
    },
    input: {
      borderWidth: 1,
      borderColor: '#ccc',
      padding: 10,
      borderRadius: 5,
      marginBottom: 20,
      width: '100%',
    },
    calculateButton: {
      backgroundColor: '#619537',
      padding: 15,
      borderRadius: 10,
      marginBottom: 20,
    },
    calculateButtonText: {
      color: '#fff',
      textAlign: 'center',
    },
    imcResult: {
      fontSize: 18,
      textAlign: 'center',
      marginVertical: 10,
    },
    recommendationText: {
      fontSize: 16,
      fontWeight: 'bold',
      marginTop: 10,
      marginBottom: 10,
      textAlign: 'center',
    },
    picker: {
      width: '100%',
      backgroundColor: '#f0f0f0',
      borderRadius: 5,
      paddingHorizontal: 10,
      marginBottom: 20,
    },
    closeModalButton: {
      backgroundColor: '#619537',
      padding: 10,
      borderRadius: 5,
      width: '100%',
      alignItems: 'center',
    },
    closeModalButtonText: {
      color: 'white',
      fontWeight: 'bold',
    },
  });
  export default healthStyles;  