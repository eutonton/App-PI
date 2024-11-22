import React, { useState, useEffect } from 'react';
import { View, Text, Button, ActivityIndicator, StyleSheet } from 'react-native';
import axios from 'axios';

const Conceitos = ({ route, navigation }) => {
  const { studentId, classId, disciplineId, selectedUnit } = route.params;
  const [loading, setLoading] = useState(false);
  const [concepts, setConcepts] = useState([]);
  const [error, setError] = useState('');

  // Endpoints para as unidades
  const endpoints = {
    UD1: `/api/concepts/conceptsOne/class/${classId}/discipline/${disciplineId}`,
    UD2: `/api/concepts/conceptsTwo/class/${classId}/discipline/${disciplineId}`,
    UD3: `/api/concepts/conceptsThree/class/${classId}/discipline/${disciplineId}`,
  };

  // Função para fazer a requisição ao endpoint correto
  const fetchConcepts = async () => {
    setLoading(true);
    try {
      const response = await axios.get(endpoints[selectedUnit]);
      const filteredConcepts = response.data.filter(concept => concept.studentId === studentId);
      setConcepts(filteredConcepts);
    } catch (error) {
      setError('Erro ao buscar conceitos.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (selectedUnit && classId && disciplineId && studentId) {
      fetchConcepts();
    }
  }, [selectedUnit, classId, disciplineId, studentId]);

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
        <Text style={styles.errorText}>{error}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Conceitos (Notas)</Text>
      {concepts.length > 0 ? (
        concepts.map((concept, index) => (
          <View key={index} style={styles.conceptItem}>
            <Text style={styles.conceptText}>Disciplina: {concept.disciplineName}</Text>
            <Text style={styles.conceptText}>Nota: {concept.grade}</Text>
          </View>
        ))
      ) : (
        <Text style={styles.noConceptsText}>Nenhum conceito encontrado.</Text>
      )}
      <Button title="Voltar" onPress={() => navigation.goBack()} />
    </View>
  );
};

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
  conceptItem: {
    padding: 10,
    backgroundColor: '#ffffff',
    marginBottom: 10,
    borderRadius: 5,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 2,
  },
  conceptText: {
    fontSize: 16,
    color: '#333',
  },
  noConceptsText: {
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

export default Conceitos;
