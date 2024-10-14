import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, Image, ActivityIndicator, TouchableOpacity, ImageBackground } from 'react-native';
import { fetchNews } from '../../services/news';  // Servicio para obtener noticias
import styles from './NewsScreenStyles';  // Estilos ajustados

const NewsScreen = () => {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadNews = async () => {
      try {
        const data = await fetchNews();
        const filteredNews = data.filter(item => item.image_url);  // Filtrar las noticias que tienen imagen
        setNews(filteredNews);
      } catch (error) {
        console.error('Error fetching news:', error);
      } finally {
        setLoading(false);
      }
    };

    loadNews();
  }, []);

  // Renderizar noticia principal
  const renderMainNewsItem = () => {
    const mainNews = news[0];  // La primera noticia será la principal
    if (!mainNews) return null;

    return (
      <TouchableOpacity style={styles.mainNewsContainer} onPress={() => { /* Acción al tocar la noticia principal */ }}>
        <Image source={{ uri: mainNews.image_url }} style={styles.mainNewsImage} />
        <View style={styles.mainNewsTextContainer}>
          <Text style={styles.mainNewsTitle}>{mainNews.title}</Text>
          <Text style={styles.mainNewsDate}>{mainNews.pubDate}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  // Renderizar noticias secundarias
  const renderNewsItem = ({ item }) => (
    <TouchableOpacity style={styles.newsItem} onPress={() => { /* Acción al tocar la noticia secundaria */ }}>
      <Image source={{ uri: item.image_url }} style={styles.newsItemImage} />
      <View style={styles.newsContent}>
        <Text style={styles.newsTitle}>{item.title}</Text>
        <Text style={styles.newsDate}>{item.pubDate}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <ImageBackground 
      source={require('../../assets/images/Fondo2.png')} // Aquí colocas la imagen de fondo
      style={styles.backgroundImage}
    >
      <View style={styles.container}>
        {loading ? (
          <ActivityIndicator size="large" color="#4CAF50" />
        ) : (
          <>
            {/* Renderizar la noticia principal */}
            {renderMainNewsItem()}

            {/* Renderizar las noticias secundarias */}
            <FlatList
              data={news.slice(1)}  // Mostrar el resto de las noticias excluyendo la principal
              keyExtractor={(item) => item.link}
              renderItem={renderNewsItem}
              contentContainerStyle={styles.newsList}
            />
          </>
        )}
      </View>
    </ImageBackground>
  );
};

export default NewsScreen;
