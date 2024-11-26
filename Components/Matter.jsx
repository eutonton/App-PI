import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, FlatList, TouchableOpacity } from 'react-native';
import { useAuth } from '../AuthContext';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';

const Materias = () => {
  const { user } = useAuth();
  const navigation = useNavigation();
  const [disciplines, setDisciplines] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchClass = async (classId) => {
    try {
      console.log('Buscando classes para classId:', classId);

      const response = await axios.get('http://192.168.1.107:8080/api/classes/getAllClasses');
      console.log('Resposta completa da API:', response.data);

      // Valida se a resposta é um array
      if (!Array.isArray(response.data)) {
        throw new Error('Formato inesperado de resposta da API. Esperado um array.');
      }

      // Procure pela classe com o ID correspondente
      const filteredClass = response.data.find((classItem) => String(classItem.id).trim() === String(classId).trim());
      console.log('Classe encontrada:', filteredClass);

      if (!filteredClass) {
        throw new Error(`Classe com ID ${classId} não encontrada na API.`);
      }

      if (!Array.isArray(filteredClass.disciplines)) {
        throw new Error('A propriedade disciplines está ausente ou não é um array.');
      }

      return filteredClass.disciplines;
    } catch (error) {
      console.error('Erro ao buscar disciplinas:', error.message);
      throw error;
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!user?.classId) {
          throw new Error('ID da classe do usuário não está disponível.');
        }

        const disciplinesData = await fetchClass(user.classId);
        setDisciplines(disciplinesData);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [user?.classId]);

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.centered}>
        <Text style={styles.errorText}>Erro: {error}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Disciplinas da Classe</Text>
      {disciplines.length > 0 ? (
        <FlatList
          data={disciplines}
          keyExtractor={(item) => item.id.toString()} // ID único de cada disciplina
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.disciplineItem}
              onPress={() => navigation.navigate('Concepts', { discipline: item })} // Navegar para a tela de unidades
            >
              <Text style={styles.disciplineText}>{item.disciplineName}</Text>
              <Text style={styles.disciplineDescription}>{item.description}</Text>
            </TouchableOpacity>
          )}
        />
      ) : (
        <Text style={styles.noDisciplinesText}>Nenhuma disciplina encontrada.</Text>
      )}
    </View>
  );
};

export default Materias;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f0f4f8', // Fundo mais suave e agradável aos olhos
  },
  title: {
    fontSize: 24, // Tamanho maior para destacar o título
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#333', // Cor escura para melhor contraste
    textAlign: 'center', // Centralizar o título
  },
  disciplineItem: {
    padding: 12, // Margem interna maior
    backgroundColor: '#ffffff',
    marginBottom: 12,
    borderRadius: 8, // Bordas mais arredondadas
    shadowColor: '#000',
    shadowOpacity: 0.15,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    elevation: 4, // Elevação para um efeito de "cartão"
  },
  disciplineText: {
    fontSize: 18, // Tamanho maior para destaque
    color: '#645CA5', // Azul suave para texto principal
    fontWeight: '600',
  },
  disciplineDescription: {
    fontSize: 14,
    color: '#5f6368', // Cinza mais claro para descrição
    marginTop: 4,
  },
  noDisciplinesText: {
    fontSize: 16,
    color: '#999',
    textAlign: 'center',
    marginTop: 20,
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff', // Fundo branco para estado de carregamento/erro
  },
  errorText: {
    fontSize: 16,
    color: '#d93025', // Vermelho para erro
    textAlign: 'center',
    fontWeight: '500',
  },
});
