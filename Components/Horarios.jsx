import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

function Horarios() {
  return (
    <View>
    <Text style={styles.title}>Nome do Aluno</Text>
  </View>
  )
}

const styles = StyleSheet.create({
    title: {
      fontSize: 20,
      fontWeight: 'bold',
      color: '#333',
      marginBottom: 10,
    },
  });

export default Horarios
