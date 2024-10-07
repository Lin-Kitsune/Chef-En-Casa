import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, ImageBackground } from 'react-native';
// import * as Progress from 'react-native-progress'; 
import { CircularProgress } from 'react-native-circular-progress'; 
import { BarChart } from 'react-native-chart-kit';
import styles from './MetaScreenStyles';
import Fondo2 from '../../assets/images/Fondo2.png';  // Asegúrate de que esta sea la ruta correcta

const MetaScreen = () => {
  const [progresoMeta, setProgresoMeta] = useState(0.76);
  const [selectedTab, setSelectedTab] = useState('Resumen');

  // Datos de ejemplo para los gráficos de las diferentes pestañas
  const dataKcal = {
    labels: ['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom'],
    datasets: [{ data: [15, 20, 30, 25, 35, 45, 40] }],
  };
  const dataCarbs = {
    labels: ['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom'],
    datasets: [{ data: [40, 45, 35, 50, 40, 55, 60] }],
  };
  const dataProtein = {
    labels: ['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom'],
    datasets: [{ data: [25, 30, 20, 35, 40, 30, 45] }],
  };
  const dataResumen = {
    labels: ['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom'],
    datasets: [{ data: [5, 7, 3, 8, 6, 7, 9] }],
  };

  // Función para obtener el gráfico adecuado según la pestaña seleccionada
  const getChartData = () => {
    switch (selectedTab) {
      case 'Kcal':
        return dataKcal;
      case 'Carbs':
        return dataCarbs;
      case 'Protein':
        return dataProtein;
      default:
        return dataResumen;
    }
  };

  // Función para cambiar el título de la gráfica según la pestaña
  const getChartTitle = () => {
    switch (selectedTab) {
      case 'Kcal':
        return 'Detalles de Esta Semana';
      case 'Carbs':
        return 'Ingesta de Carbohidratos';
      case 'Protein':
        return 'Ingesta de Proteínas';
      default:
        return 'Reducción de Residuos Esta Semana';
    }
  };

  // Función para cambiar la descripción según la pestaña
  const getChartDescription = () => {
    switch (selectedTab) {
      case 'Kcal':
        return 'Total de kcal quemadas';
      case 'Carbs':
        return 'Total de Carbohidratos Consumidos';
      case 'Protein':
        return 'Total de Proteínas Consumidas';
      default:
        return 'Desperdicio semanal reducido';
    }
  };

  return (
    <View style={styles.container}>
      {/* Pestañas para cambiar entre Resumen, Kcal, Carbs y Protein */}
      <View style={styles.tabContainer}>
        <TouchableOpacity
          onPress={() => setSelectedTab('Resumen')}
          style={[styles.tabButton, selectedTab === 'Resumen' && styles.activeTab]}
        >
          <Text style={[styles.tabText, selectedTab === 'Resumen' && styles.activeTabText]}>
            Resumen
          </Text>
        </TouchableOpacity>
        
        <TouchableOpacity
          onPress={() => setSelectedTab('Kcal')}
          style={[styles.tabButton, selectedTab === 'Kcal' && styles.activeTab]}
        >
          <Text style={[styles.tabText, selectedTab === 'Kcal' && styles.activeTabText]}>
            Kcal
          </Text>
        </TouchableOpacity>
        
        <TouchableOpacity
          onPress={() => setSelectedTab('Carbs')}
          style={[styles.tabButton, selectedTab === 'Carbs' && styles.activeTab]}
        >
          <Text style={[styles.tabText, selectedTab === 'Carbs' && styles.activeTabText]}>
            Carbs
          </Text>
        </TouchableOpacity>
        
        <TouchableOpacity
          onPress={() => setSelectedTab('Protein')}
          style={[styles.tabButton, selectedTab === 'Protein' && styles.activeTab]}
        >
          <Text style={[styles.tabText, selectedTab === 'Protein' && styles.activeTabText]}>
            Protein
          </Text>
        </TouchableOpacity>
      </View>

      {/* Gráfico de barras */}
      <View style={styles.chartContainer}>
        {/* Título alineado a la izquierda */}
        <View style={styles.titleContainer}>
          <Text style={styles.chartTitle}>{getChartTitle()}</Text>
          <Text style={styles.chartDescription}>{getChartDescription()}</Text>
        </View>
        <BarChart
          data={getChartData()}
          width={350}  // Aumenta el ancho del gráfico
          height={300} // Aumenta la altura del gráfico
          chartConfig={{
            backgroundColor: '#fff',
            backgroundGradientFrom: '#EDEFFF',
            backgroundGradientTo: '#EDEFFF',
            color: (opacity = 1) => `rgba(140, 177, 57, ${opacity})`,
            labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
            barPercentage: 0.5,
          }}
          style={styles.chart}
        />
      </View>

      {/* Fondo con el progreso semanal */}
      <ImageBackground
        source={Fondo2}
        style={styles.progressBox}
        imageStyle={styles.imageStyle}
        resizeMode="contain"
      >
        <View style={styles.textContainer}>
          <Text style={styles.metaTitle}>Resultado Semanal</Text>
          <Text style={styles.metaDescription}>Tu informe semanal</Text>
        </View>
        <CircularProgress
          size={130}
          fill={progresoMeta * 100}
          width={11}
          backgroundColor={'rgba(212, 255, 179, 0.3)'}
          tintColor={'#fbfaee'}
          backgroundWidth={10}
          rotation={180}
          lineCap="round"
          style={styles.progressText}
        >
          {() => (
            <Text style={styles.progressText}>
              {`${(progresoMeta * 100).toFixed(0)}`}
              <Text style={styles.percentSymbol}>%</Text>
            </Text>
          )}
        </CircularProgress>
      </ImageBackground>
    </View>
  );
};

export default MetaScreen;
