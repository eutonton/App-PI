import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, Alert, ScrollView } from 'react-native';
import { useAuth } from '../AuthContext';

const Conceitos = ({ route }) => {
  const { discipline, selectedUnit, classId, studentId } = route.params;
  const [studentData, setStudentData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null); // Erro de requisição
  const { user } = useAuth();

  // Função para determinar o endpoint com base na unidade selecionada
  const getEndpoint = () => {
    switch (selectedUnit) {
      case 'UD1':
        return `/conceptsOne/class/${user.classId}/discipline/${discipline.id}`;
      case 'UD2':
        return `/conceptsTwo/class/${classId}/discipline/${discipline.id}`;
      case 'UD3':
        return `/conceptsThree/class/${classId}/discipline/${discipline.id}`;
      default:
        return null;
    }
  };

  useEffect(() => {
    const fetchNotas = async () => {
      const endpoint = getEndpoint();
      if (!endpoint) {
        Alert.alert('Erro', 'Unidade selecionada inválida!');
        return;
      }

      try {
        // Requisição para o endpoint correto
        const response = await fetch(`http://192.168.1.107:8080/api/concepts${endpoint}`);
        const data = await response.json();
        console.log(data);

        // Verificar se a resposta contém dados válidos
        if (Array.isArray(data) && data.length > 0) {
          setStudentData(data);
        } else {
          setError('Nenhum dado encontrado.');
          Alert.alert('Erro', 'Nenhum dado encontrado.');
        }
      } catch (err) {
        setError('Erro ao buscar dados');
        console.error('Erro ao buscar dados:', err);
        Alert.alert('Erro', 'Não foi possível carregar os dados.');
      } finally {
        setLoading(false);
      }
    };

    fetchNotas();
  }, [selectedUnit, classId, studentId, discipline.id, user.classId]);

  return (
    <View style={styles.container}>
      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : error ? (
        <Text style={styles.errorText}>{error}</Text> // Exibir erro, se houver
      ) : studentData.length > 0 ? (
        <ScrollView style={styles.tableContainer}>
          <Text style={styles.tableHeader}>Disciplina: {discipline.disciplineName}</Text>
          <Text style={styles.tableHeader}>Unidade: {selectedUnit}</Text>

          <View style={styles.table}>
            <View style={styles.tableRow}>
              <Text style={styles.tableHeaderCell}>Nome do Aluno</Text>
              <Text style={styles.tableHeaderCell}>AV1</Text>
              <Text style={styles.tableHeaderCell}>AV2</Text>
              <Text style={styles.tableHeaderCell}>Situação</Text>
            </View>

            {studentData.map((item, index) => (
              <View key={index} style={styles.tableRow}>
                <Text style={styles.tableCell}>{item.aluno.name}</Text>
                <Text style={styles.tableCell}>{item.av1}</Text>
                <Text style={styles.tableCell}>{item.av2}</Text>
                <Text style={styles.tableCell}>{item.status}</Text>
              </View>
            ))}
          </View>
        </ScrollView>
      ) : (
        <Text style={styles.errorText}>Nenhum dado disponível.</Text>
      )}
    </View>
  );
};

export default Conceitos;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  tableContainer: {
    width: '100%',
    marginTop: 20,
  },
  tableHeader: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  table: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
    marginBottom: 20,
  },
  tableRow: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    paddingVertical: 8,
    paddingHorizontal: 10,
    justifyContent: 'space-between',
  },
  tableHeaderCell: {
    fontWeight: 'bold',
    width: '25%',
    textAlign: 'center',
  },
  tableCell: {
    width: '25%',
    textAlign: 'center',
  },
  errorText: {
    fontSize: 18,
    color: '#e74c3c',
    textAlign: 'center',
  },
});
