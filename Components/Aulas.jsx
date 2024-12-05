import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';

export default function Aulas() {
  // Dados simulados do quadro de horários
  const horarios = [
    { id: '1', dia: 'Segunda-feira', horario: '08:00 - 09:30', materia: 'Matemática' },
    { id: '2', dia: 'Segunda-feira', horario: '10:00 - 11:30', materia: 'História' },
    { id: '3', dia: 'Terça-feira', horario: '08:00 - 09:30', materia: 'Química' },
    { id: '4', dia: 'Terça-feira', horario: '10:00 - 11:30', materia: 'Física' },
    { id: '5', dia: 'Quarta-feira', horario: '08:00 - 09:30', materia: 'Português' },
    { id: '6', dia: 'Quarta-feira', horario: '10:00 - 11:30', materia: 'Geografia' },
    { id: '7', dia: 'Quinta-feira', horario: '08:00 - 09:30', materia: 'Biologia' },
    { id: '8', dia: 'Quinta-feira', horario: '10:00 - 11:30', materia: 'Educação Física' },
    { id: '9', dia: 'Sexta-feira', horario: '08:00 - 09:30', materia: 'Inglês' },
    { id: '10', dia: 'Sexta-feira', horario: '10:00 - 11:30', materia: 'Artes' },
  ];

  // Estado para armazenar as matérias retornadas da API
  const [disciplinas, setDisciplinas] = useState([]);
  const [horariosFiltrados, setHorariosFiltrados] = useState([]);

  useEffect(() => {
    // Simulação de uma chamada à API
    const fetchDisciplinas = async () => {
      const apiResponse = {
        disciplines: [
          { disciplineName: 'Matemática' },
          { disciplineName: 'Geografia' },
          { disciplineName: 'História' },
        ],
      };

      // Extraindo os nomes das disciplinas
      const disciplinasDaAPI = apiResponse.disciplines.map((disciplina) => disciplina.disciplineName);
      setDisciplinas(disciplinasDaAPI);
    };

    fetchDisciplinas();
  }, []);

  useEffect(() => {
    // Filtrar horários com base nas matérias retornadas pela API
    const filtrados = horarios.filter((horario) => disciplinas.includes(horario.materia));
    setHorariosFiltrados(filtrados);
  }, [disciplinas]);

  // Renderiza cada item
  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <Text style={styles.dia}>{item.dia}</Text>
      <Text style={styles.horario}>{item.horario}</Text>
      <Text style={styles.materia}>{item.materia}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Quadro de Horários</Text>
      {horariosFiltrados.length > 0 ? (
        <FlatList
          data={horariosFiltrados}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
          contentContainerStyle={styles.list}
        />
      ) : (
        <Text style={styles.noData}>Nenhuma matéria disponível no momento.</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#023e8a',
    textAlign: 'center',
    marginBottom: 20,
  },
  list: {
    paddingBottom: 20,
  },
  card: {
    backgroundColor: '#FFFFFF',
    padding: 15,
    marginBottom: 15,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  dia: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#03045e',
    marginBottom: 5,
  },
  horario: {
    fontSize: 16,
    color: '#645CA5',
    marginBottom: 5,
    fontStyle: 'italic',
  },
  materia: {
    fontSize: 18,
    fontWeight: '600',
     color: '#645CA5', 
  },
  noData: {
    fontSize: 16,
    color: '#6c757d',
    textAlign: 'center',
    marginTop: 20,
  },
});
