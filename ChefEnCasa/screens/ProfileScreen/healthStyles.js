import { StyleSheet } from 'react-native';
const healthStyles = StyleSheet.create({
    modalContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
      backgroundColor: 'white',
      padding: 20,
      borderRadius: 10,
      width: 300,
      alignItems: 'center',
    },
    modalTitle: {
      fontSize: 18,
      fontWeight: 'bold',
      color: '#619537',
      marginBottom: 20,
    },
    input: {
      borderWidth: 1,
      borderColor: '#ccc',
      padding: 10,
      borderRadius: 5,
      width: '100%',
      marginBottom: 20,
    },
    calculateButton: {
      backgroundColor: '#619537',
      padding: 15,
      borderRadius: 10,
      marginBottom: 20,
      width: '100%',
      alignItems: 'center',
    },
    calculateButtonText: {
      color: 'white',
      fontWeight: 'bold',
    },
    imcResult: {
      fontSize: 18,
      textAlign: 'center',
      marginBottom: 10,
    },
    recommendationText: {
      fontSize: 16,
      fontWeight: 'bold',
      marginBottom: 10,
    },
    imcRangeContainer: {
      marginTop: 10,
      marginBottom: 20,
      alignItems: 'center',
    },
    imcRangeText: {
      fontSize: 14,
      color: '#888',
    },
    imcRangeValue: {
      fontSize: 16,
      fontWeight: 'bold',
      color: '#619537',
    },
    picker: {
      height: 50,
      width: '100%',
      backgroundColor: '#f0f0f0',
      borderRadius: 5,
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