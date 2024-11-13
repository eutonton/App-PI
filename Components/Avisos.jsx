import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, ActivityIndicator, Alert, Platform  } from 'react-native';
import axios from 'axios';

export default function Avisos() {
  const [notices, setNotices] = useState([]);
  const [loading, setLoading] = useState(true);

  const getApiUrl = () => {
    if (Platform.OS === 'android') {
      return 'http://10.0.2.2:8080/api/statement/getAllStatements';
    }
    return 'http://localhost:8080/api/statement/getAllStatements';
  };

  useEffect(() => {
    const fetchNotices = async () => {
      try {
        const response = await axios.get(getApiUrl());
        setNotices(response.data);
      } catch (error) {
        Alert.alert("Erro", "Não foi possível carregar os avisos");
        console.error("Erro ao buscar avisos:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchNotices();
  }, []);

  const renderNotice = ({ item }) => (
    <View style={styles.noticeCard}>
      <Text style={styles.title}>{item.title}</Text>
      <Text style={styles.content}>{item.content}</Text>
      <Text style={styles.date}>Data: {new Date(item.creationDate).toLocaleDateString()}</Text>
      <Text style={styles.creator}>Criado por: {item.creator.name}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <FlatList
          data={notices}
          keyExtractor={(item) => item.id}
          renderItem={renderNotice}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9f9f9',
    paddingTop: 10,
  },
  noticeCard: {
    backgroundColor: '#fff',
    marginVertical: 8,
    marginHorizontal: 16,
    padding: 20,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 2,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#333',
  },
  content: {
    fontSize: 16,
    marginBottom: 5,
    color: '#555',
  },
  date: {
    fontSize: 14,
    color: '#888',
    marginBottom: 5,
  },
  creator: {
    fontSize: 14,
    color: '#888',
  },
});
