import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, FlatList } from 'react-native';
import { useAuth } from '../AuthContext';
import axios from 'axios';

const Conceitos = () => {
  const { user } = useAuth();
  const [disciplines, setDisciplines] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchClass = async (classId) => {
    try {
      const response = await axios.get('http://192.168.1.106:8080/api/classes/getAllClasses');
      const filteredClass = response.data.find((classItem) => classItem.id === classId);

      if (!filteredClass) {
        throw new Error('Classe não encontrada.');
      }

      return filteredClass.disciplines;
    } catch (error) {
      console.error('Erro ao buscar disciplinas:', error);
      throw error;
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const disciplinesData = await fetchClass(user?.classId);
        setDisciplines(disciplinesData);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    if (user?.classId) {
      fetchData();
    }
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
          keyExtractor={(item) => item.id} // ID único de cada disciplina
          renderItem={({ item }) => (
            <View style={styles.disciplineItem}>
              <Text style={styles.disciplineText}>{item.disciplineName}</Text>
              <Text style={styles.disciplineDescription}>{item.description}</Text>
            </View>
          )}
        />
      ) : (
        <Text style={styles.noDisciplinesText}>Nenhuma disciplina encontrada.</Text>
      )}
    </View>
  );
};

export default Conceitos;

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
