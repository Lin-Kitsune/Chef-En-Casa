// screens/ConsultaScreen/ConsultaStyles.js
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
    backgroundColor: '#F9F9F9',
  },
  consultaItem: {
    backgroundColor: '#FFF',
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  consultaHeader: {
    flexDirection: 'row',
    alignItems: 'center', // Alinea verticalmente los elementos
    marginBottom: 4, 
  },
  consultaTitulo: {
    flex: 1,              // Permite que el título ocupe todo el espacio disponible
    fontSize: 16,         // Ajusta el tamaño según prefieras
    fontWeight: 'bold',
    color: '#333',
  },
  consultaDestinatario: {
    fontSize: 14,
    color: '#666',
  },
  consultaComentario: {
    fontSize: 14,
    color: '#666',
    marginTop: 5,
  },
  consultaRespuesta: {
    fontSize: 14,
    color: '#619537',
    marginTop: 5,
    fontWeight: 'bold',
  },
  consultaFecha: {
    fontSize: 12,
    color: '#AAA',
    marginTop: 5,
  },
  unreadResponse: {
    borderLeftWidth: 4,
    borderColor: '#619537',
  },
  unreadDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#619537',
  },
  floatingButton: {
    position: 'absolute',
    bottom: 89,
    right: 20,
    backgroundColor: '#619537',
    width: 56,
    height: 56,
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 5,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: '80%',
    backgroundColor: '#FFF',
    padding: 20,
    borderRadius: 8,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#333',
  },
  label: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: '#CCC',
    borderRadius: 8,
    marginBottom: 10,
  },
  picker: {
    width: '100%',
  },
  textInput: {
    width: '100%',
    borderColor: '#CCC',
    borderWidth: 1,
    borderRadius: 8,
    padding: 10,
    backgroundColor: '#FFF',
    marginBottom: 10,
  },
  comentarioInput: {
    height: 80,
    textAlignVertical: 'top',
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: 10,
  },
  submitButton: {
    backgroundColor: '#619537',
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: 'center',
    flex: 1,
    marginRight: 5,
  },
  submitButtonText: {
    color: '#FFF',
    fontWeight: 'bold',
  },
  cancelButton: {
    backgroundColor: '#FFF',
    borderWidth: 1,
    borderColor: '#619537',
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: 'center',
    flex: 1,
    marginLeft: 5,
  },
  cancelButtonText: {
    color: '#619537',
    fontWeight: 'bold',
  },
  responseModalContent: {
    paddingVertical: 30,
    paddingHorizontal: 20,
    width: '90%',
    borderRadius: 12,
  },
  modalLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 10,
  },
  modalText: {
    fontSize: 14,
    color: '#666',
    marginVertical: 5,
  },
  modalResponseText: {
    fontSize: 14,
    color: '#619537',
    fontWeight: 'bold',
    marginVertical: 5,
  },
  separator: {
    height: 1,
    backgroundColor: '#EEE',
    marginVertical: 10,
    width: '100%',
  },
  closeButton: {
    marginTop: 20,
    backgroundColor: '#619537',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: 'center',
  },
  closeButtonText: {
    color: '#FFF',
    fontWeight: 'bold',
  },
  sectionHeader: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#619537',
    marginTop: 10,
    marginBottom: 10,
  },
  timeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
  },
  clockIcon: {
    marginRight: 4,
  },
});

export default styles;
