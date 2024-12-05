import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, ActivityIndicator, Alert, Platform  } from 'react-native';
import axios from 'axios';

export default function Avisos() {
  const [notices, setNotices] = useState([]);
  const [loading, setLoading] = useState(true);

  const getApiUrl = () => {
    if (Platform.OS === 'android') {
      return 'https://sis-medio-production.up.railway.app/api/statement/getAllStatements';
    }
    return 'https://sis-medio-production.up.railway.app/api/statement/getAllStatements';
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
    backgroundColor: '#F5F5F5', // Fundo claro para um visual limpo
    paddingTop: 10,
  },
  noticeCard: {
    backgroundColor: '#FFFFFF', // Fundo branco para um cartão minimalista
    marginVertical: 8,
    marginHorizontal: 16,
    padding: 16,
    borderRadius: 8, // Bordas levemente arredondadas para um visual moderno
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2, // Suave elevação para destacar os cartões
    borderLeftWidth: 4, // Barra colorida na lateral para identificação visual
    borderLeftColor: '#645CA5', // Roxo mais escuro para contraste
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 8,
    color: '#333333', // Cinza escuro para o texto principal
  },
  content: {
    fontSize: 16,
    marginBottom: 8,
    color: '#555555', // Cinza médio para os textos secundários
    lineHeight: 22, // Aumenta a legibilidade
  },
  date: {
    fontSize: 14,
    color: '#645CA5', // Roxo vibrante para dar destaque às datas
    marginBottom: 4,
  },
  creator: {
    fontSize: 14,
    color: '#645CA5', // Rosa sutil para destacar o autor
    fontWeight: '500',
  },
  activityIndicator: {
    marginTop: 20,
    alignSelf: 'center',
    color: '#645CA5', // Roxo escuro para um visual elegante no carregamento
  },
  emptyState: {
    fontSize: 16,
    textAlign: 'center',
    color: '#999999', // Cinza claro para mensagens de estado vazio
    marginTop: 20,
  },
});
