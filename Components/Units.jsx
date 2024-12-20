import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';

const Units = ({ route, navigation }) => {
  // Desestruturando os parâmetros passados pela navegação
  const { discipline, classId, studentId } = route.params;

  // Verifique se a disciplina está sendo passada corretamente
  console.log('discipline' , discipline); // A disciplina é passada como objeto

  // Função para navegação
  const handleSelectUnit = (unit) => {
    navigation.navigate('Concepts', {
      discipline: discipline,  // Passando a disciplina para a próxima tela
      selectedUnit: unit,      // Passando a unidade selecionada
      classId: classId,        // Passando o ID da classe
      studentId: studentId,    // Passando o ID do aluno
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Unidades da {discipline.disciplineName}</Text>
      
      {/* Botões para selecionar unidades */}
      <Button title="UD1" onPress={() => handleSelectUnit('UD1')} />
      <Button title="UD2" onPress={() => handleSelectUnit('UD2')} />
      <Button title="UD3" onPress={() => handleSelectUnit('UD3')} />
    </View>
  );
};

export default Units;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
});
