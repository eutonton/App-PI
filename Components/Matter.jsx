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
    backgroundColor: '#f8f8f8',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  disciplineItem: {
    padding: 10,
    backgroundColor: '#ffffff',
    marginBottom: 10,
    borderRadius: 5,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 2,
  },
  disciplineText: {
    fontSize: 16,
    color: '#333',
  },
  disciplineDescription: {
    fontSize: 14,
    color: '#666',
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
  },
  errorText: {
    fontSize: 16,
    color: 'red',
  },
});