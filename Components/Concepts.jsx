import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, Alert, ScrollView } from 'react-native';
import { useAuth } from '../AuthContext';

const Conceitos = ({ route }) => {
  const { discipline, classId } = route.params; // Remover selectedUnit e studentId do route.params
  const [studentData, setStudentData] = useState({ UD1: [], UD2: [], UD3: [] }); // Estrutura para armazenar os dados de todas as unidades
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null); // Erro de requisição
  const { user } = useAuth();

  // Função para determinar o endpoint com base na unidade
  const getEndpoint = (unit) => {
    switch (unit) {
      case 'UD1':
        return `/conceptsOne/class/${user.classId}/discipline/${discipline.id}`;
      case 'UD2':
        return `/conceptsTwo/class/${user.classId}/discipline/${discipline.id}`;
      case 'UD3':
        return `/conceptsThree/class/${user.classId}/discipline/${discipline.id}`;
      default:
        return null;
    }
  };

  // Função para buscar as notas de todas as unidades
  const fetchNotas = async () => {
    try {
      const units = ['UD1', 'UD2', 'UD3'];
      const data = {};

      // Buscar dados para cada unidade
      for (let unit of units) {
        const endpoint = getEndpoint(unit);
        if (!endpoint) {
          Alert.alert('Erro', 'Unidade selecionada inválida!');
          return;
        }

        // Requisição para o endpoint correto
        const response = await fetch(`https://sis-medio-production.up.railway.app/api/concepts${endpoint}`);
        const unitData = await response.json();
        
        // Filtrando os dados para o aluno logado
        const filteredData = unitData.filter(item => item.aluno.id === user.id); // Filtra pela ID do aluno

        data[unit] = filteredData; // Armazenar os dados filtrados para a unidade
      }

      // Armazenar os dados de todas as unidades
      setStudentData(data);
    } catch (err) {
      setError('Erro ao buscar dados');
      console.error('Erro ao buscar dados:', err);
      Alert.alert('Erro', 'Não foi possível carregar os dados.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNotas();
  }, [classId, discipline.id, user.classId]);

  return (
    <View style={styles.container}>
      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : error ? (
        <Text style={styles.errorText}>{error}</Text>
      ) : (
        <ScrollView style={styles.tableContainer}>
          <Text style={styles.tableHeader}>Disciplina: {discipline.disciplineName}</Text>

          {/* Renderizar os dados de todas as unidades */}
          {['UD1', 'UD2', 'UD3'].map((unit) => (
            <View key={unit} style={styles.unitContainer}>
              <Text style={styles.unitHeader}>Unidade: {unit}</Text>

              <View style={styles.table}>
                <View style={styles.tableRow}>
                  <Text style={styles.tableHeaderCell}>Nome do Aluno</Text>
                  <Text style={styles.tableHeaderCell}>AV1</Text>
                  <Text style={styles.tableHeaderCell}>AV2</Text>
                  <Text style={styles.tableHeaderCell}>Situação</Text>
                </View>

                {studentData[unit].map((item, index) => (
                  <View key={index} style={styles.tableRow}>
                    <Text style={styles.tableCell}>{item.aluno.name}</Text>
                    <Text style={styles.tableCell}>{item.av1}</Text>
                    <Text style={styles.tableCell}>{item.av2}</Text>
                    <Text style={styles.tableCell}>{item.status}</Text>
                  </View>
                ))}
              </View>
            </View>
          ))}
        </ScrollView>
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
  unitContainer: {
    marginBottom: 30,
  },
  unitHeader: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
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
    backgroundColor: 'white',
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
