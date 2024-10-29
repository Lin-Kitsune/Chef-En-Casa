// screens/ConsultaScreen/ConsultaScreen.jsx
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, Modal } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Picker } from '@react-native-picker/picker';
import moment from 'moment';
import styles from './ConsultaStyles';

const ConsultaScreen = ({ navigation }) => {
    const [consultas, setConsultas] = useState([
        // Consultas de "Hoy"
        { 
          id: 1, 
          titulo: 'Consulta sobre grasas saludables', 
          destinatario: 'nutricionista', 
          comentario: '¿Cuáles son las mejores fuentes de grasas saludables para incluir en mi dieta?', 
          respuesta: 'Las mejores fuentes de grasas saludables incluyen aguacates, frutos secos, semillas, aceite de oliva extra virgen y pescado azul. Estas grasas ayudan a mantener la salud del corazón y pueden ser incorporadas en la dieta diaria de forma moderada.', 
          fecha: moment(), 
          leido: true 
        },
        { 
          id: 2, 
          titulo: 'Uso de edulcorantes', 
          destinatario: 'admin', 
          comentario: '¿Es seguro usar edulcorantes en lugar de azúcar en las recetas?', 
          respuesta: 'En general, los edulcorantes como la stevia y el eritritol son seguros para el consumo en lugar del azúcar y no elevan los niveles de glucosa en sangre. Sin embargo, se recomienda usarlos en moderación, especialmente en niños y personas con sensibilidad gastrointestinal.', 
          fecha: moment(), 
          leido: false 
        },
      
        // Consulta de "Ayer"
        { 
          id: 3, 
          titulo: 'Alimentos para ganar masa muscular', 
          destinatario: 'nutricionista', 
          comentario: 'Estoy buscando recomendaciones de alimentos que ayuden a ganar masa muscular de forma saludable.', 
          respuesta: 'Para ganar masa muscular, es importante consumir alimentos ricos en proteínas y calorías. Opciones incluyen carnes magras, huevos, pescado, legumbres, frutos secos y productos lácteos. Además, asegúrate de consumir carbohidratos complejos como arroz integral y avena para proporcionar energía durante el entrenamiento.', 
          fecha: moment().subtract(1, 'days'), 
          leido: false 
        },
      
        // Consultas de "Últimos 7 días"
        { 
          id: 4, 
          titulo: 'Recomendación de vegetales bajos en carbohidratos', 
          destinatario: 'nutricionista', 
          comentario: '¿Cuáles son los vegetales bajos en carbohidratos que podría incorporar en mi dieta?', 
          respuesta: 'Vegetales como el brócoli, la espinaca, el calabacín, el pepino y los pimientos son bajos en carbohidratos. Estos vegetales son ricos en fibra, vitaminas y minerales, y son excelentes para incluir en una dieta baja en carbohidratos.', 
          fecha: moment().subtract(3, 'days'), 
          leido: true 
        },
        { 
          id: 5, 
          titulo: 'Sustituto de crema en recetas', 
          destinatario: 'admin', 
          comentario: 'Necesito una alternativa a la crema en una receta debido a una alergia a los lácteos.', 
          respuesta: 'Existen varias alternativas a la crema que puedes utilizar, como la crema de coco, la leche de almendra espesa o una mezcla de tofu suave con un poco de agua o caldo. Estas opciones ofrecen una textura cremosa sin lácteos y se adaptan bien a la mayoría de recetas.', 
          fecha: moment().subtract(5, 'days'), 
          leido: false 
        },
      
        // Consultas de "Últimos 30 días"
        { 
          id: 6, 
          titulo: 'Consulta sobre suplementos vitamínicos', 
          destinatario: 'nutricionista', 
          comentario: '¿Es necesario tomar suplementos de vitaminas si llevo una dieta equilibrada?', 
          respuesta: 'En general, si llevas una dieta equilibrada y variada, puedes obtener la mayoría de los nutrientes necesarios. Sin embargo, algunas personas, especialmente adultos mayores o personas con restricciones dietéticas, podrían beneficiarse de suplementos como vitamina D o vitamina B12. Consulta con un profesional para una recomendación personalizada.', 
          fecha: moment().subtract(10, 'days'), 
          leido: true 
        },
        { 
          id: 7, 
          titulo: 'Alergia al gluten', 
          destinatario: 'admin', 
          comentario: 'Estoy buscando recetas sin gluten para incluir en mi alimentación.', 
          respuesta: 'Existen muchas recetas sin gluten que puedes probar, como platos a base de arroz, quinoa, maíz o patata. También puedes utilizar harinas sin gluten como la de almendra, de coco o de arroz para preparar recetas de repostería y panadería sin problemas.', 
          fecha: moment().subtract(15, 'days'), 
          leido: false 
        },
      ]);         

      const [isModalVisible, setIsModalVisible] = useState(false);
      const [newConsulta, setNewConsulta] = useState({ titulo: '', destinatario: 'admin', comentario: '' });
      const [responseModalVisible, setResponseModalVisible] = useState(false);
      const [selectedConsulta, setSelectedConsulta] = useState(null);
    
      const handleOpenModal = () => setIsModalVisible(true);
      const handleCloseModal = () => setIsModalVisible(false);
    
      const handleEnviarConsulta = () => {
        const nuevaConsulta = {
          id: consultas.length + 1,
          ...newConsulta,
          respuesta: null,
          fecha: moment(),
          leido: false,
        };
        setConsultas([...consultas, nuevaConsulta]);
        setNewConsulta({ titulo: '', destinatario: 'admin', comentario: '' });
        handleCloseModal();
      };
    
      const marcarComoLeida = (id) => {
        setConsultas(consultas.map(c => c.id === id ? { ...c, leido: true } : c));
      };
    
      const handleOpenResponseModal = (consulta) => {
        setSelectedConsulta(consulta);
        setResponseModalVisible(true);
      };
    
      const handleCloseResponseModal = () => {
        setResponseModalVisible(false);
        setSelectedConsulta(null);
      };
    
      // Función para categorizar consultas
      const categorizeConsultas = () => {
        const today = [];
        const yesterday = [];
        const last7Days = [];
        const last30Days = [];
    
        consultas.forEach((consulta) => {
          const diffDays = moment().diff(consulta.fecha, 'days');
          if (diffDays === 0) {
            today.push(consulta);
          } else if (diffDays === 1) {
            yesterday.push(consulta);
          } else if (diffDays <= 7) {
            last7Days.push(consulta);
          } else if (diffDays <= 30) {
            last30Days.push(consulta);
          }
        });
    
        return { today, yesterday, last7Days, last30Days };
      };
    
      const { today, yesterday, last7Days, last30Days } = categorizeConsultas();
    
      return (
        <View style={styles.container}>
          <FlatList
            data={[{ title: 'Hoy', data: today }, { title: 'Ayer', data: yesterday }, { title: 'Últimos 7 días', data: last7Days }, { title: 'Últimos 30 días', data: last30Days }]}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => (
              item.data.length > 0 && (
                <View>
                  <Text style={styles.sectionHeader}>{item.title}</Text>
                  {item.data.map((consulta) => (
                    <TouchableOpacity
                      key={consulta.id}
                      style={[styles.consultaItem, consulta.respuesta && !consulta.leido ? styles.unreadResponse : null]}
                      onPress={() => {
                        if (consulta.respuesta) {
                          marcarComoLeida(consulta.id);
                          handleOpenResponseModal(consulta);
                        }
                      }}
                    >
                      <View style={styles.consultaHeader}>
                        <Icon name="circle" size={6} color="#619537" style={{ marginRight: 6 }} />
                        <Text style={styles.consultaTitulo}>{consulta.titulo}</Text>
                        {consulta.respuesta && !consulta.leido && ( <Icon name="bell" size={14} color="#619537" style={{ marginLeft: 6 }} />)}
                      </View>
                      <Text style={styles.consultaDestinatario}>Para: {consulta.destinatario === 'admin' ? 'Administrador' : 'Nutricionista'}</Text>
                      <Text style={styles.consultaComentario}>{consulta.comentario}</Text>
                      <View style={styles.timeContainer}>
                        <Icon name="clock-o" size={12} color="#AAA" style={styles.clockIcon} />
                        <Text style={styles.consultaFecha}>{consulta.fecha.fromNow()}</Text>
                      </View>
                    </TouchableOpacity>
                  ))}
                </View>
              )
            )}
            ListFooterComponent={<View style={{ height: 80 }} />} // Espacio en blanco adicional
          />
    
          {/* Botón flotante para agregar una nueva consulta */}
          <TouchableOpacity style={styles.floatingButton} onPress={handleOpenModal}>
            <Icon name="plus" size={24} color="#FFF" />
          </TouchableOpacity>
    
          {/* Modal para crear una nueva consulta */}
          <Modal visible={isModalVisible} transparent={true} animationType="slide">
            <View style={styles.modalContainer}>
              <View style={styles.modalContent}>
                <Text style={styles.modalTitle}>Nueva Consulta</Text>
                
                <Text style={styles.label}>Título de la consulta</Text>
                <TextInput
                  style={styles.textInput}
                  value={newConsulta.titulo}
                  onChangeText={(text) => setNewConsulta({ ...newConsulta, titulo: text })}
                  placeholder="Escribe el título aquí"
                />
                
                <Text style={styles.label}>Seleccionar destinatario</Text>
                <View style={styles.pickerContainer}>
                  <Picker
                    selectedValue={newConsulta.destinatario}
                    onValueChange={(itemValue) => setNewConsulta({ ...newConsulta, destinatario: itemValue })}
                    style={styles.picker}
                  >
                    <Picker.Item label="Administrador" value="admin" />
                    <Picker.Item label="Nutricionista" value="nutricionista" />
                  </Picker>
                </View>
                
                <Text style={styles.label}>Comentario</Text>
                <TextInput
                  style={[styles.textInput, styles.comentarioInput]}
                  value={newConsulta.comentario}
                  onChangeText={(text) => setNewConsulta({ ...newConsulta, comentario: text })}
                  placeholder="Escribe tu consulta aquí..."
                  multiline
                />
    
                <View style={styles.buttonRow}>
                  <TouchableOpacity style={styles.submitButton} onPress={handleEnviarConsulta}>
                    <Text style={styles.submitButtonText}>Enviar</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.cancelButton} onPress={handleCloseModal}>
                    <Text style={styles.cancelButtonText}>Cancelar</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </Modal>
    
          {/* Modal para mostrar la respuesta de la consulta */}
          <Modal visible={responseModalVisible} transparent={true} animationType="slide">
            <View style={styles.modalContainer}>
              <View style={[styles.modalContent, styles.responseModalContent]}>
                {selectedConsulta && (
                  <>
                    <Text style={styles.modalTitle}>{selectedConsulta.titulo}</Text>
                    <Text style={styles.modalLabel}>Destinatario: {selectedConsulta.destinatario === 'admin' ? 'Administrador' : 'Nutricionista'}</Text>
                    <View style={styles.separator} />
                    <Text style={styles.modalLabel}>Consulta:</Text>
                    <Text style={styles.modalText}>{selectedConsulta.comentario}</Text>
                    <View style={styles.separator} />
                    <Text style={styles.modalLabel}>Respuesta:</Text>
                    <Text style={styles.modalResponseText}>{selectedConsulta.respuesta}</Text>
    
                    <TouchableOpacity style={styles.closeButton} onPress={handleCloseResponseModal}>
                      <Text style={styles.closeButtonText}>Cerrar</Text>
                    </TouchableOpacity>
                  </>
                )}
              </View>
            </View>
          </Modal>
        </View>
      );
    };
    
    export default ConsultaScreen;